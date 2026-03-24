import React, { useState } from 'react';
import { Search, User, Menu, Bell, ShoppingCart, Calendar, Clock, MapPin as MapPinIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { Appointment } from '../App';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar({ appointments = [] }: { appointments?: Appointment[] }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold">A</span>
            </div>
            <span className="text-2xl font-bold text-blue-600 tracking-tight hidden sm:block">ALODOKTER</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Cari dokter, spesialis, atau rumah sakit..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <Bell size={20} />
                {appointments.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[10px] text-white flex items-center justify-center font-bold">
                    {appointments.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsNotificationOpen(false)}
                    ></div>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Notifikasi</h3>
                        <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Tandai dibaca</span>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {appointments.length === 0 ? (
                          <div className="p-8 text-center">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Bell className="text-gray-300" size={24} />
                            </div>
                            <p className="text-sm text-gray-500">Belum ada notifikasi baru</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-50">
                            {appointments.map((apt) => (
                              <div key={apt.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="flex gap-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                                    <Calendar size={20} />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Janji Temu Dikonfirmasi</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {apt.doctorName} • {apt.specialty}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                                      <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {apt.time}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {apt.date}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {appointments.length > 0 && (
                        <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                          <button className="text-xs font-bold text-blue-600 hover:underline">Lihat Semua Janji Temu</button>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart size={20} />
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
              <User size={18} />
              <span className="text-sm font-medium hidden sm:block">Masuk / Daftar</span>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
