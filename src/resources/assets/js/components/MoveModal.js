class MoveModal {
    constructor() {
        this.element = null; // Will be created when opened
        this.promise = null;
        this.state = { selectedPath: null };
        
        // Bind event handlers to `this` instance to prevent scope issues
        this._handleTreeClick = this._handleTreeClick.bind(this);
        this._handleConfirmClick = this._handleConfirmClick.bind(this);
        this._handleCancelClick = this._handleCancelClick.bind(this);
        this._handleBackdropClick = this._handleBackdropClick.bind(this);
    }

    // This is the single entry point to use the modal
    open(directoryTree, currentPath) {
        return new Promise(resolve => {
            this.promise = { resolve };
            this._createModalElement(); // 1. Create the DOM element
            this.render(directoryTree, currentPath); // 2. Populate it with data
            this.attachEventListeners(); // 3. Attach listeners to the now-existing elements
            this.element.style.display = 'flex';
        });
    }

    _createModalElement() {
        // Creates the modal from a string and appends it to the body
        const modalDiv = document.createElement('div');
        modalDiv.className = 'ms-media-folder-modal-backdrop';
        modalDiv.innerHTML = `
            <div class="ms-media-folder-modal-content">
                <h4>Select Destination Folder</h4>
                <div class="ms-media-folder-modal-tree"></div>
                <div class="ms-media-folder-modal-actions">
                    <button type="button" class="ms-media-btn ms-folder-modal-cancel-btn">Cancel</button>
                    <button type="button" class="ms-media-btn ms-media-btn-primary ms-folder-modal-move-btn" disabled>Move Here</button>
                </div>
            </div>
        `;
        document.body.appendChild(modalDiv);
        this.element = modalDiv;
    }

    render(nodes, currentPath) {
        // This recursive function builds the nested <ul> list
        const buildTreeHTML = (nodeArray) => {
            let html = '<ul>';
            nodeArray.forEach(node => {
                const isDisabled = node.path === currentPath;
                html += `<li><a href="#" class="${isDisabled ? 'disabled' : ''}" data-path="${node.path}" title="${isDisabled ? 'Current folder' : ''}">📁 ${node.name}</a>`;
                if (node.children && node.children.length > 0) {
                    html += buildTreeHTML(node.children);
                }
                html += '</li>';
            });
            html += '</ul>';
            return html;
        };
        this.element.querySelector('.ms-media-folder-modal-tree').innerHTML = buildTreeHTML(nodes);
    }
    
    attachEventListeners() {
        // Now that the element exists, we can safely query it and attach listeners
        this.ui = {
            tree: this.element.querySelector('.ms-media-folder-modal-tree'),
            moveBtn: this.element.querySelector('.ms-media-folder-modal-move-btn'),
            cancelBtn: this.element.querySelector('.ms-media-folder-modal-cancel-btn'),
        };
        this.ui.tree.addEventListener('click', this._handleTreeClick);
        this.ui.moveBtn.addEventListener('click', this._handleConfirmClick);
        this.ui.cancelBtn.addEventListener('click', this._handleCancelClick);
        this.element.addEventListener('click', this._handleBackdropClick);
    }

    _handleTreeClick(e) {
        e.preventDefault();
        const link = e.target.closest('a');
        if (link && !link.classList.contains('disabled')) {
            this.ui.tree.querySelectorAll('a').forEach(el => el.classList.remove('selected'));
            link.classList.add('selected');
            this.state.selectedPath = link.dataset.path;
            this.ui.moveBtn.disabled = false;
        }
    }

    _handleConfirmClick() {
        this._resolveAndClose(this.state.selectedPath);
    }

    _handleCancelClick() {
        this._resolveAndClose(null);
    }
    
    _handleBackdropClick(e) {
        if (e.target === this.element) this._resolveAndClose(null);
    }

    _resolveAndClose(value) {
        if (this.promise) this.promise.resolve(value);
        this.element.remove(); // Clean up the DOM element
    }
}
export default MoveModal;