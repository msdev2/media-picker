{{--
This script safely creates a global JS variable with the debug status.
It's included via the @once directive to ensure it only runs one time per page render.
--}}
<script>
    window.mediaPickerDebug = {{ config('media-picker.debug', false) ? 'true' : 'false' }};
    if (window.mediaPickerDebug) {
        console.log(
            '%c[MediaPicker] Debug Mode Enabled',
            'color: #007bff; font-weight: bold; font-size: 12px; padding: 4px;'
        );
    }
</script>