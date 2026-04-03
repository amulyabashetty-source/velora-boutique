import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";


// =======================
// ✅ FORGOT PASSWORD
// =======================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 🔍 check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found ❌" });
    }

    // 🔐 generate token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 mins

    await user.save();

    // 🔗 reset link
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    // 📩 send email (UPDATED UI)
    await sendEmail(
      email,
      "Reset Your Password - Velora",
      `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Velora Boutique</h2>

        <p>Click the button below to reset your password:</p>

        <a href="${resetLink}" 
          style="
            background-color:#ff4d6d;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:5px;
            display:inline-block;
            margin-top:10px;
          ">
          Reset Password
        </a>

        <p style="margin-top:20px;">
          If the button does not work, copy this link:
        </p>

        <a href="${resetLink}">${resetLink}</a>

        <p style="margin-top:20px; font-size:12px; color:gray;">
          This link will expire in 10 minutes.
        </p>
      </div>
      `
    );

    res.json({ msg: "Reset link sent to email ✅" });

  } catch (err) {
    console.log("❌ Forgot password error:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};


// =======================
// ✅ RESET PASSWORD
// =======================
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // 🔍 find user by token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token ❌" });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ update password
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ msg: "Password updated successfully ✅" });

  } catch (err) {
    console.log("❌ Reset password error:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};