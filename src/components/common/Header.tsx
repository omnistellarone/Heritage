import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Volume2, VolumeX, ShieldCheck, Heart, UserCheck, Sparkles, FolderHeart } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    cases, 
    activeCaseId, 
    setActiveCaseId, 
    activeCase,
    isSoundPlaying, 
    toggleSound 
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EBE2D0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#9B7B34] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A]">
                HavenCare
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#EBE2D0] text-[#9B7B34]">
                MVP
              </span>
            </div>
            <p className="text-xs text-stone-500 font-sans">
              Funeral Planning & Memorial Sanctuary
            </p>
          </div>
        </div>

        {/* Middle: Active Case Selector */}
        {cases.length > 0 && (
          <div className="flex items-center gap-2 bg-white/80 border border-[#EBE2D0] px-3 py-1.5 rounded-lg text-xs">
            <FolderHeart className="w-4 h-4 text-[#C5A059]" />
            <span className="text-stone-500 font-medium hidden sm:inline">Active Case:</span>
            <select
              value={activeCaseId}
              onChange={(e) => setActiveCaseId(e.target.value)}
              className="bg-transparent font-medium text-[#1A1A1A] focus:outline-none cursor-pointer"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.deceasedName} ({c.caseNumber})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Controls Right: Sound Toggle & Role Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Ambient Sound Button */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isSoundPlaying 
                ? 'bg-[#C5A059] text-white shadow-sm ring-2 ring-[#D4AF37]/50' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
            title="Toggle Serene Ambient Chime Audio"
          >
            {isSoundPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isSoundPlaying ? 'Chime Active' : 'Sound Off'}</span>
          </button>

          {/* Role Switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-medium">
            <button
              onClick={() => setUserRole('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                userRole === 'admin'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Director Portal</span>
            </button>

            <button
              onClick={() => setUserRole('family')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                userRole === 'family'
                  ? 'bg-[#C5A059] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Family Planning</span>
            </button>

            <button
              onClick={() => setUserRole('guest')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                userRole === 'guest'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Guest RSVP</span>
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
