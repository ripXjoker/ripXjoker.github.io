const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (if you have a frontend build)
app.use(express.static('public'));

// Contact Form Endpoint
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password'  // Replace with your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // Replace with your email
        subject: `New Contact Form Submission from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending message');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Message sent successfully');
        }
    });
});

// Subscription Plans Endpoint (Example)
app.post('/subscribe', (req, res) => {
    const { plan, email } = req.body;

    // Here you can add logic to handle the subscription, e.g., save to a database
    console.log(`New subscription to ${plan} by ${email}`);
    res.status(200).send(`Subscribed to ${plan} successfully`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
