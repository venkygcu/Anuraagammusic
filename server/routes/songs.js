// Multi-language songs data for Anuraagam Music App
import fs from 'fs';
import path from 'path';

const staticSongs = [
  // Telugu
  { id: 101, title: 'Butta Bomma', artist: 'Armaan Malik', album: 'Ala Vaikunthapurramuloo', language: 'Telugu', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_01_-_Battle_of_Pogs.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 102, title: 'Samajavaragamana', artist: 'Sid Sriram', album: 'Ala Vaikunthapurramuloo', language: 'Telugu', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_02_-_Friends.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 103, title: 'Vachindamma', artist: 'Sid Sriram', album: 'Geetha Govindam', language: 'Telugu', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_13_-_Level_14.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 104, title: 'Telugu Folk', artist: 'Komiku', album: 'Best Off', language: 'Telugu', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_19_-_Level_20.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  // Hindi
  // Hindi
  { id: 201, title: 'Tum Hi Ho', artist: 'Arijit Singh', album: 'Aashiqui 2', language: 'Hindi', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_03_-_Run.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 202, title: 'Channa Mereya', artist: 'Arijit Singh', album: 'Ae Dil Hai Mushkil', language: 'Hindi', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_04_-_Level_5.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 203, title: 'Tera Ban Jaunga', artist: 'Akhil Sachdeva', album: 'Kabir Singh', language: 'Hindi', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_14_-_Level_15.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 204, title: 'Hindi Pop', artist: 'Komiku', album: 'Best Off', language: 'Hindi', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_20_-_Level_21.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  // Kannada
  // Kannada
  { id: 301, title: 'Karabuu', artist: 'Chandan Shetty', album: 'Pogaru', language: 'Kannada', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_05_-_Level_6.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 302, title: 'Belageddu', artist: 'Vijay Prakash', album: 'Kirik Party', language: 'Kannada', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_06_-_Level_7.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 303, title: 'Ondu Malebillu', artist: 'Sonu Nigam', album: 'Kirik Party', language: 'Kannada', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_15_-_Level_16.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 304, title: 'Kannada Melody', artist: 'Komiku', album: 'Best Off', language: 'Kannada', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_21_-_Level_22.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  // English
  // English
  { id: 401, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', language: 'English', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_07_-_Level_8.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 402, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', language: 'English', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_08_-_Level_9.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 403, title: 'Memories', artist: 'Maroon 5', album: 'Memories', language: 'English', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_16_-_Level_17.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 404, title: 'English Indie', artist: 'Komiku', album: 'Best Off', language: 'English', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_22_-_Level_23.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  // Tamil
  // Tamil
  { id: 501, title: 'Rowdy Baby', artist: 'Dhanush, Dhee', album: 'Maari 2', language: 'Tamil', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_09_-_Level_10.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 502, title: 'Vaathi Coming', artist: 'Anirudh Ravichander', album: 'Master', language: 'Tamil', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_10_-_Level_11.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 503, title: 'Why This Kolaveri Di', artist: 'Dhanush', album: '3', language: 'Tamil', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_17_-_Level_18.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 504, title: 'Tamil Classic', artist: 'Komiku', album: 'Best Off', language: 'Tamil', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_23_-_Level_24.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  // Malayalam
  // Malayalam
  { id: 601, title: 'Jimikki Kammal', artist: 'Vineeth Sreenivasan', album: 'Velipadinte Pusthakam', language: 'Malayalam', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_11_-_Level_12.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 602, title: 'Entammede Jimikki Kammal', artist: 'Vineeth Sreenivasan', album: 'Velipadinte Pusthakam', language: 'Malayalam', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_12_-_Level_13.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 603, title: 'Malare', artist: 'Vijay Yesudas', album: 'Premam', language: 'Malayalam', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_18_-_Level_19.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
  { id: 604, title: 'Malayalam Beat', artist: 'Komiku', album: 'Best Off', language: 'Malayalam', previewUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Komiku/Best_Off/Komiku_-_24_-_Level_25.mp3', cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2' },
];

// Dynamically add all .m4a files from download folder
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const downloadDir = path.resolve(__dirname, '../../../songs');
let localSongs = [];
try {
  const files = fs.readdirSync(downloadDir);
  const songMap = {};
  files.forEach(file => {
    const base = file.replace(/\.(m4a|mp3)$/i, '');
    if (!songMap[base]) songMap[base] = {};
    if (file.endsWith('.mp3')) songMap[base].mp3 = file;
    if (file.endsWith('.m4a')) songMap[base].m4a = file;
  });
  localSongs = Object.entries(songMap).map(([base, formats], idx) => {
    const mp3 = formats.mp3 ? `/download/${encodeURIComponent(formats.mp3)}` : null;
    const m4a = formats.m4a ? `/download/${encodeURIComponent(formats.m4a)}` : null;
    const file = mp3 || m4a; // default for backward compatibility
    return {
      id: 1000 + idx,
      title: base.replace(/_/g, ' ').replace(/\(0\)$/, ''),
      artist: 'Local',
      album: 'User Uploads',
      language: 'Unknown',
      // Keep previewUrl for backward compatibility with existing clients
      previewUrl: file,
      // Expose both formats so the client can provide <source> fallbacks
      previewMp3: mp3,
      previewM4a: m4a,
      cover: 'https://i.scdn.co/image/ab67616d0000b273b7e2e2e2e2e2e2e2e2e2e2e2'
    };
  });
} catch {
  localSongs = [];
}

export const songs = [...staticSongs, ...localSongs];
