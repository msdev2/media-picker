import MediaPicker from './components/MediaPicker.js';
import Editor from './components/Editor.js';
import ModalManager from './components/ModalManager.js';

/**
 * Init function that runs on page load and after Livewire navigation
 */
function initMediaSystem() {
    // 1. Initialize inline MediaPickers
    document.querySelectorAll('.ms-media-picker-container[data-is-inline="true"]').forEach(el => {
        // If already initialized, skip
        if (!el.__mediaPickerInstance) {
            el.__mediaPickerInstance = new MediaPicker(el, { isInline: true });
        }
    });

    // 2. Initialize Editors
    document.querySelectorAll('.ms-media-editor-container').forEach(el => {
        // Destroy old instance if Livewire re-rendered DOM
        if (el.__editorInstance && typeof el.__editorInstance.destroy === 'function') {
            el.__editorInstance.destroy();
            el.__editorInstance = null;
        }

        if (!el.__editorInstance) {
            el.__editorInstance = new Editor(el);
        }
    });
}

/**
 * Delegated event listener for modal trigger buttons
 * (works even if button is added later)
 * Bound only once globally
 */
if (!window.__MS_MEDIA_PICKER_BOUND__) {
    document.addEventListener('click', (e) => {
        const button = e.target.closest('button.ms-media-picker');
        if (!button) return;

        const selector = button.dataset.targetSelector;
        const type = button.dataset.targetType;

        const callback = (file) => {
            if (!selector || !type) return;
            const target = document.querySelector(selector);
            if (!target) {
                return console.error(`Target element "${selector}" not found.`);
            }

            if (type === 'input') {
                target.value = file.url;
                target.dispatchEvent(new Event('input', { bubbles: true }));
            }
            else if (type === 'image') {
                target.src = file.url;
            }
            else if (type === 'html') {
                target.innerHTML = `<img src="${file.url}" alt="${file.name}" style="max-width:100%;">`;
            }
        };

        const targetElement = selector ? document.querySelector(selector) : null;
        const acceptString = targetElement ? targetElement.accept : '';

        ModalManager.open(callback, acceptString, button);
    });

    window.__MS_MEDIA_PICKER_BOUND__ = true; // prevent double binding
}

/**
 * Init on normal DOM load
 */
document.addEventListener('DOMContentLoaded', initMediaSystem);

/**
 * Re-init after Livewire navigation (if Livewire is present)
 */
document.addEventListener('livewire:navigated', initMediaSystem);

export { initMediaSystem };
