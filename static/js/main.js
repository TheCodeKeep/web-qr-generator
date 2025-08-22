/**
 * QR Generator JavaScript
 * Handles QR code generation, theme switching, and user interactions
 */

// Initialize variables
const qrContainer = document.getElementById('qr-container');
const qrcodeInput = document.getElementById('qrcode_input');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrOutput = document.getElementById('qr-output');
const messageContainer = document.getElementById('message-container');
const codesGeneratedElement = document.getElementById('codes-generated');
const themeIcon = document.getElementById('theme-icon');

// Initialize theme and state
let isDarkTheme = localStorage.getItem('darkTheme') === 'true';
let codesGenerated = parseInt(localStorage.getItem('codesGenerated')) || 0;
let currentQRData = null;

// Sample suggestions for QR codes
const suggestions = [
    { text: 'https://github.com', icon: 'fab fa-github', label: 'GitHub Profile' },
    { text: 'mailto:contact@example.com', icon: 'fas fa-envelope', label: 'Email Address' },
    { text: 'tel:+1234567890', icon: 'fas fa-phone', label: 'Phone Number' },
    { text: 'Hello World!', icon: 'fas fa-comment', label: 'Simple Text' },
    { text: 'https://www.example.com', icon: 'fas fa-globe', label: 'Website URL' },
    { text: 'WiFi:T:WPA;S:MyNetwork;P:your_password;H:false;;', icon: 'fas fa-wifi', label: 'WiFi Network' }
];

/**
 * Initialize the application
 */
function initializeApp() {
    // Update counters
    codesGeneratedElement.textContent = codesGenerated;
    
    // Set initial theme
    updateTheme();
    
    // Add event listeners
    setupEventListeners();
    
    // Populate suggestions
    populateSuggestions();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Add enter key support
    qrcodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });

    // Clear messages when user starts typing
    qrcodeInput.addEventListener('input', function() {
        clearMessages();
    });
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    localStorage.setItem('darkTheme', isDarkTheme);
    updateTheme();
}

/**
 * Update the theme based on current setting
 */
function updateTheme() {
    if (isDarkTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }
}

/**
 * Show a message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of message ('success' or 'error')
 */
function showMessage(message, type = 'success') {
    clearMessages();
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message fade-in`;
    
    const icon = type === 'success' ? 'check-circle' : 'exclamation-triangle';
    messageDiv.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    messageContainer.appendChild(messageDiv);
}

/**
 * Clear all messages
 */
function clearMessages() {
    messageContainer.innerHTML = '';
}

/**
 * Set the loading state of the generate button
 * @param {boolean} loading - Whether to show loading state
 */
function setLoading(loading) {
    const btnText = generateBtn.querySelector('span');
    const btnIcon = generateBtn.querySelector('i');
    
    if (loading) {
        generateBtn.disabled = true;
        btnIcon.className = '';
        btnIcon.innerHTML = '<div class="loading-spinner"></div>';
        btnText.textContent = 'Generating...';
    } else {
        generateBtn.disabled = false;
        btnIcon.className = 'fas fa-magic';
        btnIcon.innerHTML = '';
        btnText.textContent = 'Generate QR Code';
    }
}

/**
 * Validate user input
 * @param {string} text - The text to validate
 * @returns {object} Validation result with isValid and message properties
 */
function validateInput(text) {
    if (!text) {
        return {
            isValid: false,
            message: 'Please enter some text to generate a QR code'
        };
    }

    if (text.length > 500) {
        return {
            isValid: false,
            message: 'Text is too long. Please keep it under 500 characters.'
        };
    }

    return { isValid: true };
}

/**
 * Generate QR code and display it
 */
function generateQRCode() {
    const text = qrcodeInput.value.trim();
    
    // Validate input
    const validation = validateInput(text);
    if (!validation.isValid) {
        showMessage(validation.message, 'error');
        qrcodeInput.focus();
        return;
    }

    setLoading(true);
    clearMessages();
    
    // Make request to server
    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `text=${encodeURIComponent(text)}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(qrCodeData => {
        handleQRCodeSuccess(qrCodeData);
    })
    .catch(error => {
        handleQRCodeError(error);
    });
}

/**
 * Handle successful QR code generation
 * @param {string} qrCodeData - The SVG data of the QR code
 */
function handleQRCodeSuccess(qrCodeData) {
    setLoading(false);
    
    if (qrCodeData && qrCodeData.trim()) {
        // Store current QR data for download
        currentQRData = qrCodeData;
        
        // Parse and display the SVG
        const qrSVG = new DOMParser().parseFromString(qrCodeData, 'image/svg+xml').documentElement;
        qrContainer.innerHTML = '';
        qrContainer.appendChild(qrSVG);
        
        // Show the QR code container
        qrOutput.classList.remove('hidden');
        qrOutput.classList.add('fade-in');
        
        // Show download button
        downloadBtn.classList.remove('hidden');
        
        // Update counter
        codesGenerated++;
        codesGeneratedElement.textContent = codesGenerated;
        localStorage.setItem('codesGenerated', codesGenerated);
        
        showMessage('QR code generated successfully!');
        
        // Scroll to QR code
        qrOutput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        throw new Error('Invalid QR code data received');
    }
}

/**
 * Handle QR code generation error
 * @param {Error} error - The error that occurred
 */
function handleQRCodeError(error) {
    setLoading(false);
    console.error('Error:', error);
    showMessage('Failed to generate QR code. Please try again.', 'error');
}

/**
 * Download the generated QR code as SVG file
 */
function downloadQRCode() {
    if (!currentQRData) {
        showMessage('No QR code to download', 'error');
        return;
    }

    try {
        // Create blob from SVG data
        const blob = new Blob([currentQRData], { type: 'image/svg+xml' });
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
 * Populate suggestions in the UI
 */
function populateSuggestions() {
    const suggestionsContainer = document.getElementById('suggestions-container');
    if (!suggestionsContainer) return;
    
    suggestionsContainer.innerHTML = '';
    
    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'suggestion-item';
        suggestionElement.innerHTML = `
            <i class="${suggestion.icon}"></i>
            <span>${suggestion.label}</span>
        `;
        suggestionElement.addEventListener('click', () => addSuggestion(suggestion.text));
        suggestionsContainer.appendChild(suggestionElement);
    });
}

/**
 * Add suggestion functionality
 * @param {string} text - The text to set as input and generate QR code for
 */
function addSuggestion(text) {
    qrcodeInput.value = text;
    generateQRCode();
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
