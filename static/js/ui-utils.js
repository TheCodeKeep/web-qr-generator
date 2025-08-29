/**
 * UI utility functions for messages, loading states, and animations
 */

import { ELEMENTS } from './config.js';

/**
 * Show a message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of message ('success' or 'error')
 */
export function showMessage(message, type = 'success') {
    clearMessages();
    const messageContainer = ELEMENTS.messageContainer;
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message fade-in`;
    
    const icon = type === 'success' ? 'check-circle' : 'exclamation-triangle';
    messageDiv.innerHTML = `<i class="fas fa-${icon}" aria-hidden="true"></i> ${message}`;
    
    messageContainer.appendChild(messageDiv);
}

/**
 * Clear all messages
 */
export function clearMessages() {
    const messageContainer = ELEMENTS.messageContainer;
    const messages = messageContainer.querySelectorAll('.success-message, .error-message');
    
    if (messages.length === 0) return;
    
    // Add fade-out animation to all messages
    messages.forEach(message => {
        message.classList.add('fade-out');
    });
    
    // Remove messages after animation completes
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 250); // Match CSS transition duration
}

/**
 * Clear the QR code output area
 * @param {object} qrManager - The QR manager instance
 */
export function clearQROutput(qrManager) {
    const qrOutput = ELEMENTS.qrOutput;
    const downloadBtn = ELEMENTS.downloadBtn;
    const qrContainer = ELEMENTS.qrContainer;

    // Only animate if QR output is currently visible
    if (qrOutput.classList.contains('hidden')) return;

    // Start fade-out animation
    qrOutput.classList.add('fade-out');
    downloadBtn.classList.add('fade-out');

    // After animation completes, hide elements and clean up
    setTimeout(() => {
        // Hide the QR output area
        qrOutput.classList.add('hidden');
        qrOutput.classList.remove('fade-in', 'fade-out');

        // Hide the download button
        downloadBtn.classList.add('hidden');
        downloadBtn.classList.remove('fade-out');

        // Clear the QR container content
        qrContainer.innerHTML = '';

        // Clear the current QR data in the manager
        if (qrManager) {
            qrManager.currentQRData = null;
        }
    }, 300); // Match CSS transition duration
}

/**
 * Set the loading state of the generate button
 * @param {boolean} loading - Whether to show loading state
 */
export function setLoading(loading) {
    const generateBtn = ELEMENTS.generateBtn;
    const btnText = generateBtn.querySelector('span');
    let btnIcon = generateBtn.querySelector('i');
    
    // If the icon is missing, recreate it
    if (!btnIcon) {
        btnIcon = document.createElement('i');
        btnIcon.className = 'fas fa-magic';
        btnIcon.setAttribute('aria-hidden', 'true');
        generateBtn.insertBefore(btnIcon, btnText);
    }
    
    if (loading) {
        generateBtn.disabled = true;
        // Store original icon classes if not already stored
        if (!btnIcon.dataset.originalClass) {
            btnIcon.dataset.originalClass = btnIcon.className;
        }
        btnIcon.classList.remove('fa-magic');
        btnIcon.classList.add('fa-spinner', 'fa-spin');
        btnText.textContent = 'Generating...';
    } else {
        generateBtn.disabled = false;
        btnIcon.classList.remove('fa-spinner', 'fa-spin');
        // Restore original icon classes if stored
        if (btnIcon.dataset.originalClass) {
            btnIcon.className = btnIcon.dataset.originalClass;
            delete btnIcon.dataset.originalClass;
        } else {
            // Fallback to default if no original class was stored
            btnIcon.classList.add('fa-magic');
        }
        btnText.textContent = 'Generate QR Code';
    }
}

/**
 * Scroll to an element smoothly
 * @param {HTMLElement} element - The element to scroll to
 * @param {string} behavior - Scroll behavior ('smooth' or 'auto')
 * @param {string} block - Scroll block position ('center', 'start', 'end')
 */
export function scrollToElement(element, behavior = 'smooth', block = 'center') {
    element.scrollIntoView({ behavior, block });
}

/**
 * Debounced clear function to prevent rapid clearing while typing
 */
let clearTimeoutId = null;

export function debouncedClearQROutput(qrManager) {
    // Clear any existing timeout
    if (clearTimeoutId) {
        clearTimeout(clearTimeoutId);
    }

    // Set a new timeout for smoother experience
    clearTimeoutId = setTimeout(() => {
        clearQROutput(qrManager);
        clearTimeoutId = null;
    }, 50);
}