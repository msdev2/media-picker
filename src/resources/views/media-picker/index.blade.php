<div class="ms-media-picker-container" id="ms-media-picker-instance">
    <!-- Header: Breadcrumbs and Actions -->
    <div class="ms-media-header">
        <nav class="ms-media-breadcrumbs">
            <!-- Breadcrumbs will be rendered here by JavaScript -->
        </nav>
        <div class="ms-media-actions">
            <button class="ms-media-btn" id="ms-create-folder-btn">New Folder</button>
            <label class="ms-media-btn ms-media-btn-primary">
                Upload File
                <input type="file" id="ms-upload-file-input" style="display: none;">
            </label>
        </div>
    </div>

    <!-- Body: File and Folder Grid -->
    <div class="ms-media-body">
        <!-- Items will be rendered here by JavaScript -->
    </div>

    <!-- Footer: Selection Info and Action -->
    <div class="ms-media-footer">
        <div class="ms-media-selection-info">
            <!-- Selection info will be updated here -->
        </div>
        <button class="ms-media-btn ms-media-btn-primary" id="ms-select-file-btn" disabled>Select File</button>
    </div>

    <!-- Loading Spinner -->
    <div class="ms-media-loader" style="display: none;">
        <div class="spinner"></div>
    </div>
</div>