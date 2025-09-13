document.addEventListener('DOMContentLoaded', function() {

    // --- GLOBAL STATE ---
    
    // The main DOM element for the media picker UI.
    const pickerInstance = document.getElementById('ms-media-picker-instance');

    // State for the media picker's current view and selection.
    let currentState = {
        currentPath: '/',
        selectedFile: null,
        onFinishCallback: null, // Holds a specific function to call when selection is done (used by the editor)
    };

    // State for the WYSIWYG editor functionality.
    let activeEditor = null; // Holds the specific editor instance that opened the modal.
    let savedSelection = null; // Stores the user's cursor position/selection within the editor.

    // --- INITIALIZATION ---

    // Initialize all functionalities if their corresponding elements exist on the page.
    if (pickerInstance) {
        initializePicker(pickerInstance);
    }
    initializeModalTriggers();
    initializeEditors();

    // --- CORE MEDIA PICKER LOGIC ---

    /**
     * Sets up all event listeners for the main media picker interface.
     * @param {HTMLElement} container The media picker's main container element.
     */
    function initializePicker(container) {
        const body = container.querySelector('.ms-media-body');
        const breadcrumbs = container.querySelector('.ms-media-breadcrumbs');
        const selectBtn = container.querySelector('#ms-select-file-btn');
        const uploadInput = container.querySelector('#ms-upload-file-input');
        const createFolderBtn = container.querySelector('#ms-create-folder-btn');
        
        // Prevent re-attaching listeners if already initialized.
        if (container.dataset.initialized) return;

        loadContents('/'); // Load the root directory on first initialization.

        // Event Listeners
        body.addEventListener('click', handleItemClick);
        breadcrumbs.addEventListener('click', handleBreadcrumbClick);
        selectBtn.addEventListener('click', handleFileSelect);
        createFolderBtn.addEventListener('click', handleCreateFolder);
        uploadInput.addEventListener('change', handleFileUpload);
        
        container.dataset.initialized = 'true';
    }

    /**
     * Fetches and displays the contents of a specific folder from the server.
     * @param {string} folder The path of the folder to load.
     */
    async function loadContents(folder) {
        showLoader();
        currentState.currentPath = folder;
        currentState.selectedFile = null;
        updateSelectButton();
        
        try {
            const response = await fetch(`/media-picker/get-contents?folder=${encodeURIComponent(folder)}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            renderContents(data);
            renderBreadcrumbs(data.breadcrumbs);
        } catch (error) {
            console.error('Error fetching contents:', error);
            alert('Could not load files. Please check the console for details.');
        } finally {
            hideLoader();
        }
    }

    /**
     * Renders the files and directories into the media picker body.
     * @param {object} data The data object from the server containing `directories` and `files`.
     */
    function renderContents({ directories, files }) {
        const body = pickerInstance.querySelector('.ms-media-body');
        body.innerHTML = ''; // Clear previous content
        
        directories.forEach(dir => {
            const dirElement = document.createElement('div');
            dirElement.className = 'ms-media-item';
            dirElement.dataset.type = 'directory';
            dirElement.dataset.path = dir.path;
            dirElement.innerHTML = `
                <div class="ms-media-item-icon">📁</div>
                <div class="ms-media-item-name">${dir.name}</div>
            `;
            body.appendChild(dirElement);
        });

        files.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'ms-media-item';
            fileElement.dataset.type = 'file';
            fileElement.dataset.path = file.path;
            fileElement.dataset.url = file.url;
            fileElement.dataset.name = file.name;

            const preview = file.is_image
                ? `<img src="${file.url}" alt="${file.name}" loading="lazy">`
                : `<div class="ms-media-item-icon">📄</div>`; // Generic file icon

            fileElement.innerHTML = `
                ${preview}
                <div class="ms-media-item-name">${file.name}</div>
            `;
            body.appendChild(fileElement);
        });
    }

    /**
     * Renders the navigation breadcrumbs.
     * @param {Array} breadcrumbsData Array of breadcrumb objects from the server.
     */
    function renderBreadcrumbs(breadcrumbsData) {
        const breadcrumbs = pickerInstance.querySelector('.ms-media-breadcrumbs');
        breadcrumbs.innerHTML = breadcrumbsData.map((crumb, index) => {
            if (index === breadcrumbsData.length - 1) {
                return `<span>${crumb.name}</span>`;
            }
            return `<a href="#" data-path="${crumb.path}">${crumb.name}</a> &gt;`;
        }).join(' ');
    }

    // --- MEDIA PICKER EVENT HANDLERS ---

    function handleItemClick(e) {
        const item = e.target.closest('.ms-media-item');
        if (!item) return;

        const type = item.dataset.type;
        const path = item.dataset.path;

        if (type === 'directory') {
            loadContents(path);
        } else if (type === 'file') {
            document.querySelectorAll('.ms-media-item.selected').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            currentState.selectedFile = {
                path: path,
                url: item.dataset.url,
                name: item.dataset.name,
            };
            updateSelectButton();
        }
    }
    
    function handleBreadcrumbClick(e) {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            loadContents(e.target.dataset.path);
        }
    }

    async function handleCreateFolder() {
        const folderName = prompt('Enter new folder name:');
        if (!folderName || folderName.trim() === '') return;

        showLoader();
        try {
            const formData = new FormData();
            formData.append('folder_name', folderName);
            formData.append('current_path', currentState.currentPath);
            await postData('/media-picker/create-folder', formData);
            loadContents(currentState.currentPath); // Refresh view
        } catch (error) {
            console.error('Error creating folder:', error);
            alert(error.message);
        } finally {
            hideLoader();
        }
    }

    async function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        showLoader();
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('current_path', currentState.currentPath);
            await postData('/media-picker/upload', formData);
            loadContents(currentState.currentPath); // Refresh view
        } catch (error) {
            console.error('Error uploading file:', error);
            alert(error.message);
        } finally {
            hideLoader();
            e.target.value = ''; // Reset input
        }
    }

    /**
     * This is the master function for when a user confirms their file choice.
     * It decides whether to call a specific callback or dispatch a global event.
     */
    function handleFileSelect() {
        if (currentState.selectedFile) {
            if (typeof currentState.onFinishCallback === 'function') {
                // If a specific callback was provided (by the editor), use it.
                currentState.onFinishCallback(currentState.selectedFile);
            } else {
                // Otherwise, dispatch a global event for generic listeners.
                const event = new CustomEvent('ms-media-file-selected', { detail: currentState.selectedFile });
                document.dispatchEvent(event);
            }
            closeModal();
        }
    }
    
    // --- WYSIWYG EDITOR LOGIC ---

    /**
     * Finds all editor components on the page and initializes them.
     */
    function initializeEditors() {
        document.querySelectorAll('.ms-media-editor-container').forEach(editorContainer => {
            const toolbar = editorContainer.querySelector('.ms-editor-toolbar');
            const contentArea = editorContainer.querySelector('.ms-editor-content');
            const hiddenTextarea = editorContainer.querySelector('textarea');

            // Sync the contenteditable div with the hidden textarea for form submission.
            contentArea.addEventListener('input', () => {
                hiddenTextarea.value = contentArea.innerHTML;
            });
            hiddenTextarea.value = contentArea.innerHTML; // Initial sync

            // Toolbar command handler
            toolbar.addEventListener('click', e => {
                const button = e.target.closest('.ms-editor-tool');
                if (!button) return;

                const command = button.dataset.command;
                activeEditor = contentArea; // Set this as the currently active editor.

                if (command === 'createLink') {
                    const url = prompt('Enter the URL:');
                    if (url) document.execCommand(command, false, url);
                } else if (command === 'add-media') {
                    saveSelection(); // IMPORTANT: Save cursor position before modal opens.
                    openModal(handleMediaInsert); // Open modal with a specific callback.
                } else {
                    document.execCommand(command, false, null);
                }
            });
        });
    }

    /**
     * The specific callback function for the editor.
     * Inserts the selected media (image, video, or link) into the active editor.
     * @param {object} selectedFile The file object from the media picker.
     */
    function handleMediaInsert(selectedFile) {
        if (!activeEditor) return;

        restoreSelection(); // IMPORTANT: Restore cursor position.

        const fileUrl = selectedFile.url;
        let htmlToInsert = '';

        if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileUrl)) {
            htmlToInsert = `<img src="${fileUrl}" alt="${selectedFile.name}" style="max-width: 100%;">`;
        } else if (/\.(mp4|webm|ogg)$/i.test(fileUrl)) {
            htmlToInsert = `<video controls src="${fileUrl}" style="max-width: 100%;"></video>`;
        } else {
            htmlToInsert = `<a href="${fileUrl}" target="_blank">${selectedFile.name}</a>`;
        }

        document.execCommand('insertHTML', false, htmlToInsert);

        // Re-sync with hidden textarea and clean up state.
        activeEditor.closest('.ms-media-editor-container').querySelector('textarea').value = activeEditor.innerHTML;
        activeEditor = null;
        savedSelection = null;
    }

    // --- MODAL & TRIGGER LOGIC ---

    /**
     * Finds all generic trigger buttons and attaches listeners to open the modal.
     */
    function initializeModalTriggers() {
        document.querySelectorAll('.ms-media-picker').forEach(button => {
            button.addEventListener('click', () => {
                openModal(); // Open modal without a specific callback, will use global event.
            });
        });
    }
    
    /**
     * Displays the media picker in a modal view.
     * @param {Function|null} onFinish A callback function to execute upon file selection.
     */
    function openModal(onFinish = null) {
        currentState.onFinishCallback = onFinish;
        
        let modal = document.getElementById('ms-media-picker-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'ms-media-picker-modal-backdrop';
            modal.id = 'ms-media-picker-modal';
            modal.innerHTML = `
                <div class="ms-media-picker-modal-content">
                    <button class="ms-media-modal-close" aria-label="Close">&times;</button>
                </div>`;
            document.body.appendChild(modal);

            modal.addEventListener('click', e => {
                if (e.target.id === 'ms-media-picker-modal' || e.target.classList.contains('ms-media-modal-close')) {
                    closeModal();
                }
            });
        }
        
        // Move the persistent picker instance into the modal.
        modal.querySelector('.ms-media-picker-modal-content').appendChild(pickerInstance);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        const modal = document.getElementById('ms-media-picker-modal');
        if (modal) modal.style.display = 'none';
        
        // Clean up state
        currentState.onFinishCallback = null;
        document.body.style.overflow = '';
    }

    // --- UTILITY HELPERS ---

    function updateSelectButton() {
        pickerInstance.querySelector('#ms-select-file-btn').disabled = !currentState.selectedFile;
    }

    function showLoader() { pickerInstance.querySelector('.ms-media-loader').style.display = 'flex'; }
    function hideLoader() { pickerInstance.querySelector('.ms-media-loader').style.display = 'none'; }
    
    function saveSelection() {
        if (window.getSelection) {
            const sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) savedSelection = sel.getRangeAt(0);
        }
    }

    function restoreSelection() {
        if (savedSelection && window.getSelection) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(savedSelection);
        }
    }

    async function postData(url, formData) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: { 'X-CSRF-TOKEN': csrfToken, 'Accept': 'application/json' }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'An unknown error occurred.');
        }
        return result;
    }
});