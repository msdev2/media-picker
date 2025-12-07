{{-- Generate the accept string from the config --}}
@php
    $allowedMimes = config('media-picker.allowed_mime_types', []);
    $acceptString = implode(',', $allowedMimes);
@endphp
<div class="ms-media-picker-container" id="{{ $id ?? 'ms-media-picker-instance' }}" data-is-inline="{{ $inline ? 'true' : 'false' }}">
    <div class="ms-media-header">
        <nav class="ms-media-breadcrumbs"></nav>
        <div class="ms-media-actions">
            <button type="button" class="ms-media-btn ms-create-folder-btn">New Folder</button>
            <label class="ms-media-btn ms-media-btn-primary">
                Upload File
                <input type="file" class="ms-upload-file-input" style="display: none;" accept="{{ $acceptString }}">
            </label>
            <div class="ms-media-search">
                <input type="search" class="ms-media-search-input" placeholder="Search files, folders, date (YYYY-MM-DD)">
            </div>
        </div>
    </div>

    <div class="ms-media-body-wrapper">
        <!-- NEW: Folder Tree Sidebar -->
        <div class="ms-media-sidebar">
            <div class="sidebar-header">Folders</div>
            <div class="ms-media-folder-tree">
                <!-- Folder tree will be rendered here by JS -->
            </div>
        </div>

        <div class="ms-media-body"></div>

        @if ($inline)
            <div class="ms-media-actions-panel" style="display: none;">
                <div class="actions-panel-header">
                    <h4 class="actions-panel-title">File Details</h4>
                    <button type="button" class="actions-panel-close">&times;</button>
                </div>
                <div class="actions-panel-preview"></div>
                <div class="actions-panel-details">
                    <strong class="file-name"></strong>
                    <span class="file-size"></span>
                    <span class="file-modified"></span>
                </div>
                <div class="actions-panel-tools">
                    <label>Public URL:</label>
                    <div class="url-group">
                        <input type="text" class="file-url-input" readonly>
                        <button type="button" class="ms-media-btn copy-url-btn">Copy</button>
                    </div>
                    <div class="resize-group">
                        <button type="button" class="ms-media-btn get-resized-url-btn">Get Resized URL</button>
                    </div>
                </div>
                <div class="actions-panel-buttons">
                    <button type="button" class="ms-media-btn rename-btn">Rename</button>
                    <button type="button" class="ms-media-btn move-btn">Move</button>
                    <button type="button" class="ms-media-btn-danger delete-btn">Delete</button>
                </div>
            </div>
        @endif
    </div>

    <div class="ms-media-footer">
        <div class="ms-media-selection-info"></div>
        {{-- Conditionally show the "Select File" button --}}
        @if (!$inline)
            <button type="button" class="ms-media-btn ms-media-btn-primary ms-select-file-btn" disabled>Select File</button>
        @endif
    </div>

    <div class="ms-media-loader" style="display: none;">
        <div class="spinner"></div>
    </div>
</div>