import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MemorialCase } from '../../types';
import { PlusCircle, Calendar, MapPin, Users, Key, Mail, Phone, CheckCircle2, Link2 } from 'lucide-react';

export const CaseManagement: React.FC = () => {
  const { cases, createNewCase, setActiveCaseId, activeCaseId } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    deceasedName: '',
    dateOfBirth: '',
    dateOfPassing: '',
    venueName: '',
    venueAddress: '',
    serviceDate: '',
    serviceTime: '11:00 AM',
    rsvpAccessCode: '',
    guestCapacity: 100,
    activeStatus: 'planning' as const,
    familyContactName: '',
    familyContactEmail: '',
    familyContactPhone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.deceasedName || !formData.rsvpAccessCode) return;
    
    createNewCase(formData);
    setShowModal(false);
    setFormData({
      deceasedName: '',
      dateOfBirth: '',
      dateOfPassing: '',
      venueName: '',
      venueAddress: '',
      serviceDate: '',
      serviceTime: '11:00 AM',
      rsvpAccessCode: '',
      guestCapacity: 100,
      activeStatus: 'planning',
      familyContactName: '',
      familyContactEmail: '',
      familyContactPhone: ''
    });
  };

  const copyShareLink = (code: string) => {
    navigator.clipboard.writeText(`RSVP Code: ${code}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Active Funeral Cases
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Manage client arrangements, venue capacity limits, and private family access codes.
          </p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C5A059] hover:bg-[#9B7B34] text-white rounded-xl font-medium shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Memorial Case</span>
        </button>
      </div>

      {/* Case Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c) => {
          const isActive = c.id === activeCaseId;
          return (
            <div
              key={c.id}
              className={`bg-white rounded-2xl p-6 border transition-all relative ${
                isActive
                  ? 'border-[#C5A059] ring-2 ring-[#C5A059]/20 shadow-md'
                  : 'border-stone-200 hover:border-stone-300 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-mono font-semibold text-stone-400 bg-stone-100 px-2 py-1 rounded-md">
                  {c.caseNumber}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${
                  c.activeStatus === 'approved' 
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {c.activeStatus}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-stone-900 mt-3">
                {c.deceasedName}
              </h3>
              
              <div className="text-xs text-stone-500 mt-1">
                {c.dateOfBirth} — {c.dateOfPassing}
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{c.serviceDate || 'Date TBD'} at {c.serviceTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="truncate">{c.venueName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Chapel Capacity: {c.guestCapacity} Guests</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Family: {c.familyContactName} ({c.familyContactPhone})</span>
                </div>
              </div>

              {/* Access Code Box */}
              <div className="mt-4 p-3 bg-[#FBF9F5] border border-[#EBE2D0] rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">RSVP Code</div>
                  <div className="font-mono font-bold text-stone-900 text-sm">{c.rsvpAccessCode}</div>
                </div>
                
                <button
                  onClick={() => copyShareLink(c.rsvpAccessCode)}
                  className="flex items-center gap-1 text-xs text-[#9B7B34] hover:text-[#C5A059] font-medium"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>{copiedCode === c.rsvpAccessCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Select Case Button */}
              <button
                onClick={() => setActiveCaseId(c.id)}
                className={`mt-4 w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#C5A059] text-white cursor-default'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {isActive ? 'Current Selected Case' : 'Set as Active Case'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Create Case Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
              Create New Memorial Case
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Enter deceased information and set guest attendance capacity.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Deceased Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Margaret Rose Thornton"
                  value={formData.deceasedName}
                  onChange={e => setFormData({ ...formData, deceasedName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Date of Passing</label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfPassing}
                    onChange={e => setFormData({ ...formData, dateOfPassing: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Venue / Chapel Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace Memorial Chapel"
                  value={formData.venueName}
                  onChange={e => setFormData({ ...formData, venueName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Venue Address</label>
                <input
                  type="text"
                  placeholder="e.g. 740 Park Ave, San Jose, CA"
                  value={formData.venueAddress}
                  onChange={e => setFormData({ ...formData, venueAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Service Date</label>
                  <input
                    type="date"
                    required
                    value={formData.serviceDate}
                    onChange={e => setFormData({ ...formData, serviceDate: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Service Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 11:00 AM"
                    value={formData.serviceTime}
                    onChange={e => setFormData({ ...formData, serviceTime: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">RSVP Access Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GRACE4"
                    value={formData.rsvpAccessCode}
                    onChange={e => setFormData({ ...formData, rsvpAccessCode: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono uppercase focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Max Chapel Capacity</label>
                  <input
                    type="number"
                    required
                    min={10}
                    max={500}
                    value={formData.guestCapacity}
                    onChange={e => setFormData({ ...formData, guestCapacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <label className="block font-semibold text-stone-700 mb-1">Primary Family Contact Name</label>
                <input
                  type="text"
                  placeholder="e.g. Robert Thornton (Son)"
                  value={formData.familyContactName}
                  onChange={e => setFormData({ ...formData, familyContactName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Family Email</label>
                  <input
                    type="email"
                    placeholder="family@example.com"
                    value={formData.familyContactEmail}
                    onChange={e => setFormData({ ...formData, familyContactEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Family Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={formData.familyContactPhone}
                    onChange={e => setFormData({ ...formData, familyContactPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A059] text-white rounded-xl hover:bg-[#9B7B34] font-medium shadow-xs"
                >
                  Create Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
