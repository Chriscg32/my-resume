
import React from 'react';

const ContactQRCode: React.FC = () => {
  return (
    <div className="mt-6 flex justify-center">
      <div className="bg-white p-3 rounded-lg rotate-3 shadow-lg hover:rotate-0 transition-all duration-300">
        <img 
          src="/qr-code.png" 
          alt="QR Code to resume website" 
          className="w-[120px] h-[120px] object-contain"
        />
        <div className="text-black text-xs font-medium mt-2 text-center">
          Scan to visit
        </div>
      </div>
    </div>
  );
};

export default ContactQRCode;
