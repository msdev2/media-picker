/**
 * A centralized logger utility for the Media Picker package.
 * It reads a global debug flag to decide whether to print logs.
 */
class Logger {
    /**
     * @param {string} module The name of the module (e.g., 'App', 'Editor') to prefix logs with.
     */
    constructor(module) {
        this.module = module;
        this.isDebug = window.mediaPickerDebug === true;
    }

    /**
     * Standard log output.
     * @param  {...any} args The content to log.
     */
    log(...args) {
        if (this.isDebug) {
            console.log(`[${this.module}]`, ...args);
        }
    }

    /**
     * Styled info output (green and bold).
     * @param  {...any} args The content to log.
     */
    info(...args) {
        if (this.isDebug) {
            console.log(`%c[${this.module}]`, 'color: green; font-weight: bold;', ...args);
        }
    }
    
    /**
     * Warning output.
     * @param  {...any} args The content to log.
     */
    warn(...args) {
        if (this.isDebug) {
            console.warn(`[${this.module}]`, ...args);
        }
    }

    /**
     * Error output.
     * @param  {...any} args The content to log.
     */
    error(...args) {
        // Errors are always logged, regardless of debug status, as they are critical.
        console.error(`[${this.module}]`, ...args);
    }
}

export default Logger;
