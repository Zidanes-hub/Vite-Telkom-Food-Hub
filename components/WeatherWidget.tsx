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
        // Default to Cileunyi Kulon (Bandung) if not set
        const API_URL =
          import.meta.env.VITE_WEATHER_API_URL ||
          'https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=32.04.05.2001';

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Gagal mengambil data cuaca');
        }

        const data = await response.json();

        // Parsing logic based on the observed JSON structure
        // data.data[0].cuaca is an array of arrays.
        // Usually index 0 is the closest time or current forecast group.
        // Let's assume data.data[0].cuaca[0][0] is the current/latest forecast.

        if (!data.data || !data.data[0] || !data.data[0].cuaca) {
          throw new Error('Format data cuaca tidak sesuai');
        }

        const locationName = data.lokasi
          ? `${data.lokasi.kecamatan}, ${data.lokasi.kotkab}`
          : 'Lokasi Tidak Dikenal';

        // Flatten the nested arrays to find the forecast closest to now
        // The structure seems to be grouped, but let's just take the first available slot for simplicity
        // or try to find the one matching current time if possible.
        // For "MVP" dashboard, the first entry of the first group usually represents "now" or "soon".
        const currentForecast = data.data[0].cuaca.flat()[0];

        if (!currentForecast) {
          throw new Error('Data prakiraan tidak tersedia');
        }

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
      <div className='bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 w-full max-w-sm animate-pulse'>
        <div className='h-6 bg-gray-200 rounded w-1/2 mb-4'></div>
        <div className='flex items-center space-x-4'>
          <div className='h-12 w-12 bg-gray-200 rounded-full'></div>
          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-24'></div>
            <div className='h-4 bg-gray-200 rounded w-16'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-50 rounded-2xl p-4 shadow-lg border border-red-100 w-full max-w-sm text-center'>
        <p className='text-red-600 font-semibold text-sm'>Gagal memuat cuaca</p>
        <p className='text-red-400 text-xs mt-1'>{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className='bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 w-full max-w-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-gray-500 text-xs font-bold uppercase tracking-wider mb-1'>
            Cuaca Saat Ini
          </h3>
          <p className='text-gray-800 font-bold text-lg'>{weather.location}</p>
        </div>
        <div className='bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-lg'>BMKG</div>
      </div>

      <div className='flex items-center mt-4'>
        <div className='flex-shrink-0 mr-4'>
          <img
            src={weather.iconUrl}
            alt={weather.condition}
            className='w-16 h-16 object-contain filter drop-shadow-md'
          />
        </div>
        <div>
          <div className='text-4xl font-extrabold text-gray-900'>{weather.temp}°C</div>
          <p className='text-gray-600 font-medium capitalize'>{weather.condition}</p>
        </div>
      </div>

      <div className='mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-600'>
        <div className='flex items-center'>
          <svg
            className='w-4 h-4 mr-1 text-blue-400'
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
          <span>Kelembapan: {weather.humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
