/**
 * Theme management functionality
 */

import { ELEMENTS } from './config.js';

class ThemeManager {
    constructor() {
        this.isDarkTheme = localStorage.getItem('darkTheme') === 'true';
        this.themeIcon = ELEMENTS.themeIcon();
    }

    /**
     * Toggle between dark and light themes
     */
    toggle() {
        this.isDarkTheme = !this.isDarkTheme;
        localStorage.setItem('darkTheme', this.isDarkTheme);
        this.update();
    }

    /**
     * Update the theme based on current setting
     */
    update() {
        if (this.isDarkTheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.themeIcon.className = 'fas fa-sun';
        } else {
            document.documentElement.removeAttribute('data-theme');
            this.themeIcon.className = 'fas fa-moon';
        }
    }

    /**
     * Initialize theme on page load
     */
    initialize() {
        this.update();
    }
}

export const themeManager = new ThemeManager();

window.toggleTheme = () => themeManager.toggle();