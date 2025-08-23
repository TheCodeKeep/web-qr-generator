/**
 * Configuration and constants for the QR Generator
 */

export const CONFIG = {
    MAX_INPUT_LENGTH: 500,
    SCROLL_BEHAVIOR: 'smooth',
    SCROLL_BLOCK: 'center'
};

export const SUGGESTIONS = [
    { text: 'https://github.com', icon: 'fab fa-github', label: 'GitHub Profile' },
    { text: 'mailto:contact@example.com', icon: 'fas fa-envelope', label: 'Email Address' },
    { text: 'tel:+1234567890', icon: 'fas fa-phone', label: 'Phone Number' },
    { text: 'Hello World!', icon: 'fas fa-comment', label: 'Simple Text' },
    { text: 'https://www.example.com', icon: 'fas fa-globe', label: 'Website URL' },
    { text: 'WiFi:T:WPA;S:MyNetwork;P:your_password;H:false;;', icon: 'fas fa-wifi', label: 'WiFi Network' }
];

export const ELEMENTS = (() => {
    const cache = {};
    return {
        get qrContainer() {
            if (!cache.qrContainer) {
                cache.qrContainer = document.getElementById('qr-container');
            }
            return cache.qrContainer;
        },
        get qrcodeInput() {
            if (!cache.qrcodeInput) {
                cache.qrcodeInput = document.getElementById('qrcode_input');
            }
            return cache.qrcodeInput;
        },
        get generateBtn() {
            if (!cache.generateBtn) {
                cache.generateBtn = document.getElementById('generate-btn');
            }
            return cache.generateBtn;
        },
        get downloadBtn() {
            if (!cache.downloadBtn) {
                cache.downloadBtn = document.getElementById('download-btn');
            }
            return cache.downloadBtn;
        },
        get qrOutput() {
            if (!cache.qrOutput) {
                cache.qrOutput = document.getElementById('qr-output');
            }
            return cache.qrOutput;
        },
        get messageContainer() {
            if (!cache.messageContainer) {
                cache.messageContainer = document.getElementById('message-container');
            }
            return cache.messageContainer;
        },
        get codesGeneratedElement() {
            if (!cache.codesGeneratedElement) {
                cache.codesGeneratedElement = document.getElementById('codes-generated');
            }
            return cache.codesGeneratedElement;
        },
        get themeIcon() {
            if (!cache.themeIcon) {
                cache.themeIcon = document.getElementById('theme-icon');
            }
            return cache.themeIcon;
        },
        get suggestionsContent() {
            if (!cache.suggestionsContent) {
                cache.suggestionsContent = document.getElementById('suggestions-content');
            }
            return cache.suggestionsContent;
        },
        get expandIcon() {
            if (!cache.expandIcon) {
                cache.expandIcon = document.getElementById('expand-icon');
            }
            return cache.expandIcon;
        },
        get expandableHeader() {
            if (!cache.expandableHeader) {
                cache.expandableHeader = document.querySelector('.expandable-header');
            }
            return cache.expandableHeader;
        },
        get suggestionsContainer() {
            if (!cache.suggestionsContainer) {
                cache.suggestionsContainer = document.getElementById('suggestions-container');
            }
            return cache.suggestionsContainer;
        },
        // Optional: Method to clear cache if needed (for testing or dynamic DOM changes)
        clearCache() {
            Object.keys(cache).forEach(key => delete cache[key]);
        }
    };
})();