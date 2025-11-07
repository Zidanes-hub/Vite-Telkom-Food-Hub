import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getFoodRecommendation } from './geminiService.js';
import { outlets, users } from './data.js';

// 1. Setup Dasar
dotenv.config(); // Memuat semua isi file .env ke process.env
const app = express();
const PORT = process.env.PORT || 3001; // Kita pakai port 3001 (Vite/React di 3000)

// 2. Middlewares
app.use(cors()); // Mengizinkan frontend (di port 3000) mengakses backend ini
app.use(express.json()); // Untuk membaca body JSON (penting untuk login nanti)

// 3. --- ENDPOINT API KITA ---

/**
 * Endpoint untuk mendapatkan rekomendasi makanan (AI)
 * Ini aman karena API Key only ada di server ini.
 */
app.get('/api/recommend', async(req, res) => {
    console.log('Menerima permintaan ke /api/recommend');
    try {
        const recommendation = await getFoodRecommendation();
        res.json({ recommendation: recommendation }); // Kirim sebagai JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mendapatkan rekomendasi.' });
    }
});

/**
 * Endpoint untuk mendapatkan SEMUA data outlet
 * Menggantikan impor outlets.ts di frontend
 */
app.get('/api/outlets', (req, res) => {
    console.log('Menerima permintaan ke /api/outlets');
    res.json(outlets);
});

/**
 * Endpoint untuk mendapatkan SATU data outlet berdasarkan slug
 * Menggantikan logika find() di OutletPage.tsx
 */
app.get('/api/outlets/:slug', (req, res) => {
    const { slug } = req.params;
    console.log(`Menerima permintaan ke /api/outlets/${slug}`);

    const outlet = outlets.find(o => o.slug === slug);

    if (outlet) {
        res.json(outlet);
    } else {
        res.status(404).json({ error: 'Outlet tidak ditemukan.' });
    }
});

/**
 * Endpoint untuk Registrasi User Baru
 */
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Menerima permintaan registrasi untuk: ${email}`);

    // Cek dulu emailnya udah ada belum
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        // Jangan kirim 404, tapi 409 (Conflict) atau 400 (Bad Request)
        return res.status(400).json({ error: 'Email sudah terdaftar.' });
    }

    // Buat user baru (skip hash password dulu, 1 jam soalnya)
    const newUser = { id: users.length + 1, name, email, password };
    users.push(newUser);

    console.log('User baru ditambahkan:', newUser);
    console.log('Total users:', users);

    // Kirim respon sukses
    res.status(201).json({ message: 'Registrasi berhasil!', user: newUser });
});

/**
 * Endpoint untuk Login User
 */
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Menerima permintaan login untuk: ${email}`);

    // Cari user berdasarkan email
    const user = users.find(u => u.email === email);

    // Cek user & password (super simpel, no hash)
    if (user && user.password === password) {
        // Login sukses
        console.log('Login berhasil untuk:', user.name);
        res.json({
            success: true,
            message: 'Login berhasil!',
            user: { name: user.name, email: user.email } // Kirim data yg perlu aja
        });
    } else {
        // Login gagal
        console.log('Login gagal untuk:', email);
        res.status(401).json({ success: false, error: 'Email atau kata sandi salah.' });
    }
});

// 4. Jalankan Server
app.listen(PORT, () => {
    console.log(`Server BFF Telkom Food Hub berjalan di http://localhost:${PORT}`);
});