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
    'disk' => 'public',

    /*
    |--------------------------------------------------------------------------
    | Base Directory
    |--------------------------------------------------------------------------
    |
    | The base directory within the chosen disk where all files and folders
    | for the media picker will be managed.
    |
    */
    'base_directory' => 'uploads',
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
    'max_upload_size_kb' => 2048,
];