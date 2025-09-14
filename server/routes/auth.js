import express from 'express';
const router = express.Router();

// In-memory user store for demo
const users = [];

// Signup endpoint
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists.' });
  }
  users.push({ username, password, favorites: [], playlist: [] });
  res.json({ success: true });
});

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  res.json({ success: true, username });
});

export default router;
