import express from 'express';
import { songs } from './songs.js';
const router = express.Router();

router.get('/search', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const lang = req.query.language?.toLowerCase();
  let results = songs.filter(track =>
    track.title.toLowerCase().includes(q) ||
    track.artist.toLowerCase().includes(q) ||
    track.album.toLowerCase().includes(q)
  );
  if (lang) {
    results = results.filter(track => track.language.toLowerCase() === lang);
  }
  res.json({ results });
});

router.get('/songs', (req, res) => {
  const lang = req.query.language?.toLowerCase();
  let results = songs;
  if (lang) {
    results = songs.filter(track => track.language.toLowerCase() === lang);
  }
  res.json({ results });
});

export default router;
