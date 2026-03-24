import React from 'react';
import { Star, MessageSquare, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface DoctorProps {
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  onChat?: () => void;
  onBook?: () => void;
}

export default function DoctorCard({ name, specialty, hospital, rating, reviews, price, image, onChat, onBook }: DoctorProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col sm:flex-row gap-4"
    >
      <div className="relative shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="w-24 h-24 rounded-2xl object-cover mx-auto sm:mx-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -bottom-2 -right-2 bg-green-500 border-2 border-white w-4 h-4 rounded-full"></div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-gray-900">{name}</h3>
            <p className="text-xs text-blue-600 font-medium mt-0.5">{specialty}</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-yellow-700">{rating}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <ShieldCheck size={14} className="text-blue-500" />
          {hospital}
        </p>
        
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Mulai dari</p>
            <p className="text-sm font-bold text-gray-900">{price}</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={onChat}
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={14} />
              Chat
            </button>
            <button 
              onClick={onBook}
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Booking
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
