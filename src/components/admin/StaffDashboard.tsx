import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CaseManagement } from './CaseManagement';
import { CatalogEditor } from './CatalogEditor';
import { RSVPTracker } from './RSVPTracker';
import { LayoutDashboard, FolderHeart, Package, Users, FileCheck, CheckCircle, Clock } from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const { cases, activeCase, orders, updateOrder, catalog } = useApp();
  const [activeTab, setActiveTab] = useState<'cases' | 'catalog' | 'rsvps' | 'orders'>('cases');

  const currentOrder = activeCase ? orders[activeCase.id] : undefined;

  const casket = catalog.find(i => i.id === currentOrder?.casketId);
  const plot = catalog.find(i => i.id === currentOrder?.plotId);
  const pallbearer = catalog.find(i => i.id === currentOrder?.pallbearerId);

  const totalPrice = (casket?.price || 0) + (plot?.price || 0) + (pallbearer?.price || 0);

  const handleApproveOrder = () => {
    if (activeCase && currentOrder) {
      updateOrder(activeCase.id, { status: 'approved' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-charcoal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              <LayoutDashboard className="w-4 h-4" />
              <span>Funeral Director Command Portal</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
              HavenCare Administration
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Centralized management for funeral packages, memorial case setups, guest seat capacity tracking, and family arrangement approvals.
            </p>
          </div>

          {activeCase && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-xs space-y-1 min-w-60">
              <div className="text-stone-300 uppercase text-[10px] font-bold tracking-wider">Active Selected Case</div>
              <div className="text-white font-serif font-bold text-base">{activeCase.deceasedName}</div>
              <div className="text-stone-300">Case: {activeCase.caseNumber}</div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-stone-200 shadow-xs overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('cases')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'cases' ? 'bg-[#C5A059] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <FolderHeart className="w-4 h-4" />
          <span>Memorial Cases ({cases.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'catalog' ? 'bg-[#C5A059] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Catalog Inventory ({catalog.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rsvps')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'rsvps' ? 'bg-[#C5A059] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Guest Capacity & RSVPs</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'orders' ? 'bg-[#C5A059] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Family Order Approvals</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'cases' && <CaseManagement />}
        {activeTab === 'catalog' && <CatalogEditor />}
        {activeTab === 'rsvps' && <RSVPTracker />}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Family Arrangement Order Review
            </h2>

            {!activeCase ? (
              <p className="text-stone-500 text-xs">No active case selected.</p>
            ) : !currentOrder ? (
              <div className="p-8 text-center text-stone-500 text-xs bg-[#FBF9F5] border border-[#EBE2D0] rounded-xl">
                The family has not submitted arrangement selections yet for <strong>{activeCase.deceasedName}</strong>.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#FBF9F5] border border-[#EBE2D0] rounded-xl text-xs">
                  <div>
                    <div className="font-bold text-stone-900 text-sm">{activeCase.deceasedName}</div>
                    <div className="text-stone-500">Contact: {activeCase.familyContactName} ({activeCase.familyContactPhone})</div>
                  </div>

                  <span className={`px-3 py-1 rounded-full font-bold uppercase text-[10px] ${
                    currentOrder.status === 'approved' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    Status: {currentOrder.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 border border-stone-200 rounded-xl space-y-1 bg-white">
                    <div className="text-stone-400 font-semibold uppercase text-[10px]">Casket Selected</div>
                    <div className="font-bold text-stone-900">{casket?.name || 'None Selected'}</div>
                    <div className="text-[#C5A059] font-mono">${casket?.price?.toLocaleString() || 0}</div>
                  </div>

                  <div className="p-4 border border-stone-200 rounded-xl space-y-1 bg-white">
                    <div className="text-stone-400 font-semibold uppercase text-[10px]">Burial Plot Tier</div>
                    <div className="font-bold text-stone-900">{plot?.name || 'None Selected'}</div>
                    <div className="text-[#C5A059] font-mono">${plot?.price?.toLocaleString() || 0}</div>
                  </div>

                  <div className="p-4 border border-stone-200 rounded-xl space-y-1 bg-white">
                    <div className="text-stone-400 font-semibold uppercase text-[10px]">Pallbearer Team</div>
                    <div className="font-bold text-stone-900">{pallbearer?.name || 'None Selected'}</div>
                    <div className="text-[#C5A059] font-mono">${pallbearer?.price?.toLocaleString() || 0}</div>
                  </div>
                </div>

                {currentOrder.specialNotes && (
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-xs">
                    <div className="font-semibold text-stone-700 mb-1">Special Family Notes:</div>
                    <p className="text-stone-600 italic">"{currentOrder.specialNotes}"</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                  <div className="text-sm">
                    <span className="text-stone-500 font-medium">Estimated Order Total: </span>
                    <strong className="font-mono text-xl text-stone-900">${totalPrice.toLocaleString()}</strong>
                  </div>

                  {currentOrder.status !== 'approved' ? (
                    <button
                      onClick={handleApproveOrder}
                      className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs shadow-xs transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve Arrangement Order</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                      <CheckCircle className="w-4 h-4" />
                      <span>Approved by Funeral Director</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
