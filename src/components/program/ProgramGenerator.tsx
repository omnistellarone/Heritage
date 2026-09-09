import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FlyerPreview } from './FlyerPreview';
import { BookletPreview } from './BookletPreview';
import { exportElementToPDF, printElementDirectly } from '../../utils/pdfExport';
import { FileText, Download, Printer, Plus, Trash2, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';

export const ProgramGenerator: React.FC = () => {
  const { activeCase, programs, updateProgram } = useApp();

  const [formatMode, setFormatMode] = useState<'flyer' | 'booklet'>('flyer');

  if (!activeCase) {
    return <div className="p-6 text-stone-500 text-xs">No active case selected.</div>;
  }

  const program = programs[activeCase.id] || {
    caseId: activeCase.id,
    deceasedFullName: activeCase.deceasedName,
    birthDate: activeCase.dateOfBirth,
    passingDate: activeCase.dateOfPassing,
    primaryPhotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    biographyText: 'A cherished life of love, dedication, and grace.',
    tributeQuotes: ["In loving memory of a life beautifully lived."],
    orderOfService: [
      { id: '1', time: '11:00 AM', title: 'Musical Prelude', presenter: 'Organist' },
      { id: '2', time: '11:15 AM', title: 'Opening Prayer', presenter: 'Officiant' }
    ],
    familyAcknowledgments: 'The family expresses sincere gratitude for your presence and prayers.',
    pallbearerNames: ['Marcus Montgomery', 'Julian Montgomery'],
    officiantName: 'Rev. Thomas Sterling'
  };

  // Word count guidance per PRD rule
  const bioWords = program.biographyText ? program.biographyText.trim().split(/\s+/).length : 0;
  const maxRecommendedWords = formatMode === 'flyer' ? 120 : 350;
  const isOverLimit = bioWords > maxRecommendedWords;

  const handleAddField = () => {
    const newItem = {
      id: String(Date.now()),
      time: '11:30 AM',
      title: 'Family Eulogy',
      presenter: 'Family Member'
    };
    updateProgram(activeCase.id, {
      orderOfService: [...program.orderOfService, newItem]
    });
  };

  const handleRemoveField = (id: string) => {
    updateProgram(activeCase.id, {
      orderOfService: program.orderOfService.filter(item => item.id !== id)
    });
  };

  const handleDownloadPDF = () => {
    const elementId = formatMode === 'flyer' ? 'printable-flyer' : 'printable-booklet';
    const filename = `${activeCase.deceasedName}_Memorial_${formatMode.toUpperCase()}.pdf`;
    exportElementToPDF(elementId, filename);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Form Column (5 cols) */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6 text-xs max-h-[110vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">Program Content Form</h2>
            <p className="text-stone-500 text-[11px]">Enter obituary biography, schedule items, and family notes.</p>
          </div>

          <div className="flex bg-stone-100 p-1 rounded-xl font-semibold">
            <button
              onClick={() => setFormatMode('flyer')}
              className={`px-3 py-1 rounded-lg transition-all ${
                formatMode === 'flyer' ? 'bg-[#C5A059] text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              1-Pg Flyer
            </button>
            <button
              onClick={() => setFormatMode('booklet')}
              className={`px-3 py-1 rounded-lg transition-all ${
                formatMode === 'booklet' ? 'bg-[#C5A059] text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              4-Pg Booklet
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-3">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Deceased Full Name</label>
            <input
              type="text"
              value={program.deceasedFullName}
              onChange={e => updateProgram(activeCase.id, { deceasedFullName: e.target.value })}
              className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Date of Birth</label>
              <input
                type="text"
                value={program.birthDate}
                onChange={e => updateProgram(activeCase.id, { birthDate: e.target.value })}
                className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Date of Passing</label>
              <input
                type="text"
                value={program.passingDate}
                onChange={e => updateProgram(activeCase.id, { passingDate: e.target.value })}
                className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Primary Portrait Photo URL</label>
            <input
              type="url"
              value={program.primaryPhotoUrl}
              onChange={e => updateProgram(activeCase.id, { primaryPhotoUrl: e.target.value })}
              className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
            />
          </div>
        </div>

        {/* Biography with Word Count Limit Indicator (PRD Mitigation) */}
        <div className="space-y-1.5 pt-3 border-t border-stone-100">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-stone-700">Biography / Obituary Text</label>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isOverLimit ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'
            }`}>
              {bioWords} / {maxRecommendedWords} words
            </span>
          </div>

          <textarea
            rows={5}
            value={program.biographyText}
            onChange={e => updateProgram(activeCase.id, { biographyText: e.target.value })}
            className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none leading-relaxed"
          />

          {isOverLimit && (
            <div className="flex items-center gap-1.5 text-amber-800 text-[11px] bg-amber-50 p-2 rounded-lg border border-amber-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Word count exceeds recommendation for {formatMode}. Layout might overflow during printing.</span>
            </div>
          )}
        </div>

        {/* Order of Service Items */}
        <div className="space-y-3 pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-stone-700">Order of Service Schedule</label>
            <button
              onClick={handleAddField}
              className="flex items-center gap-1 text-[11px] text-[#9B7B34] hover:text-[#C5A059] font-bold"
            >
              <Plus className="w-3.5 h-3.5" /> Add Step
            </button>
          </div>

          {program.orderOfService.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200">
              <input
                type="text"
                placeholder="11:00 AM"
                value={item.time}
                onChange={e => {
                  const updated = [...program.orderOfService];
                  updated[index].time = e.target.value;
                  updateProgram(activeCase.id, { orderOfService: updated });
                }}
                className="w-20 p-1.5 border border-stone-300 rounded-md font-mono"
              />
              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={e => {
                  const updated = [...program.orderOfService];
                  updated[index].title = e.target.value;
                  updateProgram(activeCase.id, { orderOfService: updated });
                }}
                className="flex-1 p-1.5 border border-stone-300 rounded-md"
              />
              <button
                onClick={() => handleRemoveField(item.id)}
                className="p-1.5 text-stone-400 hover:text-red-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Family Acknowledgments */}
        <div className="space-y-2 pt-3 border-t border-stone-100">
          <label className="block font-semibold text-stone-700">Family Acknowledgments & Tributes</label>
          <textarea
            rows={3}
            value={program.familyAcknowledgments}
            onChange={e => updateProgram(activeCase.id, { familyAcknowledgments: e.target.value })}
            className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
          />
        </div>

        {/* Download & Print Bar */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={printElementDirectly}
            className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-semibold flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex-1 py-2.5 bg-[#C5A059] hover:bg-[#9B7B34] text-white rounded-xl font-semibold flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>

      </div>

      {/* Right Live Preview Column (7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-stone-200 shadow-xs">
          <span className="font-serif font-bold text-stone-900 text-sm">
            Live Print Proof ({formatMode === 'flyer' ? '1-Page Obituary Flyer' : '4-Page Program Booklet'})
          </span>

          <span className="text-xs text-stone-400 font-mono">Letter / A4 Standard Format</span>
        </div>

        {formatMode === 'flyer' ? (
          <FlyerPreview program={program} memorialCase={activeCase} />
        ) : (
          <BookletPreview program={program} memorialCase={activeCase} />
        )}
      </div>

    </div>
  );
};
