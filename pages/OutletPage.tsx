import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { outlets } from '../data/outlets';
import { MenuItem } from '../types';

const SimpleHeader: React.FC = () => (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-red-600 font-poppins">Telkom Food Hub</Link>
          <nav>
            <Link to="/" className="text-gray-600 hover:text-red-600 transition-colors font-semibold">← Kembali ke Pilihan</Link>
          </nav>
        </div>
      </div>
    </header>
);

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
    <div className="relative">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-48 object-cover" 
      />
      {item.bestseller && (
        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-md">⭐ Best Seller</div>
      )}
    </div>
    <div className="p-5">
      <h4 className="text-lg font-bold text-gray-800 truncate">{item.name}</h4>
      <p className="text-red-600 font-semibold text-md mt-1">{item.price}</p>
    </div>
  </div>
);


const OutletPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const outlet = outlets.find(o => o.slug === slug);

  if (!outlet) {
    return <Navigate to="/" replace />;
  }

  const whatsappLink = `https://wa.me/${outlet.contact}?text=Halo%20${encodeURIComponent(outlet.name)},%20saya%20mau%20pesan%20dari%20Telkom%20Food%20Hub...`;

  return (
    <div className="bg-gray-50">
      <SimpleHeader />
      <main>
        <section id="hero-detail" className="relative h-[50vh] flex items-center justify-center text-white text-center">
            <div className="absolute inset-0 bg-red-800"></div>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 p-4">
                <h1 className="text-4xl md:text-6xl font-extrabold font-poppins capitalize">{outlet.name}</h1>
                <p className="text-lg md:text-xl mt-4 italic">"{outlet.quote}"</p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Pesan via WhatsApp
                </a>
            </div>
        </section>

        <section id="menu-detail" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center text-gray-800 mb-12">Menu Lengkap</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {outlet.menu.map((item) => (
                      <MenuCard key={item.name} item={item} />
                    ))}
                </div>
            </div>
        </section>
        
        <section id="location-info" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center text-gray-800 mb-12">Kunjungi Kami Langsung!</h2>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Alamat</h3>
                            <p className="text-gray-600 mt-1">{outlet.address}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Jam Buka</h3>
                            <p className="text-gray-600 mt-1">{outlet.hours}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Kontak</h3>
                            <p className="text-gray-600 mt-1">{outlet.contact} (WhatsApp)</p>
                        </div>
                    </div>
                    <div className="h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                        <iframe 
                            src={outlet.mapEmbed}
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-6 text-center">
          <p> &copy; 2025 Telkom Food Hub. Dibuat oleh Zidane & Rizki.</p>
        </div>
      </footer>
    </div>
  );
};

export default OutletPage;