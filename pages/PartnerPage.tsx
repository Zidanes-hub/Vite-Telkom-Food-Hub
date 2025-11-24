import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHeader: React.FC = () => (
  <header className='bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between h-16'>
        <Link to='/' className='text-xl font-bold text-red-600 font-poppins'>
          Telkom Food Hub
        </Link>
        <nav>
          <Link to='/' className='text-gray-600 hover:text-red-600 transition-colors font-semibold'>
            ← Kembali ke Beranda
          </Link>
        </nav>
      </div>
    </div>
  </header>
);

const BenefitCard: React.FC<{ icon: string; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className='bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300'>
    <div className='w-16 h-16 bg-red-100 text-red-600 text-3xl font-bold rounded-full flex items-center justify-center mx-auto mb-6'>
      {icon}
    </div>
    <h3 className='text-xl font-bold text-gray-800 mb-3'>{title}</h3>
    <p className='text-gray-600'>{description}</p>
  </div>
);

const PartnerPage: React.FC = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <SimpleHeader />
      <main>
        <section id='partnership-hero' className='bg-red-600 text-white text-center py-20'>
          <div className='container mx-auto px-4'>
            <h1 className='text-4xl md:text-5xl font-extrabold font-poppins'>
              Keuntungan Menjadi Mitra Telkom Food Hub
            </h1>
            <p className='text-xl mt-4'>Platform komunitas yang dirancang untuk kesuksesan Anda.</p>
          </div>
        </section>

        <section id='partnership-benefits' className='py-16 md:py-24'>
          <div className='container mx-auto px-4'>
            <div className='grid md:grid-cols-3 gap-8'>
              <BenefitCard
                icon='Rp'
                title='100% Gratis, Tanpa Komisi'
                description='Kami adalah platform komunitas. Seluruh keuntungan penjualan 100% milik Anda. Tidak ada potongan, tidak ada biaya tersembunyi.'
              />
              <BenefitCard
                icon='🎯'
                title='Akses Langsung ke Mahasiswa'
                description='Usaha Anda akan tampil di depan ribuan mahasiswa yang setiap hari mencari pilihan makanan. Ini adalah etalase digital Anda di jantung kampus.'
              />
              <BenefitCard
                icon='WA'
                title='Pesanan Langsung via WhatsApp'
                description='Tidak perlu install aplikasi atau training rumit. Semua pesanan akan masuk langsung ke nomor WhatsApp bisnis Anda. Semudah membalas chat.'
              />
            </div>
          </div>
        </section>

        <section id='partnership-cta' className='py-16 md:py-20 bg-gray-100'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6'>
              Siap Mengembangkan Usaha Anda?
            </h2>
            <a
              href='https://wa.me/6281234567890?text=Halo%20Admin%20Telkom%20Food%20Hub,%20saya%20tertarik%20untuk%20bergabung%20menjadi%20mitra.'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg'
            >
              Pelajari Lebih Lanjut & Gabung
            </a>
          </div>
        </section>
      </main>
      <footer className='bg-gray-800 text-white'>
        <div className='container mx-auto px-4 py-6 text-center'>
          <p>&copy; 2025 Telkom Food Hub. Dibuat oleh Zidane & Rizki.</p>
        </div>
      </footer>
    </div>
  );
};

export default PartnerPage;
