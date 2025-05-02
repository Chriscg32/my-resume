
import React from 'react';

interface AccessibilityShortcutsProps {
  isMobile: boolean;
}

const AccessibilityShortcuts: React.FC<AccessibilityShortcutsProps> = ({ isMobile }) => {
  return (
    <>
      {!isMobile ? (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Keyboard Shortcuts:</h4>
          <ul className="text-sm space-y-1">
            <li>Alt+A: Toggle accessibility menu</li>
            <li>Alt+R: Read current page</li>
            <li>Alt+N: Navigation options</li>
            <li>Alt+C: Color settings</li>
            <li>Alt+[First letter]: Jump to section</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Voice Commands:</h4>
          <ul className="text-sm space-y-1">
            <li>"Go to [Section Name]": Navigate to section</li>
            <li>"Read page": Read current page content</li>
            <li>"Help": List available commands</li>
            <li>"Color settings": Open accessibility settings</li>
            <li>"Stop speaking": Stop text-to-speech</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AccessibilityShortcuts;
