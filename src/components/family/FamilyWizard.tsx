import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CatalogItem, CategoryType } from '../../types';
import { Check, PhoneCall, ChevronRight, ChevronLeft, Heart, ShoppingBag, Sparkles, AlertCircle, FileText, Download } from 'lucide-react';
import { ProgramGenerator } from '../program/ProgramGenerator';
import { PhotoStoryPlayer } from '../memorial/PhotoStoryPlayer';

export const FamilyWizard: React.FC = () => {
  const { catalog, activeCase, orders, updateOrder } = useApp();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<'arrangements' | 'program' | 'photostory'>('arrangements');
  const [showPhotoStory, setShowPhotoStory] = useState(false);

  if (!activeCase) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs">
          <p className="text-stone-600 text-sm">No active case found. Please select or create a memorial case.</p>
        </div>
      </div>
    );
  }

  const currentOrder = orders[activeCase.id] || {
    caseId: activeCase.id,
    casketId: undefined,
    plotId: undefined,
    pallbearerId: undefined,
    specialNotes: '',
    status: 'draft',
    updatedAt: new Date().toISOString()
  };

  const selectedCasket = catalog.find(i => i.id === currentOrder.casketId);
  const selectedPlot = catalog.find(i => i.id === currentOrder.plotId);
  const selectedPallbearer = catalog.find(i => i.id === currentOrder.pallbearerId);

  const runningTotal = (selectedCasket?.price || 0) + (selectedPlot?.price || 0) + (selectedPallbearer?.price || 0);

  const caskets = catalog.filter(i => i.category === 'casket');
  const plots = catalog.filter(i => i.category === 'plot');
  const pallbearers = catalog.filter(i => i.category === 'pallbearer');

  const handleSelectItem = (item: CatalogItem) => {
    if (!item.inStock) return; // Guard for out-of-stock

    if (item.category === 'casket') {
      updateOrder(activeCase.id, { casketId: item.id });
    } else if (item.category === 'plot') {
      updateOrder(activeCase.id, { plotId: item.id });
    } else if (item.category === 'pallbearer') {
      updateOrder(activeCase.id, { pallbearerId: item.id });
    }
  };

  const handleSaveNotes = (notes: string) => {
    updateOrder(activeCase.id, { specialNotes: notes });
  };

  const handleSubmitOrder = () => {
    updateOrder(activeCase.id, { status: 'submitted' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Serene Banner */}
      <div className="bg-[#FAF8F5] border border-[#EBE2D0] rounded-3xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D4AF37]/30 rounded-full text-xs font-semibold text-[#9B7B34]">
          <Heart className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
          <span>Serene Family Planning Portal</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Honoring {activeCase.deceasedName}
        </h1>

        <p className="text-stone-600 text-sm max-w-2xl mx-auto leading-relaxed">
          Take your time in this tranquil space. Choose dignified burial arrangements, create printable memorial programs, and assemble a loving photo story.
        </p>

        {/* Navigation Sub-Tabs */}
        <div className="pt-3 flex justify-center">
          <div className="inline-flex bg-white p-1 rounded-2xl border border-[#EBE2D0] shadow-xs text-xs font-medium">
            <button
              onClick={() => setActiveSubTab('arrangements')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all ${
                activeSubTab === 'arrangements' ? 'bg-[#C5A059] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Arrangement Catalog</span>
            </button>

            <button
              onClick={() => setActiveSubTab('program')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all ${
                activeSubTab === 'program' ? 'bg-[#C5A059] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Obituary & Program Builder</span>
            </button>

            <button
              onClick={() => setShowPhotoStory(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all text-stone-600 hover:text-stone-900`}
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Animated Photo Reel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Tab 1: Arrangements */}
      {activeSubTab === 'arrangements' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Selection Column (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Step Wizard Header */}
            <div className="flex bg-white p-2 rounded-2xl border border-stone-200 text-xs font-medium shadow-xs justify-between gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveStep(1)}
                className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
                  activeStep === 1 ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-700 text-white text-[11px] flex items-center justify-center">1</span>
                <span>1. Casket Selection</span>
              </button>

              <button
                onClick={() => setActiveStep(2)}
                className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
                  activeStep === 2 ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-700 text-white text-[11px] flex items-center justify-center">2</span>
                <span>2. Cemetery Plot Tier</span>
              </button>

              <button
                onClick={() => setActiveStep(3)}
                className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
                  activeStep === 3 ? 'bg-stone-900 text-white font-bold' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-700 text-white text-[11px] flex items-center justify-center">3</span>
                <span>3. Pallbearer Service</span>
              </button>
            </div>

            {/* STEP 1: Casket Catalog */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">Choose a Casket</h3>
                  <p className="text-xs text-stone-500 mt-1">Select from solid hardwoods, protective metals, or eco-friendly woven willow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caskets.map((casket) => {
                    const isSelected = currentOrder.casketId === casket.id;
                    return (
                      <div
                        key={casket.id}
                        className={`bg-white rounded-2xl border overflow-hidden transition-all shadow-xs flex flex-col justify-between ${
                          isSelected ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30 shadow-md' : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="relative h-48 bg-stone-100">
                            <img src={casket.imageUrl} alt={casket.name} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute top-3 right-3 bg-[#C5A059] text-white text-xs px-3 py-1 rounded-full font-bold shadow-md flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Selected
                              </div>
                            )}
                          </div>

                          <div className="p-5 space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-lg font-bold text-stone-900">{casket.name}</h4>
                              <span className="font-mono text-base font-bold text-stone-900">${casket.price.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-[#C5A059] font-medium">{casket.subtitle}</p>
                            <p className="text-xs text-stone-600 leading-relaxed">{casket.description}</p>
                          </div>
                        </div>

                        {/* Button area with PRD Edge Case handling */}
                        <div className="p-4 bg-stone-50 border-t border-stone-100">
                          {!casket.inStock ? (
                            <button
                              disabled
                              className="w-full py-2.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                            >
                              <PhoneCall className="w-4 h-4 text-amber-700" />
                              <span>Out of Stock — Contact Director</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSelectItem(casket)}
                              className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                isSelected
                                  ? 'bg-[#C5A059] text-white shadow-xs'
                                  : 'bg-stone-900 hover:bg-stone-800 text-white'
                              }`}
                            >
                              {isSelected ? 'Casket Selected' : 'Select Casket'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Plot Catalog */}
            {activeStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">Select Burial Plot Tier</h3>
                  <p className="text-xs text-stone-500 mt-1">Choose a peaceful resting location within our cemetery gardens.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plots.map((plot) => {
                    const isSelected = currentOrder.plotId === plot.id;
                    return (
                      <div
                        key={plot.id}
                        className={`bg-white rounded-2xl border overflow-hidden transition-all shadow-xs flex flex-col justify-between ${
                          isSelected ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30 shadow-md' : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="relative h-48 bg-stone-100">
                            <img src={plot.imageUrl} alt={plot.name} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute top-3 right-3 bg-[#C5A059] text-white text-xs px-3 py-1 rounded-full font-bold shadow-md flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Selected
                              </div>
                            )}
                          </div>

                          <div className="p-5 space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-lg font-bold text-stone-900">{plot.name}</h4>
                              <span className="font-mono text-base font-bold text-stone-900">${plot.price.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-[#C5A059] font-medium">{plot.subtitle}</p>
                            <p className="text-xs text-stone-600 leading-relaxed">{plot.description}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-stone-50 border-t border-stone-100">
                          {!plot.inStock ? (
                            <button
                              disabled
                              className="w-full py-2.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                            >
                              <PhoneCall className="w-4 h-4 text-amber-700" />
                              <span>Out of Stock — Contact Director</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSelectItem(plot)}
                              className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                isSelected
                                  ? 'bg-[#C5A059] text-white shadow-xs'
                                  : 'bg-stone-900 hover:bg-stone-800 text-white'
                              }`}
                            >
                              {isSelected ? 'Plot Tier Selected' : 'Select Plot Tier'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Pallbearer Service */}
            {activeStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">Select Pallbearer Escort Service</h3>
                  <p className="text-xs text-stone-500 mt-1">Choose uniformed ceremonial escort teams to carry your loved one with honor.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pallbearers.map((pb) => {
                    const isSelected = currentOrder.pallbearerId === pb.id;
                    return (
                      <div
                        key={pb.id}
                        className={`bg-white rounded-2xl border overflow-hidden transition-all shadow-xs flex flex-col justify-between ${
                          isSelected ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30 shadow-md' : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="relative h-48 bg-stone-100">
                            <img src={pb.imageUrl} alt={pb.name} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute top-3 right-3 bg-[#C5A059] text-white text-xs px-3 py-1 rounded-full font-bold shadow-md flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Selected
                              </div>
                            )}
                          </div>

                          <div className="p-5 space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-lg font-bold text-stone-900">{pb.name}</h4>
                              <span className="font-mono text-base font-bold text-stone-900">${pb.price.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-[#C5A059] font-medium">{pb.subtitle}</p>
                            <p className="text-xs text-stone-600 leading-relaxed">{pb.description}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-stone-50 border-t border-stone-100">
                          {!pb.inStock ? (
                            <button
                              disabled
                              className="w-full py-2.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                            >
                              <PhoneCall className="w-4 h-4 text-amber-700" />
                              <span>Out of Stock — Contact Director</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSelectItem(pb)}
                              className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                isSelected
                                  ? 'bg-[#C5A059] text-white shadow-xs'
                                  : 'bg-stone-900 hover:bg-stone-800 text-white'
                              }`}
                            >
                              {isSelected ? 'Pallbearer Service Selected' : 'Select Pallbearers'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Wizard Stepper Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-xs">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                className="flex items-center gap-1 px-4 py-2 bg-stone-100 text-stone-700 rounded-xl hover:bg-stone-200 disabled:opacity-40 font-medium"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Step
              </button>

              <button
                disabled={activeStep === 3}
                onClick={() => setActiveStep(prev => Math.min(3, prev + 1))}
                className="flex items-center gap-1 px-5 py-2 bg-[#C5A059] text-white rounded-xl hover:bg-[#9B7B34] disabled:opacity-40 font-medium shadow-xs"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Summary Column (1 col) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs sticky top-20 space-y-5 text-xs">
              <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
                Arrangement Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                  <div>
                    <div className="text-stone-400 font-semibold uppercase text-[10px]">1. Casket</div>
                    <div className="font-bold text-stone-900 truncate max-w-44">{selectedCasket?.name || 'Not Selected'}</div>
                  </div>
                  <div className="font-mono font-bold text-stone-900">
                    ${selectedCasket ? selectedCasket.price.toLocaleString() : 0}
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                  <div>
                    <div className="text-stone-400 font-semibold uppercase text-[10px]">2. Plot Tier</div>
                    <div className="font-bold text-stone-900 truncate max-w-44">{selectedPlot?.name || 'Not Selected'}</div>
                  </div>
                  <div className="font-mono font-bold text-stone-900">
                    ${selectedPlot ? selectedPlot.price.toLocaleString() : 0}
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                  <div>
                    <div className="text-stone-400 font-semibold uppercase text-[10px]">3. Pallbearers</div>
                    <div className="font-bold text-stone-900 truncate max-w-44">{selectedPallbearer?.name || 'Not Selected'}</div>
                  </div>
                  <div className="font-mono font-bold text-stone-900">
                    ${selectedPallbearer ? selectedPallbearer.price.toLocaleString() : 0}
                  </div>
                </div>
              </div>

              {/* Notes Input */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Special Family Requests</label>
                <textarea
                  rows={3}
                  placeholder="Add floral placement instructions, music requests, or custom notes for the director..."
                  value={currentOrder.specialNotes || ''}
                  onChange={e => handleSaveNotes(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#C5A059] focus:outline-none text-xs"
                />
              </div>

              {/* Total Calculation */}
              <div className="p-4 bg-[#FBF9F5] border border-[#EBE2D0] rounded-xl space-y-1">
                <div className="text-stone-500 font-medium">Estimated Package Total:</div>
                <div className="font-mono text-2xl font-bold text-stone-900">${runningTotal.toLocaleString()}</div>
                <div className="text-[10px] text-stone-400 pt-1">
                  * No online payment required. Invoice recorded as "Pending Direct Settlement".
                </div>
              </div>

              {/* Submit Button */}
              {currentOrder.status === 'submitted' || currentOrder.status === 'approved' ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center font-bold">
                  ✓ Order Submitted to Director
                </div>
              ) : (
                <button
                  onClick={handleSubmitOrder}
                  disabled={runningTotal === 0}
                  className="w-full py-3 bg-[#C5A059] hover:bg-[#9B7B34] text-white font-bold rounded-xl shadow-sm disabled:opacity-40 transition-all"
                >
                  Submit Arrangement Plan
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Sub-Tab 2: Obituary Program Builder */}
      {activeSubTab === 'program' && <ProgramGenerator />}

      {/* Photo Story Modal Overlay */}
      {showPhotoStory && <PhotoStoryPlayer onClose={() => setShowPhotoStory(false)} />}

    </div>
  );
};
