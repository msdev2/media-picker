<?php

namespace Msdev2\MediaPicker;

use Illuminate\Support\ServiceProvider;

class MediaPickerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Load package routes
        $this->loadRoutesFrom(__DIR__.'/routes/web.php');

        // Load views
        $this->loadViewsFrom(__DIR__.'/resources/views', 'media-picker');

        // Publish assets
        $this->publishes([
            __DIR__.'/resources/views' => resource_path('views/vendor/media-picker'),
        ], 'media-picker-views');

        $this->publishes([
            __DIR__.'/config/media-picker.php' => config_path('media-picker.php'),
        ], 'media-picker-config');

        $this->publishes([
            __DIR__.'/resources/assets/css' => public_path('vendor/media-picker/css'),
            __DIR__.'/resources/assets/js'  => public_path('vendor/media-picker/js'),
        ], 'public');
    }

    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__.'/config/media-picker.php',
            'media-picker'
        );
    }
}
