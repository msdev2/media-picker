import MediaPicker from './components/MediaPicker.js';
import Editor from './components/Editor.js';
import ModalManager from './utils/ModalManager.js';
import Logger from './utils/Logger.js';

const logger = new Logger('App');

/**
 * The core initialization function.
 */
function initMediaSystem() {
    logger.log('Running initMediaSystem...');

    // 1. Initialize inline MediaPickers
    document.querySelectorAll('.ms-media-picker-container[data-is-inline="true"]').forEach(el => {
        if (!el.__mediaPickerInstance) {
            logger.log('Found new inline MediaPicker to initialize.', el);
            el.__mediaPickerInstance = new MediaPicker(el, { isInline: true });
        }
    });

    // 2. Initialize Editors
    document.querySelectorAll('.ms-media-editor-container').forEach(el => {
        logger.log('Found an editor container:', el);
        // Destroy old instance if it exists to prevent zombie listeners
        if (el.__editorInstance && typeof el.__editorInstance.destroy === 'function') {
            logger.log('Destroying existing editor instance.');
            el.__editorInstance.destroy();
            el.__editorInstance = null;
        }
        
        // Create a new, clean instance
        logger.log('Creating new Editor instance...');
        el.__editorInstance = new Editor(el);
    });
}

/**
 * =======================================================================
 *  LIFECYCLE & LIVEWIRE INTEGRATION
 * =======================================================================
 */

// Initialize on the first page load
document.addEventListener('DOMContentLoaded', () => {
    logger.info('Initial DOM Load. Firing initMediaSystem.');
    initMediaSystem();
});

// Use Livewire's official hook to re-initialize after every component update.
// The setTimeout is CRITICAL to prevent a race condition where the script
// runs before Livewire has finished updating the DOM tree.
Livewire.hook('morph.updated', () => {
    logger.info('Livewire morph.updated hook fired!');
    setTimeout(() => {
        logger.log('Executing initMediaSystem inside setTimeout.');
        initMediaSystem();
    }, 0); 
});

/**
 * =======================================================================
 *  MODAL TRIGGER (Delegated Event Listener)
 * =======================================================================
 */
if (!window.__MS_MEDIA_PICKER_BOUND__) {
    logger.log('Binding global media picker modal trigger.');
    document.addEventListener('click', (e) => {
        const button = e.target.closest('button.ms-media-picker');
        if (!button) return;

        logger.log('Media Picker button clicked.', button);

        const selector = button.dataset.targetSelector;
        const preview = button.dataset.targetPreview;
        const type = button.dataset.targetType;

        const callback = (file) => {
            logger.log('File selection callback triggered with file:', file);
            if (!selector || !type) return;
            const target = document.querySelector(selector);
            if (!target) {
                return logger.error(`Target element "${selector}" not found.`);
            }
            if (typeof preview != "undefined" && preview) {
                const imgPreview = document.querySelector(preview);
                const imgPreviewDiv = document.querySelector(preview+"_preview");
                if(imgPreview) imgPreview.src = file.url;
                if(imgPreviewDiv)imgPreviewDiv.style.display = "block";
            }
            if (type === 'input') {
                target.value = file.path;
                logger.log('Dispatching "input" event for Livewire.', target);
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

    window.__MS_MEDIA_PICKER_BOUND__ = true;
}

export { initMediaSystem };