# Pertemuan 5 - Middleware & Konfigurasi Backend

Mini-project pendamping untuk materi slide `Materi-Pertemuan-05-Middleware-Konfigurasi-Backend.pptx`.

## Tujuan

Melengkapi RESTful API `mahasiswa` dari Pertemuan 3-4 dengan:

- **Logger middleware** kustom untuk mencatat aktivitas request.
- **CORS** agar dapat diakses oleh frontend pada origin berbeda.
- **dotenv** untuk memisahkan konfigurasi (mis. PORT) dari kode sumber.
- **Error handling terpusat** agar penanganan error konsisten di seluruh aplikasi.

## Mengerjakan

Buka `app.js` dan lengkapi setiap `// TODO` sesuai komentar (dotenv, PORT dari env, logger middleware, cors, meneruskan error dengan `next(err)`, dan error-handling middleware). Salin `.env.example` menjadi `.env` sebelum menjalankan.

```bash
cp .env.example .env
npm install
npm start
# server berjalan di http://localhost:3000
```

Perhatikan output terminal - setiap request yang masuk akan dicatat oleh logger middleware. Uji CORS dan error handling, contoh:

```bash
curl http://localhost:3000/mahasiswa
curl http://localhost:3000/mahasiswa/999   # memicu error handling terpusat (404 -> 500 JSON konsisten)
```

Bandingkan hasilnya dengan solusi referensi di repositori terpisah [SI0027-PAWII-Solution](https://github.com/nurrachmat-nr/SI0027-PAWII-Solution) setelah selesai.

## Kaitan dengan Tugas Project Mandiri

Folder ini adalah latihan pendamping di kelas menggunakan entitas contoh (`mahasiswa`), **bukan** jawaban dari Tugas Project Mandiri pada slide materi (menambahkan middleware & konfigurasi pada API project akhir Anda sendiri, hasil Pertemuan 3-4). Tugas tersebut dikumpulkan secara terpisah melalui LMS.
