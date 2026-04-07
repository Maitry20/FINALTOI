import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import DishCard from '../components/DishCard';
import { ChevronRight, ArrowRight, Star, Quote, User, X, MessageSquare, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Home = () => {
  const { t } = useLanguage();
  const { menu, homeSettings, reviews, setReviews } = useData();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [userReview, setUserReview] = useState({ name: '', comment: '', rating: 5 });
  
  const featuredDishes = menu.slice(0, 3);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      ...userReview,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };
    setReviews(prev => [...prev, newReview]);
    setIsReviewModalOpen(false);
    setUserReview({ name: '', comment: '', rating: 5 });
    toast.success(t('reviews.success'));
  };

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
                  <span className="text-stone-900 font-bold">500+</span> {t('hero.happy_foodies')}
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
            <Link to="/menu" className="group flex items-center gap-3 font-bold text-stone-800 hover:text-saffron transition-colors text-right">
              {t('menu.explore_full')}
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
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indiaGreen/5 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center mb-20 text-center">
             <h2 className="text-4xl md:text-6xl mb-6">{t('reviews.title').split(' ')[0]} <span className="text-indiaGreen italic">{t('reviews.title').split(' ')[1]}</span></h2>
             <p className="text-stone-500 max-w-2xl mx-auto mb-8">{t('reviews.subtitle')}</p>
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsReviewModalOpen(true)}
              className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold flex items-center gap-3 shadow-lg hover:bg-stone-800 transition-colors"
             >
                <MessageSquare size={20} />
                {t('reviews.leave_review')}
             </motion.button>
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

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-xl rounded-[3rem] p-10 relative shadow-2xl"
            >
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-8 right-8 p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              
              <h3 className="text-3xl font-black italic mb-8">{t('reviews.add_title')}</h3>
              
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">{t('reviews.name_label')}</label>
                  <input 
                    required
                    type="text"
                    value={userReview.name}
                    onChange={(e) => setUserReview({...userReview, name: e.target.value})}
                    className="w-full px-6 py-4 bg-stone-50 border-2 border-stone-50 rounded-2xl focus:border-saffron focus:bg-white outline-none transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">{t('reviews.comment_label')}</label>
                  <textarea 
                    required
                    rows="4"
                    value={userReview.comment}
                    onChange={(e) => setUserReview({...userReview, comment: e.target.value})}
                    className="w-full px-6 py-4 bg-stone-50 border-2 border-stone-50 rounded-2xl focus:border-saffron focus:bg-white outline-none transition-all font-medium resize-none"
                    placeholder="Share your experience..."
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 shadow-lg shadow-saffron/20"
                >
                  <Send size={20} />
                  <span className="font-black italic">{t('reviews.submit')}</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

