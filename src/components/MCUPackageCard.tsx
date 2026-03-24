import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface MCUPackageProps {
  name: string;
  price: string;
  hospital: string;
  features: string[];
  image: string;
}

export default function MCUPackageCard({ name, price, hospital, features, image }: MCUPackageProps) {
  const handleBookMCU = () => {
    toast.success(`Paket ${name} Berhasil Dipesan!`, {
      description: `Anda telah memesan paket pemeriksaan di ${hospital}. Tim kami akan menghubungi Anda untuk konfirmasi jadwal.`,
      action: {
        label: 'Lihat Detail',
        onClick: () => console.log('View MCU details')
      },
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-1">Medical Check-Up</p>
          <h3 className="font-bold text-lg leading-tight">{name}</h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={16} className="text-blue-500" />
          <span className="font-medium">{hospital}</span>
        </div>

        <div className="space-y-2">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mulai Dari</p>
            <p className="text-xl font-extrabold text-blue-600">{price}</p>
          </div>
          <button 
            onClick={handleBookMCU}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 group/btn"
          >
            Pesan
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
