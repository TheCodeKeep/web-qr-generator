from unittest.mock import MagicMock, patch

import pytest

from app import app, generate_QR


class TestApp:
    """Test suite for the Flask QR Generator application"""

    @pytest.fixture
    def client(self):
        """Create a test client for the Flask app"""
        app.config['TESTING'] = True
        with app.test_client() as client:
            yield client

    def test_main_route(self, client):
        """Test the main route returns the index page"""
        response = client.get('/')
        assert response.status_code == 200

    def test_404_handler(self, client):
        """Test 404 error handler returns index page"""
        response = client.get('/nonexistent')
        assert response.status_code == 404

    def test_generate_route_success(self, client):
        """Test successful QR code generation"""
        response = client.post('/generate', data={'text': 'Hello World'})
        assert response.status_code == 200
        assert b'<svg' in response.data  # Should contain SVG content
        assert b'xmlns="http://www.w3.org/2000/svg"' in response.data

    def test_generate_route_empty_text(self, client):
        """Test generation with empty text"""
        response = client.post('/generate', data={'text': ''})
        assert response.status_code == 400
        assert b'Please enter some text' in response.data

    def test_generate_route_whitespace_only(self, client):
        """Test generation with whitespace-only text"""
        response = client.post('/generate', data={'text': '   \n\t   '})
        assert response.status_code == 400
        assert b'Please enter some text' in response.data

    def test_generate_route_long_text(self, client):
        """Test generation with text exceeding limit"""
        long_text = 'x' * 1001  # Exceeds 1000 character limit
        response = client.post('/generate', data={'text': long_text})
        assert response.status_code == 400
        assert b'Text is too long' in response.data

    def test_generate_route_no_data(self, client):
        """Test generation without form data"""
        response = client.post('/generate')
        assert response.status_code == 400
        assert b'Please enter some text' in response.data

    def test_generate_route_special_characters(self, client):
        """Test generation with special characters and unicode"""
        test_cases = [
            'Hello World',
            'mailto:test@example.com',
            'tel:+1-234-567-8900',
            'https://example.com/path?param=value&other=123',
        ]

        for text in test_cases:
            response = client.post('/generate', data={'text': text})
            assert response.status_code == 200
            assert b'<svg' in response.data

    @patch('app.qrcode.QRCode')
    def test_generate_route_qr_exception(self, mock_qrcode, client):
        """Test handling of QR code generation exceptions"""
        mock_qr_instance = MagicMock()
        mock_qr_instance.make_image.side_effect = Exception(
            "QR generation failed"
        )
        mock_qrcode.return_value = mock_qr_instance
        response = client.post('/generate', data={'text': 'test'})
        assert response.status_code == 400
        assert (b'An error occurred while generating the QR code'
                in response.data)


class TestGenerateQRFunction:
    """Test suite for the generate_QR function"""

    def test_generate_qr_success(self):
        """Test successful QR code generation"""
        result, error = generate_QR("Hello World")
        assert error is None
        assert result is not None
        assert '<svg' in result
        assert 'xmlns="http://www.w3.org/2000/svg"' in result

    def test_generate_qr_empty_string(self):
        """Test QR generation with empty string"""
        result, error = generate_QR("")
        assert result is None
        assert error == "Please enter some text"

    def test_generate_qr_none_input(self):
        """Test QR generation with None input"""
        result, error = generate_QR(None)
        assert result is None
        assert error == "Please enter some text"

    def test_generate_qr_long_text(self):
        """Test QR generation with text exceeding limit"""
        long_text = "x" * 1001
        result, error = generate_QR(long_text)
        assert result is None
        assert error == (
            "Text is too long. Please keep it under 1000 characters."
        )

    def test_generate_qr_boundary_length(self):
        """Test QR generation with text at boundary length"""
        # Test exactly 1000 characters (should work)
        boundary_text = "x" * 1000
        result, error = generate_QR(boundary_text)
        assert error is None
        assert result is not None
        assert '<svg' in result

    def test_generate_qr_various_content_types(self):
        """Test QR generation with various content types"""
        test_cases = [
            "Simple text",
            "https://www.example.com",
            "mailto:test@example.com",
            "tel:+1234567890",
            "Line 1\nLine 2\nLine 3",
            "123456789",
            " leading and trailing spaces ",
        ]

        for text in test_cases:
            result, error = generate_QR(text)
            assert error is None, f"Failed for text: {text}"
            assert result is not None
            assert '<svg' in result
            assert 'xmlns="http://www.w3.org/2000/svg"' in result

    @patch('app.qrcode.QRCode')
    def test_generate_qr_exception_handling(self, mock_qrcode):
        """Test exception handling in QR generation"""
        mock_qr_instance = MagicMock()
        mock_qr_instance.make_image.side_effect = Exception("Test exception")
        mock_qrcode.return_value = mock_qr_instance

        result, error = generate_QR("test")
        assert result is None
        assert error == "An error occurred while generating the QR code"

    @patch('app.qrcode.QRCode')
    def test_generate_qr_different_exception_types(self, mock_qrcode):
        """Test handling of different exception types"""
        exception_types = [
            ValueError("Invalid value"),
            TypeError("Type error"),
            RuntimeError("Runtime error"),
            Exception("Generic exception")
        ]

        for exception in exception_types:
            mock_qr_instance = MagicMock()
            mock_qr_instance.make_image.side_effect = exception
            mock_qrcode.return_value = mock_qr_instance

            result, error = generate_QR("test")
            assert result is None
            assert error == "An error occurred while generating the QR code"


class TestIntegration:
    """Integration tests for the complete application"""

    @pytest.fixture
    def client(self):
        """Create a test client for integration tests"""
        app.config['TESTING'] = True
        with app.test_client() as client:
            yield client

    def test_complete_qr_generation_workflow(self, client):
        """Test the complete workflow from form submission to QR generation"""
        # Test various realistic use cases
        test_cases = [
            {
                'text': 'https://github.com/sharem/web-qr-generator',
                'description': 'GitHub URL'
            },
            {
                'text': 'mailto:contact@example.com?subject=Hello&body=Test',
                'description': 'Email with parameters'
            },
            {
                'text': 'tel:+1-555-123-4567',
                'description': 'Phone number'
            },
            {
                'text': 'Hello World! This is a test QR code.',
                'description': 'Regular text'
            }
        ]

        for case in test_cases:
            response = client.post('/generate', data={'text': case['text']})
            assert response.status_code == 200, \
                f"Failed for {case['description']}"

            # Verify SVG structure
            svg_content = response.data.decode('utf-8')
            assert '<svg' in svg_content
            assert 'xmlns="http://www.w3.org/2000/svg"' in svg_content
            assert '</svg>' in svg_content

    def test_error_handling_workflow(self, client):
        """Test error handling across different scenarios"""
        error_cases = [
            {
                'data': {'text': ''},
                'expected_status': 400,
                'expected_content': b'Please enter some text',
                'description': 'Empty text'
            },
            {
                'data': {'text': 'x' * 1001},
                'expected_status': 400,
                'expected_content': b'Text is too long',
                'description': 'Text too long'
            },
            {
                'data': {},
                'expected_status': 400,
                'expected_content': b'Please enter some text',
                'description': 'No text field'
            }
        ]

        for case in error_cases:
            response = client.post('/generate', data=case['data'])
            assert response.status_code == case['expected_status'], \
                f"Status code mismatch for {case['description']}"
            assert case['expected_content'] in response.data, \
                f"Content mismatch for {case['description']}"


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
