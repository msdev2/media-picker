<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Media Picker</title>
    <link rel="stylesheet" href="{{ asset('vendor/media-picker/css/media-picker.css') }}">
</head>
<body>
    <div class="ms-media-picker-modal-backdrop">
        <div class="ms-media-picker-modal-content">
             <button class="ms-media-modal-close">&times;</button>
            @include('media-picker::media-picker.index')
        </div>
    </div>
    <script src="{{ asset('vendor/media-picker/js/media-picker.js') }}"></script>
</body>
</html>