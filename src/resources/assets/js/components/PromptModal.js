class PromptModal {
    constructor() {
        this.element = null;
        this.promise = null;
        this.config = null;
    }

    open(config = {}) {
        this.config = {
            title: 'Enter a value',
            confirmText: 'OK',
            fields: [], // Expects an array of field objects
            ...config
        };

        return new Promise(resolve => {
            this.promise = { resolve };
            this._createModalElement();
            this.attachEventListeners();
            this.element.style.display = 'flex';
            
            // Focus the first text input
            const firstInput = this.element.querySelector('input[type="text"], input[type="url"]');
            if (firstInput) {
                firstInput.focus();
                firstInput.select();
            }
        });
    }

    _createModalElement() {
        const modalDiv = document.createElement('div');
        modalDiv.className = 'ms-dialog-backdrop';

        const fieldsHTML = this.config.fields.map(field => {
            if (field.type === 'checkbox') {
                return `
                    <div class="ms-dialog-group checkbox">
                        <input type="checkbox" id="ms-prompt-input-${field.name}" name="${field.name}" ${field.checked ? 'checked' : ''}>
                        <label for="ms-prompt-input-${field.name}">${field.label}</label>
                    </div>
                `;
            }
            // Default to text/url input
            return `
                <div class="ms-dialog-group">
                    <label for="ms-prompt-input-${field.name}">${field.label}</label>
                    <input type="${field.type || 'text'}" id="ms-prompt-input-${field.name}" name="${field.name}" value="${field.value || ''}" placeholder="${field.placeholder || ''}">
                </div>
            `;
        }).join('');

        modalDiv.innerHTML = `
            <div class="ms-dialog-content">
                <div class="ms-dialog-header">
                    <h4>${this.config.title}</h4>
                    <button type="button" class="ms-dialog-close">&times;</button>
                </div>
                <div class="ms-dialog-body">${fieldsHTML}</div>
                <div class="ms-dialog-footer">
                    <button type="button" class="ms-media-btn ms-prompt-cancel-btn">Cancel</button>
                    <button type="button" class="ms-media-btn ms-media-btn-primary ms-prompt-confirm-btn">${this.config.confirmText}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modalDiv);
        this.element = modalDiv;
    }
    
    attachEventListeners() {
        const confirmBtn = this.element.querySelector('.ms-prompt-confirm-btn');
        const cancelBtn = this.element.querySelector('.ms-prompt-cancel-btn');
        const closeBtn = this.element.querySelector('.ms-dialog-close');
        
        confirmBtn.onclick = () => this._handleConfirm();
        cancelBtn.onclick = () => this._resolveAndClose(null);
        closeBtn.onclick = () => this._resolveAndClose(null);
        this.element.addEventListener('click', e => { if(e.target === this.element) this._resolveAndClose(null); });
    }
    
    _handleConfirm() {
        const result = {};
        this.config.fields.forEach(field => {
            const input = this.element.querySelector(`[name="${field.name}"]`);
            if (input) {
                result[field.name] = field.type === 'checkbox' ? input.checked : input.value;
            }
        });
        this._resolveAndClose(result);
    }

    _resolveAndClose(value) {
        if (this.promise) this.promise.resolve(value);
        this.element.remove();
    }
}

export default PromptModal;