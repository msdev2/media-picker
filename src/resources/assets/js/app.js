import MediaPicker from './components/MediaPicker.js';
import Editor from './components/Editor.js';
import ModalManager from './components/ModalManager.js';
// We don't need to import MoveModal here as it's a dependency of MediaPicker

document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize all inline pickers
    document.querySelectorAll('.ms-media-picker-container[data-is-inline="true"]').forEach(el => {
        new MediaPicker(el, { isInline: true });
    });

    // 2. Initialize all standalone modal trigger buttons
    document.querySelectorAll('button.ms-media-picker').forEach(button => {
        button.addEventListener('click', () => {
            const selector = button.dataset.targetSelector;
            const type = button.dataset.targetType;

            // This is for the automatic data-attribute functionality
            const callback = (file) => {
                if (!selector || !type) return; // Only run if data attributes are present
                const target = document.querySelector(selector);
                if (!target) return console.error(`Target element "${selector}" not found.`);
                if (type === 'input') target.value = file.url;
                else if (type === 'image') target.src = file.url;
                else if (type === 'html') target.innerHTML = `<img src="${file.url}" alt="${file.name}" style="max-width:100%;">`;
            };
            
            const targetElement = selector ? document.querySelector(selector) : null;
            const acceptString = targetElement ? targetElement.accept : '';
            
            // CRITICAL FIX: Pass the button itself as the trigger element.
            ModalManager.open(callback, acceptString, button);
        });
    });
    
    // 3. Initialize all editors
    document.querySelectorAll('.ms-media-editor-container').forEach(el => {
        new Editor(el);
    });
});