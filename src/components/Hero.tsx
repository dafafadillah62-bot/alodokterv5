import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Hero({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchValue, setSearchValue] = React.useState('');
  const [locationValue, setLocationValue] = React.useState('');

  const handleComingSoon = (feature: string) => {
    toast.info(`Fitur ${feature} akan segera hadir!`, {
      description: 'Kami sedang bekerja keras untuk menghadirkan fitur ini untuk Anda.',
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="relative bg-blue-50 overflow-hidden py-16 sm:py-24">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Solusi Kesehatan <span className="text-blue-600">Terlengkap</span> untuk Anda
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Chat dokter, booking rumah sakit, beli obat, hingga update informasi kesehatan terbaru hanya dalam satu aplikasi.
            </p>

            <form onSubmit={handleSearchSubmit} className="mt-10 bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 gap-3 border-b sm:border-b-0 sm:border-r border-gray-100 py-3">
                <Search className="text-blue-500" size={20} />
                <input 
                  type="text" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Cari dokter atau spesialis..." 
                  className="w-full focus:outline-none text-sm"
                />
              </div>
              <div className="flex-1 flex items-center px-4 gap-3 py-3">
                <MapPin className="text-blue-500" size={20} />
                <input 
                  type="text" 
                  value={locationValue}
                  onChange={(e) => setLocationValue(e.target.value)}
                  placeholder="Lokasi Anda..." 
                  className="w-full focus:outline-none text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleComingSoon('Lokasi')}
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
              >
                Cari
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/doc${i}/100/100`} 
                    alt="Doctor" 
                    className="w-8 h-8 rounded-full border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p>Dipercaya oleh <span className="font-bold text-gray-900">10jt+</span> pengguna aktif</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/medical/800/600" 
                alt="Medical Professional" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Search size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Dokter Online</p>
                  <p className="text-sm font-bold">2,500+ Aktif</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rumah Sakit</p>
                  <p className="text-sm font-bold">500+ Rekanan</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
