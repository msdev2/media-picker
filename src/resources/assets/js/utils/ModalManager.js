import MediaPicker from '../components/MediaPicker.js';

const ModalManager = {
    modalEl: null,
    pickerInstance: null,
    currentCallback: null,

    getPickerHTML(acceptString) {
        return `
            <div class="ms-media-picker-container" data-is-inline="false">
                <div class="ms-media-header">
                    <nav class="ms-media-breadcrumbs"></nav>
                    <div class="ms-media-actions">
                        <div class="ms-media-filters">
                            <button type="button" class="ms-media-filter-btn active" data-filter="all">All</button>
                            <button type="button" class="ms-media-filter-btn" data-filter="image">Images</button>
                            <button type="button" class="ms-media-filter-btn" data-filter="video">Videos</button>
                        </div>
                        <div class="ms-media-search">
                            <input type="search" class="ms-media-search-input" placeholder="Search files, folders, date (YYYY-MM-DD)">
                        </div>
                        <button type="button" class="ms-media-btn ms-create-folder-btn">New Folder</button>
                        <label class="ms-media-btn ms-media-btn-primary">
                            Upload File <input type="file" class="ms-upload-file-input" style="display: none;" accept="${acceptString}">
                        </label>
                    </div>
                </div>
                <div class="ms-media-body-wrapper">
                    <div class="ms-media-sidebar">
                        <div class="sidebar-header">Folders</div>
                        <div class="ms-media-folder-tree"></div>
                    </div>
                    <div class="ms-media-body"></div>
                </div>
                <div class="ms-media-footer">
                    <div class="ms-media-selection-info"></div>
                    <button type="button" class="ms-media-btn ms-media-btn-primary ms-select-file-btn" disabled>Select File</button>
                </div>
                <div class="ms-media-loader" style="display: none;"><div class="spinner"></div></div>
            </div>
        `;
    },
    
    open(onSelectCallback, acceptString = '', triggerEl = null) {
        if (!this.modalEl) this.init();
        this.currentCallback = onSelectCallback;
        this.triggerElement = triggerEl; // NEW: Store the trigger element

        const placeholder = this.modalEl.querySelector('#ms-modal-picker-placeholder');
        placeholder.innerHTML = this.getPickerHTML(acceptString);
        
        // This is the callback we will give to the MediaPicker instance.
        const pickerCallback = (file) => {
            // CRITICAL FIX: ALWAYS dispatch the global event first.
            // We include the file data AND the original trigger element.
            const event = new CustomEvent('ms-media-file-selected', { 
                detail: {
                    file: file,
                    triggerElement: this.triggerElement 
                }
            });
            document.dispatchEvent(event);

            // THEN, check if a specific callback was also provided and execute it.
            if (this.currentCallback) {
                this.currentCallback(file);
            }
            
            this.close();
        };

        this.pickerInstance = new MediaPicker(placeholder.firstElementChild, {
            isInline: false,
            onSelect: pickerCallback // Pass our new, smart callback
        });

        this.modalEl.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    close() {
        if (this.modalEl) this.modalEl.style.display = 'none';
        this.currentCallback = null;
        this.triggerElement = null; // NEW: Clear the trigger element
        document.body.style.overflow = '';
        this.modalEl.querySelector('#ms-modal-picker-placeholder').innerHTML = '';
        this.pickerInstance = null;
    },


    init() {
        const modalHTML = `<div class="ms-media-picker-modal-content"><button class="ms-media-modal-close">&times;</button><div id="ms-modal-picker-placeholder"></div></div>`;
        this.modalEl = document.createElement('div');
        this.modalEl.className = 'ms-media-picker-modal-backdrop';
        this.modalEl.style.display = 'none';
        this.modalEl.innerHTML = modalHTML;
        document.body.appendChild(this.modalEl);

        this.modalEl.querySelector('.ms-media-modal-close').onclick = () => this.close();
        this.modalEl.addEventListener('click', (e) => { if(e.target === this.modalEl) this.close(); });
    }
};
export default ModalManager;