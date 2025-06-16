
import React, { useState } from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import NavigationMenu from './NavigationMenu';
import ChatInterface from './ChatInterface';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MainApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('studying');
  const [selectedSpot, setSelectedSpot] = useState<any>(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <div className="backdrop-blur-lg bg-white/10 px-4 py-2 rounded-2xl border border-white/20 shadow-xl">
          <h1 className="text-xl font-bold text-white">WatPlace</h1>
        </div>
      </div>

      {/* Menu Button */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="backdrop-blur-lg bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-3 shadow-xl"
          variant="ghost"
        >
          <Menu className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Map */}
      <Map 
        activeFilter={activeFilter}
        onSpotSelect={setSelectedSpot}
      />

      {/* Sidebar */}
      {selectedSpot && (
        <Sidebar 
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />
      )}

      {/* Chat Interface */}
      <ChatInterface />
    </div>
  );
};

export default MainApp;
