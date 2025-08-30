from flask import Flask, render_template, request
import qrcode
import qrcode.image.svg
import logging
import sys
from typing import TypeAlias

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Check Python version compatibility
if sys.version_info < (3, 10):
    logger.error("Python 3.10+ is required for this application")
    sys.exit(1)

# Log Python version for debugging
logger.info(f"Running on Python {sys.version}")

QRResult: TypeAlias = tuple[str, None]  # Success: (qr_code, None)
QRError: TypeAlias = tuple[None, str]   # Error: (None, error_message)
QRResponse: TypeAlias = QRResult | QRError


@app.route('/')
def main():
    return render_template('index.html')


def generate_QR(text: str) -> QRResponse:
    if not text:
        return None, "Please enter some text"
    if len(text) > 1000:
        return None, "Text is too long. Please keep it under 1000 characters."
    try:
        qr = qrcode.QRCode(
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=10,
            border=4,
            image_factory=qrcode.image.svg.SvgFillImage,
        )
        qr.add_data(text)
        qr.make(fit=True)
        img = qr.make_image()
        return img.to_string(encoding='unicode'), None
    except Exception as e:
        logger.error(f"Error generating QR code: {str(e)}")
        return None, "An error occurred while generating the QR code"


@app.route('/generate', methods=['POST'])
def generate():
    try:
        text = request.form.get('text', '').strip()
        qr_code, error = generate_QR(text)
        if error:
            return error, 400
        return qr_code
    except Exception as e:
        logger.error(f"Error in generate route: {str(e)}")
        return "An internal error occurred", 500


@app.errorhandler(404)
def not_found(error):
    return render_template('index.html'), 404


@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {str(error)}")
    return "Internal server error", 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
