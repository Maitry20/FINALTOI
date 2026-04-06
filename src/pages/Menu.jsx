import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import DishCard from '../components/DishCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const Menu = () => {
  const { t } = useLanguage();
  const { menu } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];

  const filteredMenu = useMemo(() => {
    return menu.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menu, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="bg-saffron/5 py-20 mb-12">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl mb-6 font-display font-black tracking-tight"
          >
            {t('menu.title')}
          </motion.h1>
          <p className="max-w-2xl mx-auto text-stone-500 leading-relaxed">
            From sizzling Tandoori appetizers to decadent gulab jamuns, explore our curated selection of North Indian masterpieces.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
          {/* Categories */}
          <div className="flex items-center gap-4 p-2 bg-stone-100 rounded-2xl overflow-x-auto w-full lg:w-auto scrollbar-hide py-3 md:py-2">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-6 py-2 rounded-xl transition-all font-bold whitespace-nowrap text-sm ${
                   activeCategory === cat 
                    ? 'bg-white text-saffron shadow-sm scale-105 italic' 
                    : 'text-stone-500 hover:text-stone-700'
                 }`}
               >
                 {cat === 'All' ? t('menu.all') : cat}
               </button>
             ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-saffron transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search your favorite dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border-2 border-stone-100 focus:border-saffron focus:bg-white rounded-2xl transition-all focus:outline-none placeholder:text-stone-400 font-medium"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredMenu.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredMenu.map((dish, i) => (
                  <DishCard 
                    key={dish.id} 
                    dish={dish} 
                    delay={i * 0.05}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                 <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
                    <Search size={40} />
                 </div>
                 <h2 className="text-2xl font-black text-stone-400 mb-2 italic">Oops! No cravings found.</h2>
                 <p className="text-stone-400">Try searching for something else or explore all categories.</p>
                 <button 
                  onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                  className="mt-8 text-saffron font-bold hover:underline"
                 >
                   Clear all filters
                 </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Menu;
