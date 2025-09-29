import { postData } from '../api.js';
import MoveModal from '../utils/MoveModal.js'; 
import PromptModal from '../utils/PromptModal.js'; 
import Toast from '../utils/Toast.js'; 
import Logger from '../utils/Logger.js';

const logger = new Logger('MediaPicker');

class MediaPicker {
     constructor(element, options = {}) {
        logger.log('Constructor called for element:', element, 'with options:', options);
        this.element = element;
        this.options = { isInline: false, onSelect: null, ...options };
        this.state = { currentPath: '/', selectedFile: null, contents: { files: [], directories: [], all_directories: [] } };
        
        this.ui = {
            body: this.element.querySelector('.ms-media-body'),
            breadcrumbs: this.element.querySelector('.ms-media-breadcrumbs'),
            loader: this.element.querySelector('.ms-media-loader'),
            selectBtn: this.element.querySelector('.ms-select-file-btn'),
            actionsPanel: this.element.querySelector('.ms-media-actions-panel'),
            createFolderBtn: this.element.querySelector('.ms-create-folder-btn'),
            uploadInput: this.element.querySelector('.ms-upload-file-input'),
            folderTree: this.element.querySelector('.ms-media-folder-tree'),
        };
        this.handlers = {};

        if (!this.ui.body) {
            return logger.error('CRITICAL: Could not find .ms-media-body. Aborting initialization.');
        }

        this.attachEventListeners();
        this.loadContents('/');
    }
    
    attachEventListeners() {
        logger.log('Attaching event listeners.');
        this.handlers.onBodyClick = e => this.handleItemClick(e);
        this.handlers.onFolderTreeClick = e => this.handleFolderTreeClick(e);
        this.handlers.onCreateFolderClick = () => this.createFolder();
        this.handlers.onUploadInputChange = e => this.uploadFile(e);
        this.handlers.onBreadcrumbClick = e => this.handleBreadcrumbClick(e);
        this.handlers.onSelectBtnClick = () => this.handleSelect();

        if (this.ui.body) this.ui.body.addEventListener('click', this.handlers.onBodyClick);
        if (this.ui.folderTree) this.ui.folderTree.addEventListener('click', this.handlers.onFolderTreeClick);
        if (this.ui.createFolderBtn) this.ui.createFolderBtn.addEventListener('click', this.handlers.onCreateFolderClick);
        if (this.ui.uploadInput) this.ui.uploadInput.addEventListener('change', this.handlers.onUploadInputChange);
        if (this.ui.breadcrumbs) this.ui.breadcrumbs.addEventListener('click', this.handlers.onBreadcrumbClick);
        if (this.ui.selectBtn) this.ui.selectBtn.addEventListener('click', this.handlers.onSelectBtnClick);

        if (this.ui.actionsPanel) {
             const query = (selector) => this.ui.actionsPanel.querySelector(selector);
             const closeBtn = query('.actions-panel-close'), copyBtn = query('.copy-url-btn'),
                   resizeBtn = query('.get-resized-url-btn'), renameBtn = query('.rename-btn'),
                   moveBtn = query('.move-btn'), deleteBtn = query('.delete-btn');

             if (closeBtn) closeBtn.addEventListener('click', () => this.hideActionsPanel());
             if (copyBtn) copyBtn.addEventListener('click', () => this.copyToClipboard('.file-url-input'));
             if (resizeBtn) resizeBtn.addEventListener('click', () => this.getResizedUrl());
             if (renameBtn) renameBtn.addEventListener('click', () => this.renameItem());
             if (moveBtn) moveBtn.addEventListener('click', () => this.moveItem());
             if (deleteBtn) deleteBtn.addEventListener('click', () => this.deleteItem());
        }
    }
    
    async loadContents(folder) {
        logger.log(`Loading contents for folder: "${folder}"`);
        this.showLoader(true);
        this.hideActionsPanel();
        this.state.currentPath = folder;
        try {
            const data = await fetch(`/media-picker/get-contents?folder=${encodeURIComponent(folder)}`).then(res => res.json());
            this.state.contents = data;
            logger.log('Contents loaded successfully:', data);
            this.render();
        } catch (error) {
            logger.error("Failed to load contents:", error);
        } finally {
            this.showLoader(false);
        }
    }

    render() {
        logger.log('Rendering UI with current state.');
        if (this.ui.breadcrumbs) {
            this.ui.breadcrumbs.innerHTML = this.state.contents.breadcrumbs.map((crumb, i) => 
                i === this.state.contents.breadcrumbs.length - 1 ? `<span>${crumb.name}</span>` : `<a href="#" data-path="${crumb.path}">${crumb.name}</a> &gt;`
            ).join(' ');
        }
        if (this.ui.body) {
            this.ui.body.innerHTML = '';
            this.state.contents.directories.forEach(dir => this.ui.body.insertAdjacentHTML('beforeend', this.renderItem(dir)));
            this.state.contents.files.forEach(file => this.ui.body.insertAdjacentHTML('beforeend', this.renderItem(file)));
        }
        if (this.ui.folderTree) {
            this.ui.folderTree.innerHTML = this.buildTreeHTML(this.state.contents.all_directories);
        }
    }

    buildTreeHTML(nodes) {
        let html = '<ul>';
        nodes.forEach(node => {
            const isActive = this.state.currentPath === node.path;
            html += `<li><a href="#" class="${isActive ? 'active' : ''}" data-path="${node.path}">📁 ${node.name}</a>`;
            if (node.children && node.children.length > 0) {
                html += this.buildTreeHTML(node.children);
            }
            html += '</li>';
        });
        html += '</ul>';
        return html;
    }
    
    handleItemClick(e) {
        const itemEl = e.target.closest('.ms-media-item');
        if (!itemEl) return;
        const type = itemEl.dataset.type;
        logger.log(`Item clicked. Type: ${type}, Path: ${itemEl.dataset.path}`);
        if (type === 'directory') {
            this.loadContents(itemEl.dataset.path);
        } else {
            this.selectItem(itemEl);
        }
    }

    handleFolderTreeClick(e) {
        e.preventDefault();
        const link = e.target.closest('a');
        if (link && link.dataset.path) {
            logger.log(`Folder tree link clicked. Path: ${link.dataset.path}`);
            this.loadContents(link.dataset.path);
        }
    }

    selectItem(itemEl) {
        this.element.querySelectorAll('.ms-media-item.selected').forEach(el => el.classList.remove('selected'));
        itemEl.classList.add('selected');
        this.state.selectedFile = JSON.parse(itemEl.dataset.item);
        logger.log('File selected:', this.state.selectedFile);
        if (this.ui.selectBtn) this.ui.selectBtn.disabled = this.state.selectedFile.type !== 'file';
        
        if (this.state.selectedFile.type === 'file') {
            if (this.options.isInline) {
                this.showActionsPanel();
            } else {
                logger.log('Modal picker file selected, calling handleSelect().');
                this.handleSelect();
            }
        } else {
            this.hideActionsPanel();
        }
    }
    
    renderItem(item) {
        const preview = item.is_image ? `<img src="${item.url}" alt="${item.name}" loading="lazy">` : `<div class="ms-media-item-icon">${item.type === 'directory' ? '📁' : '📄'}</div>`;
        return `
            <div class="ms-media-item" data-path="${item.path}" data-type="${item.type}" data-item='${JSON.stringify(item)}'>
                ${preview}
                <div class="ms-media-item-name">${item.name}</div>
            </div>
        `;
    }
    
    handleSelect() {
        if (this.state.selectedFile && this.state.selectedFile.type === 'file' && this.options.onSelect) {
            const fileForCallback = {
                name: this.state.selectedFile.name,
                url: this.state.selectedFile.public_url,
                path: this.state.selectedFile.path,
                size: this.state.selectedFile.size,
                is_image: this.state.selectedFile.is_image
            };
            logger.log('Executing onSelect callback with file:', fileForCallback);
            this.options.onSelect(fileForCallback);
        } else {
            logger.warn('handleSelect called but no file selected or no onSelect callback provided.');
        }
    }

    handleBreadcrumbClick(e) {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            logger.log(`Breadcrumb clicked. Path: ${e.target.dataset.path}`);
            this.loadContents(e.target.dataset.path);
        }
    }

    showActionsPanel() {
        const file = this.state.selectedFile;
        if (!file || !this.ui.actionsPanel) return;
        logger.log('Showing actions panel for file:', file.name);
        const panel = this.ui.actionsPanel;
        panel.querySelector('.file-name').textContent = file.name;
        panel.querySelector('.file-size').textContent = `${(file.size / 1024).toFixed(2)} KB`;
        panel.querySelector('.file-modified').textContent = `Modified: ${new Date(file.last_modified * 1000).toLocaleDateString()}`;
        panel.querySelector('.file-url-input').value = file.public_url;
        panel.querySelector('.actions-panel-preview').innerHTML = file.is_image ? `<img src="${file.url}" alt="Preview">` : `<div class="file-icon">📄</div>`;
        panel.style.display = 'flex';
    }

    hideActionsPanel() {
        if (this.state.selectedFile) {
            logger.log('Hiding actions panel.');
            this.state.selectedFile = null;
            if (this.ui.selectBtn) this.ui.selectBtn.disabled = true;
            this.element.querySelectorAll('.ms-media-item.selected').forEach(el => el.classList.remove('selected'));
            if (this.ui.actionsPanel) this.ui.actionsPanel.style.display = 'none';
        }
    }
    
    async createFolder() {
        logger.log('Create folder button clicked.');
        const prompt = new PromptModal();
        const result = await prompt.open({
            title: 'Create New Folder',
            confirmText: 'Create',
            fields: [{ name: 'folder_name', label: 'Folder Name' }]
        });
        
        if (result && result.folder_name) {
            logger.log(`Creating folder "${result.folder_name}" in path "${this.state.currentPath}"`);
            const formData = new FormData();
            formData.append('folder_name', result.folder_name);
            formData.append('current_path', this.state.currentPath);
            await postData('create-folder', formData)
                .then(() => {
                    Toast.show('Folder created.');
                    this.loadContents(this.state.currentPath)
                })
                .catch(() => {});
        } else {
            logger.log('Create folder prompt cancelled.');
        }
    }

    async uploadFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        logger.log(`Uploading file "${file.name}" to path "${this.state.currentPath}"`);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('current_path', this.state.currentPath);
        await postData('upload', formData)
            .then(() => {
                Toast.show('File uploaded.');
                this.loadContents(this.state.currentPath)
            })
            .catch(() => {});
        e.target.value = '';
    }

    async renameItem() {
        const file = this.state.selectedFile; 
        if (!file) return;
        logger.log(`Rename button clicked for item:`, file);
        const prompt = new PromptModal();
        const result = await prompt.open({
            title: `Rename ${file.type}`,
            confirmText: 'Rename',
            fields: [{ name: 'new_name', label: 'New Name', value: file.name }]
        });

        if (result && result.new_name && result.new_name !== file.name) {
            logger.log(`Renaming item from "${file.name}" to "${result.new_name}"`);
            const formData = new FormData();
            formData.append('path', file.path);
            formData.append('new_name', result.new_name);
            await postData('rename', formData)
                .then(() => {
                    Toast.show('Item renamed successfully.');
                    this.loadContents(this.state.currentPath);
                })
                .catch(() => {});
        } else {
            logger.log('Rename prompt cancelled or name unchanged.');
        }
    }
    
    async moveItem() {
        const file = this.state.selectedFile; 
        if (!file) return;
        logger.log('Move button clicked for item:', file);
        const currentParentPath = file.path.substring(0, file.path.lastIndexOf('/')) || '/';
        const moveModal = new MoveModal();
        const destination = await moveModal.open(this.state.contents.all_directories, currentParentPath);
        
        if (destination !== null) {
            logger.log(`Moving item to destination: "${destination}"`);
            const formData = new FormData();
            formData.append('path', file.path);
            formData.append('destination', destination);
            await postData('move', formData)
                .then(() => {
                    Toast.show('Item moved successfully.');
                    this.loadContents(this.state.currentPath)
                })
                .catch(() => {});
        } else {
            logger.log('Move prompt cancelled.');
        }
    }
    
    async getResizedUrl() {
        const file = this.state.selectedFile;
        if (!file || !file.is_image) {
            const errorMsg = "Please select an image file.";
            logger.warn(errorMsg);
            return Toast.show(errorMsg, "error");
        }
        logger.log('Get resized URL clicked for image:', file.name);
        
        const prompt = new PromptModal();
        const result1 = await prompt.open({
            title: 'Get Resized URL - Step 1 of 2', confirmText: 'Next',
            fields: [{ name: 'width', label: 'Enter desired width (e.g., 300, or "w" for auto-height)' }]
        });
        if (!result1 || !result1.width) return logger.log('Resize prompt step 1 cancelled.');

        const result2 = await prompt.open({
            title: 'Get Resized URL - Step 2 of 2', confirmText: 'Generate',
            fields: [{ name: 'height', label: 'Enter desired height (e.g., 200, or "h" for auto-width)' }]
        });
        if (!result2 || !result2.height) return logger.log('Resize prompt step 2 cancelled.');

        const relativePath = file.path.replace(/^uploads\//, '');
        const lastSlashIndex = relativePath.lastIndexOf('/');
        let folderPath = '';
        let fileName = relativePath;

        if (lastSlashIndex !== -1) {
            folderPath = relativePath.substring(0, lastSlashIndex);
            fileName = relativePath.substring(lastSlashIndex + 1);
        }
        
        const resizedUrl = `${window.location.origin}/uploads/${folderPath}/${result1.width}/${result2.height}/${fileName}`;
        logger.log(`Generated resized URL: ${resizedUrl}`);
        
        this.ui.actionsPanel.querySelector('.file-url-input').value = resizedUrl;
        Toast.show("Resized URL generated in the input box.");
    }

    async deleteItem() {
        const file = this.state.selectedFile;
        if (!file) return;
        logger.log('Delete button clicked for item:', file.name);
        if (!confirm(`Are you sure you want to delete "${file.name}"?`)) {
            return logger.log('Delete confirmation cancelled.');
        }
        logger.log('Deleting item...');
        const formData = new FormData();
        formData.append('path', file.path);
        formData.append('type', file.type);
        await postData('delete', formData)
            .then(() => {
                Toast.show('Item deleted.');
                this.loadContents(this.state.currentPath);
            })
            .catch(() => {});
    }
    
    copyToClipboard(selector) {
        logger.log(`Copying content of "${selector}" to clipboard.`);
        const input = this.ui.actionsPanel.querySelector(selector);
        input.select();
        document.execCommand('copy');
        Toast.show("Copied to clipboard!");
    }

    showLoader(show) {
        logger.log(show ? 'Showing loader.' : 'Hiding loader.');
        if (this.ui.loader) this.ui.loader.style.display = show ? 'flex' : 'none';
    }

    destroy() {
        logger.warn('Destroying instance, removing event listeners.');
        if (this.ui.body) this.ui.body.removeEventListener('click', this.handlers.onBodyClick);
        if (this.ui.folderTree) this.ui.folderTree.removeEventListener('click', this.handlers.onFolderTreeClick);
        if (this.ui.createFolderBtn) this.ui.createFolderBtn.removeEventListener('click', this.handlers.onCreateFolderClick);
        if (this.ui.uploadInput) this.ui.uploadInput.removeEventListener('change', this.handlers.onUploadInputChange);
        if (this.ui.breadcrumbs) this.ui.breadcrumbs.removeEventListener('click', this.handlers.onBreadcrumbClick);
        if (this.ui.selectBtn) this.ui.selectBtn.removeEventListener('click', this.handlers.onSelectBtnClick);
        this.element = null;
        this.ui = {};
        this.handlers = {};
        logger.log('MediaPicker instance destroyed.');
    }
}

export default MediaPicker;