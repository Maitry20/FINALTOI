import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Camera, Globe, Share2, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { contactInfo, socialLinks } = useData();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(t('contact.success'));
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="pb-24 pt-12 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-5xl md:text-7xl font-display font-black mb-8 leading-tight">
               {t('contact.hero_title').split(' ').map((w, i) => i === 2 ? <span key={i} className="text-saffron italic">{w} </span> : w + ' ')}
            </h1>
            <p className="text-xl text-stone-500 mb-12 max-w-lg leading-relaxed">
               {t('contact.hero_subtitle')}
            </p>

            <div className="space-y-8 mb-12">
               {[
                 { icon: <Phone className="text-saffron" />, label: t('contact.phone'), text: contactInfo.phone },
                 { icon: <Mail className="text-indiaGreen" />, label: t('contact.email'), text: contactInfo.email },
                 { icon: <MapPin className="text-accent" />, label: t('contact.address'), text: contactInfo.address }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm border border-stone-100 group-hover:border-saffron">
                       {item.icon}
                    </div>
                    <div>
                       <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{item.label}</p>
                       <p className="text-lg font-black text-stone-800">{item.text}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="flex gap-4">
               {[
                 { icon: Camera, url: socialLinks.instagram },
                 { icon: Globe, url: socialLinks.facebook },
                 { icon: Share2, url: socialLinks.twitter },
                 { icon: MessageSquare, url: `https://wa.me/${contactInfo.whatsapp.replace('+', '')}` }
               ].map((item, i) => (
                 <motion.a 
                  key={i}
                  href={item.url}
                  target="_blank"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 hover:bg-saffron hover:text-white transition-colors"
                 >
                   <item.icon size={20} />
                 </motion.a>
               ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
             <div className="w-full bg-white p-10 md:p-16 rounded-[3rem] shadow-soft border border-stone-100 relative overflow-hidden group">
                {/* Decorative blobs */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-saffron/5 rounded-full blur-3xl group-hover:bg-saffron/10 transition-colors" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indiaGreen/5 rounded-full blur-3xl group-hover:bg-indiaGreen/10 transition-colors" />

                <h2 className="text-3xl font-black mb-10 italic">{t('contact.send_message')}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                   <div>
                      <label className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">{t('contact.name')}</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-saffron focus:bg-white focus:outline-none transition-all placeholder:text-stone-300 font-medium"
                        placeholder={t('contact.name')}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">{t('contact.email')}</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-saffron focus:bg-white focus:outline-none transition-all placeholder:text-stone-300 font-medium"
                        placeholder="hello@example.com"
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">{t('contact.message')}</label>
                      <textarea 
                        required
                        rows="4"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-6 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-saffron focus:bg-white focus:outline-none transition-all placeholder:text-stone-300 font-medium resize-none"
                        placeholder={t('contact.message')}
                      />
                   </div>
                   
                   <button 
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50 py-5 text-xl tracking-wide flex items-center justify-center gap-3 overflow-hidden relative group/submit"
                   >
                     {loading ? (
                       <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
                       />
                     ) : (
                       <>
                         <span className="font-black italic">{t('contact.send')}</span>
                         <Send size={24} className="group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform" />
                       </>
                     )}
                   </button>
                </form>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
