
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, MapPin, Clock, Users, Wifi, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SidebarProps {
  spot: any;
  onClose: () => void;
}

const Sidebar = ({ spot, onClose }: SidebarProps) => {
  const getOccupancyColor = (occupancy: number) => {
    if (occupancy > 80) return 'text-red-400';
    if (occupancy > 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getOccupancyText = (occupancy: number) => {
    if (occupancy > 80) return 'Very Busy';
    if (occupancy > 50) return 'Moderately Busy';
    return 'Available';
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 backdrop-blur-xl bg-white/10 border-l border-white/20 shadow-2xl z-40 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">{spot.name}</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 rounded-full p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Image Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl mb-6 flex items-center justify-center border border-white/20">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-white/60 mx-auto mb-2" />
            <p className="text-white/60 text-sm">Campus Photo</p>
          </div>
        </div>

        {/* Occupancy Status */}
        <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Current Status</h3>
            <span className={`text-sm font-medium ${getOccupancyColor(spot.occupancy)}`}>
              {getOccupancyText(spot.occupancy)}
            </span>
          </div>
          <Progress value={spot.occupancy} className="mb-2" />
          <p className="text-gray-300 text-sm">{spot.occupancy}% occupied</p>
        </div>

        {/* Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center text-gray-300">
            <Clock className="h-4 w-4 mr-3" />
            <span className="text-sm">{spot.hours}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <Users className="h-4 w-4 mr-3" />
            <span className="text-sm capitalize">{spot.type.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="text-white font-medium mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {spot.amenities.map((amenity: string, index: number) => (
              <div
                key={index}
                className="flex items-center bg-white/10 px-3 py-1 rounded-full border border-white/20"
              >
                {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-2 text-blue-400" />}
                {amenity === 'Power Outlets' && <Zap className="h-3 w-3 mr-2 text-yellow-400" />}
                <span className="text-xs text-gray-300">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl p-4 border border-white/20">
          <h3 className="text-white font-medium mb-2">AI Insights</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p className="text-green-400">✓ Great for focused study sessions</p>
            <p className="text-yellow-400">⚠ Can get noisy during peak hours</p>
            <p className="text-blue-400">ℹ Best time to visit: 8-10 AM</p>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium">
          Get Directions
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
