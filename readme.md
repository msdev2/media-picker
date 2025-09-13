# 📦 Media Picker for Laravel

A lightweight Laravel package to manage and pick media files (like WordPress Media Library).  
Supports Laravel **8, 9, 10, 11**.  
Built without jQuery or Bootstrap — uses scoped CSS and vanilla JavaScript only.

---

## ⚙️ Installation

Require the package in your Laravel project:

```bash
composer require msdev2/media-picker
```

---

## 📌 Register Service Provider

If you’re on Laravel 8 or below (without auto-discovery), add this in `config/app.php`:

```php
'providers' => [
    Msdev2\MediaPicker\MediaPickerServiceProvider::class,
],
```

---

## 🔧 Publish Assets

Run the following to publish config, views, and assets:

```bash
# Config
php artisan vendor:publish --provider="Msdev2\MediaPicker\MediaPickerServiceProvider" --tag=media-picker-config

# Views
php artisan vendor:publish --provider="Msdev2\MediaPicker\MediaPickerServiceProvider" --tag=media-picker-views

# Public Assets (CSS + JS)
php artisan vendor:publish --provider="Msdev2\MediaPicker\MediaPickerServiceProvider" --tag=public
```

After publishing, assets will be available in:

```
public/vendor/media-picker/css/media-picker.css
public/vendor/media-picker/js/media-picker.js
```

---

## 📂 Folder Structure After Install

```
storage/app/public/uploads/    # Your media files
public/vendor/media-picker/    # Published CSS + JS
resources/views/vendor/media-picker/  # Published views (if overridden)
config/media-picker.php        # Published config
```

---

## 🖥️ Usage

Include the CSS + JS in your layout file (e.g. `resources/views/layouts/app.blade.php`):

```blade
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>My App</title>

    {{-- Media Picker CSS --}}
    <link rel="stylesheet" href="{{ asset('vendor/media-picker/css/media-picker.css') }}">
</head>
<body>
    <div class="app">
        @yield('content')
    </div>

    {{-- Media Picker JS --}}
    <script src="{{ asset('vendor/media-picker/js/media-picker.js') }}"></script>
</body>
</html>
```

---

## 📷 Media Picker View

To display the picker, create a route in your app that loads the view:

```php
Route::get('/media', function () {
    return view('media-picker::media-picker.index');
});
```

Or simply visit the included package route:

```
/media-picker
```

---

## 🚀 Features

- Upload files into `/storage/app/public/uploads`
- Create new folders
- Delete files
- Resize/crop images using **Glide**
- Scoped CSS (`.media-picker`) → no conflicts with your app
- Vanilla JS (no jQuery, no Bootstrap)

---

## 📜 License

MIT © 2025 Msdev2
