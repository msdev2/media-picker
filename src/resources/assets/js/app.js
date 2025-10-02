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
        } else {
            logger.log('MediaPicker instance already exists for element, skipping.', el);
        }
    });

    // 2. Initialize Editors
    // Note: Livewire can sometimes remove/re-add the entire container.
    // We need to re-initialize in those cases.
    document.querySelectorAll('.ms-media-editor-container').forEach(el => {
        logger.log('Processing editor container:', el);
        
        // Check if an instance already exists AND if it's still attached to the same DOM element.
        // If the element was morphed out and back in, __editorInstance might still exist
        // but refers to an old, detached DOM node.
        if (el.__editorInstance && typeof el.__editorInstance.destroy === 'function') {
            logger.warn('Forcing destruction of existing editor instance.');
            el.__editorInstance.destroy();
        }

        // If it exists but is invalid (e.g., element reference doesn't match, or not initialized), destroy it.
        if (el.__editorInstance && typeof el.__editorInstance.destroy === 'function') {
            logger.warn('Destroying potentially stale/invalid editor instance for element:', el);
            el.__editorInstance.destroy();
            el.__editorInstance = null;
        }
        
        // Create a new, clean instance
        logger.log('Creating new Editor instance for element:', el);
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

if (typeof Livewire !== 'undefined') {
    // Use Livewire's official hook to re-initialize after every component update.
    // The setTimeout is CRITICAL to prevent a race condition where the script
    // runs before Livewire has finished updating the DOM tree.
    Livewire.hook('morph.updated', (component) => { // 'component' argument can be useful for targeted updates
        // Even if it's a specific component update, we still need to re-scan for all editors
        // unless you can target the re-initialization very precisely.
        setTimeout(() => {
            logger.log('Executing initMediaSystem inside setTimeout after morph.updated.');
            initMediaSystem();
        }, 10); 
    });

    // Consider also 'element.added' hook if Livewire might add new editor components dynamically
    Livewire.hook('element.added', (el) => {
        if (el.matches && el.matches('.ms-media-editor-container')) {
            logger.log('Livewire element.added hook fired for editor container:', el);
            setTimeout(() => {
                if (!el.__editorInstance) {
                    logger.log('Initializing new editor from element.added hook.', el);
                    el.__editorInstance = new Editor(el);
                }
            }, 0);
        }
        // Also check for children if the added element is a parent of an editor
        el.querySelectorAll('.ms-media-editor-container').forEach(childEl => {
            if (!childEl.__editorInstance) {
                logger.log('Initializing new editor from element.added hook (child).', childEl);
                childEl.__editorInstance = new Editor(childEl);
            }
        });
    });
}

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
            if (!selector) {
                logger.warn('No target selector defined for media picker button, cannot apply file.');
                return;
            }
            const target = document.querySelector(selector);
            if (!target) {
                return logger.error(`Target element "${selector}" not found.`);
            }

            // Handle preview logic
            if (preview) {
                const imgPreview = document.querySelector(preview);
                const imgPreviewDiv = document.querySelector(preview + "_preview");
                if (imgPreview) imgPreview.src = file.url;
                if (imgPreviewDiv) imgPreviewDiv.style.display = "block";
            }

            // Apply file based on type
            if (type === 'input') {
                target.value = file.path;
                logger.log('Dispatching "input" event for Livewire to update target input.', target);
                target.dispatchEvent(new Event('input', { bubbles: true }));
            }
            else if (type === 'image') {
                target.src = file.url;
            }
            else if (type === 'html') {
                target.innerHTML = `<img src="${file.url}" alt="${file.name}" style="max-width:100%;">`;
            } else {
                logger.warn(`Unknown target type for media picker: ${type}`);
            }
        };

        const targetElement = selector ? document.querySelector(selector) : null;
        const acceptString = targetElement ? targetElement.accept : ''; // Assuming target has an 'accept' attribute

        ModalManager.open(callback, acceptString, button);
    });

    window.__MS_MEDIA_PICKER_BOUND__ = true;
}

export { initMediaSystem };