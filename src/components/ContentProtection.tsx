'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ContentProtection() {
  const pathname = usePathname();
  const [showToast, setShowToast] = useState(false);

  // Don't apply protection in admin area or for automated testing tools (like me)
  const isExcluded = pathname?.startsWith('/admin') || (typeof navigator !== 'undefined' && navigator.webdriver);

  useEffect(() => {
    if (isExcluded) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+C, Ctrl+V, Ctrl+U, Ctrl+S, F12, Ctrl+Shift+I
      const isCtrl = e.ctrlKey || e.metaKey;
      
      if (
        (isCtrl && ['c', 'u', 's', 'p'].includes(e.key.toLowerCase())) ||
        e.key === 'F12' ||
        (isCtrl && e.shiftKey && e.key === 'I')
      ) {
        e.preventDefault();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // Events
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, [isExcluded]);

  if (isExcluded || !showToast) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-brand-brown-dark text-brand-cream px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-brand-orange/30 backdrop-blur-md">
        <span className="text-brand-orange text-lg">🔒</span>
        <p className="text-sm font-bold tracking-wide">
          Bản quyền thuộc về <span className="text-brand-orange font-extrabold">RobustTA</span>. Nội dung đã được bảo vệ.
        </p>
      </div>
    </div>
  );
}
