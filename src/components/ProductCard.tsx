import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';

interface ProductProps {
  name: string;
  category: string;
  price: string;
  image: string;
  discount?: string;
  rating: number;
}

export default function ProductCard({ name, category, price, image, discount, rating }: ProductProps) {
  const handleAddToCart = () => {
    toast.success(`${name} berhasil ditambahkan ke keranjang!`, {
      description: 'Anda dapat melanjutkan belanja atau melakukan checkout.',
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-gray-50">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            Hemat {discount}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{category}</p>
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 h-10">{name}</h3>
        
        <div className="flex items-center gap-1 text-yellow-400">
          <Star size={12} fill="currentColor" />
          <span className="text-xs text-gray-500 font-medium">{rating}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="font-bold text-blue-600">{price}</p>
          <button 
            onClick={handleAddToCart}
            className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
