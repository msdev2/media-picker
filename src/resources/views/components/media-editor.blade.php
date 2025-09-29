@props([
    'name' => 'editor-content',
    'height' => '350px',
    'width' => '100%',
    'value' => ''
])
@php
    $initialContent = $slot->isNotEmpty() ? $slot : $value;
@endphp
@once
    @include('media-picker::_debug-script')
@endonce

<div {{ $attributes->merge(['class' => 'ms-media-editor-container']) }} style="width: {{ $width }};">
    <div class="ms-editor-toolbar">
        {{-- Block format dropdown --}}
        <select class="ms-editor-tool ms-editor-dropdown" data-command="formatBlock">
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
            <option value="blockquote">Quote</option>
        </select>

        <select class="ms-editor-tool ms-editor-dropdown" data-command="fontName">
            <option value="Arial, sans-serif">Arial</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Courier New, monospace">Courier New</option>
        </select>

        <select class="ms-editor-tool ms-editor-dropdown" data-command="fontSize">
            <option value="3">Normal (12pt)</option>
            <option value="1">Smallest (8pt)</option>
            <option value="2">Small (10pt)</option>
            <option value="4">Large (14pt)</option>
            <option value="5">Larger (18pt)</option>
            <option value="6">Huge (24pt)</option>
            <option value="7">Largest (36pt)</option>
        </select>
        
        {{-- Row 2: Text formats, colors, alignment, lists, etc. --}}
        <button type="button" class="ms-editor-tool" data-command="bold" title="Bold"><b>B</b></button>
        <button type="button" class="ms-editor-tool" data-command="italic" title="Italic"><i>I</i></button>
        <button type="button" class="ms-editor-tool" data-command="underline" title="Underline"><u>U</u></button>
        <button type="button" class="ms-editor-tool" data-command="strikethrough" title="Strikethrough"><s>S</s></button>

        <span class="ms-editor-separator"></span>

        <div class="ms-editor-tool-wrapper">
            <label for="ms-editor-fore-color-{{$name}}" class="ms-editor-tool" title="Font Color">A</label>
            <input type="color" id="ms-editor-fore-color-{{$name}}" data-command="foreColor" style="visibility: hidden; width: 0; height: 0;">
        </div>
        <div class="ms-editor-tool-wrapper">
             <label for="ms-editor-back-color-{{$name}}" class="ms-editor-tool" title="Background Color">&#128394;</label>
            <input type="color" id="ms-editor-back-color-{{$name}}" data-command="hiliteColor" style="visibility: hidden; width: 0; height: 0;">
        </div>

        <span class="ms-editor-separator"></span>

        <button type="button" class="ms-editor-tool" data-command="justifyLeft" title="Align Left">&#8592;</button>
        <button type="button" class="ms-editor-tool" data-command="justifyCenter" title="Align Center">&#8596;</button>
        <button type="button" class="ms-editor-tool" data-command="justifyRight" title="Align Right">&#8594;</button>
        <button type="button" class="ms-editor-tool" data-command="justifyFull" title="Justify">&#8645;</button>

        <span class="ms-editor-separator"></span>

        <button type="button" class="ms-editor-tool" data-command="insertUnorderedList" title="Unordered List">&#8226;</button>
        <button type="button" class="ms-editor-tool" data-command="insertOrderedList" title="Ordered List">1.</button>
        <button type="button" class="ms-editor-tool" data-command="outdent" title="Outdent">&lt;</button>
        <button type="button" class="ms-editor-tool" data-command="indent" title="Indent">&gt;</button>

        <span class="ms-editor-separator"></span>

        <button type="button" class="ms-editor-tool ms-add-media-btn" data-media-type="image" title="Insert Image">&#128444;&#xFE0E;</button>
        <button type="button" class="ms-editor-tool ms-add-media-btn" data-media-type="video" title="Insert Video">&#127909;</button>
        <button type="button" class="ms-editor-tool" data-command="createLink" title="Insert Link">&#128279;</button>
        <button type="button" class="ms-editor-tool" data-command="insertHorizontalRule" title="Insert Horizontal Rule">&#8213;</button>
        
        <button type="button" class="ms-editor-tool ms-code-view-btn" title="Code View" style="margin-left: auto;">&lt;/&gt;</button>
    </div>

    {{-- The content area is now a wrapper --}}
    <div class="ms-editor-content-wrapper" {!! 'style="height: '.$height.'";' !!}>
        <div class="ms-editor-content" contenteditable="true">{!! $initialContent !!}</div>
        <textarea class="ms-editor-code" style="display: none;">{!! $initialContent !!}</textarea>
    </div>
    
    {{-- Hidden textarea for form submission --}}
    <textarea name="{{ $name }}" class="ms-editor-form-input" style="display:none" {{ $attributes }}   {{ $attributes->wire('model') }}>{!! $initialContent !!}</textarea>
</div>
<!-- NEW: Insert/Edit Media Modal -->
<div class="ms-media-edit-modal-backdrop" style="display: none;">
    <div class="ms-media-edit-modal-content">
        <div class="ms-media-edit-modal-header">
            <h4 id="ms-media-edit-title">Insert Media</h4>
            <button type="button" class="ms-media-edit-modal-close">&times;</button>
        </div>
        <div class="ms-media-edit-modal-body">
            <div class="ms-media-edit-preview">
                <img id="ms-media-edit-preview-img" src="" alt="Preview">
                <video id="ms-media-edit-preview-video" src=""></video>
            </div>
            <div class="ms-media-edit-fields">
                <div class="ms-media-edit-group">
                    <label for="ms-media-edit-alt">Alt Text</label>
                    <input type="text" id="ms-media-edit-alt">
                </div>
                <div class="ms-media-edit-group">
                    <label>Dimensions</label>
                    <div class="ms-media-edit-dims">
                        <input type="text" id="ms-media-edit-width" placeholder="Width">
                        <span>&times;</span>
                        <input type="text" id="ms-media-edit-height" placeholder="Height">
                    </div>
                </div>
                <div class="ms-media-edit-group">
                    <label for="ms-media-edit-align">Alignment</label>
                    <select id="ms-media-edit-align">
                        <option value="">None</option>
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
                <div class="ms-media-edit-group">
                    <label for="ms-media-edit-class">CSS Class</label>
                    <input type="text" id="ms-media-edit-class">
                </div>
                <div class="ms-media-edit-group">
                    <label for="ms-media-edit-id">CSS ID</label>
                    <input type="text" id="ms-media-edit-id">
                </div>
            </div>
        </div>
        <div class="ms-media-edit-modal-footer">
            <button type="button" class="ms-media-btn" id="ms-media-edit-cancel-btn">Cancel</button>
            <button type="button" class="ms-media-btn ms-media-btn-primary" id="ms-media-edit-insert-btn">Insert</button>
        </div>
    </div>
</div>