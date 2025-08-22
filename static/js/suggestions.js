/**
 * Suggestions management and UI
 */

import { ELEMENTS, SUGGESTIONS } from './config.js';
import { qrManager } from './qr-manager.js';

class SuggestionsManager {
    /**
     * Toggle suggestions section expansion
     */
    toggle() {
        const suggestionsContent = ELEMENTS.suggestionsContent();
        const expandIcon = ELEMENTS.expandIcon();
        const expandableHeader = ELEMENTS.expandableHeader();
        
        if (suggestionsContent.classList.contains('collapsed')) {
            suggestionsContent.classList.remove('collapsed');
            suggestionsContent.classList.add('expanded');
            expandIcon.classList.add('expanded');
            expandableHeader.setAttribute('aria-expanded', 'true');
        } else {
            suggestionsContent.classList.remove('expanded');
            suggestionsContent.classList.add('collapsed');
            expandIcon.classList.remove('expanded');
            expandableHeader.setAttribute('aria-expanded', 'false');
        }
    }

    /**
     * Populate suggestions in the UI using proper button elements
     */
    populate() {
        const suggestionsContainer = ELEMENTS.suggestionsContainer();
        if (!suggestionsContainer) return;
        
        suggestionsContainer.innerHTML = '';
        
        SUGGESTIONS.forEach((suggestion) => {
            // Create proper button element for accessibility
            const suggestionButton = document.createElement('button');
            suggestionButton.className = 'suggestion-item';
            suggestionButton.type = 'button';
            suggestionButton.setAttribute('aria-label', `Use ${suggestion.label} as QR code content`);
            suggestionButton.innerHTML = `
                <i class="${suggestion.icon}" aria-hidden="true"></i>
                <span>${suggestion.label}</span>
            `;
            
            // Add click event listener
            suggestionButton.addEventListener('click', () => this.addSuggestion(suggestion.text));
            
            // Add keyboard support for Enter and Space
            suggestionButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.addSuggestion(suggestion.text);
                }
            });
            
            suggestionsContainer.appendChild(suggestionButton);
        });
    }

    /**
     * Add suggestion functionality
     * @param {string} text - The text to set as input and generate QR code for
     */
    addSuggestion(text) {
        qrManager.setInputAndGenerate(text);
    }
}

export const suggestionsManager = new SuggestionsManager();

// Global function for HTML onclick
window.toggleSuggestions = () => suggestionsManager.toggle();