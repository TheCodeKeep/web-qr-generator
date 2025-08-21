# Web QR Code Generator
## Table of Contents
- [1. Introduction](#1-introduction)
- [2. Installation](#2-installation)
- [3. Features](#3-features)
- [4. Usage](#4-usage)

## 1. Introduction

This is a QR code generator web application built using Python and Flask. It allows users to input text or URLs, generate corresponding QR codes, and display them on a webpage. The QR codes are generated using the `qrcode` library and can be rendered as SVGs for optimal performance.

## 2. Installation

To install the required dependencies, run:

```bash
pip install -r requirements.txt
```

## 3. Features

- Input field for text or URLs.
- "Generate" button to create QR code.
- Real-time display of generated QR codes in SVG format.
- Error handling for invalid inputs.
- Responsive design that works on both desktop and mobile devices.

## 4. Usage

### Step-by-Step Guide:

1. **Start the Flask Application**:
   ```bash
   flask run --host=0.0.0.0
   ```

2. **Open Your Browser**:
   Navigate to `http://localhost:5000` (or your server's IP and port if deployed).

3. **Enter Text or URL**:
   - Use the text field at the top of the page.
   - Enter a URL or any text you want to encode.

4. **Generate QR Code**:
   Click the "Generate" button to create the QR code.

5. **View Your QR Code**:
   The generated QR code will be displayed below the input fields as an SVG image.

### Example Usage:

- Input: `https://example.com`
- Clicking "Generate" produces a QR code pointing to `https://example.com`.
