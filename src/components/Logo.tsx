import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
        </svg>
      </div>
      <span className="text-xl font-bold text-gray-900">Best SEO Writer</span>
    </div>
  );
};

export default Logo;