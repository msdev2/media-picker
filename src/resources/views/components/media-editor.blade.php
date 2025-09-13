@props([
    'name' => 'editor-content',
    'height' => '350px',
    'width' => '100%',
    'value' => ''
])

<div class="ms-media-editor-container" style="width: {{ $width }};">
    <div class="ms-editor-toolbar">
        <button type="button" class="ms-editor-tool" data-command="bold" title="Bold"><b>B</b></button>
        <button type="button" class="ms-editor-tool" data-command="italic" title="Italic"><i>I</i></button>
        <button type="button" class="ms-editor-tool" data-command="underline" title="Underline"><u>U</u></button>
        <button type="button" class="ms-editor-tool" data-command="insertUnorderedList" title="Unordered List">&#8226;</button>
        <button type="button" class="ms-editor-tool" data-command="insertOrderedList" title="Ordered List">1.</button>
        <button type="button" class="ms-editor-tool" data-command="createLink" title="Insert Link">&#128279;</button>
        <button type="button" class="ms-editor-tool" data-command="add-media" title="Add Media">&#128444;&#xFE0E;</button>
    </div>
    <div class="ms-editor-content" contenteditable="true" style="height: {{ $height }};">
        {!! $value !!}
    </div>
    <textarea name="{{ $name }}" style="display: none;"></textarea>
</div>