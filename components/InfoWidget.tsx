// src/components/InfoWidget.tsx
import React, { useState, useEffect } from 'react';

// Lo bisa tambahin path untuk icon cuaca di sini nanti.
// Untuk sementara, kita pake placeholder.
// Misalnya:
// import { ReactComponent as CloudIcon } from '../assets/icons/cloud.svg'; // Jika pake SVG
// atau jika pake Lottie:
// import Lottie from 'react-lottie';
// import animationData from '../assets/lottie/rain.json'; // Contoh Lottie JSON

const InfoWidget: React.FC = () => {
  const [currentDateDetailed, setCurrentDateDetailed] = useState(''); // Untuk "Wednesday, 15 November 2025"
  const [currentDay, setCurrentDay] = useState(''); // Untuk "WEDNESDAY"
  const [currentDateNum, setCurrentDateNum] = useState(''); // Untuk "15"
  const [currentMonthYear, setCurrentMonthYear] = useState(''); // Untuk "NOVEMBER 2025"
  const [currentTime, setCurrentTime] = useState(''); // Untuk "10:30 AM"

  const [location, setLocation] = useState('Fetching location...');
  const [weather, setWeather] = useState({
    condition: 'Loading...',
    temperature: '--',
    icon: 'cloudy', // Bisa 'sunny', 'rainy', 'cloudy', 'windy'
    source: 'BMKG',
  });
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [errorWeather, setErrorWeather] = useState<string | null>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const optionsDateDetailed: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      const optionsDay: Intl.DateTimeFormatOptions = { weekday: 'long' };
      const optionsDateNum: Intl.DateTimeFormatOptions = { day: 'numeric' };
      const optionsMonthYear: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };

      setCurrentDateDetailed(now.toLocaleDateString('en-US', optionsDateDetailed));
      setCurrentDay(now.toLocaleDateString('en-US', optionsDay).toUpperCase());
      setCurrentDateNum(now.toLocaleDateString('en-US', optionsDateNum));
      setCurrentMonthYear(now.toLocaleDateString('en-US', optionsMonthYear).toUpperCase());
      setCurrentTime(now.toLocaleTimeString('en-US', optionsTime));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000 * 60); // Update setiap menit

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async (lat: number, lon: number) => {
      setIsLoadingWeather(true);
      setErrorWeather(null);
      try {
        // TODO: GANTI URL INI KE ENDPOINT BACKEND LO NANTI
        // Endpoint backend lo nanti yang akan fetch dari BMKG
        const response = await fetch(`http://localhost:3001/api/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data from backend');
        }
        const data = await response.json();

        // Simulasikan data cuaca dari BMKG
        // Nanti lo mapping data 'data' dari backend sesuai respons BMKG
        setWeather({
          condition: data.condition || 'Clear Sky', // Contoh: 'Clear Sky', 'Rainy', 'Cloudy'
          temperature: data.temperature || '28',
          icon: data.icon || 'sunny', // Contoh: 'sunny', 'rainy', 'cloudy', 'windy'
          source: 'BMKG',
        });
        setLocation(data.location || 'Bojongsoang, Bandung'); // Contoh lokasi dari respons
      } catch (err: any) {
        setErrorWeather(err.message);
        setLocation('Location unknown');
        setWeather((prev) => ({ ...prev, condition: 'N/A', temperature: '--' }));
        console.error('Failed to fetch weather:', err);
      } finally {
        setIsLoadingWeather(false);
      }
    };

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation('Fetching weather...'); // Update status
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error('Geolocation error:', error);
            setErrorWeather('Unable to retrieve location.');
            setLocation('Location unavailable');
            setIsLoadingWeather(false);
            // Default ke Bojongsoang jika user tolak/error
            fetchWeatherData(-6.974, 107.6322); // Koordinat Bojongsoang
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 },
        );
      } else {
        setErrorWeather('Geolocation not supported by browser.');
        setLocation('Location unavailable');
        setIsLoadingWeather(false);
        // Default ke Bojongsoang jika browser tidak support
        fetchWeatherData(-6.974, 107.6322); // Koordinat Bojongsoang
      }
    };

    getUserLocation();
  }, []);

  // Untuk animasi GIF/Lottie, lo bisa atur map antara weather.icon dengan src GIF/Lottie
  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'sunny':
        return 'https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/60001859600/original/sunny.gif?1682704381'; // Contoh GIF
      case 'rainy':
        return 'https://i.gifer.com/VgC.gif'; // Contoh GIF
      case 'cloudy':
        return 'https://i.gifer.com/origin/79/79b47e2524d775a6c3f3f009f4dd71a3_w200.gif'; // Contoh GIF
      case 'windy':
        return 'https://i.gifer.com/origin/ff/ff37986064f26197b0a887019f6a5d42_w200.gif'; // Contoh GIF
      default:
        return 'https://via.placeholder.com/80/A0AEC0/FFFFFF?text=Weather'; // Placeholder
    }
  };

  return (
    <div className='flex flex-col md:flex-row bg-gray-50 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl p-6 gap-6 w-full max-w-lg md:max-w-3xl mx-auto border border-gray-200'>
      {/* Kolom Tanggal & Waktu */}
      <div className='flex-1 flex flex-col items-start justify-center text-gray-800 border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pr-6 md:pb-0'>
        <p className='text-sm font-light uppercase text-gray-600'>Daily Overview</p>
        <p className='text-xl md:text-2xl font-semibold mt-1 leading-none'>{currentDay}</p>{' '}
        {/* WEDNESDAY */}
        <p className='text-4xl md:text-5xl font-bold mt-1 leading-none text-gray-900'>
          {currentDateNum}
        </p>{' '}
        {/* 15 */}
        <p className='text-xl font-medium mt-1 uppercase text-gray-700'>{currentMonthYear}</p>{' '}
        {/* NOVEMBER 2025 */}
        <p className='text-sm font-light mt-2 text-gray-500'>Last updated: {currentTime}</p>
      </div>

      {/* Kolom Cuaca */}
      <div className='flex-1 flex flex-col items-center justify-center text-gray-800 pt-4 md:pt-0 md:pl-6'>
        {isLoadingWeather ? (
          <div className='w-20 h-20 flex items-center justify-center'>
            <svg
              className='animate-spin h-8 w-8 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          </div>
        ) : errorWeather ? (
          <div className='text-center'>
            <p className='text-red-500 text-sm'>{errorWeather}</p>
            <p className='text-gray-500 text-xs'>Defaulting to Bojongsoang data.</p>
          </div>
        ) : (
          <>
            <div className='w-20 h-20 flex items-center justify-center mb-2'>
              <img
                src={getWeatherIcon(weather.icon)}
                alt={weather.condition}
                className='w-full h-full object-contain'
              />
              {/* Jika pake Lottie, contoh:
              <Lottie 
                options={{ loop: true, autoplay: true, animationData: animationData[weather.icon] }}
                height={80}
                width={80}
              /> */}
            </div>
            <p className='text-4xl font-bold text-gray-900'>{weather.temperature}°C</p>
            <p className='text-base text-gray-700 mt-1'>{location}</p>
            <p className='text-sm text-gray-600 font-medium'>{weather.condition}</p>
            <p className='text-xs text-gray-500 mt-2'>Data by {weather.source}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoWidget;
