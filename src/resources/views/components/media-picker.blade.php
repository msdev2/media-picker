@props([
    'id' => 'ms-media-picker-' . uniqid(),
    'inline' => true,
])
@once
    @include('media-picker::_debug-script')
@endonce
{{-- This component simply includes the main picker UI --}}
@include('media-picker::media-picker.index', ['id'=>$id, 'inline' => $inline])
