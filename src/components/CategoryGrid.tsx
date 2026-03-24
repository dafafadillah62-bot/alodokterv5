import React from 'react';
import { MessageSquare, Stethoscope, ShoppingBag, Calendar, Pill, HeartPulse, Activity, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const categories = [
  { icon: MessageSquare, label: 'Chat Dokter', color: 'bg-blue-500', textColor: 'text-blue-500', desc: 'Konsultasi instan 24/7' },
  { icon: Stethoscope, label: 'Booking Dokter', color: 'bg-green-500', textColor: 'text-green-500', desc: 'Buat janji temu' },
  { icon: ShoppingBag, label: 'Toko Kesehatan', color: 'bg-orange-500', textColor: 'text-orange-500', desc: 'Beli obat & vitamin' },
  { icon: Calendar, label: 'Rumah Sakit', color: 'bg-red-500', textColor: 'text-red-500', desc: 'Cari RS terdekat' },
  { icon: Pill, label: 'Obat & Vitamin', color: 'bg-purple-500', textColor: 'text-purple-500', desc: 'Panduan obat lengkap' },
  { icon: HeartPulse, label: 'Cek Kesehatan', color: 'bg-pink-500', textColor: 'text-pink-500', desc: 'Skrining kesehatan' },
  { icon: Activity, label: 'Aloproteksi', color: 'bg-indigo-500', textColor: 'text-indigo-500', desc: 'Perlindungan kesehatan' },
  { icon: ShieldCheck, label: 'Asuransi', color: 'bg-teal-500', textColor: 'text-teal-500', desc: 'Klaim asuransi mudah' },
];

export default function CategoryGrid({ onChatClick }: { onChatClick: () => void }) {
  const handleComingSoon = (feature: string) => {
    toast.info(`Fitur ${feature} akan segera hadir!`, {
      description: 'Kami sedang bekerja keras untuk menghadirkan fitur ini untuk Anda.',
    });
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Layanan Kami</h2>
          <p className="text-gray-500 mt-1">Pilih layanan kesehatan yang Anda butuhkan</p>
        </div>
        <button 
          onClick={() => handleComingSoon('Daftar Layanan')}
          className="text-blue-600 font-semibold hover:underline text-sm"
        >
          Lihat Semua
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <motion.button
            key={i}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={cat.label === 'Chat Dokter' ? onChatClick : () => handleComingSoon(cat.label)}
            className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center group"
          >
            <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
              <cat.icon size={28} />
            </div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">{cat.label}</h3>
            <p className="text-xs text-gray-400 mt-1 hidden sm:block">{cat.desc}</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
