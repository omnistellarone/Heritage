import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { StaffDashboard } from './components/admin/StaffDashboard';
import { FamilyWizard } from './components/family/FamilyWizard';
import { GuestRSVPPortal } from './components/guest/GuestRSVPPortal';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { userRole } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />

        <main>
          {userRole === 'admin' && <StaffDashboard />}
          {userRole === 'family' && <FamilyWizard />}
          {userRole === 'guest' && <GuestRSVPPortal />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EBE2D0] py-6 text-center text-xs text-stone-500 space-y-1 mt-12">
        <div className="flex items-center justify-center gap-1.5 font-serif text-stone-700">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="font-semibold">HavenCare</span> — Funeral Planning & Memorial Management Platform
        </div>
        <p className="text-[11px] text-stone-400">
          Designed with serene dignity for families and funeral home administrators.
        </p>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
