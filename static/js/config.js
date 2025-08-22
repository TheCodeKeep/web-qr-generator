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

export const ELEMENTS = {
    qrContainer: () => document.getElementById('qr-container'),
    qrcodeInput: () => document.getElementById('qrcode_input'),
    generateBtn: () => document.getElementById('generate-btn'),
    downloadBtn: () => document.getElementById('download-btn'),
    qrOutput: () => document.getElementById('qr-output'),
    messageContainer: () => document.getElementById('message-container'),
    codesGeneratedElement: () => document.getElementById('codes-generated'),
    themeIcon: () => document.getElementById('theme-icon'),
    suggestionsContent: () => document.getElementById('suggestions-content'),
    expandIcon: () => document.getElementById('expand-icon'),
    expandableHeader: () => document.querySelector('.expandable-header'),
    suggestionsContainer: () => document.getElementById('suggestions-container')
};