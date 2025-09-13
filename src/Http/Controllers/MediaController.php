<?php

namespace Msdev2\MediaPicker\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    private $disk;
    private $baseDir;

    public function __construct()
    {
        $this->disk = config('media-picker.disk', 'public');
        $this->baseDir = config('media-picker.base_directory', 'uploads');
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

        $directories = Storage::disk($this->disk)->directories($path);
        $files = Storage::disk($this->disk)->files($path);

        $contents = [
            'directories' => array_map([$this, 'formatDirectory'], $directories),
            'files' => array_map([$this, 'formatFile'], $files),
            'breadcrumbs' => $this->generateBreadcrumbs($folder),
        ];

        return response()->json($contents);
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
        $validator = Validator::make($request->all(), [
            'file' => 'required|file',
            'current_path' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()->first()], 422);
        }
        
        $file = $request->file('file');
        $path = $this->cleanPath($this->baseDir . '/' . $request->current_path);

        $file->store($path, ['disk' => $this->disk]);

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
        // THIS IS THE KEY CHANGE:
        // We get the file contents to determine if it's an image.
        // This can be slightly less performant for very large files,
        // but it is completely driver-agnostic.
        $contents = Storage::disk($this->disk)->get($path);
        $mime = $this->getMimeTypeFromContents($contents);
        $isImage = Str::startsWith($mime, 'image/');
        
        $url = route('media-picker.renderFile', ['path' => base64_encode($path)]);

        return [
            'name' => basename($path),
            'path' => $path,
            'url' => $url,
            'type' => 'file',
            'is_image' => $isImage,
            'size' => strlen($contents), // Get size from contents
            'last_modified' => Storage::disk($this->disk)->lastModified($path), // This method is usually safe
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