// 🔥 Firebase Config (replace with your real values)
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
let generatedOTP = Math.floor(100000 + Math.random() * 900000);
alert("Your OTP: " + generatedOTP);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Setup Recaptcha (invisible)
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sendOtp', {
    size: 'invisible'
});

// 📱 SEND OTP
document.getElementById("sendOtp").addEventListener("click", () => {
    const phone = document.getElementById("phone").value;

    if (!phone || !phone.startsWith("+")) {
        alert("Enter valid phone number with country code (+91XXXXXXXXXX)");
        return;
    }

    auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("OTP Sent ✅");
        })
        .catch((error) => {
            console.error(error);
            alert(error.message);
        });
});

// 🔐 VERIFY OTP
document.getElementById("verifyOtp").addEventListener("click", () => {
    const code = document.getElementById("otp").value;

    if (!code) {
        alert("Enter OTP first!");
        return;
    }

    window.confirmationResult.confirm(code)
        .then(() => {
            alert("OTP Verified ✅");

            // 🔥 unlock download
            if (window.otpVerifiedSuccess) {
                window.otpVerifiedSuccess();
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Invalid OTP ❌");
        });
});