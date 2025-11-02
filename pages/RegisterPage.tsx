
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('telkom-food-hub-users') || '[]');
    const userExists = storedUsers.some((user: any) => user.email === email);

    if (userExists) {
      setError('Email sudah terdaftar.');
      return;
    }

    const newUser = { name, email, password };
    storedUsers.push(newUser);
    localStorage.setItem('telkom-food-hub-users', JSON.stringify(storedUsers));
    
    setError('');
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-2xl">
        <h4 className="text-center text-2xl mb-6 text-red-600 font-bold font-poppins">
          Daftar Akun Baru
        </h4>
        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</p>}
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
            <input
              type="text"
              id="nama"
              className="form-control w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="form-control w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi</label>
            <input
              type="password"
              id="password"
              className="form-control w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Kata Sandi</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Ulangi kata sandi"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-full bg-red-600 text-white rounded-full py-2.5 font-semibold hover:bg-red-700 transition-colors">
            Daftar
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-red-600 font-semibold hover:underline">
            Masuk Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
