<?php

namespace Msdev2\MediaPicker;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class MediaPickerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Load routes
        $this->loadRoutesFrom(__DIR__.'/routes/web.php');

        // Load views
        $this->loadViewsFrom(__DIR__.'/resources/views', 'media-picker');

        // Publish configuration
        $this->publishes([
            __DIR__.'/config/media-picker.php' => config_path('media-picker.php'),
        ], 'media-picker-config');

        // Publish assets
        $this->publishes([
            __DIR__.'/resources/assets' => public_path('vendor/media-picker'),
        ], 'media-picker-assets');

        // Register Blade component
        Blade::component('media-picker::components.media-picker', 'ms-media-picker');
        Blade::component('media-picker::components.media-editor', 'ms-media-editor');
    }

    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__.'/config/media-picker.php', 'media-picker'
        );
    }
}