import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

const FloatingActions = () => {
  const { contactInfo } = useData();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions = [
    {
      id: 'phone',
      icon: <Phone size={24} />,
      color: 'bg-indiaGreen',
      hover: 'hover:bg-indiaGreen-dark',
      label: 'Call Us',
      href: `tel:${contactInfo.phone.replace(/\s/g, '')}`
    },
    {
      id: 'whatsapp',
      icon: <MessageCircle size={24} />,
      color: 'bg-[#25D366]',
      hover: 'hover:bg-[#128C7E]',
      label: 'WhatsApp',
      href: `https://wa.me/${contactInfo.whatsapp.replace('+', '').replace(/\s/g, '')}`
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40 items-end">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-white text-stone-800 rounded-full shadow-lg flex items-center justify-center hover:bg-stone-50 transition-colors border border-stone-100"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {actions.map((action, idx) => (
        <motion.a
          key={action.id}
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + idx * 0.1 }}
          whileHover={{ scale: 1.1, x: -5 }}
          className={`${action.color} ${action.hover} text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center relative group overflow-visible transition-colors`}
        >
          {action.icon}
          <span className="absolute right-full mr-4 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold tracking-wider">
            {action.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default FloatingActions;
