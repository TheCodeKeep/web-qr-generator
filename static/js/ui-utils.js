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
    const messageContainer = ELEMENTS.messageContainer();
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
    const messageContainer = ELEMENTS.messageContainer();
    messageContainer.innerHTML = '';
}

/**
 * Set the loading state of the generate button
 * @param {boolean} loading - Whether to show loading state
 */
export function setLoading(loading) {
    const generateBtn = ELEMENTS.generateBtn();
    const btnText = generateBtn.querySelector('span');
    const btnIcon = generateBtn.querySelector('i');
    
    if (loading) {
        generateBtn.disabled = true;
        btnIcon.classList.remove('fa-magic');
        btnIcon.classList.add('fa-spinner', 'fa-spin');
        btnText.textContent = 'Generating...';
    } else {
        generateBtn.disabled = false;
        btnIcon.classList.remove('fa-spinner', 'fa-spin');
        btnIcon.classList.add('fa-magic');
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