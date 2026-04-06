import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import DishCard from '../components/DishCard';
import { ChevronRight, ArrowRight, Star, Quote, User } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();
  const { menu, homeSettings, reviews } = useData();
  
  const featuredDishes = menu.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-saffron/10 -skew-x-12 translate-x-24 z-0 hidden md:block" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indiaGreen/5 rounded-full blur-3xl z-0" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 bg-saffron/10 text-saffron-dark px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-8">
                <Star size={14} fill="currentColor" />
                {homeSettings.heroBadge}
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-6">
                {homeSettings.heroTitle1} <br />
                <span className="text-saffron italic">{homeSettings.heroTitle2}</span>
              </h1>
              <p className="text-lg text-stone-600 mb-10 max-w-lg leading-relaxed">
                {homeSettings.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/menu" className="btn-primary flex items-center justify-center gap-2 group">
                  {t('hero.cta_menu')}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="px-6 py-3 border-2 border-stone-200 hover:border-saffron hover:text-saffron rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                   {t('hero.cta_about')}
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-stone-200 overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-stone-500">
                  <span className="text-stone-900 font-bold">500+</span> happy foodies served daily
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative z-10 w-full max-w-lg mx-auto aspect-square rounded-full flex items-center justify-center border-2 border-stone-100 shadow-soft bg-white p-4">
                <img 
                  src={homeSettings.heroImage} 
                  alt="Delicious Indian Platter"
                  className="w-full h-full object-cover rounded-full shadow-2xl"
                />
              </div>
              
              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-stone-200 rounded-full animate-spin-slow opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
               <h2 className="text-4xl md:text-5xl mb-6">{homeSettings.featuredTitle.split(' ').map((w, i) => i === 2 ? <span key={i} className="text-saffron italic">{w} </span> : w + ' ')}</h2>
               <p className="text-stone-500">{homeSettings.featuredSubtitle}</p>
            </div>
            <Link to="/menu" className="group flex items-center gap-3 font-bold text-stone-800 hover:text-saffron transition-colors">
              Explore Full Menu
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, i) => (
              <DishCard key={dish.id} dish={dish} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      {reviews.length > 0 && (
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Decorative accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indiaGreen/5 rounded-full blur-3xl opacity-50" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-6xl mb-6">Customer <span className="text-indiaGreen italic">Voices</span></h2>
               <p className="text-stone-500 max-w-2xl mx-auto">Hear from our community of food lovers who experience the magic of Taste Of India every day.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((rev, i) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-stone-50 p-10 rounded-[3rem] shadow-soft border border-stone-100 flex flex-col justify-between group hover:bg-white hover:border-saffron/20 transition-all"
                >
                  <div>
                    <Quote size={40} className="text-saffron/20 group-hover:text-saffron transition-colors mb-6" />
                    <p className="text-xl text-stone-700 italic leading-relaxed mb-8">"{rev.comment}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indiaGreen rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indiaGreen/10">
                       <User size={24} />
                    </div>
                    <div>
                       <p className="font-black italic text-stone-900 border-b-2 border-transparent group-hover:border-saffron inline-block transition-all">{rev.name}</p>
                       <div className="flex text-saffron scale-75 -ml-1">
                          {[...Array(parseInt(rev.rating) || 5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
