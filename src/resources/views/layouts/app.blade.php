<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'Media Picker')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @stack('styles')
</head>
<body>
    <header>
        <h1>Laravel Media Picker</h1>
    </header>

    <main>
        <div class="container">
            <div id="media-picker-app">
            @yield('content')
            </div>
        </div>
    </main>

    @stack('scripts')
</body>
</html>
