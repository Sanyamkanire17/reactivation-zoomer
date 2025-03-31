
import React from 'react';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 text-center px-4 py-12 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Interactive Background Animation
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Move your mouse around the screen to interact with the particles!
        </p>
        
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg">
            Explore More
          </button>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-lg">
            Get Started
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-center w-full text-gray-500">
        <p>Try moving your cursor to interact with the animation</p>
      </div>
    </div>
  );
};

export default Index;
