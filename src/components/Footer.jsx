import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Globe, Share2, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
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
            <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-tighter italic">
              TASTE OF <span className="text-saffron">INDIA</span>
            </h3>
            <p className="text-stone-400 leading-relaxed mb-6 italic">
               {t('footer.about_text')}
            </p>
            <div className="flex gap-4">
              <motion.a whileHover={{ y: -3 }} href={socialLinks.instagram} target="_blank" className="hover:text-saffron transition-colors"><Camera size={20}/></motion.a>
              <motion.a whileHover={{ y: -3 }} href={socialLinks.facebook} target="_blank" className="hover:text-saffron transition-colors"><Globe size={20}/></motion.a>
              <motion.a whileHover={{ y: -3 }} href={socialLinks.twitter} target="_blank" className="hover:text-saffron transition-colors"><Share2 size={20}/></motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('nav.about')}</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">{t('nav.menu')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('contact.title')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-saffron shrink-0 mt-1" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-saffron shrink-0" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-saffron shrink-0" />
                <span>{contactInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('footer.newsletter')}</h4>
            <p className="mb-4 text-stone-500 italic">{t('footer.subscribe')}</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder={t('footer.email_placeholder')} 
                className="bg-stone-800 border-none rounded-lg px-4 py-3 w-full focus:ring-1 focus:ring-saffron text-sm"
              />
              <button className="bg-saffron text-stone-900 px-6 py-3 rounded-lg hover:bg-white transition-colors text-sm font-black italic">
                {t('footer.join_btn')}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 Taste Of India. {t('footer.rights')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link to="/login" className="text-stone-700 hover:text-stone-500 transition-colors uppercase font-black italic text-xs tracking-widest">{t('footer.admin_login')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
