import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GuestRSVP } from '../../types';
import { Users, CheckCircle, Clock, Download, Search, UserCheck, ShieldAlert, Key } from 'lucide-react';

export const RSVPTracker: React.FC = () => {
  const { rsvps, activeCase, toggleCheckIn } = useApp();
  const [search, setSearch] = useState('');

  if (!activeCase) {
    return (
      <div className="p-8 text-center text-stone-500 bg-white rounded-2xl border border-stone-200">
        No active case selected. Please select a case from the top header or create a new case.
      </div>
    );
  }

  const caseRSVPs = rsvps.filter(r => r.caseId === activeCase.id);
  const totalReservedSeats = caseRSVPs.reduce((sum, r) => sum + r.seatsAllocated, 0);
  const checkedInCount = caseRSVPs.filter(r => r.checkedIn).reduce((sum, r) => sum + r.seatsAllocated, 0);
  const capacityPercent = Math.min(100, Math.round((totalReservedSeats / activeCase.guestCapacity) * 100));

  const filteredRSVPs = caseRSVPs.filter(r => 
    r.guestName.toLowerCase().includes(search.toLowerCase()) ||
    (r.guestPhone && r.guestPhone.includes(search))
  );

  const exportCSV = () => {
    const headers = ["Guest Name", "Seats Reserved", "Checked In", "Phone", "RSVP Date", "Access Code"];
    const rows = caseRSVPs.map(r => [
      `"${r.guestName}"`,
      r.seatsAllocated,
      r.checkedIn ? "Yes" : "No",
      `"${r.guestPhone || ''}"`,
      `"${new Date(r.rsvpDate).toLocaleDateString()}"`,
      `"${r.accessCode}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RSVP_Guest_List_${activeCase.caseNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Cards & Capacity Bar */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl font-semibold text-stone-900">
                Guest Capacity & RSVP Monitor
              </h2>
              <span className="font-mono text-xs px-2.5 py-1 bg-[#FBF9F5] border border-[#EBE2D0] rounded-lg text-[#9B7B34] font-bold">
                Code: {activeCase.rsvpAccessCode}
              </span>
            </div>
            <p className="text-sm text-stone-500 mt-1">
              Tracking RSVPs for <strong className="text-stone-800">{activeCase.deceasedName}</strong> at {activeCase.venueName}.
            </p>
          </div>

          <button
            onClick={exportCSV}
            disabled={caseRSVPs.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-xs disabled:opacity-50 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Guest CSV</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 bg-[#FBF9F5] p-4 rounded-xl border border-[#EBE2D0]">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-stone-700">Chapel Seat Allocation Progress</span>
            <span className="text-stone-900 font-bold">
              {totalReservedSeats} / {activeCase.guestCapacity} Seats ({capacityPercent}%)
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                capacityPercent >= 100 
                  ? 'bg-amber-600' 
                  : capacityPercent >= 80 
                  ? 'bg-[#C5A059]' 
                  : 'bg-emerald-600'
              }`}
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500">Total RSVPs</div>
              <div className="text-xl font-bold text-stone-900">{caseRSVPs.length} Parties ({totalReservedSeats} seats)</div>
            </div>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500">Checked In at Venue</div>
              <div className="text-xl font-bold text-stone-900">{checkedInCount} Guests</div>
            </div>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500">Available Remaining</div>
              <div className="text-xl font-bold text-stone-900">
                {Math.max(0, activeCase.guestCapacity - totalReservedSeats)} Seats
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Table & Search */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Confirmed Attendees List ({filteredRSVPs.length})
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search guest name or phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
            />
          </div>
        </div>

        {filteredRSVPs.length === 0 ? (
          <div className="p-12 text-center text-stone-400 text-xs">
            No RSVPs recorded yet for access code <strong>{activeCase.rsvpAccessCode}</strong>.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-[#FBF9F5] text-stone-500 uppercase font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3.5 px-6">Guest Party Name</th>
                  <th className="py-3.5 px-4">Seats Allocated</th>
                  <th className="py-3.5 px-4">Phone Number</th>
                  <th className="py-3.5 px-4">RSVP Date</th>
                  <th className="py-3.5 px-4">Door Check-In</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredRSVPs.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-stone-900">
                      {rsvp.guestName}
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-stone-800">
                      {rsvp.seatsAllocated} {rsvp.seatsAllocated === 1 ? 'Seat' : 'Seats'}
                    </td>
                    <td className="py-4 px-4 text-stone-500">
                      {rsvp.guestPhone || 'N/A'}
                    </td>
                    <td className="py-4 px-4 text-stone-500">
                      {new Date(rsvp.rsvpDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium ${
                        rsvp.checkedIn
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}>
                        {rsvp.checkedIn ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        <span>{rsvp.checkedIn ? 'Checked In' : 'Expected'}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => toggleCheckIn(rsvp.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          rsvp.checkedIn
                            ? 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        {rsvp.checkedIn ? 'Undo Check-In' : 'Door Check-In'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
