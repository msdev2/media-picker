import MediaPicker from './components/MediaPicker.js';
import Editor from './components/Editor.js';
import ModalManager from './components/ModalManager.js';

/**
 * Initialize inline pickers and editors
 */
function initApp(root = document) {
    // 1. Initialize inline pickers
    root.querySelectorAll('.ms-media-picker-container[data-is-inline="true"]').forEach(el => {
        if (!el.dataset.initialized) {
            const picker = new MediaPicker(el, { isInline: true });
            el._instance = picker; // keep reference
            el.dataset.initialized = "true";
            console.log('[MediaPicker] Initialized inline picker:', el);
        }
    });

    // 2. Initialize editors
    root.querySelectorAll('.ms-media-editor-container').forEach(el => {
        if (!el.dataset.initialized) {
            const editor = new Editor(el);
            el._instance = editor; // keep reference
            el.dataset.initialized = "true";
            console.log('[Editor] Initialized:', el);
        }
    });
}

/**
 * Delegated event listener for modal trigger buttons
 * (works even if button is added later)
 */
document.addEventListener('click', (e) => {
    const button = e.target.closest('.ms-media-picker');
    if (!button) return;

    const selector = button.dataset.targetSelector;
    const type = button.dataset.targetType;

    const callback = (file) => {
        if (!selector || !type) return;
        const target = document.querySelector(selector);
        if (!target) return console.error(`Target element "${selector}" not found.`);

        if (type === 'input') target.value = file.url;
        else if (type === 'image') target.src = file.url;
        else if (type === 'html') target.innerHTML = `<img src="${file.url}" alt="${file.name}" style="max-width:100%;">`;
    };

    const targetElement = selector ? document.querySelector(selector) : null;
    const acceptString = targetElement ? targetElement.accept : '';

    ModalManager.open(callback, acceptString, button);
});

/**
 * Run on initial load
 */
document.addEventListener('DOMContentLoaded', () => initApp(document));

/**
 * Livewire hooks (if present)
 */
if (window.Livewire) {
    // Livewire v3
    document.addEventListener('livewire:navigated', () => initApp(document));

    // Livewire v2
    document.addEventListener('livewire:update', () => initApp(document));
    document.addEventListener('livewire:load', () => initApp(document));
}

/**
 * MutationObserver to:
 *  - auto-init new pickers/editors
 *  - cleanup removed ones (destroy)
 */
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        // Handle added nodes
        mutation.addedNodes.forEach(node => {
            if (!(node instanceof HTMLElement)) return;
            initApp(node);
        });

        // Handle removed nodes (cleanup)
        mutation.removedNodes.forEach(node => {
            if (!(node instanceof HTMLElement)) return;

            // Destroy MediaPicker/Editor if attached
            if (node._instance && typeof node._instance.destroy === 'function') {
                node._instance.destroy();
                console.log('[Cleanup] Destroyed instance for:', node);
            }

            // Also check children
            node.querySelectorAll?.('.ms-media-picker-container[data-is-inline="true"], .ms-media-editor-container')
                .forEach(el => {
                    if (el._instance && typeof el._instance.destroy === 'function') {
                        el._instance.destroy();
                        console.log('[Cleanup] Destroyed instance for child:', el);
                    }
                });
        });
    }
});

observer.observe(document.body, { childList: true, subtree: true });
