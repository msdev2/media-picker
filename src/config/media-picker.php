<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Base Storage Disk
    |--------------------------------------------------------------------------
    |
    | The disk on which to store and retrieve files. This corresponds to a disk
    | defined in your `config/filesystems.php` file.
    |
    */
    'disk' =>  env('MEDIA_PICKER_DISK','public'),
    'debug' => env('MEDIA_PICKER_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | Base Directory
    |--------------------------------------------------------------------------
    |
    | The base directory within the chosen disk where all files and folders
    | for the media picker will be managed.
    |
    */
    'base_directory' => env('MEDIA_PICKER_BASE_DIRECTORY','uploads'),
     /*
    |--------------------------------------------------------------------------
    | Allowed MIME Types
    |--------------------------------------------------------------------------
    |
    | A list of all MIME types that are allowed to be uploaded.
    | Leave empty to allow all file types. Be careful, as this can be a
    | security risk. It's recommended to be as specific as possible.
    |
    | Example: ['image/jpeg', 'image/png', 'application/pdf']
    |
    */
    'allowed_mime_types' => [
        // Images
        'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',

        // Documents
        'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 

        // Videos
        'video/mp4', 'video/webm', 'video/ogg',

        // Audio
        'audio/mpeg','audio/ogg',
    ],
     /*
    |--------------------------------------------------------------------------
    | Max Upload Size (in Kilobytes)
    |--------------------------------------------------------------------------
    |
    | The maximum file size for a single upload. Laravel's 'max' validation
    | rule uses kilobytes. Default is 2048 (2MB). Set to 0 for no limit.
    |
    */
    'max_upload_size_kb' => env('MEDIA_PICKER_MAX_UPLOAD_SIZE_KB',2048),
];