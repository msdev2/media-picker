document.addEventListener('DOMContentLoaded', function() {
    const pickerInstance = document.getElementById('ms-media-picker-instance');
    
    // Global state for the picker
    let currentState = {
        currentPath: '/',
        selectedFile: null,
        onFinishCallback: null,
    };

    // Initialize all picker instances on the page
    if (pickerInstance) {
        initializePicker(pickerInstance);
    }
    
    // Attach event listeners for modal triggers
    initializeModalTriggers();

    function initializePicker(container) {
        const body = container.querySelector('.ms-media-body');
        const breadcrumbs = container.querySelector('.ms-media-breadcrumbs');
        const selectBtn = container.querySelector('#ms-select-file-btn');
        const uploadInput = container.querySelector('#ms-upload-file-input');
        const createFolderBtn = container.querySelector('#ms-create-folder-btn');
        const loader = container.querySelector('.ms-media-loader');

        // Load initial content
        loadContents('/');

        // Event Listeners
        body.addEventListener('click', handleItemClick);
        breadcrumbs.addEventListener('click', handleBreadcrumbClick);
        selectBtn.addEventListener('click', handleFileSelect);
        createFolderBtn.addEventListener('click', handleCreateFolder);
        uploadInput.addEventListener('change', handleFileUpload);
    }

    function initializeModalTriggers() {
        document.querySelectorAll('.ms-media-picker').forEach(button => {
            button.addEventListener('click', function(e) {
                openModal(response => {
                    // This is a basic onFinish callback handler
                    // You can make this more robust by using custom events
                    console.log('File selected:', response);
                    alert('Selected file: ' + response.url);
                });
            });
        });
    }

    // --- Core Functions ---
    async function loadContents(folder) {
        showLoader();
        currentState.currentPath = folder;
        currentState.selectedFile = null;
        updateSelectButton();
        
        try {
            const response = await fetch(`/media-picker/get-contents?folder=${folder}`);
            const data = await response.json();
            renderContents(data);
            renderBreadcrumbs(data.breadcrumbs);
        } catch (error) {
            console.error('Error fetching contents:', error);
            alert('Could not load files.');
        } finally {
            hideLoader();
        }
    }

    function renderContents({ directories, files }) {
        const body = pickerInstance.querySelector('.ms-media-body');
        body.innerHTML = '';
        
        directories.forEach(dir => {
            body.innerHTML += `
                <div class="ms-media-item" data-type="directory" data-path="${dir.path}">
                    <div class="ms-media-item-icon">📁</div>
                    <div class="ms-media-item-name">${dir.name}</div>
                </div>
            `;
        });

        files.forEach(file => {
             body.innerHTML += `
                <div class="ms-media-item" data-type="file" data-path="${file.path}" data-url="${file.url}" data-name="${file.name}">
                    <img src="${file.url}" alt="${file.name}" loading="lazy">
                    <div class="ms-media-item-name">${file.name}</div>
                </div>
            `;
        });
    }

    function renderBreadcrumbs(breadcrumbsData) {
        const breadcrumbs = pickerInstance.querySelector('.ms-media-breadcrumbs');
        breadcrumbs.innerHTML = breadcrumbsData.map((crumb, index) => {
            if (index === breadcrumbsData.length - 1) {
                return `<span>${crumb.name}</span>`;
            }
            return `<a href="#" data-path="${crumb.path}">${crumb.name}</a> &gt;`;
        }).join(' ');
    }

    // --- Event Handlers ---
    function handleItemClick(e) {
        const item = e.target.closest('.ms-media-item');
        if (!item) return;

        const type = item.dataset.type;
        const path = item.dataset.path;

        if (type === 'directory') {
            loadContents(path);
        } else if (type === 'file') {
            // Clear previous selection
            document.querySelectorAll('.ms-media-item.selected').forEach(el => el.classList.remove('selected'));
            
            // Mark new selection
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

    function handleFileSelect() {
        if (currentState.selectedFile) {
            if (currentState.onFinishCallback) {
                currentState.onFinishCallback(currentState.selectedFile);
            }
            closeModal(); // Close if it's a modal
        }
    }

    async function handleCreateFolder() {
        const folderName = prompt('Enter new folder name:');
        if (!folderName) return;

        showLoader();
        try {
            const formData = new FormData();
            formData.append('folder_name', folderName);
            formData.append('current_path', currentState.currentPath);

            await postData('/media-picker/create-folder', formData);
            loadContents(currentState.currentPath); // Refresh
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
            loadContents(currentState.currentPath); // Refresh
        } catch (error) {
            console.error('Error uploading file:', error);
            alert(error.message);
        } finally {
            hideLoader();
        }
    }

    // --- UI and Utilities ---
    function updateSelectButton() {
        const selectBtn = pickerInstance.querySelector('#ms-select-file-btn');
        selectBtn.disabled = !currentState.selectedFile;
    }

    function showLoader() { pickerInstance.querySelector('.ms-media-loader').style.display = 'flex'; }
    function hideLoader() { pickerInstance.querySelector('.ms-media-loader').style.display = 'none'; }

    async function postData(url, formData) {
         const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
            }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'An error occurred.');
        }
        return result;
    }

    // --- Modal Logic ---
    function openModal(onFinish) {
        currentState.onFinishCallback = onFinish;
        // Create modal from template if it doesn't exist
        if (!document.getElementById('ms-media-picker-modal')) {
            const modalHTML = `
                <div class="ms-media-picker-modal-backdrop" id="ms-media-picker-modal">
                    <div class="ms-media-picker-modal-content">
                        <button class="ms-media-modal-close">&times;</button>
                        <!-- Picker will be injected here -->
                    </div>
                </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            document.querySelector('.ms-media-picker-modal-content').appendChild(pickerInstance);

            document.getElementById('ms-media-picker-modal').addEventListener('click', e => {
                if (e.target.id === 'ms-media-picker-modal' || e.target.classList.contains('ms-media-modal-close')) {
                    closeModal();
                }
            });
        }
        document.getElementById('ms-media-picker-modal').style.display = 'flex';
        initializePicker(pickerInstance); // Re-initialize when opening
    }
    
    function closeModal() {
        const modal = document.getElementById('ms-media-picker-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        currentState.onFinishCallback = null; // Clear callback
    }
});