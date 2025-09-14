interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  language: string;
  cover: string;
  previewUrl: string;
  fileName: string;
  duration?: number;
}

// Extract metadata from filename
const extractMetadata = (fileName: string): Partial<Song> => {
  // Remove file extension and decode URI components
  const cleanName = decodeURIComponent(fileName.replace(/\.(m4a|mp3|wav|flac)$/i, ''));
  
  // Common patterns for extracting artist and title
  let title = cleanName;
  let artist = 'Unknown Artist';
  let album = 'Unknown Album';
  let language = 'Telugu'; // Default based on your collection
  
  // Pattern 1: Artist - Title
  if (cleanName.includes(' - ')) {
    const parts = cleanName.split(' - ');
    if (parts.length >= 2) {
      artist = parts[0].trim();
      title = parts.slice(1).join(' - ').trim();
    }
  }
  
  // Pattern 2: Extract from common Telugu/Tamil movie song patterns
  if (cleanName.includes('___')) {
    const parts = cleanName.split('___');
    title = parts[0].replace(/^#/, '').trim();
    if (parts.length > 1) {
      const movieInfo = parts[1];
      // Try to extract artist from movie info
      if (movieInfo.includes('Allu_Arjun')) artist = 'Allu Arjun';
      else if (movieInfo.includes('Mahesh_Babu')) artist = 'Mahesh Babu';
      else if (movieInfo.includes('Pawan_Kalyan')) artist = 'Pawan Kalyan';
      else if (movieInfo.includes('Nani')) artist = 'Nani';
      else if (movieInfo.includes('Ram_Charan')) artist = 'Ram Charan';
      else if (movieInfo.includes('Vijay_Deverakonda')) artist = 'Vijay Deverakonda';
      else if (movieInfo.includes('AR_Rahman')) artist = 'A.R. Rahman';
      else if (movieInfo.includes('Dhanush')) artist = 'Dhanush';
      else if (movieInfo.includes('Nagarjuna')) artist = 'Nagarjuna';
    }
  }
  
  // Extract album from common patterns
  if (cleanName.includes('Movie') || cleanName.includes('Songs')) {
    const movieMatch = cleanName.match(/([A-Za-z\s]+)(?:_Movie|_Songs)/);
    if (movieMatch) {
      album = movieMatch[1].replace(/_/g, ' ').trim();
    }
  }
  
  // Detect language
  if (cleanName.includes('Tamil') || cleanName.includes('Kadhalan') || cleanName.includes('Bombay')) {
    language = 'Tamil';
  } else if (cleanName.includes('Hindi') || cleanName.includes('Bollywood')) {
    language = 'Hindi';
  } else if (cleanName.includes('Kannada')) {
    language = 'Kannada';
  }
  
  // Clean up title - remove common prefixes and suffixes
  title = title
    .replace(/^#/, '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/Full\s+(Video\s+)?Song.*$/i, '')
    .replace(/Video\s+Song.*$/i, '')
    .replace(/Telugu\s+Lyrics.*$/i, '')
    .replace(/With\s+Lyrics.*$/i, '')
    .replace(/\(0\)$/, '')
    .replace(/\(128k\)$/, '')
    .trim();
  
  // Clean up artist name
  artist = artist.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  album = album.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  
  return { title, artist, album, language };
};

// Generate cover image URL based on song metadata
const generateCoverUrl = (song: Partial<Song>, index: number): string => {
  // Use different avatar images for variety
  const avatarIndex = (index % 50) + 1;
  return `https://i.pravatar.cc/150?img=${avatarIndex}`;
};

// Load songs from the download directory
export const loadSongsFromDirectory = (): Song[] => {
  // List of song files from your download directory
  const songFiles = [
    "#AlaVaikunthapurramloo__Title_Song__Telugu_Video_Song___Allu_Arjun___Trivikram___Thaman_S___#AA19(0).m4a",
    "#BoxBaddhalaiPoye_Full_Video_Song_With_Lyrics___DJ_Full_Video_Songs___Allu_Arjun___Pooja_Hegde___DSP(0).m4a",
    "#EyyBiddaIdhiNaaAdda_Full_Song___Pushpa_Songs_Telugu___Allu_Arjun,_Rashmika___DSP___Nakash_Aziz(0).m4a",
    "#FeelMyLove_Song___Arya_Songs_Telugu___AlluArjun_Hits___Telugu_Love_Songs___Aditya_Music_Telugu(0).m4a",
    "Aa_Ante_Amalapuram_Video_Song_With_Lyrics__II_Aarya_II_Allu_Arjun(0).m4a",
    "AlaVaikunthapurramuloo_-Back_to_Back_Full_Video_Songs_Telugu___AlluArjun___Trivikram___ThamanS__AA19(0).m4a",
    "Andamaina_Lokam_Full_Video_Song___Shivam_Movie_Songs___Ram_Pothineni___Raashi_Khanna_Devi_Sri_Prasad(0).m4a",
    "Baahubali_2_Video_Songs_Telugu___Dandaalayyaa_Full_Video_Song___Prabhas,Anushka_Bahubali_Video_Songs(0).m4a",
    "Baahubali_2_Video_Songs_Telugu___Hamsa_Naava_Full_Video_Song___Prabhas,Anushka_Baahubali_Video_Songs(0).m4a",
    "Baahubali_2_Video_Songs_Telugu___Saahore_Baahubali_Full_Video_Song_Prabhas,_Ramya_Krishna___Bahubali(0).m4a",
    "Bharat_Ane_Nenu_Video_Songs___Vachaadayyo_Saami_Full_Video_Song___Mahesh_Babu,_Devi_Sri_Prasad(0).m4a",
    "Box_Baddhalai_Poye_Song_With_Telugu_Lyrics___DJ_Duvvada_Jagannadham___Allu_Arjun,_Pooja_Hegde(0).m4a",
    "Bunny_Bunny_Full_Song__Bunny__Allu_Arjun,_DSP___Allu_Arjun____Aditya_Music(0).m4a",
    "Chakkani_Bike_Undi_Full_Song_With_Lyrics_-Julayi____Allu_Arjun,_Ileana___Devi_Sri_Prasad___Trivikram(0).m4a",
    "Chal_Chalo_Chalo_Full_Song_With_Lyrics_-_S_o_Satyamurthy_Songs_-_Allu_Arjun,_Samantha,_DSP(0).m4a",
    "Come_To_The_Party_Full_Video_Song___S_O_Satyamurthy___Allu_Arjun,_Samantha___DSP___Trivikram(0).m4a",
    "Dear_Comrade_Video_Songs_-_Telugu___Nee_Neeli_Kannullona_Video_Song___Vijay_Deverakonda___Rashmika(0).m4a",
    "Dear_Comrade_Video_Songs_-_Telugu___Yetu_Pone_Video_Song___Vijay_Deverakonda___Rashmika(0).m4a",
    "Disco_Raja_Video_Songs___Nuvvu_Naatho_Emannavo_Full_Video_Song___Ravi_Teja___Payal_Rajput___Thaman_S(0).m4a",
    "Gudilo_Badilo_Madilo_Vodilo_Full_Song_With_Lyrics___DJ_Songs___Allu_Arjun___Pooja_Hegde___DSP(0).m4a",
    "Hrudhayam_Full_Song__Parugu__Allu_Arjun,Mani_Sharma__Allu_Arjun_Mani_Sharma_Hits___Aditya_Music(0).m4a",
    "Iddarammayilatho_Songs_-_Violin_Song_Lyrics_-_Allu_Arjun,_Amala_Paul,_DSP_-_Aditya_Music_Telugu(0).m4a",
    "Jai_Ho_Full_Song_With_Lyrics___Gangotri_Movie___Allu_Arjun___Aditi_Agarwal___M_M_Keeravani(0).m4a",
    "Jalsa_Songs_-_Habibo_Song_-_Allu_Arjun,_Ileana_-_Aditya_Music_Telugu(0).m4a",
    "Jalsa_Songs_-_Jinthaak_Chitha_Song_-_Allu_Arjun,_Ileana_-_Aditya_Music_Telugu(0).m4a",
    "Julayi_Songs_-_Ala_Ela_Song_-_Allu_Arjun,_Ileana_-_Aditya_Music_Telugu(0).m4a",
    "Julayi_Songs_-_Pakka_Local_Song_-_Allu_Arjun,_Ileana_-_Aditya_Music_Telugu(0).m4a",
    "Kadhalan_Movie_Songs___Mukkala_Mukkabala_Video_Song___Prabhudeva___Nagma___AR_Rahman(0).m4a",
    "Kshanam_Kshanam_Full_Song__Annamayya__Nagarjuna,Ramya_Krishnan,MM_Keeravani__Telugu_Devotional_Songs(0).m4a",
    "Lucky_Baskhar_Video_Songs___Srimathi_Garu_Full_Video_Song___Dulquer_Salmaan___Meenakshi___GV_Prakash(0).m4a",
    "Manam_Songs_-_Kanulanu_Thaake_Song_-_ANR,_Nagarjuna,_Naga_Chaitanya_-_Aditya_Music_Telugu(0).m4a",
    "Naa_Peru_Surya_Video_Songs___Lover_Also_Fighter_Also_Full_Video_Song___Allu_Arjun___Anu_Emmanuel(0).m4a",
    "Nuvvostanante_Nenoddantana_Songs_-_Nuvvostanante_Song_-_Siddharth,_Trisha_-_Aditya_Music_Telugu(0).m4a",
    "Parugu_Songs_-_Chukkallo_Chandrudu_Song_-_Allu_Arjun,_Sheela_-_Aditya_Music_Telugu(0).m4a",
    "Pokiri_Songs_-_Dole_Dole_Song_-_Mahesh_Babu,_Ileana_-_Aditya_Music_Telugu(0).m4a",
    "Pushpa_Songs_-_Srivalli_Video_Song_Telugu___Allu_Arjun___Rashmika_Mandanna___Sukumar___DSP(0).m4a",
    "Race_Gurram_Songs_-_Sweety_Song_-_Allu_Arjun,_Shruti_Haasan_-_Aditya_Music_Telugu(0).m4a",
    "Rangasthalam_Songs___Yentha_Sakkagunnave_Full_Video_Song___Ram_Charan,_Samantha___Devi_Sri_Prasad(0).m4a",
    "Sarrainodu_Songs_-_Blockbuster_Song_-_Allu_Arjun,_Rakul_Preet_Singh_-_Aditya_Music_Telugu(0).m4a",
    "Srimanthudu_Songs_-_Dheera_Dheera_Song_-_Mahesh_Babu,_Shruti_Haasan_-_Aditya_Music_Telugu(0).m4a",
    "Temper_Songs_-_Ittage_Recchipodham_Song_-_Jr_NTR,_Kajal_Agarwal_-_Aditya_Music_Telugu(0).m4a",
    "Vedam_Songs_-_Rupai_Song_-_Allu_Arjun,_Anushka_-_Aditya_Music_Telugu(0).m4a",
    "Yevadu_Songs_-_Freedom_Song_-_Ram_Charan,_Shruti_Haasan_-_Aditya_Music_Telugu(0).m4a"
  ];

  return songFiles.map((fileName, index) => {
    const metadata = extractMetadata(fileName);
    const baseUrl = '/download/'; // Assuming files are served from /download/ path
    
    return {
      id: index + 1000, // Start from 1000 to avoid conflicts with mock data
      title: metadata.title || fileName.split('.')[0],
      artist: metadata.artist || 'Unknown Artist',
      album: metadata.album || 'Unknown Album',
      language: metadata.language || 'Telugu',
      cover: generateCoverUrl(metadata, index),
      previewUrl: baseUrl + encodeURIComponent(fileName),
      fileName: fileName,
      duration: 0 // Will be set when audio loads
    };
  });
};

// Get songs by language
export const getSongsByLanguage = (songs: Song[], language: string): Song[] => {
  return songs.filter(song => song.language.toLowerCase() === language.toLowerCase());
};

// Get songs by artist
export const getSongsByArtist = (songs: Song[], artist: string): Song[] => {
  return songs.filter(song => 
    song.artist.toLowerCase().includes(artist.toLowerCase())
  );
};

// Search songs
export const searchSongs = (songs: Song[], query: string): Song[] => {
  const searchTerm = query.toLowerCase();
  return songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm) ||
    song.artist.toLowerCase().includes(searchTerm) ||
    song.album.toLowerCase().includes(searchTerm)
  );
};

// Get featured artists
export const getFeaturedArtists = (songs: Song[]): string[] => {
  const artistCounts = songs.reduce((acc, song) => {
    acc[song.artist] = (acc[song.artist] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(artistCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([artist]) => artist);
};

export default { 
  loadSongsFromDirectory, 
  getSongsByLanguage, 
  getSongsByArtist, 
  searchSongs, 
  getFeaturedArtists 
};