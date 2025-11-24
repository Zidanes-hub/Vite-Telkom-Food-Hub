// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Outlet } from '../types';
import Recommendation from '../components/Recommendation';
import Silk from '../components/Silk';
import TextType from '../components/TextType';
import AnimatedContent from '../components/AnimatedContent';
import RotatingText from '../components/RotatingText';
import Carousel from '../components/Carousel';
import FeaturedItemCard from '../components/FeaturedItemCard';
import InfoWidget from '../components/InfoWidget'; // Adjust path if needed
import WeatherWidget from '../components/WeatherWidget';

// --- Komponen FeaturedCard (UMKM) ---
const FeaturedCard: React.FC<{ outlet: Outlet; index: number }> = ({ outlet, index }) => {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 ease-out opacity-0 translate-y-10 delay-${index * 100} h-full`}
    >
      <div className='p-8'>
        <div className='relative mb-6 h-48 flex items-center justify-center'>
          <div className='absolute inset-0 bg-red-100 rounded-full transform scale-90'></div>
          <img
            src={outlet.heroImage}
            alt={outlet.name}
            className='relative z-10 w-40 h-40 rounded-full shadow-md object-cover border-4 border-white'
          />
        </div>
        <p className='text-sm font-semibold text-red-600 uppercase tracking-wider'>
          {outlet.category}
        </p>
        <h2 className='text-3xl font-bold font-poppins text-gray-800 capitalize mt-1'>
          {outlet.name}
        </h2>
        <p className='text-gray-600 mt-3 h-24 overflow-hidden'>{outlet.description}</p>
        <Link
          to={`/outlet/${outlet.slug}`}
          className='mt-6 inline-block bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors transform hover:-translate-y-0.5'
        >
          KUNJUNGI WARUNG
        </Link>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { user } = useAuth();
  // HAPUS setDateString & dateString useState karena sudah di handle di InfoWidget
  // const [dateString, setDateString] = useState('');

  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const featuredItems = React.useMemo(() => {
    if (!outlets) return [];

    return outlets.flatMap((outlet) =>
      outlet.menu
        .filter((item) => item.bestseller)
        .map((item) => ({
          ...item,
          outletName: outlet.name,
          outletSlug: outlet.slug,
        })),
    );
  }, [outlets]);

  useEffect(() => {
    // HAPUS logic setDateString karena sudah di handle di InfoWidget
    // const today = new Date();
    // const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // setDateString(today.toLocaleDateString('id-ID', options));

    const fetchOutlets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3001/api/outlets');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setOutlets(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOutlets();
  }, []);

  const howToOrderRef = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const mitraSliderRef = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const ourMissionRef = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const joinCtaRef = useScrollReveal<HTMLElement>({ threshold: 0.3 });
  const feedbackRef = useScrollReveal<HTMLElement>({ threshold: 0.3 });
  const recommendationRef = useScrollReveal<HTMLElement>({ threshold: 0.3 });

  const baseGreeting = user
    ? `${user.name.charAt(0).toUpperCase() + user.name.slice(1)}, mau makan apa `
    : 'Mau makan apa ';
  const rotatingWords = ['hari ini?', 'besok?'];

  const FiSmartphone = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect x='5' y='2' width='14' height='20' rx='2' ry='2'></rect>
      <line x1='12' y1='18' x2='12.01' y2='18'></line>
    </svg>
  );
  const FiCheckSquare = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='9 11 12 14 22 4'></polyline>
      <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'></path>
    </svg>
  );
  const FiTruck = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect x='1' y='3' width='15' height='13'></rect>
      <polygon points='16 8 20 8 23 11 23 16 16 16 16 8'></polygon>
      <circle cx='5.5' cy='18.5' r='2.5'></circle>
      <circle cx='18.5' cy='18.5' r='2.5'></circle>
    </svg>
  );

  const carouselItems = [
    {
      id: 1,
      title: 'Pesan dari Asrama',
      description:
        'Jelajahi menu dari warung favoritmu langsung dari HP, nggak perlu keluar kamar.',
      icon: <FiSmartphone />,
    },
    {
      id: 2,
      title: 'UMKM Terima Pesanan',
      description: 'Pesananmu via WhatsApp langsung diterima oleh pemilik warung untuk disiapkan.',
      icon: <FiCheckSquare />,
    },
    {
      id: 3,
      title: 'Diantar ke Lokasimu',
      description:
        'UMKM akan mengirimkan pesananmu ke asrama atau titik lokasi yang kamu tentukan.',
      icon: <FiTruck />,
    },
  ];

  // --- TAMBAH: Definisikan path gambar mitra Anda di sini ---
  // Anda bisa menambah atau mengurangi gambar di sini, slider akan otomatis menyesuaikan.
  const mitraImages = [
    '/images/buyunblk.jpg',
    '/images/outletario.jpg',
    '/images/wwcrrio.jpg',
    '/images/ayambakaraira.jpg',
  ];

  return (
    <Layout>
      {/* --- Bagian Hero --- */}
      <section
        id='hero-main'
        className='relative text-white text-center py-24 md:py-32 overflow-hidden h-[70vh] flex flex-col items-center justify-center'
      >
        <div className='absolute inset-0 z-0'>
          <Silk speed={3} scale={1.2} color='#991B1B' noiseIntensity={1.2} />
        </div>
        <div className='absolute inset-0 bg-black/20 z-0'></div>
        <div className='container mx-auto px-4 relative z-10'>
          <TextType
            as='h1'
            text={['Kuliner Terdekat.', 'Harga Mahasiswa.']}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={2000}
            className='text-4xl md:text-6xl font-extrabold font-poppins'
          />
          {/* START FIX: Perbaikan classname dan penyesuaian delay */}
          <p
            className='text-lg md:text-xl mt-4 max-w-2xl mx-auto animate-fade-in-up'
            style={{ animationDelay: '3.5s' }}
          >
            Jelajahi warung favorit di sekitar kampus. Pesan mudah, langsung via WhatsApp.
          </p>
          {/* END FIX */}
          <div className='mt-8'>
            <AnimatedContent
              delay={3.5}
              duration={1}
              ease='elastic.out(1, 0.5)'
              distance={50}
              direction='vertical'
              initialOpacity={0}
            >
              <button
                onClick={() =>
                  document
                    .getElementById('featured-section')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className='bg-white text-red-600 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
              >
                Pesan Sekarang
              </button>
            </AnimatedContent>
          </div>
        </div>
        {/* START FIX: Hapus style block inline */}
        {/* Hapus block ini jika sudah didefinisikan di tailwind.config.js */}
        {/* <style>{`@keyframes-fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fadeIn-up 1s ease-out forwards; }`}</style> */}
        {/* END FIX */}
      </section>

      {/* --- Bagian Greeting & Tanggal --- */}
      <section className='bg-gray-100 -mt-12 relative z-20 rounded-t-3xl pt-16 pb-16'>
        <div className='container mx-auto px-4 space-y-12'>
          <div className='text-center'>
            <h2 className='text-3xl md:text-4xl text-gray-800 font-semibold font-poppins'>
              <span>{baseGreeting}</span>
              <RotatingText
                texts={rotatingWords}
                mainClassName='text-red-600'
                rotationInterval={3000}
              />
            </h2>
            <p className='text-2xl md:text-3xl mt-4 font-poppins font-bold'>
              <span className='text-red-600'>Telkom Food Hub</span>
              <span className='text-gray-800'> Solusinya!!</span>
            </p>
          </div>
          {/* <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 max-w-sm mx-auto">
              <p id="tanggal-hari-ini" className="font-semibold text-gray-700 text-lg">{dateString}</p>
          </div> */}
          <div className='flex flex-col md:flex-row gap-6 justify-center items-center'>
            <InfoWidget />
            <WeatherWidget />
          </div>
        </div>
      </section>

      {/* --- Bagian Menu Unggulan & Daftar Outlet --- */}
      <section id='featured-section' className='featured-section py-16 md:py-24 bg-gray-100'>
        <div className='container mx-auto px-4'>
          {/* --- PENANGANAN KONDISI LOADING / ERROR (HANYA TAMPIL 1 KALI) --- */}
          {isLoading && (
            <p className='text-center text-gray-600 font-semibold'>Memuat warung favorit...</p>
          )}
          {error && <p className='text-center text-red-600 font-semibold'>{error}</p>}

          {/* --- GRID MENU PALING LARIS (BARU) --- */}
          {!isLoading && !error && featuredItems.length > 0 && (
            <div className='mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-12 text-center'>
                Menu Paling Laris 🔥
              </h2>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {featuredItems.map((item, index) => (
                  <FeaturedItemCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* --- GRID DAFTAR WARUNG (LAMA) --- */}
          {!isLoading && !error && outlets.length > 0 && (
            <div>
              <h2 className='text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-12 text-center'>
                Telusuri Semua Warung
              </h2>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {/* START FIX: Ganti <featuredCard> menjadi <FeaturedCard> */}
                {outlets.map((outlet, index) => (
                  <FeaturedCard key={outlet.slug} outlet={outlet} index={index} />
                ))}
                {/* END FIX */}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ... Sisa halaman ... */}
      <section
        ref={recommendationRef}
        className='py-16 md:py-24 bg-gray-50 opacity-0 translate-y-10 transition-all duration-700 ease-out'
      >
        <div className='container mx-auto px-4 max-w-2xl'>
          <Recommendation />
        </div>
      </section>

      <section
        ref={howToOrderRef}
        id='how-to-order'
        className='py-16 md:py-24 bg-white opacity-0 translate-y-10 transition-all duration-700 ease-out'
      >
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-12'>
            Cara Pesan? Gampang Banget!
          </h2>
          <div className='flex justify-center'>
            <Carousel items={carouselItems} />
          </div>
        </div>
      </section>

      <section
        ref={mitraSliderRef}
        id='mitra-slider'
        className='py-16 md:py-24 bg-gray-800 text-white opacity-0 translate-y-10 transition-all duration-700 ease-out'
      >
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold font-poppins'>
            Kisah di Balik Setiap Rasa
          </h2>
          <div className='mt-12 overflow-hidden relative h-64'>
            <div
              className='absolute top-0 left-0 w-full h-full flex animate-custom-scroll hover:[animation-play-state:paused]'
              style={{ width: `calc(208px * ${mitraImages.length * 2})` }} // Lebar dinamis
            >
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {mitraImages.map(
                    (
                      src,
                      j, // Loop berdasarkan array mitraImages
                    ) => (
                      <img
                        key={`${i}-${j}`}
                        src={src}
                        alt={`Mitra ${j + 1}`}
                        className='w-48 h-full object-cover object-center mx-2 rounded-lg flex-shrink-0'
                      />
                    ),
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <p className='mt-8 text-xl italic text-gray-300'>
            "Kepercayaan Anda adalah semangat kami untuk terus menyajikan yang terbaik."
          </p>
        </div>
      </section>

      <section
        ref={ourMissionRef}
        id='our-mission'
        className='py-16 md:py-24 bg-white opacity-0 translate-y-10 transition-all duration-700 ease-out'
      >
        <div className='container mx-auto px-4'>
          {/* Saya juga melihat ada gambar duplikat di array, saya hapus salah satunya sebagai contoh */}
          <h2 className='text-3xl md:text-4xl font-bold text-center font-poppins text-gray-800'>
            Dari Mahasiswa, Untuk Mahasiswa & UMKM
          </h2>
          <p className='text-lg text-center text-gray-600 mt-4 max-w-3xl mx-auto'>
            Kami percaya pada kekuatan komunitas. Telkom Food Hub lahir dari semangat untuk
            menghubungkan mahasiswa dengan kekayaan kuliner lokal.
          </p>
          <div className='mt-12 space-y-12'>
            <ProfileCard
              name='Zidane Surya Nugraha'
              role='Full-Stack Developer & Software Architecture'
            />
            <ProfileCard
              name='Muhammad Rizki Ramdhani'
              role='Creative Technologist & Frontend Developer'
            />
          </div>
        </div>
      </section>

      <section
        ref={joinCtaRef}
        id='join-cta'
        className='py-16 md:py-24 bg-red-600 text-white text-center opacity-0 translate-y-10 transition-all duration-700 ease-out'
      >
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold font-poppins'>
            Punya Usaha Kuliner di Sekitar Telkom?
          </h2>
          <p className='mt-4 text-lg'>
            Jangkau lebih banyak mahasiswa dan jadi bagian dari komunitas kami. Gratis, tanpa
            komisi.
          </p>
          <Link
            to='/partner'
            className='mt-8 inline-block bg-white text-red-600 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
          >
            Gabung Jadi Mitra
          </Link>
        </div>
      </section>

      <section
        ref={feedbackRef}
        id='feedback'
        className='py-16 md:py-24 bg-white text-center opacity-0 translate-y-10 transition-all duration-700 ease-out'
      >
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold font-poppins text-gray-800'>
            Punya Kritik atau Saran?
          </h2>
          <p className='mt-4 text-lg text-gray-600 max-w-2xl mx-auto'>
            Kami terus berusaha menjadi lebih baik. Setiap masukan darimu sangat berharga. Hubungi
            Customer Service kami via WhatsApp.
          </p>
          <a
            href='https://wa.me/6281232891289?text=Halo%20Admin%20Telkom%20Food%20Hub,%20saya%20ingin%20memberikan%20masukan...'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-8 inline-block bg-green-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-green-600 transform hover:-translate-y-1 transition-all duration-300'
          >
            Hubungi Customer Service
          </a>
        </div>
      </section>
    </Layout>
  );
};

const ProfileCard: React.FC<{ name: string; role: string }> = ({ name, role }) => (
  <div className='bg-gray-50 rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-8'>
    <img
      src={name === 'Zidane Surya Nugraha' ? '/images/zidanes.jpg' : '/images/rizki.jpg'}
      alt={name}
      className='w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg'
    />
    <div className='text-center md:text-left'>
      <h4 className='text-2xl font-bold text-gray-800'>{name}</h4>
      <p className='text-md font-semibold text-red-600 mt-1'>{role}</p>
      <div className='flex justify-center md:justify-start space-x-4 mt-4'>
        {/* Social links can be added here */}
      </div>
    </div>
  </div>
);

export default HomePage;
