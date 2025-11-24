// src/components/InfoWidget.tsx
import React, { useState, useEffect } from 'react';
import WeatherWidget from './WeatherWidget';

const InfoWidget: React.FC = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentDateNum, setCurrentDateNum] = useState('');
  const [currentMonthYear, setCurrentMonthYear] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const optionsDay: Intl.DateTimeFormatOptions = { weekday: 'long' };
      const optionsDateNum: Intl.DateTimeFormatOptions = { day: 'numeric' };
      const optionsMonthYear: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };

      setCurrentDay(now.toLocaleDateString('en-US', optionsDay).toUpperCase());
      setCurrentDateNum(now.toLocaleDateString('en-US', optionsDateNum));
      setCurrentMonthYear(now.toLocaleDateString('en-US', optionsMonthYear).toUpperCase());
      setCurrentTime(now.toLocaleTimeString('en-US', optionsTime));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  return (
    // --- PERUBAHAN UTAMA ---
    // 1. Padding: Mobile 'p-6', Desktop 'md:p-10' (Lebih ramping).
    // 2. Rounded: Mobile 'rounded-3xl', Desktop 'md:rounded-[2.5rem]'.
    // 3. Shadow: Ganti 'shadow-2xl' jadi 'shadow-lg' biar gak terlalu nonjol (timbu).
    // 4. Border: Border lebih tipis 'border-white/40'.
    <div className='flex flex-col md:flex-row bg-white/90 backdrop-blur-lg rounded-3xl md:rounded-[2.5rem] shadow-lg p-6 md:p-10 gap-6 md:gap-8 w-full max-w-5xl mx-auto border border-white/40 items-stretch transition-all duration-300'>
      
      {/* --- KOLOM KIRI: TANGGAL & JAM --- */}
      <div className='flex-1 flex flex-col justify-between text-gray-800 border-b md:border-b-0 md:border-r border-gray-200/60 pb-6 md:pb-0 md:pr-8'>
        <div>
            <p className='text-xs md:text-sm font-bold uppercase text-red-600 tracking-widest mb-1 md:mb-2'>Daily Overview</p>
            
            {/* Font Size Responsive: Mobile lebih kecil, Desktop besar */}
            <p className='text-xl md:text-3xl font-bold leading-none text-gray-900'>{currentDay}</p>
            <p className='text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 my-1 md:my-2'>
            {currentDateNum}
            </p>
            <p className='text-sm md:text-xl font-medium uppercase text-gray-600 tracking-wide'>{currentMonthYear}</p>
        </div>
        
        {/* Badge Jam - Dikecilin paddingnya di mobile */}
        <div className="mt-4 md:mt-6 flex items-center text-gray-500 text-xs md:text-sm font-medium bg-gray-100 w-fit px-3 py-1.5 md:px-4 md:py-2 rounded-full">
            <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full mr-2 md:mr-3 animate-pulse"></span>
            Last updated: {currentTime}
        </div>
      </div>

      {/* --- KOLOM KANAN: WIDGET CUACA --- */}
      <div className='flex-1 flex w-full items-center md:pl-8 pt-2 md:pt-0'>
        <WeatherWidget />
      </div>

    </div>
  );
};

export default InfoWidget;