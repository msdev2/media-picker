import { postData } from '../api.js';
import MoveModal from './MoveModal.js'; 
import PromptModal from './PromptModal.js'; 
import Toast from './Toast.js'; 

class MediaPicker {
     constructor(element, options = {}) {
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

        this.attachEventListeners();
        this.loadContents('/');
    }
    
    attachEventListeners() {
        if (this.ui.body) this.ui.body.addEventListener('click', e => this.handleItemClick(e));
        if (this.ui.folderTree) this.ui.folderTree.addEventListener('click', e => this.handleFolderTreeClick(e));
        if (this.ui.createFolderBtn) this.ui.createFolderBtn.addEventListener('click', () => this.createFolder());
        if (this.ui.uploadInput) this.ui.uploadInput.addEventListener('change', e => this.uploadFile(e));
        if (this.ui.breadcrumbs) this.ui.breadcrumbs.addEventListener('click', e => this.handleBreadcrumbClick(e));
        if (this.ui.selectBtn) this.ui.selectBtn.addEventListener('click', () => this.handleSelect());

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
        this.showLoader(true);
        this.hideActionsPanel();
        this.state.currentPath = folder;
        try {
            const data = await fetch(`/media-picker/get-contents?folder=${encodeURIComponent(folder)}`).then(res => res.json());
            this.state.contents = data;
            this.render();
        } catch (error) {
            console.error("Failed to load contents:", error);
        } finally {
            this.showLoader(false);
        }
    }

    render() {
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
        if (type === 'directory') {
            this.loadContents(itemEl.dataset.path);
        } else {
            console.log('%c[MediaPicker] Step 3: A file was clicked.', 'color: blue; font-weight: bold;');
            this.selectItem(itemEl);
        }
    }

    handleFolderTreeClick(e) {
        e.preventDefault();
        const link = e.target.closest('a');
        if (link && link.dataset.path) this.loadContents(link.dataset.path);
    }

    renderFolderTree(nodes, container) {
        let html = '<ul>';
        nodes.forEach(node => {
            const isActive = this.state.currentPath === node.path;
            html += `<li><a href="#" class="${isActive ? 'active' : ''}" data-path="${node.path}">📁 ${node.name}</a>`;
            if (node.children && node.children.length > 0) {
                html += this.renderFolderTree(node.children, container); // Recursive call
            }
            html += '</li>';
        });
        html += '</ul>';
        container.innerHTML = html;
        return html; // Return html for modals
    }

    selectItem(itemEl) {
        this.element.querySelectorAll('.ms-media-item.selected').forEach(el => el.classList.remove('selected'));
        itemEl.classList.add('selected');
        this.state.selectedFile = JSON.parse(itemEl.dataset.item);
        if (this.ui.selectBtn) this.ui.selectBtn.disabled = this.state.selectedFile.type !== 'file';
        
        if (this.state.selectedFile.type === 'file') {
            if (this.options.isInline) {
                this.showActionsPanel();
            } else {
                console.log('[MediaPicker] This is a modal picker. Calling handleSelect() to trigger the callback...');
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
            
            // CRITICAL FIX: Create a clean object for the callback.
            // This ensures that `file.url` is ALWAYS the public URL for external use.
            const fileForCallback = {
                name: this.state.selectedFile.name,
                url: this.state.selectedFile.public_url, // Use the correct public URL
                path: this.state.selectedFile.path,
                size: this.state.selectedFile.size,
                is_image: this.state.selectedFile.is_image
            };

            this.options.onSelect(fileForCallback);
        }
    }

    handleBreadcrumbClick(e) {
        e.preventDefault();
        if (e.target.tagName === 'A') this.loadContents(e.target.dataset.path);
    }

    showActionsPanel() {
        const file = this.state.selectedFile;
        if (!file || !this.ui.actionsPanel) return;
        const panel = this.ui.actionsPanel;
        
        panel.querySelector('.file-name').textContent = file.name;
        panel.querySelector('.file-size').textContent = `${(file.size / 1024).toFixed(2)} KB`;
        panel.querySelector('.file-modified').textContent = `Modified: ${new Date(file.last_modified * 1000).toLocaleDateString()}`;
        
        // Use the REAL public URL here.
        panel.querySelector('.file-url-input').value = file.public_url;
        
        panel.querySelector('.actions-panel-preview').innerHTML = file.is_image ? `<img src="${file.url}" alt="Preview">` : `<div class="file-icon">📄</div>`;
        panel.style.display = 'flex';
    }

    hideActionsPanel() {
        this.state.selectedFile = null;
        if (this.ui.selectBtn) this.ui.selectBtn.disabled = true;
        this.element.querySelectorAll('.ms-media-item.selected').forEach(el => el.classList.remove('selected'));
        if (this.ui.actionsPanel) this.ui.actionsPanel.style.display = 'none';
    }
    
    async createFolder() {
        const prompt = new PromptModal();
        const result = await prompt.open({
            title: 'Create New Folder',
            confirmText: 'Create',
            fields: [{
                name: 'folder_name',
                label: 'Folder Name'
            }]
        });
        
        if (result && result.folder_name) {
            const formData = new FormData();
            formData.append('folder_name', result.folder_name);
            formData.append('current_path', this.state.currentPath);
            await postData('create-folder', formData).then(() => this.loadContents(this.state.currentPath)).catch(() => {});
        }
    }

    async uploadFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('current_path', this.state.currentPath);
        await postData('upload', formData).then(() => this.loadContents(this.state.currentPath)).catch(() => {});
        e.target.value = '';
    }

    async renameItem() {
        const file = this.state.selectedFile; 
        if (!file) return;

        const prompt = new PromptModal();
        const newName = await prompt.open({
            title: `Rename ${file.type}`,
            inputLabel: 'New Name',
            initialValue: file.name,
            confirmText: 'Rename'
        });

        if (newName && newName !== file.name) {
            const formData = new FormData();
            formData.append('path', file.path);
            formData.append('new_name', newName);
            await postData('rename', formData)
            .then(() => {
                Toast.show('Item renamed successfully.'); // <-- Use new Toast
                this.loadContents(this.state.currentPath);
            })
            .catch(() => {});
        }
    }
    
    async moveItem() {
        const file = this.state.selectedFile; if (!file) return;

        const currentParentPath = file.path.substring(0, file.path.lastIndexOf('/')) || '/';
        
        const moveModal = new MoveModal();
        const destination = await moveModal.open(this.state.contents.all_directories, currentParentPath);
        
        if (destination !== null) {
            const formData = new FormData();
            formData.append('path', file.path);
            formData.append('destination', destination);
            await postData('move', formData)
                .then(() => this.loadContents(this.state.currentPath))
                .catch(() => {});
        }
    }
    
    
    async getResizedUrl() {
        const file = this.state.selectedFile;
        if (!file || !file.is_image) {
            return Toast.show("Please select an image file.", "error");
        }
        
        // Use our professional PromptModal instead of the ugly browser prompt
        const prompt = new PromptModal();
        const result1 = await prompt.open({
            title: 'Get Resized URL - Step 1 of 2',
            confirmText: 'Next',
            fields: [{
                name: 'width',
                label: 'Enter desired width (e.g., 300, or "w" for auto-height)'
            }]
        });
        if (!result1 || !result1.width) return;

        const result2 = await prompt.open({
            title: 'Get Resized URL - Step 2 of 2',
            confirmText: 'Generate',
            fields: [{
                name: 'height',
                label: 'Enter desired height (e.g., 200, or "h" for auto-width)'
            }]
        });
        if (!result2 || !result2.height) return;

        // The file.path is the key, e.g., "uploads/avatar/image.png"
        const relativePath = file.path.replace(/^uploads\//, '');

        const lastSlashIndex = relativePath.lastIndexOf('/');
        let folderPath = '';
        let fileName = relativePath;

        if (lastSlashIndex !== -1) {
            folderPath = relativePath.substring(0, lastSlashIndex);
            fileName = relativePath.substring(lastSlashIndex + 1);
        }
        
        const resizedUrl = `${window.location.origin}/uploads/${folderPath}/${result1.width}/${result2.height}/${fileName}`;
        
        this.ui.actionsPanel.querySelector('.file-url-input').value = resizedUrl;
        Toast.show("Resized URL generated in the input box.");
    }

    async deleteItem() {
        const file = this.state.selectedFile;
        if (!file || !confirm(`Are you sure you want to delete "${file.name}"?`)) return;
        const formData = new FormData();
        formData.append('path', file.path);
        formData.append('type', file.type);
        await postData('delete', formData).then(() => this.loadContents(this.state.currentPath)).catch(() => {});
    }
    

    copyToClipboard(selector) {
        const input = this.ui.actionsPanel.querySelector(selector);
        input.select();
        document.execCommand('copy');
        Toast.show("Copied to clipboard!");
    }

    showLoader(show) {
        if (this.ui.loader) this.ui.loader.style.display = show ? 'flex' : 'none';
    }
    destroy() {
        // Remove event listeners, clear DOM refs, etc.
        this.element = null;
        this.ui = {};
    }
}

export default MediaPicker;
