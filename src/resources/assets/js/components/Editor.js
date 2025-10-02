import ModalManager from '../utils/ModalManager.js';
import Toast from '../utils/Toast.js';
import PromptModal from '../utils/PromptModal.js';
import Logger from '../utils/Logger.js';

const logger = new Logger('Editor');

class Editor {
    constructor(element) {
        logger.log('Constructor called for element:', element);
        this.element = element;

        this.ui = {
            content: this.element.querySelector('.ms-editor-content'),
            code: this.element.querySelector('.ms-editor-code'),
            formInput: this.element.querySelector('.ms-editor-form-input'),
            toolbar: this.element.querySelector('.ms-editor-toolbar'),
            editModal: document.querySelector('.ms-media-edit-modal-backdrop'),
        };

        logger.log('UI "content" found:', this.ui.content);
        logger.log('UI "code" found:', this.ui.code);
        logger.log('UI "formInput" found:', this.ui.formInput);
        logger.log('UI "toolbar" found:', this.ui.toolbar);

        this.state = { codeViewActive: false };
        this.savedSelection = null;
        this._initialized = false;
        this.handlers = {};
        // V-- NEW PROPERTY FOR OUR OBSERVER --V
        this.contentObserver = null;

        if (!this.ui.content || !this.ui.formInput || !this.ui.toolbar) {
            logger.error('CRITICAL: Could not find essential UI elements. Aborting initialization.');
            return;
        }

        this.init();
    }

    init() {
        if (this._initialized) return;
        this._initialized = true;
        logger.log('Init running.');

        this.ui.content.innerHTML = this.ui.formInput.value;
        this.ui.code.value = this.ui.formInput.value;

        // --- Event Handlers for Synchronization ---
        // This handler function itself is correct. The problem is how it's being called.
        this.handlers.onContentInput = () => {
            logger.log('Content "input" event fired.');
            const newContent = this.ui.content.innerHTML;
            if (this.ui.formInput.value !== newContent) {
                this.ui.formInput.value = newContent;
                this.ui.code.value = newContent;
                this.dispatchChange()
            }
        };
        
        // This handler is working correctly, no changes needed.
        this.handlers.onCodeInput = () => {
            logger.log('Code "input" event fired.');
            const newCode = this.ui.code.value;
            if (this.ui.formInput.value !== newCode) {
                this.ui.content.innerHTML = newCode;
                this.ui.formInput.value = newCode;
                this.dispatchChange()
            }
        };

        // This handler is working correctly, no changes needed.
        this.handlers.onFormInput = (e) => {
            logger.log('Form input event fired (syncing from Livewire).');
            if (e.isTrusted && this.ui.formInput.value !== this.ui.content.innerHTML) {
                this.ui.content.innerHTML = this.ui.formInput.value;
                this.ui.code.value = this.ui.formInput.value;
                this.dispatchChange();
            }
        };

        // Other handlers...
        this.handlers.onToolbarClick = e => this.handleToolbarClick(e);
        this.handlers.onToolbarChange = e => this.handleToolbarChange(e);
        this.handlers.onToolbarMouseDown = (e) => { e.preventDefault(); this.savedSelection = this.saveSelection(); };
        this.handlers.onContentDblClick = e => this.handleMediaDoubleClick(e);

        // We are replacing the unreliable 'input' event listener with a MutationObserver.
        
        // 1. Create the observer. Its callback is our existing handler function.
        this.contentObserver = new MutationObserver(this.handlers.onContentInput);

        // 2. Tell the observer to watch the contenteditable div for any changes to its
        //    content, text, or child elements.
        this.contentObserver.observe(this.ui.content, {
            childList: true,
            subtree: true,
            characterData: true,
        });
        // These listeners are working fine, so we keep them.
        this.ui.code.addEventListener('input', this.handlers.onCodeInput);
        this.ui.formInput.addEventListener('input', this.handlers.onFormInput);
        this.ui.toolbar.addEventListener('click', this.handlers.onToolbarClick);
        this.ui.toolbar.addEventListener('change', this.handlers.onToolbarChange);
        this.ui.toolbar.addEventListener('mousedown', this.handlers.onToolbarMouseDown);
        this.ui.content.addEventListener('dblclick', this.handlers.onContentDblClick);

        logger.log('Editor event listeners attached (using MutationObserver).');
    }


    dispatchChange() {
        logger.log('Dispatching custom event: ms-editor-content-changed');
        this.ui.formInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.element.dispatchEvent(new CustomEvent('ms-editor-content-changed', {
            bubbles: true,
            detail: {
                content: this.ui.content.innerHTML,
                plainText: this.ui.content.textContent,
                codeView: this.state.codeViewActive
            }
        }));
    }

    handleToolbarClick(e) {
        const target = e.target.closest('button');
        if (!target) return;

        const command = target.dataset.command;
        logger.log(`Toolbar button clicked. Command: ${command}`);

        if (target.parentElement.classList.contains('ms-editor-tool-wrapper')) {
            logger.log('Color wrapper clicked, triggering color input.');
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

        const command = target.dataset.command;
        const value = target.value;
        logger.log(`Toolbar input changed. Command: ${command}, Value: ${value}`);
        this.execCmd(command, value);
    }

    toggleCodeView(button) {
        this.state.codeViewActive = !this.state.codeViewActive;
        logger.log(`Toggling code view. New state: ${this.state.codeViewActive ? 'active' : 'inactive'}`);
        button.classList.toggle('active', this.state.codeViewActive);
        this.ui.content.style.display = this.state.codeViewActive ? 'none' : 'block';
        this.ui.code.style.display = this.state.codeViewActive ? 'block' : 'none';
        // If switching to code view, ensure its content is up-to-date
        if (this.state.codeViewActive) {
            this.ui.code.value = this.ui.content.innerHTML;
        }
    }

    openMediaModal(mediaType) {
        logger.log(`Opening media modal for media type: ${mediaType}`);
        const savedSelection = this.saveSelection();
        ModalManager.open((file) => {
            logger.log('Media modal selected file:', file);
            const isImage = file.name.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);
            const isVideo = file.name.match(/\.(mp4|webm|ogg)$/i);

            if ((mediaType === 'image' && !isImage) || (mediaType === 'video' && !isVideo)) {
                const errorMsg = `Please select a valid ${mediaType} file.`;
                logger.warn(errorMsg);
                return Toast.show(errorMsg, 'error');
            }
            this.openEditDialog({ type: mediaType, src: file.url, alt: file.name }, savedSelection);
        });
    }

    handleMediaDoubleClick(e) {
        const target = e.target;
        logger.log('Double click detected in content area on:', target);
        if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
            e.preventDefault();
            logger.log('Double click was on an IMG or VIDEO, opening edit dialog.');
            let align = '';
            if (target.style.float === 'left' || target.style.float === 'right') {
                align = target.style.float;
            } else if (target.style.display === 'block' && target.style.marginLeft === 'auto' && target.style.marginRight === 'auto') {
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
        logger.log(`Opening edit dialog. Editing existing element: ${!!editingElement}`, data);
        if (!this.ui.editModal) return logger.error("Edit Media Modal not found in DOM.");

        const modal = this.ui.editModal;
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
            previewVideo.load(); // Ensure video preview loads
        }

        altInput.value = data.alt || '';
        widthInput.value = data.width || '';
        heightInput.value = data.height || '';
        alignSelect.value = data.align || '';
        classInput.value = data.className || '';
        idInput.value = data.id || '';
        modal.style.display = 'flex';

        const cleanup = () => {
            logger.log('Cleaning up and closing edit dialog.');
            modal.style.display = 'none';
            insertBtn.onclick = null;
            cancelBtn.onclick = null;
            closeBtn.onclick = null;
        };

        insertBtn.onclick = () => {
            logger.log('Insert/Update button clicked in edit dialog.');
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

            this.handlers.onContentInput(); // Manually trigger sync after media insert/update
            cleanup();
        };

        cancelBtn.onclick = cleanup;
        closeBtn.onclick = cleanup;
    }

    _insertHtmlAtSelection(element, range) {
        logger.log('Inserting element at saved selection:', element);
        this.restoreSelection(range);

        // After restoring, get the current selection to insert the node
        const selection = window.getSelection();
        if (selection.rangeCount === 0) {
            this.ui.content.appendChild(element); // Fallback if no range
            return;
        }
        const currentRange = selection.getRangeAt(0);
        currentRange.deleteContents();
        currentRange.insertNode(element);

        // Place cursor after the newly inserted element for a better UX
        const newRange = document.createRange();
        newRange.setStartAfter(element);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }

    execCmd(command, value = null) {
        if (!command) return;

        // LIVEWIRE FIX: Restore the selection *before* executing the command.
        // This ensures the formatting is applied where the user's cursor was,
        // not where the focus is now (e.g., on the button).
        this.restoreSelection(this.savedSelection);

        logger.log(`Executing command: ${command} with value: ${value}`);
        if (command === 'createLink') {
            this.openLinkDialog(); // This command has its own selection handling
            return;
        }

        document.execCommand(command, false, value);
        this.ui.content.focus(); // Re-focus the editor after command execution.
        this.handlers.onContentInput(); // Manually trigger a sync after any command.
    }

    async openLinkDialog() {
        logger.log('Opening link dialog.');
        const savedSelection = this.saveSelection();
        const anchorEl = this._getAnchorElement(savedSelection);

        if (!anchorEl && savedSelection && savedSelection.collapsed) {
            const errorMsg = "Please select some text to create a link.";
            logger.warn(errorMsg);
            return Toast.show(errorMsg, "error");
        }

        const prompt = new PromptModal();
        const result = await prompt.open({
            title: anchorEl ? 'Edit Link' : 'Insert Link',
            confirmText: anchorEl ? 'Update' : 'Insert',
            fields: [
                { type: 'url', name: 'url', label: 'URL', value: anchorEl ? anchorEl.getAttribute('href') : 'https://', placeholder: 'https://example.com' },
                { type: 'checkbox', name: 'newTab', label: 'Open in new tab', checked: anchorEl ? anchorEl.target === '_blank' : false }
            ]
        });

        this.restoreSelection(savedSelection);

        if (result && result.url) {
            logger.log('Link dialog submitted with result:', result);
            document.execCommand('createLink', false, result.url);
            // Re-select the link to modify its attributes
            const newAnchor = this._getAnchorElement(window.getSelection().getRangeAt(0));
            if (newAnchor) {
                if (result.newTab) {
                    newAnchor.target = '_blank';
                    newAnchor.rel = 'noopener noreferrer';
                } else {
                    newAnchor.removeAttribute('target');
                    newAnchor.removeAttribute('rel');
                }
            }
            this.handlers.onContentInput();
        } else {
            logger.log('Link dialog was cancelled or submitted with no URL.');
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
            logger.log('Saving selection range.');
            return selection.getRangeAt(0);
        }
        logger.log('Could not save selection (not in editor).');
        return null;
    }

    restoreSelection(range) {
        if (range) {
            logger.log('Restoring selection range.');
            this.ui.content.focus(); // Important: Editor must have focus to restore selection
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            logger.log('No selection range to restore, focusing editor.');
            this.ui.content.focus();
        }
    }
    /**
     * Programmatically sets the content of the editor from an external source.
     * This is the dedicated method for Livewire to push updates into the editor.
     * @param {string} html The new HTML content.
     */
    setContent(html) {
        if (this.ui.content.innerHTML === html) return;
        this.ui.content.innerHTML = html;
        this.ui.code.value = html;
        this.ui.formInput.value = html;
    }

    destroy() {
        if (!this._initialized) return;
        logger.warn('Destroying instance, removing event listeners.');
        
        // V-- NEW: Disconnect the observer to prevent memory leaks --V
        if (this.contentObserver) {
            this.contentObserver.disconnect();
        }

        this.ui.code.removeEventListener('input', this.handlers.onCodeInput);
        this.ui.formInput.removeEventListener('input', this.handlers.onFormInput);
        this.ui.toolbar.removeEventListener('click', this.handlers.onToolbarClick);
        this.element.__editorInstance = null;
        this.element = null;
        this.ui = {};
        this.handlers = {};
        this._initialized = false;
        logger.log('Editor instance destroyed.');
    }
}

window.MSSEditor = Editor;
export default Editor;