# Pertemuan 3-4 - Membangun RESTful API dengan Express.js

Mini-project pendamping untuk materi slide `Materi-Pertemuan-03-04-RESTful-API-Expressjs.pptx`.

## Tujuan

Membangun RESTful API CRUD (Create, Read, Update, Delete) lengkap untuk entitas `mahasiswa` menggunakan Express.js, meliputi routing, penanganan request (params, query, body), dan format respons JSON yang konsisten.

## Prasyarat

Pastikan Node.js sudah terpasang, disarankan melalui **NVM (Node Version Manager)** agar versi Node.js mudah dikelola dan konsisten antar project (lihat slide materi bagian "Menyiapkan Environment, Node.js & Express.js" untuk panduan instalasi).

## Endpoint

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | /mahasiswa | Menampilkan seluruh data mahasiswa |
| GET | /mahasiswa/:id | Menampilkan detail satu mahasiswa |
| POST | /mahasiswa | Menambahkan mahasiswa baru |
| PUT | /mahasiswa/:id | Memperbarui data mahasiswa |
| DELETE | /mahasiswa/:id | Menghapus data mahasiswa |

## Mengerjakan

Buka `app.js` dan lengkapi setiap `// TODO` sesuai komentar (5 handler: GET semua, GET satu, POST, PUT, DELETE).

```bash
npm install
npm start
# server berjalan di http://localhost:3000
```

Uji dengan `curl` atau Thunder Client, contoh:

```bash
curl http://localhost:3000/mahasiswa
curl -X POST http://localhost:3000/mahasiswa -H "Content-Type: application/json" -d "{\"nama\":\"Citra\",\"jurusan\":\"Sistem Informasi\"}"
```

Bandingkan hasilnya dengan solusi referensi di repositori terpisah [SI0027-PAWII-Solution](https://github.com/nurrachmat-nr/SI0027-PAWII-Solution) setelah selesai.

## Kaitan dengan Tugas Project Mandiri (Tugas 1)

Folder ini adalah latihan pendamping di kelas menggunakan entitas contoh (`mahasiswa`), **bukan** jawaban dari Tugas 1/Tugas Project Mandiri pada slide materi (implementasi RESTful API CRUD untuk entitas dari ide project akhir Anda sendiri). Tugas tersebut dikumpulkan secara terpisah melalui LMS.
