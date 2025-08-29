/**
 * QR code generation and management
 */

import { ELEMENTS, CONFIG } from './config.js';
import { showMessage, setLoading, scrollToElement } from './ui-utils.js';
import { validateInput, sanitizeInput } from './validation.js';

class QRManager {
    constructor() {
        this.currentQRData = null;
        this.codesGenerated = parseInt(localStorage.getItem('codesGenerated')) || 0;
        this.updateCounter();
    }

    /**
     * Generate QR code and display it
     */
    async generate() {
        const qrcodeInput = ELEMENTS.qrcodeInput;
        const text = sanitizeInput(qrcodeInput.value);
        
        // Validate input
        const validation = validateInput(text);
        if (!validation.isValid) {
            showMessage(validation.message, 'error');
            qrcodeInput.focus();
            return;
        }

        setLoading(true);
        
        try {
            const qrCodeData = await this.fetchQRCode(text);
            this.handleSuccess(qrCodeData);
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Fetch QR code from server
     * @param {string} text - Text to encode
     * @returns {Promise<string>} QR code SVG data
     */
    async fetchQRCode(text) {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `text=${encodeURIComponent(text)}`
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const qrCodeData = await response.text();
        
        // Validate QR code data here - will be caught by try-catch in generate()
        if (!qrCodeData || !qrCodeData.trim()) {
            throw new Error('Invalid QR code data received');
        }
        
        return qrCodeData;
    }

    /**
     * Handle successful QR code generation
     * @param {string} qrCodeData - The SVG data of the QR code
     */
    handleSuccess(qrCodeData) {
        setLoading(false);
        
        // Store current QR data for download
        this.currentQRData = qrCodeData;
        
        // Parse and display the SVG
        const qrContainer = ELEMENTS.qrContainer;
        const qrSVG = new DOMParser().parseFromString(qrCodeData, 'image/svg+xml').documentElement;
        qrContainer.innerHTML = '';
        qrContainer.appendChild(qrSVG);
        
        // Show the QR code container
        const qrOutput = ELEMENTS.qrOutput;
        qrOutput.classList.remove('hidden');
        qrOutput.classList.add('fade-in');
        
        // Show download button
        const downloadBtn = ELEMENTS.downloadBtn;
        downloadBtn.classList.remove('hidden');
        
        // Update counter
        this.codesGenerated++;
        this.updateCounter();
        localStorage.setItem('codesGenerated', this.codesGenerated);
        
        showMessage('QR code generated successfully!', 'success', false);
        
        // Scroll to QR code
        scrollToElement(qrOutput, CONFIG.SCROLL_BEHAVIOR, CONFIG.SCROLL_BLOCK);
    }

    /**
     * Handle QR code generation error
     * @param {Error} error - The error that occurred
     */
    handleError(error) {
        setLoading(false);
        console.error('Error:', error);
        showMessage('Failed to generate QR code. Please try again.', 'error');
    }

    /**
     * Download the generated QR code as SVG file
     */
    download() {
        if (!this.currentQRData) {
            showMessage('No QR code to download', 'error');
            return;
        }

        try {
            // Create blob from SVG data
            const blob = new Blob([this.currentQRData], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            
            // Create download link
            const link = document.createElement('a');
            link.href = url;
            link.download = `qrcode-${Date.now()}.svg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up
            URL.revokeObjectURL(url);
            
            showMessage('QR code downloaded successfully!');
        } catch (error) {
            console.error('Download error:', error);
            showMessage('Failed to download QR code', 'error');
        }
    }

    /**
     * Update the codes generated counter
     */
    updateCounter() {
        const codesGeneratedElement = ELEMENTS.codesGeneratedElement;
        codesGeneratedElement.textContent = this.codesGenerated;
    }

    /**
     * Set input value and generate QR code
     * @param {string} text - Text to set and generate
     */
    setInputAndGenerate(text) {
        const qrcodeInput = ELEMENTS.qrcodeInput;
        qrcodeInput.value = text;
        this.generate();
    }
}

export const qrManager = new QRManager();

// Global functions for HTML onclick
window.generateQRCode = () => qrManager.generate();
window.downloadQRCode = () => qrManager.download();