/**
 * Input validation utilities
 */

import { CONFIG } from './config.js';

/**
 * Validate user input for QR code generation
 * @param {string} text - The text to validate
 * @returns {object} Validation result with isValid and message properties
 */
export function validateInput(text) {
    if (!text) {
        return {
            isValid: false,
            message: 'Please enter some text to generate a QR code'
        };
    }

    if (text.length > CONFIG.MAX_INPUT_LENGTH) {
        return {
            isValid: false,
            message: `Text is too long. Please keep it under ${CONFIG.MAX_INPUT_LENGTH} characters.`
        };
    }

    return { isValid: true };
}

/**
 * Sanitize text input for safe processing
 * @param {string} text - The text to sanitize
 * @returns {string} Sanitized text
 */
export function sanitizeInput(text) {
    return text.trim();
}