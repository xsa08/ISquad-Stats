'use client';

import { useCallback } from 'react';
import { Particles } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true },
background: {
  color: {
    value: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  }
},
        particles: {
          number: { value: 100 },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: {
            value: 0.6,
            random: true,
            anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 2,
            random: true,
            anim: { enable: true, speed: 1.5, size_min: 0.3, sync: false }
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out'
          }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
          },
          modes: {
            repulse: { distance: 80 },
            push: { quantity: 3 }
          }
        },
        detectRetina: true
      }}
    />
  );
}
