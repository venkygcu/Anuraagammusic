import React, { useState } from 'react';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

interface DownloadButtonProps {
  track: {
    id: number;
    title: string;
    artist: string;
    previewUrl?: string;
  };
  onDownloadStart?: (trackId: number) => void;
  onDownloadComplete?: (trackId: number) => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  track, 
  onDownloadStart, 
  onDownloadComplete 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    if (!track.previewUrl) {
      alert('No download URL available for this track');
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);
    onDownloadStart?.(track.id);

    try {
      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Create download link
      const response = await fetch(track.previewUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${track.artist} - ${track.title}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
        onDownloadComplete?.(track.id);
      }, 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      setDownloadProgress(0);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      style={{
        background: isDownloading ? '#666' : '#ff6b35',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '0.3rem 0.8rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        cursor: isDownloading ? 'not-allowed' : 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
      title={isDownloading ? `Downloading... ${downloadProgress}%` : 'Download song'}
    >
      {isDownloading && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            background: 'rgba(255, 255, 255, 0.2)',
            width: `${downloadProgress}%`,
            transition: 'width 0.2s ease'
          }}
        />
      )}
      <DownloadOutlinedIcon style={{ fontSize: '1rem', zIndex: 1 }} />
      <span style={{ zIndex: 1 }}>
        {isDownloading ? `${downloadProgress}%` : 'Download'}
      </span>
    </button>
  );
};

export default DownloadButton;