import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getFoodRecommendation } from './geminiService.js';
import { outlets } from './data.js';

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
 * Ini aman karena API Key hanya ada di server ini.
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

// 4. Jalankan Server
app.listen(PORT, () => {
    console.log(`Server BFF Telkom Food Hub berjalan di http://localhost:${PORT}`);
});