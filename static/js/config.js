/**
 * Configuration and constants for the QR Generator
 */

export const CONFIG = {
    MAX_INPUT_LENGTH: 500,
    SCROLL_BEHAVIOR: 'smooth',
    SCROLL_BLOCK: 'center',
    // Animation durations to match CSS transitions
    ANIMATION_DURATIONS: {
        MESSAGE_FADE: 250, // Match CSS transition duration for messages
        QR_OUTPUT_FADE: 300 // Match CSS transition duration for QR output
    },
    // Debounce delays for user interactions
    DEBOUNCE_DELAYS: {
        QR_CLEAR: 50 // Delay for debouncing QR output clearing while typing
    }
};

export const SUGGESTIONS = [
    { text: 'https://github.com', icon: 'fab fa-github', label: 'GitHub Profile' },
    { text: 'mailto:contact@example.com', icon: 'fas fa-envelope', label: 'Email Address' },
    { text: 'tel:+1234567890', icon: 'fas fa-phone', label: 'Phone Number' },
    { text: 'Hello World!', icon: 'fas fa-comment', label: 'Simple Text' },
    { text: 'https://www.example.com', icon: 'fas fa-globe', label: 'Website URL' },
    { text: 'WiFi:T:WPA;S:MyNetwork;P:your_password;H:false;;', icon: 'fas fa-wifi', label: 'WiFi Network' }
];

/**
 * Cached DOM elements (via module-based singleton)
 *
 * IMPORTANT: This implementation assumes that DOM elements are static and never
 * removed or replaced during the application lifecycle. This is safe for this
 * QR Generator application as it only modifies element content/classes, never
 * removes or replaces elements from the DOM.
 * 
 * If future modifications involve dynamic DOM manipulation (adding/removing elements),
 * consider using ELEMENTS.clearCache() or adding validation to detect stale references.
 * E.g.:
 * get generateBtn() {
 *    if (!cache.generateBtn || !cache.generateBtn.isConnected) {
 *       cache.generateBtn = document.getElementById('generate-btn');
 *    }
 *    return cache.generateBtn;
 * },
 */
export const ELEMENTS = (() => {
    let cache = new Map();
    return {
        get qrContainer() {
            if (!cache.has('qrContainer')) {
                cache.set('qrContainer', document.getElementById('qr-container'));
            }
            return cache.get('qrContainer');
        },
        get qrcodeInput() {
            if (!cache.has('qrcodeInput')) {
                cache.set('qrcodeInput', document.getElementById('qrcode_input'));
            }
            return cache.get('qrcodeInput');
        },
        get generateBtn() {
            if (!cache.has('generateBtn')) {
                cache.set('generateBtn', document.getElementById('generate-btn'));
            }
            return cache.get('generateBtn');
        },
        get downloadBtn() {
            if (!cache.has('downloadBtn')) {
                cache.set('downloadBtn', document.getElementById('download-btn'));
            }
            return cache.get('downloadBtn');
        },
        get qrOutput() {
            if (!cache.has('qrOutput')) {
                cache.set('qrOutput', document.getElementById('qr-output'));
            }
            return cache.get('qrOutput');
        },
        get messageContainer() {
            if (!cache.has('messageContainer')) {
                cache.set('messageContainer', document.getElementById('message-container'));
            }
            return cache.get('messageContainer');
        },
        get codesGeneratedElement() {
            if (!cache.has('codesGeneratedElement')) {
                cache.set('codesGeneratedElement', document.getElementById('codes-generated'));
            }
            return cache.get('codesGeneratedElement');
        },
        get themeIcon() {
            if (!cache.has('themeIcon')) {
                cache.set('themeIcon', document.getElementById('theme-icon'));
            }
            return cache.get('themeIcon');
        },
        get suggestionsContent() {
            if (!cache.has('suggestionsContent')) {
                cache.set('suggestionsContent', document.getElementById('suggestions-content'));
            }
            return cache.get('suggestionsContent');
        },
        get expandIcon() {
            if (!cache.has('expandIcon')) {
                cache.set('expandIcon', document.getElementById('expand-icon'));
            }
            return cache.get('expandIcon');
        },
        get expandableHeader() {
            if (!cache.has('expandableHeader')) {
                cache.set('expandableHeader', document.querySelector('.expandable-header'));
            }
            return cache.get('expandableHeader');
        },
        get suggestionsContainer() {
            if (!cache.has('suggestionsContainer')) {
                cache.set('suggestionsContainer', document.getElementById('suggestions-container'));
            }
            return cache.get('suggestionsContainer');
        },
        clearCache() {
            cache.clear();
        }
    };
})();