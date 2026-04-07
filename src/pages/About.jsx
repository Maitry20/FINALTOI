import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Heart, Coffee, Users, History, Star } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();
  const { aboutContent } = useData();

  const finalContent = aboutContent || t('about.default_content');

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative py-32 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" 
            alt="Kitchen Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 italic text-saffron">
              {t('about.subtitle')}
            </h1>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto font-medium">
               {t('about.hero_sub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <h2 className="text-4xl font-display font-black mb-8 leading-tight">
                {t('about.philosophy').split(' ').map((w, i) => i === 1 ? <span key={i} className="text-saffron italic underline decoration-indiaGreen decoration-4 underline-offset-8">{w} </span> : w + ' ')}
             </h2>
             <div className="text-lg text-stone-600 leading-relaxed space-y-6">
                {finalContent.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
             </div>
             
             <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-saffron hover:bg-white transition-all group">
                   <Heart className="text-saffron mb-4 transition-transform group-hover:scale-110" />
                   <h4 className="font-bold mb-2">{t('about.passion_title')}</h4>
                   <p className="text-stone-500 text-sm">{t('about.passion_desc')}</p>
                </div>
                <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-indiaGreen hover:bg-white transition-all group">
                   <Coffee className="text-indiaGreen mb-4 transition-transform group-hover:scale-110" />
                   <h4 className="font-bold mb-2">{t('about.tradition_title')}</h4>
                   <p className="text-stone-500 text-sm">{t('about.tradition_desc')}</p>
                </div>
             </div>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-1000">
               <img 
                 src="https://images.unsplash.com/photo-1596797038558-477dbe6373aa?auto=format&fit=crop&q=80&w=1000" 
                 alt="Chef Cooking" 
                 className="w-full h-full object-cover scale-110"
               />
            </div>
            
            {/* Stats Card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2rem] shadow-soft border border-stone-100 hidden md:block">
               <div className="flex items-center gap-10">
                  <div className="text-center">
                    <p className="text-4xl font-black text-saffron mb-1">5+</p>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{t('about.stat_cities')}</p>
                  </div>
                  <div className="w-[1px] h-12 bg-stone-100" />
                  <div className="text-center">
                    <p className="text-4xl font-black text-indiaGreen mb-1">15k</p>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{t('about.stat_orders')}</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-4xl mb-16 italic font-black">{t('about.values_title')}</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <History className="text-saffron mb-6" />, title: t('about.val_auth_title'), desc: t('about.val_auth_desc') },
                { icon: <Users className="text-indiaGreen mb-6" />, title: t('about.val_comm_title'), desc: t('about.val_comm_desc') },
                { icon: <Star className="text-accent mb-6" />, title: t('about.val_inn_title'), desc: t('about.val_inn_desc') }
              ].map((val, i) => (
                <div key={i} className="p-10 bg-white rounded-3xl shadow-soft border border-stone-100 hover:shadow-xl transition-all">
                   <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      {val.icon}
                   </div>
                   <h3 className="text-2xl font-black mb-4 italic">{val.title}</h3>
                   <p className="text-stone-500 leading-relaxed">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;

