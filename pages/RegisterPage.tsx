import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // <-- TAMBAHIN INI
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    // <-- JADIIN ASYNC
    e.preventDefault();
    setError(''); // Reset error setiap kali submit

    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsLoading(true); // <-- Mulai loading

    // --- GANTI LOGIC LOCALSTORAGE DENGAN FETCH ---
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Ambil error dari backend (misal: "Email sudah terdaftar.")
        throw new Error(data.error || 'Gagal melakukan registrasi.');
      }

      // Kalo sukses, backend kirim status 201
      console.log(data.message); // "Registrasi berhasil!"
      navigate('/login'); // Arahin ke halaman login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false); // <-- Stop loading
    }
    // --- AKHIR PERUBAHAN ---
  };

  return (
    <div className='bg-gray-100 flex justify-center items-center min-h-screen p-4'>
      <div className='w-full max-w-md bg-white shadow-lg p-8 rounded-2xl'>
        <h4 className='text-center text-2xl mb-6 text-red-600 font-bold font-poppins'>
          Daftar Akun Baru
        </h4>
        <form onSubmit={handleSubmit}>
          {error && <p className='bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm'>{error}</p>}
          <div className='mb-4'>
            <label htmlFor='nama' className='block text-sm font-semibold text-gray-700 mb-2'>
              Nama Lengkap
            </label>
            <input
              type='text'
              id='nama'
              className='form-control w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400'
              placeholder='Masukkan nama lengkap'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading} // <-- Tambah disabled
            />
          </div>
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
              placeholder='Minimal 6 karakter'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={isLoading} // <-- Tambah disabled
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-semibold text-gray-700 mb-2'
            >
              Konfirmasi Kata Sandi
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='form-control w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400'
              placeholder='Ulangi kata sandi'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading} // <-- Tambah disabled
            />
          </div>
          <button
            type='submit'
            className='btn btn-danger w-full bg-red-600 text-white rounded-full py-2.5 font-semibold hover:bg-red-700 transition-colors disabled:opacity-50'
            disabled={isLoading} // <-- Tambah disabled
          >
            {isLoading ? 'Mendaftarkan...' : 'Daftar'} {/* <-- Ubah teks pas loading */}
          </button>
        </form>
        <p className='text-center text-sm mt-6 text-gray-600'>
          Sudah punya akun?{' '}
          <Link to='/login' className='text-red-600 font-semibold hover:underline'>
            Masuk Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
