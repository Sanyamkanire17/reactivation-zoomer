
import React from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Header from '../components/Header';
import { Button } from '../components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      <Header />
      
      <div className="relative z-10 text-center px-4 py-12 max-w-3xl mx-auto mt-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Interactive Animated Website
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Explore this beautiful animated website with interactive particle
          backgrounds. Click or hover anywhere to interact with the particles!
        </p>
        
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="bg-white hover:bg-gray-100 text-gray-900">
            Learn More
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-center w-full text-gray-400">
        <p>Try clicking or hovering to interact with the animation</p>
      </div>
    </div>
  );
};

export default Index;
