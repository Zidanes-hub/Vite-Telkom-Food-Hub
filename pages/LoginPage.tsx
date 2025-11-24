import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Add a declaration for the google object from the script
declare global {
  interface Window {
    google: any;
  }
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // <-- TAMBAHIN INI
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- Kita panggil fungsi login dari useAuth
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

  const handleSubmit = async (e: React.FormEvent) => {
    // <-- JADIIN ASYNC
    e.preventDefault();
    setError('');
    setIsLoading(true); // <-- Mulai loading

    // --- GANTI LOGIC LOCALSTORAGE DENGAN FETCH ---
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Ambil error dari backend (misal: "Email atau kata sandi salah.")
        throw new Error(data.error || 'Gagal login.');
      }

      // Kalo sukses, backend kirim data user
      // Kita pakai fungsi login dari useAuth yg UDAH BENER
      login(data.user); // data.user is { name: "...", email: "..." }
      navigate('/'); // Login sukses, lempar ke Home
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false); // <-- Stop loading
    }
    // --- AKHIR PERUBAHAN ---
  };

  // JWT Decoder (Biarkan saja, ini untuk Google Login)
  function decodeJwtResponse(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding JWT', e);
      return null;
    }
  }

  // Google Login Handler (Biarkan saja)
  const handleGoogleLogin = (response: any) => {
    const userObject = decodeJwtResponse(response.credential);
    if (userObject) {
      login({ name: userObject.name, email: userObject.email });
      navigate('/');
    } else {
      setError('Gagal memproses login Google. Silakan coba lagi.');
    }
  };

  // Google Script Loader (Biarkan saja)
  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(document.getElementById('googleSignInButton'), {
        theme: 'outline',
        size: 'large',
        width: '100%',
      });
    }
  }, [CLIENT_ID]); // <-- Fix: tambahin CLIENT_ID di dependency array

  return (
    <div className='bg-gray-100 flex justify-center items-center min-h-screen p-4'>
      <div className='w-full max-w-md bg-white shadow-lg p-8 rounded-2xl'>
        <h4 className='text-center text-2xl mb-6 text-red-600 font-bold font-poppins'>
          Masuk ke Telkom Food Hub
        </h4>
        <form onSubmit={handleSubmit}>
          {error && <p className='bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm'>{error}</p>}
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-semibold text-gray-700 mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='form-control w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400'
              placeholder='nama@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading} // <-- Tambah disabled
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-semibold text-gray-700 mb-2'>
              Kata Sandi
            </label>
            <input
              type='password'
              id='password'
              className='form-control w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading} // <-- Tambah disabled
            />
          </div>
          <div className='text-right mb-6'>
            <Link to='/register' className='text-sm text-red-600 hover:underline font-semibold'>
              Lupa kata sandi?
            </Link>
          </div>
          <button
            type='submit'
            className='btn btn-danger w-full bg-red-600 text-white rounded-full py-2.5 font-semibold hover:bg-red-700 transition-colors disabled:opacity-50'
            disabled={isLoading} // <-- Tambah disabled
          >
            {isLoading ? 'Loading...' : 'Masuk'} {/* <-- Ubah teks pas loading */}
          </button>
        </form>

        <div className='flex items-center my-6'>
          <div className='flex-grow border-t border-gray-300'></div>
          <span className='flex-shrink mx-4 text-gray-500 text-sm'>ATAU</span>
          <div className='flex-grow border-t border-gray-300'></div>
        </div>

        <div id='googleSignInButton' className='flex justify-center'></div>

        <p className='text-center text-sm mt-6 text-gray-600'>
          Belum punya akun?{' '}
          <Link to='/register' className='text-red-600 font-semibold hover:underline'>
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
