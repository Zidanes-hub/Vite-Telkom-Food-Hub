
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
       navigate(`/#${id}`);
    }
    setIsMenuOpen(false);
  }

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-red-600 font-poppins">
            Telkom Food Hub
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('how-to-order')} className="text-gray-600 hover:text-red-600 transition-colors">Cara Pesan</button>
            <Link to="/partner" className="text-gray-600 hover:text-red-600 transition-colors">Gabung Mitra</Link>
            <a href="https://wa.me/6281234567890?text=Halo%20Admin%20Telkom%20Food%20Hub..." target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors">Kritik & Saran</a>
            <button onClick={() => scrollToSection('our-mission')} className="text-gray-600 hover:text-red-600 transition-colors">Tentang Kami</button>
          </nav>
          <div className="flex items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="hidden md:inline-block bg-white text-red-600 border border-red-600 rounded-full px-4 py-2 text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-block bg-red-600 text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Login
              </Link>
            )}
            <button
              id="hamburger-btn"
              aria-label="Buka menu"
              className="md:hidden ml-4 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col items-center p-4 space-y-4">
            <button onClick={() => scrollToSection('how-to-order')} className="text-gray-600 hover:text-red-600 transition-colors">Cara Pesan</button>
            <Link to="/partner" className="text-gray-600 hover:text-red-600 transition-colors">Gabung Mitra</Link>
            <a href="https://wa.me/6281234567890?text=Halo%20Admin%20Telkom%20Food%20Hub..." target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors">Kritik & Saran</a>
            <button onClick={() => scrollToSection('our-mission')} className="text-gray-600 hover:text-red-600 transition-colors">Tentang Kami</button>
            <div className="w-full border-t pt-4 flex justify-center">
             {user ? (
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="bg-white text-red-600 border border-red-600 rounded-full px-5 py-2 text-sm font-semibold hover:bg-red-50 transition-colors w-full"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-red-600 text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-red-700 transition-colors w-full text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
