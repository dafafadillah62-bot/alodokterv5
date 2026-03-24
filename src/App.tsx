import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ArticleCard from './components/ArticleCard';
import DoctorCard from './components/DoctorCard';
import ProductCard from './components/ProductCard';
import MCUPackageCard from './components/MCUPackageCard';
import DoctorChat from './components/DoctorChat';
import { MessageSquare, ChevronRight, Heart, Share2, Facebook, Twitter, Instagram, Youtube, ShoppingBag, Activity } from 'lucide-react';
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

const products = [
  {
    name: "Panadol Extra 10 Kaplet",
    category: "Obat Bebas",
    price: "Rp 12.500",
    image: "https://picsum.photos/seed/panadol/300/300",
    discount: "10%",
    rating: 4.9
  },
  {
    name: "Enervon-C Multivitamin 30 Tablet",
    category: "Vitamin & Suplemen",
    price: "Rp 45.000",
    image: "https://picsum.photos/seed/vitamin/300/300",
    rating: 4.8
  },
  {
    name: "Masker Medis 3-Ply 50 Pcs",
    category: "Alat Kesehatan",
    price: "Rp 25.000",
    image: "https://picsum.photos/seed/mask/300/300",
    discount: "20%",
    rating: 4.7
  },
  {
    name: "Betadine Antiseptic Solution 30ml",
    category: "P3K",
    price: "Rp 32.000",
    image: "https://picsum.photos/seed/betadine/300/300",
    rating: 4.9
  }
];

const mcuPackages = [
  {
    name: "Paket Skrining Diabetes",
    price: "Rp 450.000",
    hospital: "RS Siloam Kebon Jeruk",
    features: ["Gula Darah Puasa", "HbA1c", "Konsultasi Dokter Umum"],
    image: "https://picsum.photos/seed/diabetesmcu/600/400"
  },
  {
    name: "Paket Jantung Sehat",
    price: "Rp 1.250.000",
    hospital: "RS Mayapada",
    features: ["EKG", "Rontgen Thorax", "Profil Lipid", "Konsultasi Spesialis Jantung"],
    image: "https://picsum.photos/seed/heartmcu/600/400"
  },
  {
    name: "Paket Pra-Nikah (Pria/Wanita)",
    price: "Rp 850.000",
    hospital: "RSIA Bunda Jakarta",
    features: ["Hematologi Lengkap", "Golongan Darah", "Urinalisis", "Konsultasi Dokter"],
    image: "https://picsum.photos/seed/preweddingmcu/600/400"
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      toast.success(`Menampilkan hasil pencarian untuk "${query}"`, {
        duration: 2000,
      });
    }
  };

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

  const handleComingSoon = (feature: string) => {
    toast.info(`Fitur ${feature} akan segera hadir!`, {
      description: 'Kami sedang bekerja keras untuk menghadirkan fitur ini untuk Anda.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Toaster position="top-right" richColors />
      <Navbar appointments={appointments} onSearch={handleSearch} />
      
      <main>
        <Hero onSearch={handleSearch} />
        
        <CategoryGrid onChatClick={handleGeneralChat} />

        {/* Featured Doctors */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Hasil Pencarian Dokter: "${searchQuery}"` : 'Dokter Pilihan'}
                </h2>
                <p className="text-gray-500 mt-1">
                  {searchQuery ? `Ditemukan ${filteredDoctors.length} dokter` : 'Konsultasi dengan dokter spesialis terbaik'}
                </p>
              </div>
              <button 
                onClick={() => handleComingSoon('Daftar Dokter')}
                className="text-blue-600 font-semibold hover:underline text-sm flex items-center gap-1"
              >
                Lihat Semua <ChevronRight size={16} />
              </button>
            </div>
            
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doc, i) => (
                  <DoctorCard 
                    key={i} 
                    {...doc} 
                    onChat={() => handleChatWithDoctor(doc)} 
                    onBook={() => handleBookAppointment(doc)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500">Tidak ada dokter yang cocok dengan pencarian Anda.</p>
                <button 
                  onClick={() => handleSearch('')}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Pharmacy Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Toko Kesehatan</h2>
                  <p className="text-gray-500 mt-1">Beli obat dan vitamin lebih mudah dan terpercaya</p>
                </div>
              </div>
              <button 
                onClick={() => handleComingSoon('Toko Kesehatan')}
                className="text-blue-600 font-semibold hover:underline text-sm flex items-center gap-1"
              >
                Lihat Semua <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <ProductCard key={i} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Hasil Pencarian Artikel: "${searchQuery}"` : 'Artikel Kesehatan Terbaru'}
                </h2>
                <p className="text-gray-500 mt-1">
                  {searchQuery ? `Ditemukan ${filteredArticles.length} artikel` : 'Informasi kesehatan terpercaya untuk Anda'}
                </p>
              </div>
              <button 
                onClick={() => handleComingSoon('Daftar Artikel')}
                className="text-blue-600 font-semibold hover:underline text-sm flex items-center gap-1"
              >
                Lihat Semua <ChevronRight size={16} />
              </button>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredArticles.map((article, i) => (
                  <ArticleCard key={i} {...article} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500">Tidak ada artikel yang cocok dengan pencarian Anda.</p>
              </div>
            )}
          </div>
        </section>

        {/* MCU Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                  <Activity size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Paket Medical Check-Up</h2>
                  <p className="text-gray-500 mt-1">Pilih paket pemeriksaan kesehatan terbaik untuk Anda</p>
                </div>
              </div>
              <button 
                onClick={() => handleComingSoon('Daftar MCU')}
                className="text-blue-600 font-semibold hover:underline text-sm flex items-center gap-1"
              >
                Lihat Semua <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mcuPackages.map((pkg, i) => (
                <MCUPackageCard key={i} {...pkg} />
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
                  <button 
                    onClick={() => handleComingSoon('Download Play Store')}
                    className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition-colors border border-gray-800"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-8" />
                  </button>
                  <button 
                    onClick={() => handleComingSoon('Download App Store')}
                    className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition-colors border border-gray-800"
                  >
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
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
                  <button key={i} onClick={() => handleComingSoon('Media Sosial')} className="w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Layanan</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button onClick={() => handleComingSoon('Chat Dokter')} className="hover:text-blue-600 transition-colors">Chat Dokter</button></li>
                <li><button onClick={() => handleComingSoon('Booking Rumah Sakit')} className="hover:text-blue-600 transition-colors">Booking Rumah Sakit</button></li>
                <li><button onClick={() => handleComingSoon('Toko Kesehatan')} className="hover:text-blue-600 transition-colors">Toko Kesehatan</button></li>
                <li><button onClick={() => handleComingSoon('Aloproteksi')} className="hover:text-blue-600 transition-colors">Aloproteksi</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Perusahaan</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button onClick={() => handleComingSoon('Tentang Kami')} className="hover:text-blue-600 transition-colors">Tentang Kami</button></li>
                <li><button onClick={() => handleComingSoon('Karir')} className="hover:text-blue-600 transition-colors">Karir</button></li>
                <li><button onClick={() => handleComingSoon('Kontak Kami')} className="hover:text-blue-600 transition-colors">Kontak Kami</button></li>
                <li><button onClick={() => handleComingSoon('Syarat & Ketentuan')} className="hover:text-blue-600 transition-colors">Syarat & Ketentuan</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Hubungi Kami</h4>
              <p className="text-sm text-gray-500 mb-4">Punya pertanyaan? Kami siap membantu Anda.</p>
              <button onClick={() => handleComingSoon('Support')} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">
                Hubungi Support
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2026 Alodokter. Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button onClick={() => handleComingSoon('Kebijakan Privasi')} className="hover:text-blue-600 transition-colors">Kebijakan Privasi</button>
              <button onClick={() => handleComingSoon('Keamanan')} className="hover:text-blue-600 transition-colors">Keamanan</button>
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
