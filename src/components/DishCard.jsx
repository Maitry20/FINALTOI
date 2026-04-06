import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBasket, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DishCard = ({ dish, delay = 0 }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl overflow-hidden shadow-soft border border-stone-100 group"
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img 
          src={dish.image} 
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full font-bold text-stone-800 shadow-soft">
          €{dish.price.toFixed(2)}
        </div>
        <div className="absolute top-4 left-4">
           <span className="bg-saffron text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
             {dish.category}
           </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-saffron transition-colors">
          {dish.name}
        </h3>
        <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed mb-6">
          {dish.description}
        </p>
        
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-stone-50 hover:bg-saffron hover:text-white rounded-xl transition-all duration-300 font-bold group/btn">
          <Plus size={18} className="group-hover/btn:rotate-90 transition-transform"/>
          {t('menu.add_to_cart')}
        </button>
      </div>
    </motion.div>
  );
};

export default DishCard;
