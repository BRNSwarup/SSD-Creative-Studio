import React from 'react';
import { X, Film, Volume2 } from 'lucide-react';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
      <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-[#090b0e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center">
              <Film className="w-4 h-4 text-brand-green" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display truncate max-w-md sm:max-w-lg">
                {title}
              </h4>
              <span className="text-[10px] font-mono text-brand-green">
                SSD 4K CINEMA STREAMING • CREATIVE MEDIA
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

