import ModalManager from './ModalManager.js';
import Toast from './Toast.js';
import PromptModal from './PromptModal.js';

class Editor {
     constructor(element) {
        this.element = element;
        this.ui = {
            content: this.element.querySelector('.ms-editor-content'),
            code: this.element.querySelector('.ms-editor-code'),
            formInput: this.element.querySelector('.ms-editor-form-input'),
            toolbar: this.element.querySelector('.ms-editor-toolbar'),
            editModal: document.querySelector('.ms-media-edit-modal-backdrop'),
        };
        this.state = { codeViewActive: false };
        this.savedSelection = null; // NEW: Property to store the selection
        this.init();
    }

    init() {
        this.sync();
        this.ui.content.addEventListener('input', () => this.sync());
        this.ui.code.addEventListener('input', () => this.sync());
        this.ui.toolbar.addEventListener('click', e => this.handleToolbarClick(e));
        this.ui.toolbar.addEventListener('change', e => this.handleToolbarChange(e));
        this.ui.content.addEventListener('dblclick', e => this.handleMediaDoubleClick(e));

        // CRITICAL FIX: Add a mousedown listener to the toolbar to save the selection
        // before focus is lost to a color picker or other UI element.
        this.ui.toolbar.addEventListener('mousedown', e => {
            this.savedSelection = this.saveSelection();
        });
    }

    sync() {
        if (this.state.codeViewActive) {
            this.ui.content.innerHTML = this.ui.code.value;
        } else {
            this.ui.code.value = this.ui.content.innerHTML;
        }
        this.ui.formInput.value = this.ui.content.innerHTML;
    }
    
    handleToolbarClick(e) {
        const target = e.target.closest('button');
        if (!target) return;
        e.preventDefault();
        const command = target.dataset.command;
        
        // Clicks on color picker labels should trigger the hidden input
        if (target.parentElement.classList.contains('ms-editor-tool-wrapper')) {
            target.parentElement.querySelector('input[type="color"]').click();
            return;
        }

        if (target.classList.contains('ms-code-view-btn')) {
            this.toggleCodeView(target);
        } else if (target.classList.contains('ms-add-media-btn')) {
            this.openMediaModal(target.dataset.mediaType);
        } else {
            this.execCmd(command);
        }
    }
    
    handleToolbarChange(e) {
        const target = e.target.closest('select, input[type="color"]');
        if (!target) return;
        e.preventDefault();
        const command = target.dataset.command;
        this.restoreSelection(this.savedSelection); // Restore the selection
        this.execCmd(command, target.value); // Then execute the command
    }

    toggleCodeView(button) {
        this.state.codeViewActive = !this.state.codeViewActive;
        button.classList.toggle('active', this.state.codeViewActive);
        this.sync();
        this.ui.content.style.display = this.state.codeViewActive ? 'none' : 'block';
        this.ui.code.style.display = this.state.codeViewActive ? 'block' : 'none';
    }

    openMediaModal(mediaType) {
        const savedSelection = this.saveSelection();
        ModalManager.open((file) => {
            const isImage = file.name.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);
            const isVideo = file.name.match(/\.(mp4|webm|ogg)$/i);
            
            if ((mediaType === 'image' && !isImage) || (mediaType === 'video' && !isVideo)) {
                return Toast.show(`Please select a valid ${mediaType} file.`, 'error');
            }

            this.openEditDialog({ type: mediaType, src: file.url, alt: file.name }, savedSelection);
        });
    }

    handleMediaDoubleClick(e) {
        const target = e.target;
        if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
            e.preventDefault();
            let align = '';
            if (target.style.float === 'left' || target.style.float === 'right') {
                align = target.style.float;
            } else if (target.style.display === 'block' && (target.style.marginLeft === 'auto' || target.style.marginRight === 'auto')) {
                align = 'center';
            }

            const data = {
                type: target.tagName.toLowerCase(),
                src: target.getAttribute('src'),
                alt: target.alt,
                width: target.style.width.replace('px', ''),
                height: target.style.height.replace('px', ''),
                id: target.id,
                className: target.className,
                align: align
            };
            this.openEditDialog(data, null, target);
        }
    }

    openEditDialog(data, savedSelection, editingElement = null) {
        const modal = this.ui.editModal;
        if (!modal) return console.error("Edit Media Modal not found in DOM.");

        const title = modal.querySelector('#ms-media-edit-title');
        const previewImg = modal.querySelector('#ms-media-edit-preview-img');
        const previewVideo = modal.querySelector('#ms-media-edit-preview-video');
        const altInput = modal.querySelector('#ms-media-edit-alt');
        const widthInput = modal.querySelector('#ms-media-edit-width');
        const heightInput = modal.querySelector('#ms-media-edit-height');
        const alignSelect = modal.querySelector('#ms-media-edit-align');
        const classInput = modal.querySelector('#ms-media-edit-class');
        const idInput = modal.querySelector('#ms-media-edit-id');
        const insertBtn = modal.querySelector('#ms-media-edit-insert-btn');
        const cancelBtn = modal.querySelector('#ms-media-edit-cancel-btn');
        const closeBtn = modal.querySelector('.ms-media-edit-modal-close');

        title.textContent = editingElement ? 'Edit Media' : 'Insert Media';
        insertBtn.textContent = editingElement ? 'Update' : 'Insert';
        
        previewImg.style.display = 'none';
        previewVideo.style.display = 'none';
        
        if (data.type === 'image' || data.type === 'img') {
             previewImg.style.display = 'block';
             previewImg.src = data.src;
        } else if (data.type === 'video') {
             previewVideo.style.display = 'block';
             previewVideo.src = data.src;
        }
        
        altInput.value = data.alt || '';
        widthInput.value = data.width || '';
        heightInput.value = data.height || '';
        alignSelect.value = data.align || '';
        classInput.value = data.className || '';
        idInput.value = data.id || '';

        modal.style.display = 'flex';

        const cleanup = () => {
            modal.style.display = 'none';
            insertBtn.onclick = null;
            cancelBtn.onclick = null;
            closeBtn.onclick = null;
        };

        const onInsert = () => {
            let element;
            if (editingElement) {
                element = editingElement;
            } else {
                element = document.createElement(data.type === 'image' ? 'img' : data.type);
                element.src = data.src;
            }

            element.alt = altInput.value;
            element.id = idInput.value;
            element.className = classInput.value;
            
            element.style.width = widthInput.value ? `${widthInput.value}px` : '';
            element.style.height = heightInput.value ? `${heightInput.value}px` : '';
            
            const align = alignSelect.value;
            element.style.float = (align === 'left' || align === 'right') ? align : '';
            element.style.display = align === 'center' ? 'block' : '';
            element.style.marginLeft = align === 'center' ? 'auto' : '';
            element.style.marginRight = align === 'center' ? 'auto' : '';

            if (!editingElement) {
                this._insertHtmlAtSelection(element, savedSelection);
            }
            
            this.sync();
            cleanup();
        };

        insertBtn.onclick = onInsert;
        cancelBtn.onclick = cleanup;
        closeBtn.onclick = cleanup;
    }
    
    _insertHtmlAtSelection(element, range) {
        this.ui.content.focus();
        if (!range) {
            this.ui.content.appendChild(element);
            return;
        }
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        range.deleteContents();
        range.insertNode(element);
        
        range = range.cloneRange();
        range.setStartAfter(element);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    execCmd(command, value = null) {
        if (!command) return;
        if (command === 'createLink') {
            this.openLinkDialog();
            return;
        }
        document.execCommand(command, false, value);
        this.ui.content.focus();
    }
    
    async openLinkDialog() {
        const savedSelection = this.saveSelection();
        const anchorEl = this._getAnchorElement(savedSelection);

        if (!anchorEl && savedSelection && savedSelection.collapsed) {
            return Toast.show("Please select some text to create a link.", "error");
        }

        const prompt = new PromptModal();
        const result = await prompt.open({
            title: anchorEl ? 'Edit Link' : 'Insert Link',
            confirmText: anchorEl ? 'Update' : 'Insert',
            fields: [
                {
                    type: 'url',
                    name: 'url',
                    label: 'URL',
                    value: anchorEl ? anchorEl.getAttribute('href') : 'https://',
                    placeholder: 'https://example.com'
                },
                {
                    type: 'checkbox',
                    name: 'newTab',
                    label: 'Open in new tab',
                    checked: anchorEl ? anchorEl.target === '_blank' : false
                }
            ]
        });

        if (result && result.url) {
            this.restoreSelection(savedSelection);
            document.execCommand('createLink', false, result.url);
            
            const newAnchor = this._getAnchorElement(this.saveSelection());
            if (newAnchor) {
                if (result.newTab) {
                    newAnchor.target = '_blank';
                    newAnchor.rel = 'noopener noreferrer';
                } else {
                    newAnchor.removeAttribute('target');
                    newAnchor.removeAttribute('rel');
                }
            }
            this.sync();
        }
    }
    
    _getAnchorElement(selection) {
        if (!selection) return null;
        let node = selection.startContainer;
        if (node.nodeType === Node.TEXT_NODE) {
            node = node.parentNode;
        }
        return node.closest('a');
    }

    saveSelection() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0 && this.ui.content.contains(selection.anchorNode)) {
            return selection.getRangeAt(0);
        }
        return null;
    }

    restoreSelection(range) {
        if (range) {
            this.ui.content.focus();
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}
export default Editor;