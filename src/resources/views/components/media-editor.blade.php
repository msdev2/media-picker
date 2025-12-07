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

<div {{ $attributes->merge(['class' => 'ms-media-editor-container']) }} style="width: {{ $width }};" x-data>
    <div class="ms-editor-toolbar">
        {{-- Block format dropdown --}}
        <div class="ms-editor-tool-group">
            <select class="ms-editor-tool ms-editor-dropdown" data-command="formatBlock" aria-label="Format Block">
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="blockquote">Quote</option>
            </select>
        </div>

        {{-- Font controls --}}
        <div class="ms-editor-tool-group">
            <select class="ms-editor-tool ms-editor-dropdown" data-command="fontName" aria-label="Font Family">
                <option value="Arial, sans-serif">Arial</option>
                <option value="Verdana, sans-serif">Verdana</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Times New Roman, serif">Times New Roman</option>
                <option value="Courier New, monospace">Courier New</option>
            </select>
             <select class="ms-editor-tool ms-editor-dropdown" data-command="fontSize" aria-label="Font Size">
                <option value="3">Normal</option>
                <option value="1">Smallest</option>
                <option value="2">Small</option>
                <option value="4">Large</option>
                <option value="5">Larger</option>
                <option value="6">Huge</option>
            </select>
        </div>

        {{-- Text formats --}}
        <div class="ms-editor-tool-group">
            <button type="button" class="ms-editor-tool" data-command="bold" title="Bold" aria-label="Bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
            </button>
            <button type="button" class="ms-editor-tool" data-command="italic" title="Italic" aria-label="Italic">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
            </button>
            <button type="button" class="ms-editor-tool" data-command="underline" title="Underline" aria-label="Underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg>
            </button>
            <button type="button" class="ms-editor-tool" data-command="strikethrough" title="Strikethrough" aria-label="Strikethrough">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6"></path><line x1="4" y1="12" x2="20" y2="12"></line></svg>
            </button>
        </div>

        {{-- Color --}}
        <div class="ms-editor-tool-group">
            <div class="ms-editor-tool-wrapper">
                <button type="button" class="ms-editor-tool" title="Font Color" aria-label="Font Color">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                </button>
                <input type="color" id="ms-editor-fore-color-{{$name}}" data-command="foreColor" class="ms-editor-color-input">
            </div>
            <div class="ms-editor-tool-wrapper">
                <button type="button" class="ms-editor-tool" title="Background Color" aria-label="Background Color">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-highlighter"><path d="M12.5 2.5l5.5 5.5-5.5 5.5-5.5-5.5L12.5 2.5z"/><path d="M12.5 13.5L20 21h-15l7.5-7.5z"/></svg>
                </button>
                <input type="color" id="ms-editor-back-color-{{$name}}" data-command="hiliteColor" class="ms-editor-color-input">
            </div>
        </div>
        
        {{-- Alignment --}}
        <div class="ms-editor-tool-group">
            <button type="button" class="ms-editor-tool" data-command="justifyLeft" title="Align Left" aria-label="Align Left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(24,0) scale(-1,1)"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></g></svg>
            </button>
            <button type="button" class="ms-editor-tool" data-command="justifyFull" title="Align Justify" aria-label="Align Justify">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
            </button>
            <button type="button" class="ms-editor-tool" data-command="justifyCenter" title="Align Center" aria-label="Align Center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
            </button>
            <button type="button" class="ms-editor-tool" data-command="justifyRight" title="Align Right" aria-label="Align Right">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
            </button>
        </div>

        {{-- Lists --}}
        <div class="ms-editor-tool-group">
            <button type="button" class="ms-editor-tool" data-command="insertUnorderedList" title="Unordered List" aria-label="Unordered List">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
            <button type="button" class="ms-editor-tool" data-command="insertOrderedList" title="Ordered List" aria-label="Ordered List">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>
            </button>
        </div>

        {{-- Media and links --}}
        <div class="ms-editor-tool-group">
            <button type="button" class="ms-editor-tool ms-add-media-btn" data-media-type="image" title="Insert Image" aria-label="Insert Image">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </button>
            <button type="button" class="ms-editor-tool ms-add-media-btn" data-media-type="video" title="Insert Video" aria-label="Insert Video">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
            </button>
            <button type="button" class="ms-editor-tool" data-command="createLink" title="Insert Link" aria-label="Insert Link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
            </button>
            <button type="button" class="ms-editor-tool" data-command="insertHorizontalRule" title="Insert Horizontal Rule" aria-label="Insert Horizontal Rule">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line></svg>
            </button>
        </div>

        {{-- Code View --}}
        <div class="ms-editor-tool-group" style="margin-left: auto;">
             <button type="button" class="ms-editor-tool ms-code-view-btn" title="Code View" aria-label="Code View">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </button>
        </div>
    </div>

    {{-- The content area wrapper --}}
    <div class="ms-editor-content-wrapper" {!! 'style="height: '.$height.'";' !!}>
        <div class="ms-editor-content" contenteditable="true">{!! $initialContent !!}</div>
        <textarea class="ms-editor-code" style="display: none;">{!! $initialContent !!}</textarea>
    </div>
    
    {{-- Hidden textarea for form submission (Livewire model) --}}
    <textarea name="{{ $name }}" class="ms-editor-form-input" @if (!config('media-picker.debug')) style="display:none" @endif {{ $attributes }} {{ $attributes->wire('model') }}>{!! $initialContent !!}</textarea>
</div>

<!-- NOTE: For best Livewire compatibility, this modal should be placed OUTSIDE the component,
     e.g., in your main app layout file, to prevent it from being morphed. -->
<div class="ms-media-edit-modal-backdrop" style="display: none;">
    <div class="ms-media-edit-modal-content">
        <div class="ms-media-edit-modal-header">
            <h4 id="ms-media-edit-title">Insert Media</h4>
            <button type="button" class="ms-media-edit-modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="ms-media-edit-modal-body">
            <div class="ms-media-edit-preview">
                <img id="ms-media-edit-preview-img" src="" alt="Preview">
                <video id="ms-media-edit-preview-video" src="" controls></video>
            </div>
            <div class="ms-media-edit-fields">
                <div class="ms-media-edit-group">
                    <label for="ms-media-edit-alt">Alt Text</label>
                    <input type="text" id="ms-media-edit-alt" placeholder="Descriptive text for accessibility">
                </div>
                <div class="ms-media-edit-group">
                    <label>Dimensions (px)</label>
                    <div class="ms-media-edit-dims">
                        <input type="number" id="ms-media-edit-width" placeholder="Width">
                        <span>&times;</span>
                        <input type="number" id="ms-media-edit-height" placeholder="Height">
                    </div>
                </div>
                <div class="ms-media-edit-group">
                    <label for="ms-media-edit-align">Alignment</label>
                    <select id="ms-media-edit-align">
                        <option value="">Default</option>
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
                <div class="ms-media-edit-group">
                    <label for="ms-media-edit-class">CSS Class(es)</label>
                    <input type="text" id="ms-media-edit-class" placeholder="e.g. rounded shadow-lg">
                </div>
                <div class="ms-media-edit-group">
                    <label for="ms-media-edit-id">CSS ID</label>
                    <input type="text" id="ms-media-edit-id" placeholder="e.g. main-post-image">
                </div>
            </div>
        </div>
        <div class="ms-media-edit-modal-footer">
            <button type="button" class="ms-media-btn" id="ms-media-edit-cancel-btn">Cancel</button>
            <button type="button" class="ms-media-btn ms-media-btn-primary" id="ms-media-edit-insert-btn">Insert</button>
        </div>
    </div>
</div>