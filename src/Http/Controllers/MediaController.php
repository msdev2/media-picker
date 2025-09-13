<?php

namespace Msdev2\MediaPicker\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use League\Glide\Server;

class MediaController extends Controller
{
    protected string $basePath = 'public/uploads';

    /**
     * Show the media picker UI
     */
    public function index(Request $request)
    {
        $folder = $request->get('folder', 'media');
        $path = "{$this->basePath}/{$folder}";

        // List all folders
        $folders = collect(Storage::directories($this->basePath))
            ->map(fn ($dir) => basename($dir))
            ->values();

        // List all files in current folder
        $files = collect(Storage::files($path))->map(function ($file) use ($folder) {
            return [
                'name' => basename($file),
                'url'  => Storage::url($file),
                'type' => str_starts_with(Storage::mimeType($file), 'image') ? 'image' : 'file',
            ];
        });

        return view('media-picker::media-picker.index', [
            'folders'       => $folders,
            'files'         => $files,
            'currentFolder' => $folder,
        ]);
    }

    /**
     * Handle file upload
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file'   => 'required|file|max:5120', // 5MB limit
            'folder' => 'required|string',
        ]);

        $folder = $request->input('folder', 'media');
        $path   = "{$this->basePath}/{$folder}";

        $file     = $request->file('file');
        $filename = time().'_'.$file->getClientOriginalName();

        Storage::putFileAs($path, $file, $filename);

        return response()->json([
            'success' => true,
            'url'     => Storage::url("{$path}/{$filename}"),
        ]);
    }

    /**
     * Create a new folder
     */
    public function createFolder(Request $request)
    {
        $request->validate([
            'folder' => 'required|string',
        ]);

        $folder = $request->input('folder');
        $path   = "{$this->basePath}/{$folder}";

        if (Storage::exists($path)) {
            return response()->json([
                'success' => false,
                'message' => 'Folder already exists',
            ], 422);
        }

        Storage::makeDirectory($path);

        return response()->json(['success' => true]);
    }

    /**
     * Delete a file
     */
    public function deleteFile(Request $request)
    {
        $request->validate([
            'file' => 'required|string',
        ]);

        $file = $request->input('file');

        if (Storage::exists($file)) {
            Storage::delete($file);
            return response()->json(['success' => true]);
        }

        return response()->json([
            'success' => false,
            'message' => 'File not found',
        ], 404);
    }

    /**
     * Serve an image with Glide (resize/crop)
     */
    public function getImage(Request $request, Server $server, $folder, $width, $height, $name)
    {
        $params = ['fit' => 'crop'];

        if ($width === 'w') {
            $params['w'] = $height;
        } elseif ($width === 'h') {
            $params['h'] = $height;
        } else {
            $params['w'] = $width;
            $params['h'] = $height;
        }

        $query = array_merge($params, $request->all());

        return $server->outputImage("{$folder}/{$name}", $query);
    }

    /**
     * Serve original file
     */
    public function getMainImage($folder, $name)
    {
        $filePath = storage_path("app/public/uploads/{$folder}/{$name}");

        if (!File::exists($filePath)) {
            abort(404, 'File not found');
        }

        $file = File::get($filePath);
        $type = File::mimeType($filePath);

        return response($file, 200)->header('Content-Type', $type);
    }
}
