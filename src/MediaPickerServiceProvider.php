<?php

namespace Msdev2\MediaPicker;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use League\Glide\ServerFactory;

class MediaPickerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadRoutesFrom(__DIR__.'/routes/web.php');
        $this->loadViewsFrom(__DIR__.'/resources/views', 'media-picker');

        $this->publishes([
            __DIR__.'/config/media-picker.php' => config_path('media-picker.php'),
        ], 'media-picker-config');

        $this->publishes([
            __DIR__.'/../dist' => public_path('vendor/media-picker'),
        ], 'media-picker-assets');

        Blade::component('media-picker::components.media-picker', 'ms-media-picker');
        Blade::component('media-picker::components.media-editor', 'ms-media-editor');
    }

    public function register()
    {
        $this->app->singleton('League\Glide\Server', function ($app) {
            // $filesystem = $app->make('Illuminate\Contracts\Filesystem\Filesystem');
            $filesystem = $app->make('filesystem')->disk('public');
            return ServerFactory::create([
                'source' => $filesystem->getDriver(),
                'cache' => $filesystem->getDriver(),
                'watermarks' => $filesystem->getDriver(),
                'source_path_prefix' => config('media-picker.base_directory', 'uploads'),
                'cache_path_prefix' => config('media-picker.base_directory', 'uploads').'/.cache',
                'watermarks_path_prefix' => config('media-picker.base_directory', 'uploads'),
                // 'base_url' => config('app.url'),
            ]);
        });
        // This merges the package's default config with the user's published version
        $this->mergeConfigFrom(
            __DIR__.'/config/media-picker.php', 'media-picker'
        );
    }
}