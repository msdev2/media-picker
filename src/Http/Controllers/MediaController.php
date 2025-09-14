<?php

namespace Msdev2\MediaPicker\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use League\Glide\Server;

class MediaController extends Controller
{
    private $disk;
    private $baseDir;

    public function __construct()
    {
        $this->disk = config('media-picker.disk', 'public');
        $this->baseDir = config('media-picker.base_directory', 'uploads');
    }
     // NEW: Method to rename a file or folder
    public function rename(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'path' => 'required|string',
            // CRITICAL FIX: Replace the invalid rule with the correct regex rule
            'new_name' => ['required', 'string', 'not_regex:/[\\/\\\\]/'],
        ],[
            'new_name.not_regex' => 'The new name cannot contain slashes.',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 422);
        }

        $oldPath = $request->path;
        $directory = dirname($oldPath);
        $newPath = ($directory === '.' || $directory === '/' ? '' : $directory . '/') . $request->new_name;

        if (Storage::disk($this->disk)->exists($newPath)) {
            return response()->json(['success' => false, 'message' => 'A file with that name already exists.'], 409);
        }

        Storage::disk($this->disk)->move($oldPath, $newPath);

        return response()->json(['success' => true, 'message' => 'Item renamed successfully.']);
    }

    // NEW: Method to move a file to a new folder
    public function move(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'path' => 'required|string',
            'destination' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 422);
        }

        $oldPath = $request->path;
        $filename = basename($oldPath);
        $destinationFolder = $this->cleanPath($this->baseDir . '/' . $request->destination);
        $newPath = $this->cleanPath($destinationFolder . '/' . $filename);

        if (!Storage::disk($this->disk)->exists($destinationFolder)) {
            return response()->json(['success' => false, 'message' => 'Destination folder does not exist.'], 404);
        }

        if (Storage::disk($this->disk)->exists($newPath)) {
            return response()->json(['success' => false, 'message' => 'A file with the same name already exists in the destination.'], 409);
        }

        Storage::disk($this->disk)->move($oldPath, $newPath);

        return response()->json(['success' => true, 'message' => 'Item moved successfully.']);
    }
     /**
     * Generate a resized image using Glide.
     * Laravel will automatically inject the configured Glide Server.
     */
    public function getImage(Request $request, Server $server, $folder, $width, $height, $name)
    {
        $queryParams = [];
        $queryParams["fit"] = "crop"; // Default fit

        if ($width === "w") {
            $queryParams["w"] = $height; // Width is specified
        } else if ($width === "h") {
            $queryParams["h"] = $height; // Height is specified
        } else {
            $queryParams["w"] = $width;
            $queryParams["h"] = $height;
        }

        // The path must be relative to the 'source' disk's 'source_path_prefix'
        // In our case, config('glide.source_path_prefix') is 'uploads',
        // so we just need to pass the path *inside* uploads.
        $sourcePath = $folder . '/' . $name;

        return $server->outputImage($sourcePath, array_merge($queryParams, $request->all()));
    }

    
    /**
     * THIS IS THE CORRECTED METHOD
     * Serve an original, unmodified image in a driver-agnostic way.
     */
    public function getMainImage($folder, $name)
    {
        // Path relative to the root of the configured disk
        $filePath = "{$this->baseDir}/{$folder}/{$name}";

        if (! Storage::disk($this->disk)->exists($filePath)) {
            abort(404, 'File not found.');
        }

        // Get contents and mime type using universal methods
        $contents = Storage::disk($this->disk)->get($filePath);
        $mime = $this->getMimeTypeFromContents($contents); // Reuse our existing helper!

        // Return a generic response which works for all drivers (S3, local, etc.)
        return response($contents)->header('Content-Type', $mime);
    }
     /**
     * Render files securely and in a driver-agnostic way.
     */
    public function renderFile($path)
    {
        $decodedPath = base64_decode($path);

        if (!Storage::disk($this->disk)->exists($decodedPath)) {
            abort(404);
        }

        // Get file contents and mime type using universal methods
        $contents = Storage::disk($this->disk)->get($decodedPath);
        $mime = $this->getMimeTypeFromContents($contents);

        // Only serve image files for direct preview to prevent security risks
        if (!Str::startsWith($mime, 'image/')) {
            abort(403, 'File type not supported for preview.');
        }
        
        // THIS IS THE KEY CHANGE:
        // Use a generic response instead of response()->file() which requires a local path
        return response($contents)->header('Content-Type', $mime);
    }

    public function index()
    {
        return view('media-picker::media-picker.index');
    }

    public function getContents(Request $request)
    {
        $folder = $request->input('folder', '/');
        $path = $this->cleanPath($this->baseDir . '/' . $folder);

        // --- FILTER FOR CURRENT DIRECTORY VIEW ---
        $directoriesRaw = Storage::disk($this->disk)->directories($path);
        // We only need basename here as it's not a nested view
        $directoriesFiltered = array_filter($directoriesRaw, fn($dir) => basename($dir) !== '.cache');
        $directories = array_values($directoriesFiltered);

        $files = Storage::disk($this->disk)->files($path);
        
        // --- ROBUST FILTER FOR THE ENTIRE FOLDER TREE ---
        $allDirectoriesRaw = Storage::disk($this->disk)->allDirectories($this->baseDir);
        
        // CRITICAL FIX: This new filter checks every part of the path.
        // It will correctly remove "uploads/.cache", "uploads/avatar/.cache", etc.
        $allDirectoriesFiltered = array_filter($allDirectoriesRaw, function($dir) {
            return !in_array('.cache', explode('/', $dir));
        });

        // Re-index the array to ensure it becomes a valid JSON array
        $allDirectoriesReindexed = array_values($allDirectoriesFiltered);
        $allDirectoriesPaths = array_map(fn($dir) => str_replace($this->baseDir . '/', '', $dir), $allDirectoriesReindexed);
        
        $baseDirName = config('media-picker.base_directory', 'uploads');

        $contents = [
            'directories' => array_map([$this, 'formatDirectory'], $directories),
            'files' => array_map([$this, 'formatFile'], $files),
            'breadcrumbs' => $this->generateBreadcrumbs($folder),
            'all_directories' => $this->buildDirectoryTree($allDirectoriesPaths, $baseDirName),
        ];

        return response()->json($contents);
    }

    private function buildDirectoryTree(array $paths, string $baseDirName): array
    {
        $tree = [['name' => ucfirst($baseDirName), 'path' => '/', 'children' => []]];
        sort($paths);

        foreach ($paths as $path) {
            $parts = explode('/', $path);
            $currentNode = &$tree[0];
            $currentPath = '';

            foreach ($parts as $part) {
                $found = false;
                $currentPath = $currentPath ? $currentPath . '/' . $part : $part;

                if (!isset($currentNode['children'])) {
                    $currentNode['children'] = [];
                }

                foreach ($currentNode['children'] as &$child) {
                    if ($child['name'] === $part) {
                        $currentNode = &$child;
                        $found = true;
                        break;
                    }
                }
                unset($child);

                if (!$found) {
                    $newNode = ['name' => $part, 'path' => $currentPath, 'children' => []];
                    $currentNode['children'][] = $newNode;
                    $currentNode = &$currentNode['children'][count($currentNode['children']) - 1];
                }
            }
        }
        return $tree;
    }

    public function createFolder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'folder_name' => 'required|string|max:255',
            'current_path' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 422);
        }

        $newFolderPath = $this->cleanPath($this->baseDir . '/' . $request->current_path . '/' . $request->folder_name);

        if (Storage::disk($this->disk)->exists($newFolderPath)) {
            return response()->json(['success' => false, 'message' => 'Folder already exists.'], 409);
        }

        Storage::disk($this->disk)->makeDirectory($newFolderPath);

        return response()->json(['success' => true, 'message' => 'Folder created successfully.']);
    }

     public function upload(Request $request)
    {
        $allowedMimes = config('media-picker.allowed_mime_types', []);
        $maxSize = config('media-picker.max_upload_size_kb', 0);

        $rules = [
            'file' => ['required', 'file'],
            'current_path' => ['required', 'string'],
        ];

        if (!empty($allowedMimes)) {
            $rules['file'][] = 'mimetypes:' . implode(',', $allowedMimes);
        }

        if ($maxSize > 0) {
            $rules['file'][] = 'max:' . $maxSize;
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 422);
        }
        
        $file = $request->file('file');
        $location = $this->cleanPath($this->baseDir . '/' . $request->current_path);
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $finalName = $file->getClientOriginalName();
        $counter = 1;
        // CRITICAL FIX: Loop until we find a unique filename
        while (Storage::disk($this->disk)->exists($location . '/' . $finalName)) {
            $finalName = $originalName . '-' . $counter . '.' . $extension;
            $counter++;
        }

        $file->storeAs($location, $finalName, ['disk' => $this->disk]);

        return response()->json(['success' => true, 'message' => 'File uploaded successfully.']);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'path' => 'required|string',
            'type' => 'required|in:file,directory',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 422);
        }
        
        $path = $this->cleanPath($request->path);

        if (!Storage::disk($this->disk)->exists($path)) {
             return response()->json(['success' => false, 'message' => 'Item not found.'], 404);
        }

        if ($request->type === 'file') {
            Storage::disk($this->disk)->delete($path);
        } else {
            Storage::disk($this->disk)->deleteDirectory($path);
        }

        return response()->json(['success' => true, 'message' => 'Item deleted successfully.']);
    }

    // --- Helper methods ---
    private function cleanPath($path)
    {
        return str_replace('//', '/', $path);
    }
    
     private function formatFile($path)
    {
        // This method requires the `local` disk driver to be used for mime type detection.
        // For S3 or other drivers, you would need a different strategy.
        $isImage = Str::startsWith(Storage::disk($this->disk)->mimeType($path), 'image/');
        
        // The internal URL for previews inside the picker
        $renderUrl = route('media-picker.renderFile', ['path' => base64_encode($path)]);

        // THE CRITICAL FIX: The real, direct public URL for the file.
        // This relies on the user having their filesystem correctly configured (e.g., `storage:link`).
        $publicUrl = Storage::disk($this->disk)->url($path);

        return [
            'name' => basename($path),
            'path' => $path,
            'url' => $renderUrl,          // Used for internal previews
            'public_url' => $publicUrl, // The REAL public URL
            'type' => 'file',
            'is_image' => $isImage,
            'size' => Storage::disk($this->disk)->size($path),
            'last_modified' => Storage::disk($this->disk)->lastModified($path),
        ];
    }

    /**
     * New helper to get MIME type from file contents.
     */
    private function getMimeTypeFromContents(string $contents): string
    {
        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        return $finfo->buffer($contents);
    }

    private function formatDirectory($path)
    {
        return [
            'name' => basename($path),
            'path' => str_replace($this->baseDir . '/', '', $path),
            'type' => 'directory',
        ];
    }
    private function generateBreadcrumbs($folder)
    {
        $breadcrumbs = [];
        $pathParts = explode('/', trim($folder, '/'));
        $currentPath = '';

        $breadcrumbs[] = ['name' => 'Home', 'path' => '/'];

        foreach ($pathParts as $part) {
            if (empty($part)) continue;
            $currentPath .= '/' . $part;
            $breadcrumbs[] = ['name' => $part, 'path' => $currentPath];
        }

        return $breadcrumbs;
    }
}