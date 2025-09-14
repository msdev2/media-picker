# Laravel Media Picker

A simple, powerful, and modern file manager package for Laravel, inspired by the WordPress media library. This package provides a rich file management interface, a full-featured WYSIWYG editor, and seamless integration for any Laravel project.

### Features

*   **File & Folder Management:** Easily navigate, create folders, upload, rename, move, and delete files.
*   **Advanced Inline Picker:** A full-featured file manager block with a folder tree sidebar and an actions panel for selected files.
*   **Powerful Modal Picker:** Trigger a picker from any button to select files. Can be configured with simple data attributes or a global JavaScript event for advanced use cases.
*   **WYSIWYG Editor:** A rich text editor component with a full suite of formatting tools, including custom dialogs for links and media.
*   **Image Resizing:** On-the-fly image resizing and manipulation powered by The PHP League's Glide library.
*   **Configurable:** Control allowed file types and max upload sizes via a publishable config file.
*   **Modern Build:** Built with a clean, modular JavaScript and SCSS structure using Laravel Mix.

## Installation

This is a step-by-step guide to get the package fully operational in a new or existing Laravel project.

### Step 1: Require the Package via Composer

First, add the package to your project's dependencies.

```bash
composer require msdev2/media-picker
```

### Step 2: Publish Package Assets

This essential command will copy the package's configuration file to your `config` directory, and the compiled CSS and JavaScript to your `public/vendor` directory.

```bash
php artisan vendor:publish --provider="Msdev2\MediaPicker\MediaPickerServiceProvider"
```

### Step 3: Set up Image Resizing (Glide)

This package uses a custom, self-contained Glide implementation for image previews and resizing, which is configured in the package's service provider. **No separate Glide package or configuration is required in your main application.** This makes setup much simpler.

### Step 4: Create the Storage Symlink

To ensure that files uploaded to `storage/app/public` are publicly accessible, you must create the storage symlink.

```bash
php artisan storage:link
```
If you have already run this command for your project, you do not need to do it again.

## Configuration

After publishing in Step 2, you can edit the package's configuration file at `config/media-picker.php`.

```php
// config/media-picker.php
return [
    // The base directory within your 'public' disk where files will be stored.
    'base_directory' => 'uploads',

    // The maximum file size for a single upload in kilobytes (e.g., 2048 = 2MB).
    'max_upload_size_kb' => 2048,

    // A list of all MIME types that are allowed to be uploaded.
    // It is highly recommended to keep this list as specific as possible for security.
    'allowed_mime_types' => [
        'image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'application/pdf',
    ],
];
```

## Usage

### Step 1: Include Assets in Your Layout

Before using any components, you must include the package's assets and a CSRF token in your main Blade layout file.

```html
<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <!-- ... other head tags -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <!-- Load the Package's CSS -->
    <link rel="stylesheet" href="{{ asset('vendor/media-picker/css/media-picker.css') }}">
</head>
<body>
    
    @yield('content')

    <!-- Load the Package's JavaScript (before closing </body>) -->
    <script src="{{ asset('vendor/media-picker/js/media-picker.js') }}"></script>
</body>
</html>
```

### Use Case 1: Inline File Manager

To display the full file manager directly on a page, use the Blade component with the `:inline="true"` attribute.

```blade
<h3>My Media Library</h3>
<x-ms-media-picker :inline="true" />
```

### Use Case 2: Modal Picker Button

This is the most common use case. Trigger a modal picker from any button.

#### The Easy Way (with Data Attributes)

This is the recommended method for most situations. The package's JavaScript will automatically handle updating the target element. No custom JS is required.

Add the `ms-media-picker` class and two data attributes:
*   `data-target-selector`: A CSS selector for the element to update.
*   `data-target-type`: How to update the element (`input`, `image`, or `html`).

**Example: Update an Input Field's Value**
```blade
<label for="featured_image_url">Featured Image URL</label>
<input type="text" id="featured_image_url">
<button type="button" class="ms-media-picker"
        data-target-selector="#featured_image_url"
        data-target-type="input">
    Choose Image
</button>
```

**Example: Update an Image's `src`**
```blade
<img id="profile_preview" src="/placeholder.jpg" style="max-width: 150px;">
<button type="button" class="ms-media-picker"
        data-target-selector="#profile_preview"
        data-target-type="image">
    Change Picture
</button>
```

#### The Advanced Way (with a Custom JavaScript Event)

For custom logic, you can use a generic button and listen for the global `ms-media-file-selected` event.

**1. The HTML Button**
```blade
<button type="button" id="my-custom-button" class="ms-media-picker">
    Open Picker with Custom Logic
</button>
```

**2. The JavaScript Listener**
```javascript
document.addEventListener('ms-media-file-selected', (event) => {
    // The selected file object
    const file = event.detail.file;
    
    // The button element that triggered the modal
    const trigger = event.detail.triggerElement;

    console.log('File selected:', file);
    console.log('Modal was opened by:', trigger);

    // Your custom logic here...
    if (trigger.id === 'my-custom-button') {
        alert('You selected ' + file.name + ' using the custom button!');
    }
});
```
The `file` object contains `name`, `url` (the public URL), `path`, `size`, and `is_image`.

### Use Case 3: The WYSIWYG Editor

Use the `x-ms-media-editor` component for a full-featured rich text editor.

**Basic Usage:**
```blade
<form>
    <x-ms-media-editor name="post_content" />
</form>
```

**Advanced Usage with Default Content:**
```blade
@php
    $existingContent = '<h2>Hello World</h2><p>This is some default content.</p>';
@endphp

<form>
    <x-ms-media-editor name="post_content" height="500px" :value="$existingContent" />
</form>
```
The editor features a full toolbar, including custom dialogs for inserting/editing links and media. Double-clicking an image or video in the editor will open the edit dialog.

## Image Resizing (Glide)

The package includes routes for on-the-fly image resizing. You can get resized versions of any image by manipulating the URL structure.

*   **Base URL:** `http://your-app.com/storage/uploads/folder/image.jpg`
*   **Glide Resize URL:** `http://your-app.com/uploads/folder/300/200/image.jpg` (300px wide, 200px high crop)
*   **Auto Width:** `http://your-app.com/uploads/folder/w/200/image.jpg` (200px high, auto width)
*   **Auto Height:** `http://your-app.com/uploads/folder/300/h/image.jpg` (300px wide, auto height)

## Development & Customization (Optional)

This package uses Laravel Mix for asset compilation. If you wish to modify the JavaScript or SCSS source files, you must have Node.js and NPM installed.

1.  Navigate to the package's root directory: `cd vendor/msdev2/media-picker`
2.  Install NPM dependencies: `npm install`
3.  Run the development build: `npm run dev` or `npm run watch`
4.  Run the production build (minified): `npm run prod`

The source files are located in `src/resources/assets`, and the compiled output is placed in the `dist` folder.

## License

This package is open-source software licensed under the [MIT license](LICENSE).
