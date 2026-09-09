import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GuestRSVP } from '../../types';
import { Key, Users, CheckCircle2, AlertCircle, Calendar, MapPin, QrCode, ShieldCheck, Heart } from 'lucide-react';

export const GuestRSVPPortal: React.FC = () => {
  const { cases, submitRSVP } = useApp();

  const [accessCode, setAccessCode] = useState('');
  const [guestName, setGuestName] = useState('');
  const [seats, setSeats] = useState<number>(1);
  const [phone, setPhone] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedRSVP, setConfirmedRSVP] = useState<GuestRSVP | null>(null);

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!accessCode.trim() || !guestName.trim()) {
      setErrorMessage('Please enter both your access code and full name.');
      return;
    }

    const result = submitRSVP(accessCode, guestName, seats, phone);

    if (!result.success) {
      setErrorMessage(result.message);
    } else if (result.rsvp) {
      setConfirmedRSVP(result.rsvp);
    }
  };

  const targetCase = cases.find(c => confirmedRSVP && c.id === confirmedRSVP.caseId);

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F0E6] border border-[#EBE2D0] rounded-full text-xs font-semibold text-[#9B7B34]">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span>Guest Reservation Portal</span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
          Service Attendance RSVP
        </h1>

        <p className="text-stone-600 text-sm leading-relaxed">
          Please enter the private access code provided on your invitation flyer or text message to reserve your seating.
        </p>
      </div>

      {/* Main Card */}
      {!confirmedRSVP ? (
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <form onSubmit={handleRSVPSubmit} className="space-y-4 text-xs">
            
            {/* Access Code Input */}
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Invitation Access Code</label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. HAVEN1"
                  value={accessCode}
                  onChange={e => setAccessCode(e.target.value.toUpperCase())}
                  className="w-full pl-9 pr-4 py-2.5 border border-stone-300 rounded-xl font-mono text-sm uppercase tracking-wider focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-stone-400 mt-1">Sample test access code: <strong className="text-stone-700 font-mono">HAVEN1</strong> or <strong className="text-stone-700 font-mono">PEACE2</strong></p>
            </div>

            {/* Guest Name */}
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Your Full Name / Family Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Gregory Vance & Family"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Seats Requested */}
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Seats Reserved</label>
                <select
                  value={seats}
                  onChange={e => setSeats(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                >
                  <option value={1}>1 Seat</option>
                  <option value={2}>2 Seats</option>
                  <option value={3}>3 Seats</option>
                  <option value={4}>4 Seats</option>
                </select>
              </div>

              {/* Phone (Optional) */}
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl flex items-start gap-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#C5A059] hover:bg-[#9B7B34] text-white font-bold text-sm rounded-xl shadow-md transition-all mt-2"
            >
              Confirm Attendance Reservation
            </button>

          </form>
        </div>
      ) : (
        /* Digital Confirmation Entrance Pass */
        <div className="bg-white rounded-3xl border-2 border-[#C5A059] shadow-xl overflow-hidden text-stone-900 space-y-6">
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#9B7B34] p-6 text-white text-center space-y-1">
            <div className="inline-flex p-2 bg-white/20 rounded-full mb-1">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-serif text-2xl font-bold">Attendance Confirmed</h2>
            <p className="text-xs text-amber-100 font-medium">Digital Chapel Entrance Pass</p>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Guest Name & Code */}
            <div className="flex justify-between items-center border-b border-stone-100 pb-4">
              <div>
                <div className="text-[10px] uppercase font-bold text-stone-400">Reserved Guest Name</div>
                <div className="font-serif text-xl font-bold text-stone-900">{confirmedRSVP.guestName}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-stone-400">Seats Reserved</div>
                <div className="font-mono text-xl font-bold text-[#C5A059]">{confirmedRSVP.seatsAllocated} Seat(s)</div>
              </div>
            </div>

            {/* Service & Venue Details */}
            {targetCase && (
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EBE2D0] space-y-2 text-xs">
                <div className="font-serif text-sm font-bold text-stone-900">
                  Honoring {targetCase.deceasedName}
                </div>
                
                <div className="flex items-center gap-2 text-stone-600">
                  <Calendar className="w-4 h-4 text-[#C5A059]" />
                  <span>{targetCase.serviceDate} at {targetCase.serviceTime}</span>
                </div>

                <div className="flex items-center gap-2 text-stone-600">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>{targetCase.venueName} ({targetCase.venueAddress})</span>
                </div>
              </div>
            )}

            {/* Door Check-In QR Code Simulation */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-3 bg-white border border-stone-300 rounded-xl shadow-xs">
                  <QrCode className="w-24 h-24 text-stone-800" />
                </div>
              </div>
              <div className="text-[11px] text-stone-500 font-mono">
                PASS CODE: {confirmedRSVP.accessCode}-{confirmedRSVP.id.slice(-4)}
              </div>
              <p className="text-[10px] text-stone-400">
                Present this digital pass to the usher at the chapel entrance for seamless entry.
              </p>
            </div>

            {/* Reset / New Entry Button */}
            <button
              onClick={() => setConfirmedRSVP(null)}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-all"
            >
              Enter Another RSVP Code
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
