import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultMenuData from '../data/defaultMenu.json';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [aboutContent, setAboutContent] = useState('');
  const [contactInfo, setContactInfo] = useState({
    phone: '+91 74348 41112',
    whatsapp: '+917434841112',
    address: 'Ahmedabad, Gujarat, India',
    email: 'hello@tasteofindia.in'
  });
  const [socialLinks, setSocialLinks] = useState({
    instagram: 'https://instagram.com/tasteofindia',
    facebook: 'https://facebook.com/tasteofindia',
    twitter: 'https://twitter.com/tasteofindia'
  });
  
  const [homeSettings, setHomeSettings] = useState({
    heroBadge: 'Authentic Taste of India',
    heroTitle1: 'Flavor of Tradition',
    heroTitle2: 'Perfected for You',
    heroSubtitle: 'Experience the soulful essence of traditional Indian cuisine with our carefully curated heritage recipes.',
    heroImage: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&q=80&w=1000',
    featuredTitle: 'Explore Our Signature Creations',
    featuredSubtitle: 'Hand-picked dishes from our master chefs, featuring authentic spices and premium ingredients.'
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Load menu
    const storedMenu = localStorage.getItem('toi-menu');
    try {
      if (storedMenu && storedMenu !== 'undefined' && storedMenu !== 'null') {
        const parsed = JSON.parse(storedMenu);
        if (Array.isArray(parsed)) {
          setMenu(parsed);
        } else {
          throw new Error('Invalid menu data');
        }
      } else {
        setMenu(defaultMenuData);
        localStorage.setItem('toi-menu', JSON.stringify(defaultMenuData));
      }
    } catch (e) {
      console.error('Error loading menu:', e);
      setMenu(defaultMenuData);
    }

    // Load about
    const storedAbout = localStorage.getItem('toi-about');
    if (storedAbout) setAboutContent(storedAbout);

    // Load contact
    const storedContact = localStorage.getItem('toi-contact');
    if (storedContact) setContactInfo(JSON.parse(storedContact));

    // Load socials
    const storedSocials = localStorage.getItem('toi-socials');
    if (storedSocials) setSocialLinks(JSON.parse(storedSocials));
    
    // Load home settings
    const storedHome = localStorage.getItem('toi-home');
    if (storedHome) setHomeSettings(JSON.parse(storedHome));

    // Load reviews
    const storedReviews = localStorage.getItem('toi-reviews');
    if (storedReviews) setReviews(JSON.parse(storedReviews));
  }, []);

  const updateMenu = (newMenu) => {
    setMenu(prev => {
      const next = typeof newMenu === 'function' ? newMenu(prev) : newMenu;
      localStorage.setItem('toi-menu', JSON.stringify(next));
      return next;
    });
  };

  const updateAbout = (newContent) => {
    setAboutContent(prev => {
      const next = typeof newContent === 'function' ? newContent(prev) : newContent;
      localStorage.setItem('toi-about', next);
      return next;
    });
  };

  const updateContact = (newContact) => {
    setContactInfo(prev => {
      const next = typeof newContact === 'function' ? newContact(prev) : newContact;
      localStorage.setItem('toi-contact', JSON.stringify(next));
      return next;
    });
  };

  const updateSocials = (newSocials) => {
    setSocialLinks(prev => {
      const next = typeof newSocials === 'function' ? newSocials(prev) : newSocials;
      localStorage.setItem('toi-socials', JSON.stringify(next));
      return next;
    });
  };

  const updateHomeSettings = (newSettings) => {
    setHomeSettings(prev => {
      const next = typeof newSettings === 'function' ? newSettings(prev) : newSettings;
      localStorage.setItem('toi-home', JSON.stringify(next));
      return next;
    });
  };

  const updateReviews = (newReviews) => {
    setReviews(prev => {
      const next = typeof newReviews === 'function' ? newReviews(prev) : newReviews;
      localStorage.setItem('toi-reviews', JSON.stringify(next));
      return next;
    });
  };

  return (
    <DataContext.Provider value={{ 
      menu, setMenu: updateMenu, 
      aboutContent, setAbout: updateAbout,
      contactInfo, setContact: updateContact,
      socialLinks, setSocials: updateSocials,
      homeSettings, setHome: updateHomeSettings,
      reviews, setReviews: updateReviews
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
