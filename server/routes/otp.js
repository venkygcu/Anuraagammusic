import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();
const otps = {};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'your_ethereal_user',
    pass: process.env.SMTP_PASS || 'your_ethereal_pass',
  },
});

// Send OTP to email
router.post('/send-otp-email', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required.' });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[email] = otp;
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || 'no-reply@anuraagam.com',
      to: email,
      subject: 'Your Anuraagam OTP',
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP for email
router.post('/verify-otp-email', (req, res) => {
  const { email, otp } = req.body;
  if (otps[email] === otp) {
    delete otps[email];
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Invalid OTP' });
});

// Send OTP to mobile (demo: just store)
router.post('/send-otp-mobile', (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ error: 'Mobile required.' });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[mobile] = otp;
  // TODO: Integrate Twilio or similar SMS provider in production
  res.json({ success: true });
});

// Verify OTP for mobile
router.post('/verify-otp-mobile', (req, res) => {
  const { mobile, otp } = req.body;
  if (otps[mobile] === otp) {
    delete otps[mobile];
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Invalid OTP' });
});

export default router;
