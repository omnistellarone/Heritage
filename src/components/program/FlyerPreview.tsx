import React from 'react';
import { ObituaryProgramData, MemorialCase } from '../../types';

interface FlyerPreviewProps {
  program: ObituaryProgramData;
  memorialCase: MemorialCase;
}

export const FlyerPreview: React.FC<FlyerPreviewProps> = ({ program, memorialCase }) => {
  return (
    <div
      id="printable-flyer"
      className="bg-[#FAF8F5] text-stone-900 p-8 sm:p-12 border-8 border-double border-[#C5A059] shadow-xl max-w-2xl mx-auto space-y-6 relative rounded-sm"
      style={{ minHeight: '10.5in' }}
    >
      {/* Decorative Gold Header Lines */}
      <div className="text-center space-y-2 border-b-2 border-[#C5A059]/40 pb-6">
        <div className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#9B7B34]">
          In Loving Memory Of
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          {program.deceasedFullName || memorialCase.deceasedName}
        </h1>

        <div className="font-serif italic text-sm text-[#C5A059] font-medium">
          {program.birthDate || memorialCase.dateOfBirth} — {program.passingDate || memorialCase.dateOfPassing}
        </div>
      </div>

      {/* Main Portrait Frame */}
      <div className="flex justify-center my-4">
        <div className="relative p-2 bg-white border-2 border-[#C5A059] rounded-lg shadow-md max-w-xs w-full">
          <img
            src={program.primaryPhotoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'}
            alt="Deceased Portrait"
            className="w-full h-64 object-cover rounded-sm"
          />
        </div>
      </div>

      {/* Biography Snippet */}
      {program.biographyText && (
        <div className="text-center text-xs leading-relaxed text-stone-700 italic max-w-lg mx-auto font-serif">
          "{program.biographyText}"
        </div>
      )}

      {/* Service Schedule Details */}
      <div className="bg-white/80 p-5 rounded-lg border border-[#EBE2D0] space-y-3">
        <h3 className="font-serif text-center text-xs uppercase font-bold tracking-widest text-[#9B7B34] border-b border-[#EBE2D0] pb-2">
          Service Details & Order of Ceremony
        </h3>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-bold text-stone-900">{memorialCase.venueName}</div>
            <div className="text-stone-500 text-[11px]">{memorialCase.venueAddress}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-[#C5A059]">{memorialCase.serviceDate}</div>
            <div className="text-stone-500 text-[11px]">{memorialCase.serviceTime}</div>
          </div>
        </div>

        {program.orderOfService && program.orderOfService.length > 0 && (
          <div className="pt-2 border-t border-stone-100 space-y-1.5 text-[11px]">
            {program.orderOfService.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-stone-700">
                <span className="font-mono text-stone-500">{item.time}</span>
                <span className="font-medium text-stone-900">{item.title}</span>
                <span className="italic text-stone-500">{item.presenter}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Family Acknowledgment */}
      <div className="text-center pt-4 border-t border-[#C5A059]/40 text-[11px] text-stone-600 space-y-1">
        <div className="font-serif italic font-medium text-stone-800">
          "{program.tributeQuotes[0] || 'Forever in our hearts.'}"
        </div>
        <p className="text-[10px] text-stone-500 pt-2">
          {program.familyAcknowledgments || 'The family thanks you for your attendance, prayers, and love.'}
        </p>
      </div>

    </div>
  );
};
