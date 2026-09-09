import React from 'react';
import { ObituaryProgramData, MemorialCase } from '../../types';

interface BookletPreviewProps {
  program: ObituaryProgramData;
  memorialCase: MemorialCase;
}

export const BookletPreview: React.FC<BookletPreviewProps> = ({ program, memorialCase }) => {
  return (
    <div id="printable-booklet" className="space-y-8 max-w-2xl mx-auto">
      
      {/* PAGE 1: COVER */}
      <div className="bg-[#FAF8F5] text-stone-900 p-8 sm:p-12 border-8 border-double border-[#C5A059] shadow-xl rounded-sm text-center space-y-6 flex flex-col justify-between" style={{ minHeight: '10.5in' }}>
        <div className="space-y-2 border-b-2 border-[#C5A059]/30 pb-6">
          <div className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#9B7B34]">
            Celebration of Life & Memory
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {program.deceasedFullName || memorialCase.deceasedName}
          </h1>
          <div className="font-serif italic text-sm text-[#C5A059] font-semibold">
            {program.birthDate} — {program.passingDate}
          </div>
        </div>

        <div className="flex justify-center my-6">
          <div className="p-2 bg-white border-2 border-[#C5A059] rounded-lg shadow-md max-w-xs w-full">
            <img
              src={program.primaryPhotoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'}
              alt="Cover Portrait"
              className="w-full h-72 object-cover rounded-sm"
            />
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-[#C5A059]/30 text-xs">
          <div className="font-bold text-stone-900">{memorialCase.venueName}</div>
          <div className="text-stone-600">{memorialCase.venueAddress}</div>
          <div className="text-[#C5A059] font-bold">{memorialCase.serviceDate} at {memorialCase.serviceTime}</div>
          <div className="text-[10px] text-stone-400 font-mono tracking-widest pt-4">PAGE 1 — COVER</div>
        </div>
      </div>

      <div className="print-page-break" />

      {/* PAGE 2: BIOGRAPHY & PHOTO GALLERY */}
      <div className="bg-[#FAF8F5] text-stone-900 p-8 sm:p-12 border-8 border-double border-[#C5A059] shadow-xl rounded-sm space-y-6 flex flex-col justify-between" style={{ minHeight: '10.5in' }}>
        <div className="space-y-4">
          <h2 className="font-serif text-center text-xl font-bold text-[#9B7B34] border-b border-[#C5A059]/40 pb-3 uppercase tracking-wider text-xs">
            Life Story & Biography
          </h2>

          <p className="text-xs leading-relaxed text-stone-800 text-justify font-serif first-letter:text-3xl first-letter:font-bold first-letter:text-[#C5A059] first-letter:float-left first-letter:mr-2">
            {program.biographyText || 'Enter the full biography of your loved one here.'}
          </p>

          {/* Photo Gallery Grid */}
          {program.galleryPhotos && program.galleryPhotos.length > 0 && (
            <div className="pt-4 space-y-2">
              <div className="text-[11px] font-semibold text-[#9B7B34] uppercase tracking-wider text-center">
                Treasured Moments
              </div>
              <div className="grid grid-cols-3 gap-2">
                {program.galleryPhotos.slice(0, 3).map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Gallery ${i}`}
                    className="w-full h-28 object-cover rounded-md border border-[#EBE2D0] shadow-xs"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-[10px] text-stone-400 font-mono tracking-widest text-center pt-4 border-t border-stone-200">
          PAGE 2 — BIOGRAPHY
        </div>
      </div>

      <div className="print-page-break" />

      {/* PAGE 3: ORDER OF SERVICE */}
      <div className="bg-[#FAF8F5] text-stone-900 p-8 sm:p-12 border-8 border-double border-[#C5A059] shadow-xl rounded-sm space-y-6 flex flex-col justify-between" style={{ minHeight: '10.5in' }}>
        <div className="space-y-6">
          <h2 className="font-serif text-center text-xl font-bold text-[#9B7B34] border-b border-[#C5A059]/40 pb-3 uppercase tracking-wider text-xs">
            Order of Service
          </h2>

          <div className="text-center text-xs italic text-stone-600 font-serif">
            Officiant: <span className="font-semibold text-stone-900">{program.officiantName || 'Officiant'}</span>
          </div>

          <div className="space-y-3 pt-2">
            {program.orderOfService.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-white border border-[#EBE2D0] rounded-lg text-xs">
                <span className="font-mono font-bold text-[#C5A059] w-20">{item.time}</span>
                <span className="font-bold text-stone-900 flex-1">{item.title}</span>
                <span className="text-stone-500 italic">{item.presenter || ''}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[10px] text-stone-400 font-mono tracking-widest text-center pt-4 border-t border-stone-200">
          PAGE 3 — ORDER OF SERVICE
        </div>
      </div>

      <div className="print-page-break" />

      {/* PAGE 4: ACKNOWLEDGMENTS & PALLBEARERS */}
      <div className="bg-[#FAF8F5] text-stone-900 p-8 sm:p-12 border-8 border-double border-[#C5A059] shadow-xl rounded-sm space-y-6 flex flex-col justify-between" style={{ minHeight: '10.5in' }}>
        <div className="space-y-6">
          {/* Pallbearers List */}
          <div className="space-y-3">
            <h3 className="font-serif text-center text-xs font-bold text-[#9B7B34] uppercase tracking-wider border-b border-[#C5A059]/40 pb-2">
              Honored Pallbearers
            </h3>
            <div className="grid grid-cols-2 gap-2 text-center text-xs text-stone-800 font-medium">
              {program.pallbearerNames.map((name, i) => (
                <div key={i} className="p-2 bg-white rounded-md border border-[#EBE2D0]">{name}</div>
              ))}
            </div>
          </div>

          {/* Acknowledgments */}
          <div className="space-y-3 pt-4 border-t border-[#C5A059]/40 text-center">
            <h3 className="font-serif text-xs font-bold text-[#9B7B34] uppercase tracking-wider">
              Family Acknowledgments
            </h3>
            <p className="text-xs text-stone-700 italic leading-relaxed max-w-md mx-auto">
              "{program.familyAcknowledgments}"
            </p>
          </div>
        </div>

        <div className="text-[10px] text-stone-400 font-mono tracking-widest text-center pt-4 border-t border-stone-200">
          PAGE 4 — ACKNOWLEDGMENTS
        </div>
      </div>

    </div>
  );
};
