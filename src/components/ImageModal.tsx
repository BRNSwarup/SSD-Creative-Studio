import React from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  image: string;
  title: string;
  description: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  image,
  title,
  description,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden bg-[#090b0e] border border-white/20 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/30 flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-brand-green" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display truncate max-w-md">
                {title}
              </h4>
              <span className="text-[10px] font-mono text-gray-400">
                HIGH RESOLUTION STUDIO ARCHIVE
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

        {/* Image Display */}
        <div className="flex-1 overflow-auto p-4 flex flex-col items-center justify-center bg-black/80">
          <img
            src={image}
            alt={title}
            className="max-h-[65vh] w-auto object-contain rounded-xl border border-white/10"
          />
          {description && (
            <p className="mt-4 text-xs sm:text-sm text-gray-300 max-w-2xl text-center leading-relaxed font-sans">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

