import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, VolumeX, X, Play, Pause, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';

interface PhotoStoryPlayerProps {
  onClose: () => void;
}

export const PhotoStoryPlayer: React.FC<PhotoStoryPlayerProps> = ({ onClose }) => {
  const { activeCase, programs, isSoundPlaying, toggleSound } = useApp();

  const program = activeCase ? programs[activeCase.id] : undefined;

  const photos = program?.galleryPhotos && program.galleryPhotos.length > 0 
    ? program.galleryPhotos 
    : [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'
      ];

  const quotes = program?.tributeQuotes && program.tributeQuotes.length > 0
    ? program.tributeQuotes
    : [
        "To live in hearts we leave behind is not to die.",
        "A life so beautifully lived deserves to be beautifully remembered.",
        "Love never dies, it simply changes forms."
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play slideshow timer (Ken Burns transition)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % photos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, photos.length]);

  const currentPhoto = photos[currentIndex];
  const currentQuote = quotes[currentIndex % quotes.length];

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden">
      
      {/* Top Header Bar */}
      <div className="relative z-20 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C5A059] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold tracking-wide">
              {activeCase?.deceasedName || 'In Loving Memory'}
            </h2>
            <div className="text-xs text-stone-300">Memorial Photo Story & Tributes</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Ambient Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all ${
              isSoundPlaying 
                ? 'bg-[#C5A059] text-white ring-2 ring-[#D4AF37]/50' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isSoundPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span>{isSoundPlaying ? 'Chime Audio Active' : 'Enable Heavenly Chime'}</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Ken Burns Animated Photo Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          key={currentIndex}
          className="w-full h-full bg-cover bg-center animate-kenburns transition-all duration-1000"
          style={{
            backgroundImage: `url(${currentPhoto})`,
            filter: 'brightness(0.75)'
          }}
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
      </div>

      {/* Floating Tribute Quote Overlay */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white space-y-4 my-auto">
        <div className="font-serif text-xl sm:text-3xl italic font-light tracking-wide text-amber-100/90 leading-relaxed drop-shadow-md">
          "{currentQuote}"
        </div>

        <div className="font-serif text-sm text-[#D4AF37] uppercase tracking-widest font-semibold pt-2">
          {activeCase?.deceasedName}
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="relative z-20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-t from-black/90 to-transparent text-white">
        {/* Slide Counter */}
        <div className="text-xs font-mono text-stone-300">
          Slide {currentIndex + 1} of {photos.length}
        </div>

        {/* Play / Pause / Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1))}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-[#C5A059] hover:bg-[#9B7B34] text-white flex items-center justify-center shadow-lg transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={() => setCurrentIndex(prev => (prev + 1) % photos.length)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === i ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Custom Ken Burns keyframe style embedded */}
      <style>{`
        @keyframes kenburns {
          0% {
            transform: scale(1) translate(0px, 0px);
          }
          50% {
            transform: scale(1.08) translate(-10px, -10px);
          }
          100% {
            transform: scale(1) translate(0px, 0px);
          }
        }
        .animate-kenburns {
          animation: kenburns 12s ease-in-out infinite alternate;
        }
      `}</style>

    </div>
  );
};
