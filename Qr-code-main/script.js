// Elements
const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

const emailInput = document.getElementById("email");

// OTP verification flag
let isVerified = false;

// QR Size
let size = sizes.value;

// Generate button
generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput();
});

// Size change
sizes.addEventListener('change', (e) => {
    size = e.target.value;
    isEmptyInput();
});

// 🔐 OTP verification success (IMPORTANT)
// This will be triggered from firebase.js
window.otpVerifiedSuccess = function () {
    isVerified = true;
};

// 📩 Download → Send Email
downloadBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    // Check OTP
    if (!isVerified) {
        alert("Please verify OTP first!");
        return;
    }

    let canvas = document.querySelector("canvas");

    if (!canvas) {
        alert("Generate QR first!");
        return;
    }

    let qrImage = canvas.toDataURL();

    const email = emailInput.value;

    if (!email) {
        alert("Enter email first!");
        return;
    }

    try {
        await fetch("http://localhost:5000/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, qrImage })
        });

        alert("QR sent to email ✅");
    } catch (err) {
        alert("Error sending email ❌");
        console.log(err);
    }
});

// Check input
function isEmptyInput() {
    qrText.value.length > 0
        ? generateQRCode()
        : alert("Enter the text or URL to generate your QR code");
}

// Generate QR
function generateQRCode() {
    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
        text: qrText.value,
        height: size,
        width: size,
        colorLight: "#fff",
        colorDark: "#000",
    });
}