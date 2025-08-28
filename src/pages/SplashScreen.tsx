import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import splashHero from '@/assets/splash-hero.jpg';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center relative overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
          src={splashHero} 
          alt="Beautiful plants" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-4 tracking-tight">
            you need
          </h1>
          <h2 className="text-4xl md:text-6xl font-light text-primary-foreground/90 mb-6 italic">
            another plant
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full animate-pulse" />
        </div>
      </div>

      {/* Subtle loading indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;