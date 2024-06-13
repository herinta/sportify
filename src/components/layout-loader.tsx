'use client';
import React from 'react';
import SFund from 'public/svg/sfund.svg';
import { Loader2 } from 'lucide-react';

const LayoutLoader = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-2">
      <SFund className="h-10" />
      <span className="inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </span>
    </div>
  );
};

export default LayoutLoader;
