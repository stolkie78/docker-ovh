from flask import Flask, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)

# Configuratie voor e-mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Gebruik je SMTP-server
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'jouw-email@gmail.com'  # Jouw e-mailadres
app.config['MAIL_PASSWORD'] = 'jouw-app-wachtwoord'  # Je app-wachtwoord of wachtwoord
mail = Mail(app)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    try:
        # E-mail naar de beheerder
        admin_msg = Message(
            subject=f"Nieuw bericht van {name}",
            sender=email,
            recipients=['beheerder-email@gmail.com'],  # Ontvanger
            body=f"Naam: {name}\nE-mail: {email}\nBericht:\n{message}"
        )
        mail.send(admin_msg)

        # Bevestigingsmail naar de zender
        confirm_msg = Message(
            subject="Bevestiging van uw bericht",
            sender='jouw-email@gmail.com',  # Jouw e-mailadres
            recipients=[email],
            body=f"Beste {name},\n\nBedankt voor je bericht. We nemen spoedig contact met je op.\n\nMet vriendelijke groet,\nHet ViBes-team"
        )
        mail.send(confirm_msg)

        return jsonify({'message': 'E-mail succesvol verzonden!'}), 200
    except Exception as e:
        return jsonify({'message': f'Fout bij het verzenden van de e-mail: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)