import React, { useState } from 'react';
import { X, Film } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  videoUrl,
  title,
  onClose
}) => {
  const [isPortrait, setIsPortrait] = useState(false);

  if (!isOpen) return null;

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.videoHeight > video.videoWidth * 1.1) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className={`relative w-full ${
          isPortrait ? 'max-w-[420px]' : 'max-w-4xl'
        } max-h-[90vh] rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl flex flex-col transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-white/10 bg-[#090b0e] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center shrink-0">
              <Film className="w-4 h-4 text-brand-green" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white font-display truncate">
                {title}
              </h4>
              <span className="text-[10px] font-mono text-brand-green block truncate">
                {isPortrait ? 'SSD REEL & MOBILE SHOWCASE' : 'SSD 4K CINEMA STREAMING'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close video"
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors shrink-0 cursor-pointer ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player - Strictly Contained & Zero Overflow */}
        <div className="relative w-full bg-black flex items-center justify-center overflow-hidden max-h-[calc(90vh-65px)]">
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            className={`w-full ${
              isPortrait ? 'max-h-[calc(90vh-70px)]' : 'aspect-video max-h-[calc(90vh-70px)]'
            } object-contain bg-black`}
          />
        </div>
      </div>
    </div>
  );
};

