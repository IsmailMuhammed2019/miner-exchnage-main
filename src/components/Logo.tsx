import React, { useState } from 'react';
import { Home } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl', 
    xl: 'text-4xl'
  };

  // Try multiple logo sources
  const logoSources = [
    '/logo.png',
    '/logo.webp',
    '/logo.jpg',
    'https://res.cloudinary.com/dyas8qe3h/image/upload/v1734950125/Miner_LOGO_tfptqo.webp'
  ];

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center`}>
          <Home className="h-6 w-6 text-white" />
        </div>
        {showText && (
          <div>
            <h1 className={`${textSizes[size]} font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
              Miner Exchange
            </h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">
              MINING PLATFORM
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img 
        src={logoSources[0]}
        alt="Miner Exchange Logo" 
        className={`${sizeClasses[size]} w-auto object-contain transition-transform hover:scale-105`}
        onError={handleImageError}
      />
      {showText && (
        <div>
          <h1 className={`${textSizes[size]} font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
            Miner Exchange
          </h1>
          <p className="text-xs text-gray-500 font-medium tracking-wide">
            MINING PLATFORM
          </p>
        </div>
      )}
    </div>
  );
}
