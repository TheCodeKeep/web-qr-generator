/**
 * Main QR Generator Application
 */

import { themeManager } from './theme.js';
import { qrManager } from './qr-manager.js';
import { suggestionsManager } from './suggestions.js';
import { setupEventListeners } from './event-handlers.js';

/**
 * App initialization
 */
function initializeApp() {
    try {
        // Initialize theme
        themeManager.initialize();
        
        // Setup event listeners
        setupEventListeners();
        
        // Populate suggestions
        suggestionsManager.populate();
        
        console.log('QR Generator initialized successfully');
    } catch (error) {
        console.error('Failed to initialize QR Generator:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);