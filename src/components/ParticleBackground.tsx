
import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 120, isClicked: false });
  const animationFrameRef = useRef<number>(0);
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      mouseRef.current.isClicked = true;
      
      // Create explosion effect
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      // Add new particles at click location
      for (let i = 0; i < 10; i++) {
        const size = Math.random() * 4 + 1;
        const speedX = (Math.random() - 0.5) * 3;
        const speedY = (Math.random() - 0.5) * 3;
        const color = darkTheme 
          ? `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})` 
          : `rgba(66, 133, 244, ${Math.random() * 0.5 + 0.3})`;
          
        particlesRef.current.push({
          x: clickX,
          y: clickY,
          size,
          speedX,
          speedY,
          color,
          alpha: 1
        });
      }
      
      // Set a timeout to reset the click state
      setTimeout(() => {
        mouseRef.current.isClicked = false;
      }, 300);
    };

    const initParticles = () => {
      particlesRef.current = [];
      const numberOfParticles = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 4 + 1;
        const x = Math.random() * (canvas.width - size * 2);
        const y = Math.random() * (canvas.height - size * 2);
        const speedX = Math.random() * 1 - 0.5;
        const speedY = Math.random() * 1 - 0.5;
        const color = darkTheme 
          ? `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})` 
          : `rgba(66, 133, 244, ${Math.random() * 0.5 + 0.3})`;
        
        particlesRef.current.push({
          x, y, size, speedX, speedY, color,
          alpha: 1
        });
      }
    };

    const animate = () => {
      if (darkTheme) {
        ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Remove particles that are too faded
      particlesRef.current = particlesRef.current.filter(particle => particle.alpha > 0.1);
      
      particlesRef.current.forEach((particle, index) => {
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary detection
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY;
        }
        
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRef.current.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          
          if (mouseRef.current.isClicked) {
            // Push particles away from click
            particle.x -= Math.cos(angle) * force * 5;
            particle.y -= Math.sin(angle) * force * 5;
          } else {
            // Regular hover effect
            particle.x -= Math.cos(angle) * force * 2;
            particle.y -= Math.sin(angle) * force * 2;
          }
        }
        
        // Connect nearby particles
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            const opacity = darkTheme
              ? 0.2 * (1 - distance / 100)
              : 0.15 * (1 - distance / 100);
            ctx.strokeStyle = darkTheme
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(66, 133, 244, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
        
        // Fade particles added by clicks
        if (particle.alpha < 1) {
          particle.alpha -= 0.01;
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [darkTheme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ 
        background: darkTheme ? 'linear-gradient(to bottom right, #0a0a20, #1a1a30)' : 'white',
        pointerEvents: 'auto' // Changed to 'auto' to enable click events
      }}
    />
  );
};

export default ParticleBackground;
