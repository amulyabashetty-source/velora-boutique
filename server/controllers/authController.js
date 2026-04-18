import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";


// =======================
// FORGOT PASSWORD
// =======================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // normalize email
    const cleanEmail = email.toLowerCase().trim();

    // check user
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // generate raw token
    const rawToken = crypto.randomBytes(32).toString("hex");

    // hash token
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // save to DB
    user.resetToken = hashedToken;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${rawToken}`;

    await sendEmail(
      user.email,
      "Reset Your Password - Velora",
      `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Velora Boutique</h2>

        <p>Click the button below to reset your password:</p>

        <a href="${resetLink}" 
          style="
            background-color:#347736;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:5px;
            display:inline-block;
            margin-top:10px;
            font-weight:bold;
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

    res.json({ msg: "Reset link sent to email" });

  } catch (err) {
    console.log("Forgot password error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


// =======================
// RESET PASSWORD
// =======================
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ msg: "Password updated successfully" });

  } catch (err) {
    console.log("Reset password error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};