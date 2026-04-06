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
    if (storedMenu) {
      setMenu(JSON.parse(storedMenu));
    } else {
      setMenu(defaultMenuData);
      localStorage.setItem('toi-menu', JSON.stringify(defaultMenuData));
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
    setMenu(newMenu);
    localStorage.setItem('toi-menu', JSON.stringify(newMenu));
  };

  const updateAbout = (newContent) => {
    setAboutContent(newContent);
    localStorage.setItem('toi-about', newContent);
  };

  const updateContact = (newContact) => {
    setContactInfo(newContact);
    localStorage.setItem('toi-contact', JSON.stringify(newContact));
  };

  const updateSocials = (newSocials) => {
    setSocialLinks(newSocials);
    localStorage.setItem('toi-socials', JSON.stringify(newSocials));
  };

  const updateHomeSettings = (newSettings) => {
    setHomeSettings(newSettings);
    localStorage.setItem('toi-home', JSON.stringify(newSettings));
  };

  const updateReviews = (newReviews) => {
    setReviews(newReviews);
    localStorage.setItem('toi-reviews', JSON.stringify(newReviews));
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
