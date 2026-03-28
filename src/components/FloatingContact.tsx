'use client';

import { useState } from 'react';

const CONTACTS = [
  {
    id: 'zalo',
    label: 'Zalo',
    href: 'https://zalo.me/0889999022',
    color: '#0068FF',
    icon: (
      <svg viewBox="0 0 48 48" className="w-6 h-6" fill="currentColor">
        <path d="M12.5 7C9.46 7 7 9.46 7 12.5v23C7 38.54 9.46 41 12.5 41h23c3.04 0 5.5-2.46 5.5-5.5v-23C41 9.46 38.54 7 35.5 7h-23zm2.05 10h18.9c.83 0 1.3.95.78 1.58L22.5 33.5v-7h-7.5c-.83 0-1.3-.95-.78-1.58L25.5 11.5v6h-10.95z" />
      </svg>
    ),
  },
  {
    id: 'messenger',
    label: 'Messenger',
    href: 'https://m.me/robustta',
    color: '#0084FF',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.2.16.15.26.36.27.58l.05 1.82c.02.62.67 1.03 1.24.78l2.03-.89c.17-.08.37-.1.55-.06.87.24 1.79.37 2.71.37 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1 12.37-2.54-2.71-4.96 2.71 5.46-5.79 2.6 2.71 4.9-2.71-5.46 5.79z" />
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Hotline',
    href: 'tel:0889999022',
    color: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
];

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Contact buttons */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {CONTACTS.map(contact => (
          <a
            key={contact.id}
            href={contact.href}
            target={contact.id !== 'phone' ? '_blank' : undefined}
            rel={contact.id !== 'phone' ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-3"
          >
            {/* Label tooltip */}
            <span className="px-3 py-1.5 bg-white rounded-lg shadow-md text-sm font-semibold text-brand-brown-dark opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {contact.label}
            </span>
            {/* Icon button */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
              style={{ backgroundColor: contact.color }}
            >
              {contact.icon}
            </div>
          </a>
        ))}
      </div>

      {/* Toggle FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'bg-brand-brown-dark rotate-45'
            : 'bg-brand-green hover:bg-brand-green-light animate-bounce-gentle'
        }`}
        aria-label="Liên hệ nhanh"
      >
        {isOpen ? (
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        )}
      </button>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
