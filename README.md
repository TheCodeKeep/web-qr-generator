# 🔲 QR Generator

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-3776ab?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-3.1.2-000000?style=for-the-badge&logo=flask)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern web application for generating QR codes instantly**

</div>

## About

A responsive Flask web application that creates QR codes from text, URLs, emails, and phone numbers. Features dark/light themes, instant generation, and downloadable SVG output.

## Features

- ⚡ **Instant QR Generation** - Real-time creation with SVG output
- 🌓 **Theme Support** - Dark/light mode with preference saving
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 💾 **Download Support** - Save as high-quality SVG files
- 🚀 **Quick Examples** - Pre-built templates for common use cases
- 📊 **Usage Counter** - Track generated QR codes locally

## Quick Start

### Prerequisites
- Python 3.8+
- pip (included with Python)

### Installation

```bash
# Clone the repository
git clone https://github.com/sharem/web-qr-generator.git
cd web-qr-generator

# Create virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

## Usage

1. **Enter content** in the text field (URLs, emails, phone numbers, or any text)
2. **Click "Generate QR Code"** or press Enter
3. **Download** the QR code as an SVG file

### Quick Examples
- 🔗 **GitHub Profile** - `https://github.com/username`
- 📧 **Email** - `mailto:contact@example.com`
- 📞 **Phone** - `tel:+1-234-567-8900`
- 📶 **WiFi** - `WIFI:T:WPA;S:NetworkName;P:Password;;`

## Development

### Project Structure
```
web-qr-generator/
├── app.py              # Flask application
├── requirements.txt    # Dependencies
├── static/            # CSS, JS, favicons
└── templates/         # HTML templates
```

### Tech Stack
- **Backend**: Python 3.8+, Flask 3.1.2
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **QR Generation**: qrcode library (SVG output)

### API Endpoints
- `GET /` - Main application page
- `POST /generate` - Generate QR code from form data

### Development Setup
```bash
# Clone and install (see Quick Start)
# Debug mode is enabled by default in app.py
python app.py  # Server auto-reloads on changes
```

## Configuration

### Environment Variables
| Variable | Default | Description |
|----------|---------|-------------|
| `FLASK_ENV` | `development` | Flask environment |
| `FLASK_DEBUG` | `True` | Debug mode |
| `PORT` | `5000` | Server port |

### Customization
Modify CSS variables in `static/css/styles.css` for theming, or adjust QR settings in `app.py`.

## Deployment

### Local
```bash
python app.py
```

### Production
```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:5000 app:app
```

### Docker
```dockerfile
FROM python:3.8-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- [qrcode](https://github.com/lincolnloop/python-qrcode) - QR code generation
- [Flask](https://flask.palletsprojects.com/) - Web framework
- [Font Awesome](https://fontawesome.com/) - Icons

---

<div align="center">

**Made with ❤️ by [sharem](https://github.com/sharem)**

</div>
