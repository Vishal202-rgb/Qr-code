// 🔥 Supabase Config
 const SUPABASE_URL = "";
 const SUPABASE_ANON_KEY = "";

// ✅ Safe global init (NO const)
window.supabaseClient = window.supabaseClient || window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// 📱 SEND OTP
document.getElementById("sendOtp").addEventListener("click", async () => {
    const phone = document.getElementById("phone").value;

    if (!phone || !phone.startsWith("+")) {
        alert("Enter valid phone number (+91XXXXXXXXXX)");
        return;
    }

    const { error } = await window.supabaseClient.auth.signInWithOtp({
        phone: phone
    });

    if (error) {
        console.error(error);
        alert(error.message);
    } else {
        alert("OTP Sent ✅");
    }
});

// 🔐 VERIFY OTP
document.getElementById("verifyOtp").addEventListener("click", async () => {
    const phone = document.getElementById("phone").value;
    const code = document.getElementById("otp").value;

    if (!code) {
        alert("Enter OTP first!");
        return;
    }

    const { error } = await window.supabaseClient.auth.verifyOtp({
        phone: phone,
        token: code,
        type: "sms"
    });

    if (error) {
        console.error(error);
        alert("Invalid OTP ❌");
    } else {
        alert("OTP Verified ✅");

        if (window.otpVerifiedSuccess) {
            window.otpVerifiedSuccess();
        }
    }
});