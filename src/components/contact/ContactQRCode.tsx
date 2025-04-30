
import React from 'react';

const ContactQRCode: React.FC = () => {
  return (
    <div className="mt-6 flex justify-center">
      <div className="bg-white p-3 rounded-lg rotate-3 shadow-lg hover:rotate-0 transition-all duration-300">
        <img 
          src="/lovable-uploads/b56b9c41-414e-43cd-8ad9-b115033949de.png" 
          alt="QR Code to resume website" 
          className="w-[180px] h-[180px] object-contain"
        />
        <div className="text-black text-center mt-2">
          <div className="text-xs font-medium">Scan to visit</div>
          <div className="text-sm font-bold">resume.butterflybluecreations.com</div>
        </div>
      </div>
    </div>
  );
};

export default ContactQRCode;
