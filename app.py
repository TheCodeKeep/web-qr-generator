from flask import Flask, render_template, request
import qrcode
import qrcode.image.svg

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

def generate_QR(text):
    if not text:
        return "Please enter some text"
    
    # Create QR code object with error correction level
    qr = qrcode.QRCode(
        version=10,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
        image_factory=qrcode.image.svg.SvgFillImage,
    )
    qr.add_data(text)
    qr.make(fit=True)
    
    img = qr.make_image()
    
    #img.save('static/qrcode.svg')
    return img.to_string(encoding='unicode')

@app.route('/generate', methods=['POST'])
def generate():
    text = request.form.get('text')
    qr_code = generate_QR(text)
    
    return qr_code

if __name__ == "__main__":
    app.run(debug=True, port=5000)
