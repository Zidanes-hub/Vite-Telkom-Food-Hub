// src/components/WeatherWidget.tsx
import React, { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  location: string;
  iconUrl: string;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const API_URL = import.meta.env.VITE_WEATHER_API_URL || 'https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=32.04.05.2001';

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Gagal mengambil data cuaca');
        const data = await response.json();

        if (!data.data || !data.data[0] || !data.data[0].cuaca) throw new Error('Format data tidak sesuai');

        const locationName = data.lokasi ? `${data.lokasi.kecamatan}, ${data.lokasi.kotkab}` : 'Lokasi Tidak Dikenal';
        const currentForecast = data.data[0].cuaca.flat()[0];

        if (!currentForecast) throw new Error('Data prakiraan tidak tersedia');

        setWeather({
          temp: currentForecast.t,
          condition: currentForecast.weather_desc,
          humidity: currentForecast.hu,
          location: locationName,
          iconUrl: currentForecast.image,
        });
      } catch (err: any) {
        console.error('Weather fetch error:', err);
        setError(err.message || 'Terjadi kesalahan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (isLoading) {
    return (
      <div className='w-full flex flex-col justify-center animate-pulse gap-4'>
        <div className='h-5 bg-gray-200 rounded w-2/3'></div>
        <div className='flex items-center space-x-4'>
          <div className='h-16 w-16 bg-gray-200 rounded-full'></div>
          <div className='space-y-2'>
            <div className='h-8 bg-gray-200 rounded w-24'></div>
            <div className='h-4 bg-gray-200 rounded w-16'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full flex flex-col justify-center items-center text-center p-2'>
        <p className='text-red-500 text-sm font-semibold'>Gagal memuat cuaca</p>
        <p className='text-xs text-gray-400 mt-1'>Refresh halaman</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    // Wrapper tanpa style aneh-aneh
    <div className='w-full flex flex-col justify-between h-full'>
      
      {/* Header Lokasi */}
      <div className='flex justify-between items-start mb-4 md:mb-6'>
        <div>
          <h3 className='text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-0.5'>
            Cuaca Saat Ini
          </h3>
          {/* Font lokasi dikecilin di mobile */}
          <p className='text-gray-900 font-extrabold text-lg md:text-2xl leading-tight max-w-[200px]'>
            {weather.location}
          </p>
        </div>
        <div className='bg-blue-100 text-blue-700 text-[10px] md:text-xs font-extrabold px-2 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wide'>
            BMKG
        </div>
      </div>

      {/* Main Content: Icon & Suhu */}
      <div className='flex items-center gap-4 md:gap-6 mb-4 md:mb-6'>
        <div className='flex-shrink-0'>
          {/* Icon dikecilin: w-16 di mobile, w-28 di desktop */}
          <img
            src={weather.iconUrl}
            alt={weather.condition}
            className='w-16 h-16 md:w-28 md:h-28 object-contain filter drop-shadow-md'
          />
        </div>
        <div>
          {/* Suhu dikecilin: text-5xl di mobile, text-7xl di desktop */}
          <div className='text-5xl md:text-7xl font-black text-gray-900 leading-none tracking-tight'>
            {weather.temp}°C
          </div>
          <p className='text-sm md:text-xl text-gray-700 font-bold capitalize mt-1 md:mt-2'>
            {weather.condition}
          </p>
        </div>
      </div>

      {/* Footer Details */}
      <div className='mt-auto flex items-center text-xs md:text-sm font-medium text-gray-600 bg-white/60 w-fit px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-100'>
        <svg
          className='w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2 text-blue-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
          ></path>
        </svg>
        <span>Lembap: <span className="font-bold text-gray-800">{weather.humidity}%</span></span>
      </div>
    </div>
  );
};

export default WeatherWidget;