
import React from 'react';
import { Button } from '@/components/ui/button';

interface LaunchPageProps {
  onLaunch: () => void;
}

const LaunchPage = ({ onLaunch }: LaunchPageProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
              WatPlace
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          {/* Mission Statement */}
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 md:p-12 mb-12 border border-white/20 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Your Campus, Visualized
            </h2>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
              No more juggling multiple apps or wandering around during exam season. 
              WatPlace brings together all campus information into one intuitive, 
              visual platform.
            </p>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Discover study spots, find events, navigate buildings, and explore 
              your campus like never before - all through an interactive 3D map 
              powered by AI assistance.
            </p>
          </div>
          
          {/* Launch Button */}
          <Button
            onClick={onLaunch}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-12 py-4 text-lg rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl backdrop-blur-sm border border-white/20"
          >
            Launch WatPlace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LaunchPage;
