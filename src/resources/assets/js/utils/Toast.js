class Toast {
    static container = null;

    // A private helper to create the toast container if it doesn't exist.
    static _getContainer() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'ms-toast-container';
            document.body.appendChild(this.container);

            // Add the necessary CSS animations to the document head once.
            if (!document.getElementById('ms-toast-animations')) {
                const style = document.createElement('style');
                style.id = 'ms-toast-animations';
                style.innerHTML = `
                    @keyframes ms-toast-fade-in {
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes ms-toast-fade-out {
                        to { opacity: 0; transform: translateY(20px); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        return this.container;
    }

    // The public method to show a toast.
    static show(message, type = 'info', duration = 3000) {
        const container = this._getContainer();

        const toast = document.createElement('div');
        toast.className = `ms-toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);

        // Set a timeout to automatically remove the toast.
        setTimeout(() => {
            toast.style.animation = 'ms-toast-fade-out 0.3s forwards';
            // Listen for the animation to end before removing the element.
            toast.addEventListener('animationend', () => toast.remove());
        }, duration);
    }
}

export default Toast;