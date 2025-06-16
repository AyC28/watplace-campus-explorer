
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from '@/hooks/use-toast';

interface MapProps {
  activeFilter: string;
  onSpotSelect: (spot: any) => void;
}

// Mock data for study spots
const studySpots = [
  {
    id: 1,
    name: 'Dana Porter Library',
    coordinates: [-80.5418, 43.4691] as [number, number],
    occupancy: 75,
    amenities: ['WiFi', 'Power Outlets', 'Quiet Study'],
    hours: '24/7',
    type: 'library'
  },
  {
    id: 2,
    name: 'Student Life Centre',
    coordinates: [-80.5449, 43.4722] as [number, number],
    occupancy: 60,
    amenities: ['WiFi', 'Food Court', 'Group Study'],
    hours: '6:00 AM - 2:00 AM',
    type: 'student_center'
  },
  {
    id: 3,
    name: 'DC Library',
    coordinates: [-80.5427, 43.4729] as [number, number],
    occupancy: 85,
    amenities: ['WiFi', 'Power Outlets', 'Computer Lab'],
    hours: '24/7',
    type: 'library'
  }
];

const Map = ({ activeFilter, onSpotSelect }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    // For demo purposes, show input for Mapbox token
    const token = localStorage.getItem('mapbox_token');
    if (!token) {
      toast({
        title: "Mapbox Token Required",
        description: "Please enter your Mapbox public token to view the interactive map.",
      });
    } else {
      setMapboxToken(token);
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-80.5449, 43.4723], // University of Waterloo coordinates
      zoom: 16,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    map.current.on('style.load', () => {
      if (!map.current) return;

      // Add 3D buildings
      map.current.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      });

      // Add study spots
      if (activeFilter === 'studying') {
        addStudySpots();
      }
    });

    const addStudySpots = () => {
      if (!map.current) return;

      studySpots.forEach((spot) => {
        const occupancyColor = spot.occupancy > 80 ? '#ef4444' : 
                              spot.occupancy > 50 ? '#f59e0b' : '#10b981';

        // Create custom marker
        const marker = new mapboxgl.Marker({
          color: occupancyColor,
          scale: 1.2
        })
        .setLngLat(spot.coordinates)
        .addTo(map.current!);

        // Add click event
        marker.getElement().addEventListener('click', () => {
          onSpotSelect(spot);
        });

        // Add popup on hover
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 25,
          className: 'custom-popup'
        }).setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-white">${spot.name}</h3>
            <p class="text-sm text-gray-300">Occupancy: ${spot.occupancy}%</p>
          </div>
        `);

        marker.getElement().addEventListener('mouseenter', () => {
          popup.setLngLat(spot.coordinates).addTo(map.current!);
        });

        marker.getElement().addEventListener('mouseleave', () => {
          popup.remove();
        });
      });
    };

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, activeFilter, onSpotSelect]);

  if (!mapboxToken) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur-lg bg-white/10 p-8 rounded-3xl border border-white/20 shadow-xl max-w-md mx-4">
          <h3 className="text-xl font-semibold text-white mb-4">Setup Required</h3>
          <p className="text-gray-300 mb-4">
            To view the interactive 3D campus map, please enter your Mapbox public token.
          </p>
          <input
            type="text"
            placeholder="Enter Mapbox public token..."
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 mb-4"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const token = (e.target as HTMLInputElement).value;
                localStorage.setItem('mapbox_token', token);
                setMapboxToken(token);
              }
            }}
          />
          <p className="text-sm text-gray-400">
            Get your token at{' '}
            <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5" />
    </div>
  );
};

export default Map;
