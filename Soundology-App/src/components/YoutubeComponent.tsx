import React from 'react';
import '../pages/main.css';
interface YouTubeComponentProps {
  videoId: string | null; // Define the type for the videoId prop
}

const YouTubeComponent: React.FC<YouTubeComponentProps> = ({ videoId }) => {
  return (
    <div>
      <h2>Click to Play Video!</h2>
      {videoId && (
        <iframe className="video-frame"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default YouTubeComponent;
