import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import spotifyRouter from './spotify.js';
import authRouter from './auth.js';
import otpRouter from './otp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from project .env (override any pre-set PORT like Render/Host assigns)
// Also allow reading from repo root .env as fallback if nested .env missing
const envLoaded = dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });
if (envLoaded.error) {
  dotenv.config({ path: path.resolve(__dirname, '../../../.env'), override: false });
}

const app = express();
// Always respect PORT if provided, otherwise default to 5000 (works for both dev and prod)
const PORT = Number(process.env.PORT) || 5000;

// Basic authentication middleware (demo only)
app.use((req, res, next) => {
  next();
});

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Serve static audio files with proper headers for streaming
app.use(
  '/download',
  // Point to the actual filesystem folder containing audio files (repo-level /songs)
  express.static(path.resolve(__dirname, '../../../songs'), {
    setHeaders(res, filePath) {
      if (filePath.endsWith('.m4a')) {
        res.setHeader('Content-Type', 'audio/mp4');
      } else if (filePath.endsWith('.mp3')) {
        res.setHeader('Content-Type', 'audio/mpeg');
      }
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    },
  })
);

// API routes
app.get('/healthz', (_req, res) => res.json({ ok: true }));
app.use('/api', spotifyRouter);
app.use('/auth', authRouter);
app.use('/otp', otpRouter);

// Serve frontend (production build)
const clientDist = path.resolve(__dirname, '../../dist');
app.use(express.static(clientDist));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
