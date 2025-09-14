import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();
const otps = {};

const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const looksPlaceholder = /your_ethereal_/i.test(smtpUser) || /your_ethereal_/i.test(smtpPass);
const isDemo = !smtpUser || !smtpPass || looksPlaceholder;
let transporter;
if (isDemo) {
  // Demo mode: do not actually send email, just resolve
  transporter = { sendMail: async () => Promise.resolve() };
  console.log('[OTP] Running in DEMO mode. Emails are not sent. Use OTP 123456.');
} else {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

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
      text: `Your OTP is ${isDemo ? '123456' : otp}. It expires in 10 minutes.`,
    });
    // In demo mode, always use fixed OTP for easy testing
    otps[email] = isDemo ? '123456' : otp;
    res.json({ success: true, demo: isDemo });
  } catch (e) {
    console.error('OTP email send error:', e);
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
