const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// EMAIL CONFIG
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your_email@gmail.com",
        pass: "your_app_password"
    }
});

// API to send QR via email
app.post("/send-email", async (req, res) => {
    const { email, qrImage } = req.body;

    try {
        await transporter.sendMail({
            from: "your_email@gmail.com",
            to: email,
            subject: "Your QR Code",
            html: `<h3>Here is your QR Code</h3><img src="${qrImage}" />`
        });

        res.send("Email sent successfully");
    } catch (err) {
        res.status(500).send("Error sending email");
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));