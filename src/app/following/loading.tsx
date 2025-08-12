"use client";

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center justify-center space-y-6 p-8">
        {/* Lottie Animation */}
        <div className="w-40 h-40 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse"></div>
          <DotLottieReact
            src="https://lottie.host/a2e3b6c1-71fe-4dfe-ab17-67caef8306e4/ifrqZhWjg0.lottie"
            loop
            autoplay
            className="w-full h-full relative z-10"
          />
        </div>
        
        
        
        {/* Loading Dots Animation */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}