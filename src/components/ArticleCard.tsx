import React from 'react';
import { motion } from 'motion/react';
import { Clock, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface ArticleProps {
  title: string;
  category: string;
  image: string;
  readTime: string;
}

export default function ArticleCard({ title, category, image, readTime }: ArticleProps) {
  const handleComingSoon = () => {
    toast.info(`Artikel "${title}" akan segera hadir!`, {
      description: 'Kami sedang menyiapkan konten kesehatan terbaik untuk Anda.',
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      onClick={handleComingSoon}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-wider">
          {category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <Clock size={14} />
          <span>{readTime} baca</span>
        </div>
        <h3 className="font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="mt-4 flex items-center text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
          Baca Selengkapnya
          <ChevronRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}
