
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Calendar, Shuffle, MapPin, Book, Droplet } from 'lucide-react';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const NavigationMenu = ({ isOpen, onClose, activeFilter, onFilterChange }: NavigationMenuProps) => {
  const filters = [
    { id: 'navigation', label: 'Navigation', icon: MapPin },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'studying', label: 'Studying', icon: Book },
    { id: 'water', label: 'Water Fountains', icon: Droplet },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute top-0 right-0 h-full w-80 backdrop-blur-xl bg-white/10 border-l border-white/20 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-white">Menu</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Quick Actions</h3>
            
            <Button
              className="w-full justify-start bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-white/20 text-white"
              variant="ghost"
            >
              <Calendar className="mr-3 h-4 w-4" />
              Register for Event
            </Button>
            
            <Button
              className="w-full justify-start bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 border border-white/20 text-white"
              variant="ghost"
            >
              <Shuffle className="mr-3 h-4 w-4" />
              I'm Feeling Lucky
            </Button>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Explore Campus</h3>
            
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              
              return (
                <Button
                  key={filter.id}
                  onClick={() => {
                    onFilterChange(filter.id);
                    onClose();
                  }}
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-white/20 border-white/40 text-white' 
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                  } border transition-all duration-200`}
                  variant="ghost"
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
