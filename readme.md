# Laravel Media Picker

A simple, file-manager package for Laravel inspired by the WordPress media library. This package provides a straightforward way to manage files and folders, offering both an inline component and a modal-based picker for easy integration into any Laravel project.



### Features

*   **File & Folder Management:** Easily navigate, create folders, upload, and delete files.
*   **Dual Modes:** Use it as a full inline block (`<x-ms-media-picker />`) or trigger it as a modal from any button.
*   **Image Previews:** Generates thumbnails for common image formats.
*   **Easy Integration:** Designed to be plug-and-play with minimal setup.
*   **Customizable:** Configuration can be published and modified.
*   **Event-Driven:** Uses a clean JavaScript custom event for modal callbacks, keeping your code decoupled.

## Installation

**1. Require the package via Composer:**

```bash
composer require msdev2/media-picker
```

**2. Publish Configuration and Assets:**

This will copy the configuration file to `config/media-picker.php` and the necessary CSS/JS assets to `public/vendor/media-picker`.

```bash
php artisan vendor:publish --provider="Msdev2\MediaPicker\MediaPickerServiceProvider"
```
*(If you want to publish them separately, you can use the tags `media-picker-config` and `media-picker-assets`)*

**3. Create the Storage Symlink:**

To ensure that files in `storage/app/public` are publicly accessible, run the storage link command.

```bash
php artisan storage:link
```

## Configuration

After publishing, you can edit the `config/media-picker.php` file to change the storage disk and base directory for all uploads.

```php
// config/media-picker.php

return [
    // The disk defined in config/filesystems.php
    'disk' => 'public',

    // The base directory within the disk for all media files
    'base_directory' => 'uploads',
];
```

## Usage

### 1. Initial Setup

Before using the component, you must include the package's assets and a CSRF token meta tag in your main layout file's `<head>` section.

```html
<!-- resources/views/layouts/app.blade.php -->

<head>
    <!-- ... other head tags -->

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Media Picker Assets -->
    <link rel="stylesheet" href="{{ asset('vendor/media-picker/css/media-picker.css') }}">
    <script src="{{ asset('vendor/media-picker/js/media-picker.js') }}" defer></script>

    <!-- ... -->
</head>
```

### 2. Inline Mode

To display the media picker as a full component directly on a page, simply use the Blade component.

```html
<!-- In any Blade file -->

<div class="your-container">
    <h3>My Media Library</h3>
    <x-ms-media-picker />
</div>
```

This will render the entire file manager interface inside the `your-container` div.

### 3. Modal (Popup) Mode

The modal mode allows you to trigger the media picker from any element (like a button) and receive the selected file's information via a JavaScript callback.

#### Step 1: Add the Trigger Button

Add the class `ms-media-picker` to any button or link. The package's JavaScript automatically detects this class and will open the modal on click.

**Example:** Let's say you have a form to select a featured image.

```html
<div class="form-group">
    <label for="featured_image">Featured Image URL</label>
    <input type="text" id="featured_image_url" name="featured_image" class="form-control" readonly>
    
    <!-- This is the trigger button -->
    <button type="button" class="ms-media-picker btn btn-primary mt-2">Choose Image</button>

    <!-- Optional: An element to show a preview -->
    <div class="mt-2">
        <img src="" id="image_preview" style="max-width: 200px; display: none;">
    </div>
</div>
```

#### Step 2: Handle the Callback with a JavaScript Event Listener

When a file is selected in the modal, the package dispatches a custom JavaScript event named **`ms-media-file-selected`** on the `document` object.

The event's `detail` property contains an object with the selected file's information: `{ name, path, url }`.

You can listen for this event to get the data and update your form, show a preview, or perform any other action.

Add the following JavaScript to your page.

```html
<!-- Add this script block at the end of your Blade file or in your main app.js -->
<script>
    document.addEventListener('ms-media-file-selected', (event) => {
        // The selected file's data is in event.detail
        const selectedFile = event.detail;

        console.log('File selected:', selectedFile);
        // Output: { name: "my-image.jpg", path: "uploads/media/my-image.jpg", url: "http://..." }

        // --- Example: Populate the input field and show a preview ---

        // Get the elements
        const imageUrlInput = document.getElementById('featured_image_url');
        const imagePreview = document.getElementById('image_preview');

        if (imageUrlInput) {
            // Set the value of the input to the file's URL
            imageUrlInput.value = selectedFile.url;
        }

        if (imagePreview) {
            // Set the src of the image tag to show a preview
            imagePreview.src = selectedFile.url;
            imagePreview.style.display = 'block'; // Make it visible
        }
    });
</script>
```

This event-based approach ensures your application logic is cleanly separated from the media picker package.

## Displaying Resized Images (Glide)

The user who requested this package included routes for [Glide](https://glide.thephpleague.com/), a powerful image manipulation library. While Glide is not a dependency of this package itself, if you have it installed and configured with the provided routes, you can easily generate thumbnails by manipulating the image URL.

Given a selected file path like `uploads/media/my-image.jpg`, you can create resized versions on the fly:

*   **200x200 crop:** `http://your-app.com/uploads/media/200/200/my-image.jpg`
*   **300px width (auto height):** `http://your-app.com/uploads/media/w/300/my-image.jpg`

## License

This package is open-source software licensed under the [MIT license](LICENSE).