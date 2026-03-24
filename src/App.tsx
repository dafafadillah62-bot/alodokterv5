import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ArticleCard from './components/ArticleCard';
import DoctorCard from './components/DoctorCard';
import DoctorChat from './components/DoctorChat';
import { MessageSquare, ChevronRight, Heart, Share2, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { Toaster, toast } from 'sonner';

export interface Doctor {
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
}

const articles = [
  {
    title: "7 Cara Menjaga Kesehatan Jantung Sejak Dini",
    category: "Kesehatan Jantung",
    image: "https://picsum.photos/seed/heart/400/300",
    readTime: "5 menit"
  },
  {
    title: "Mengenal Gejala Diabetes Tipe 2 yang Sering Diabaikan",
    category: "Diabetes",
    image: "https://picsum.photos/seed/diabetes/400/300",
    readTime: "7 menit"
  },
  {
    title: "Pentingnya Menjaga Kesehatan Mental di Era Digital",
    category: "Mental Health",
    image: "https://picsum.photos/seed/mental/400/300",
    readTime: "4 menit"
  },
  {
    title: "Tips Diet Sehat Tanpa Harus Menahan Lapar",
    category: "Nutrisi",
    image: "https://picsum.photos/seed/diet/400/300",
    readTime: "6 menit"
  }
];

const doctors = [
  {
    name: "dr. Andi Wijaya, Sp.PD",
    specialty: "Spesialis Penyakit Dalam",
    hospital: "RS Siloam Kebon Jeruk",
    rating: 4.9,
    reviews: 120,
    price: "Rp 150.000",
    image: "https://picsum.photos/seed/doc1/200/200"
  },
  {
    name: "dr. Sarah Azhari, Sp.A",
    specialty: "Spesialis Anak",
    hospital: "RSIA Bunda Jakarta",
    rating: 4.8,
    reviews: 85,
    price: "Rp 200.000",
    image: "https://picsum.photos/seed/doc2/200/200"
  },
  {
    name: "dr. Budi Santoso, Sp.OT",
    specialty: "Spesialis Bedah Tulang",
    hospital: "RS Mayapada",
    rating: 5.0,
    reviews: 45,
    price: "Rp 250.000",
    image: "https://picsum.photos/seed/doc3/200/200"
  }
];

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleChatWithDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsChatOpen(true);
  };

  const handleGeneralChat = () => {
    setSelectedDoctor(null);
    setIsChatOpen(true);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorName: doctor.name,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      date: '25 Maret 2026',
      time: '10:00 WIB',
      status: 'upcoming'
    };

    setAppointments(prev => [newAppointment, ...prev]);
    
    toast.success('Janji Temu Berhasil!', {
      description: `Anda telah membuat janji dengan ${doctor.name} pada ${newAppointment.date} pukul ${newAppointment.time}.`,
      action: {
        label: 'Lihat',
        onClick: () => console.log('View appointment')
      },
    });

    // Simulate a reminder notification after 5 seconds
    setTimeout(() => {
      toast.info('Pengingat Janji Temu', {
        description: `Jangan lupa janji temu Anda dengan ${doctor.name} besok pukul ${newAppointment.time}.`,
        duration: 5000,
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Toaster position="top-right" richColors />
      <Navbar appointments={appointments} />
      
      <main>
        <Hero />
        
        <CategoryGrid onChatClick={handleGeneralChat} />

        {/* Featured Doctors */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dokter Pilihan</h2>
                <p className="text-gray-500 mt-1">Konsultasi dengan dokter spesialis terbaik</p>
              </div>
              <button className="text-blue-600 font-semibold hover:underline text-sm flex items-center gap-1">
                Lihat Semua <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc, i) => (
                <DoctorCard 
                  key={i} 
                  {...doc} 
                  onChat={() => handleChatWithDoctor(doc)} 
                  onBook={() => handleBookAppointment(doc)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Artikel Kesehatan Terbaru</h2>
                <p className="text-gray-500 mt-1">Informasi kesehatan terpercaya untuk Anda</p>
              </div>
              <button className="text-blue-600 font-semibold hover:underline text-sm flex items-center gap-1">
                Lihat Semua <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((article, i) => (
                <ArticleCard key={i} {...article} />
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl"
            >
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Download Aplikasi Alodokter</h2>
                <p className="text-blue-100 text-lg mb-8">
                  Dapatkan kemudahan akses kesehatan dalam genggaman. Chat dokter lebih cepat dan beli obat lebih mudah.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition-colors border border-gray-800">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-8" />
                  </button>
                  <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition-colors border border-gray-800">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8" />
                  </button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 translate-y-1/4 hidden lg:block">
                <img 
                  src="https://picsum.photos/seed/phone/400/600" 
                  alt="App Preview" 
                  className="w-[300px] rotate-[-10deg] rounded-3xl border-4 border-white/20 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <span className="text-xl font-bold">A</span>
                </div>
                <span className="text-2xl font-bold text-blue-600 tracking-tight">ALODOKTER</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Alodokter adalah platform kesehatan digital nomor satu di Indonesia yang memberikan solusi kesehatan terlengkap dan terpercaya.
              </p>
              <div className="flex items-center gap-4 mt-6">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Layanan</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button className="hover:text-blue-600 transition-colors">Chat Dokter</button></li>
                <li><button className="hover:text-blue-600 transition-colors">Booking Rumah Sakit</button></li>
                <li><button className="hover:text-blue-600 transition-colors">Toko Kesehatan</button></li>
                <li><button className="hover:text-blue-600 transition-colors">Aloproteksi</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Perusahaan</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button className="hover:text-blue-600 transition-colors">Tentang Kami</button></li>
                <li><button className="hover:text-blue-600 transition-colors">Karir</button></li>
                <li><button className="hover:text-blue-600 transition-colors">Kontak Kami</button></li>
                <li><button className="hover:text-blue-600 transition-colors">Syarat & Ketentuan</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Hubungi Kami</h4>
              <p className="text-sm text-gray-500 mb-4">Punya pertanyaan? Kami siap membantu Anda.</p>
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">
                Hubungi Support
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2026 Alodokter. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button className="hover:text-blue-600 transition-colors">Kebijakan Privasi</button>
              <button className="hover:text-blue-600 transition-colors">Keamanan</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:bg-blue-700 transition-colors"
      >
        <MessageSquare size={32} />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">1</span>
      </motion.button>

      {/* AI Chat Modal */}
      <DoctorChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        selectedDoctor={selectedDoctor}
      />
    </div>
  );
}
