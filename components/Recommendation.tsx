import React, { useState } from 'react';
// HAPUS: import { getFoodRecommendation } from '../services/geminiService';

const SparklesIcon: React.FC<{className: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m11-1a2 2 0 00-2-2h-1a2 2 0 00-2 2v1a2 2 0 002 2h1a2 2 0 002-2v-1zM17 3a2 2 0 00-2 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 00-2-2h-1z" />
  </svg>
);

const Recommendation: React.FC = () => {
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetRecommendation = async () => {
    setIsLoading(true);
    setError('');
    setRecommendation('');
    try {
      // --- PERUBAHAN DI SINI ---
      // Kita panggil backend kita, bukan lagi service lokal
      const response = await fetch('http://localhost:3001/api/recommend');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal mendapatkan rekomendasi.');
      }
      
      // Backend kita mengirim JSON: { recommendation: "..." }
      setRecommendation(data.recommendation);
      // --- AKHIR PERUBAHAN ---

    } catch (err: any) {
      setError(err.message || 'Gagal mendapatkan rekomendasi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-100 text-center">
      <SparklesIcon className="w-12 h-12 mx-auto text-yellow-400" />
      <h3 className="text-xl font-bold mt-4 mb-2 font-poppins text-gray-800">Bingung Mau Makan Apa?</h3>
      <p className="text-gray-600 mb-6">Biar AI kami yang pilihkan menu spesial untukmu hari ini!</p>
      
      <button
        onClick={handleGetRecommendation}
        disabled={isLoading}
        className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Lagi Mikirin Menu...' : 'Kasih Rekomendasi!'}
      </button>

      {isLoading && (
        <div className="mt-6 text-sm text-gray-500 animate-pulse">
          Chef AI sedang memasak ide...
        </div>
      )}

      {error && <p className="mt-6 text-red-500">{error}</p>}
      
      {recommendation && (
        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-left">
          <p className="text-gray-700">{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default Recommendation;