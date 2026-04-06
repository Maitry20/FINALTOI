import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Globe, Share2, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

const Footer = () => {
  const { t } = useLanguage();
  const { contactInfo, socialLinks } = useData();

  return (
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              TASTE OF <span className="text-saffron">INDIA</span>
            </h3>
            <p className="text-stone-400 leading-relaxed mb-6">
               Authentic Indian flavors delivered to your doorstep. Experience the tradition in every bite.
            </p>
            <div className="flex gap-4">
              <motion.a whileHover={{ y: -3 }} href={socialLinks.instagram} target="_blank" className="hover:text-saffron"><Camera size={20}/></motion.a>
              <motion.a whileHover={{ y: -3 }} href={socialLinks.facebook} target="_blank" className="hover:text-saffron"><Globe size={20}/></motion.a>
              <motion.a whileHover={{ y: -3 }} href={socialLinks.twitter} target="_blank" className="hover:text-saffron"><Share2 size={20}/></motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('about.title')}</h4>
            <ul className="space-y-4">
              <li><a href="/" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="/menu" className="hover:text-white transition-colors">{t('nav.menu')}</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('contact.title')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-saffron shrink-0 mt-1" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-saffron shrink-0" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-saffron shrink-0" />
                <span>{contactInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="mb-4 text-stone-500">Subscribe for special offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-stone-800 border-none rounded-lg px-4 py-2 w-full focus:ring-1 focus:ring-saffron text-sm"
              />
              <button className="bg-saffron text-white px-4 py-2 rounded-lg hover:bg-saffron-dark transition-colors text-sm font-bold">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 Taste Of India. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="/login" className="text-stone-700 hover:text-stone-500 transition-colors">Admin Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
