# Panduan Teknis Menjalankan dan Menguji API MettaCareHub

Dokumen ini berisi panduan langkah demi langkah untuk menjalankan server lokal dan melakukan pengujian *endpoint* RESTful API MettaCareHub menggunakan Postman. Aplikasi ini dibangun menggunakan Node.js dan Express.js dengan arsitektur Model-View-Controller (MVC).

---

## 1. Persiapan Sistem (Prerequisites)
Sebelum menjalankan aplikasi, pastikan sistem komputer telah terinstal perangkat lunak berikut:
1. **Node.js** (versi 14.x atau lebih baru).
2. **Visual Studio Code (VS Code)** sebagai teks editor.
3. **Postman** untuk melakukan pengujian antarmuka API (API Testing).

## 2. Cara Menjalankan Server Lokal (Backend)
1. Buka folder proyek **MettaCareHub** di dalam Visual Studio Code.
2. Buka Terminal terintegrasi di VS Code dengan menekan `` Ctrl + ` `` (backtick) atau melalui menu **Terminal > New Terminal**.
3. Pastikan semua *dependencies* sudah terinstal (hanya dilakukan sekali saat pertama kali membuka proyek) dengan mengetikkan perintah:
   ```bash
   npm install
   ```
4. Jalankan server lokal dengan mengetikkan perintah:
   ```bash
   npm start
   ```
   *(Catatan: Jika `npm start` belum dikonfigurasi, gunakan perintah `node app.js` atau `node index.js` sesuai nama file utama).*
5. Jika berhasil, terminal akan menampilkan pesan: 
   `Server berjalan di port 3000` (atau port lain yang dikonfigurasi).
6. **Penting:** Jika ada perubahan kode (misalnya pembaruan data pada Model atau logika pada Controller), server wajib di-restart. Tekan **Ctrl + C** di terminal untuk mematikan server, lalu jalankan kembali perintah `npm start`.

---

## 3. Cara Pengujian Menggunakan Postman

API MettaCareHub memisahkan antara endpoint publik (dapat diakses langsung) dan endpoint terproteksi (memerlukan Autentikasi API Key).

### A. Pengujian Endpoint Publik (Metode GET)
Digunakan untuk mengambil data tanpa memerlukan autentikasi khusus.
1. Buka aplikasi Postman.
2. Buat *request* baru dan pilih metode HTTP **GET**.
3. Masukkan URL: `http://localhost:3000/bookings` (untuk data reservasi) atau `http://localhost:3000/services` (untuk daftar layanan).
4. Klik tombol **Send**.
5. Server akan merespons dengan status `200 OK` dan menampilkan data dalam format JSON. Sesuai desain sistem, *Get All* akan menampilkan ringkasan data, sedangkan *Get By ID* (contoh: `/bookings/1`) akan menampilkan relasi detail secara utuh.

### B. Pengujian Endpoint Terproteksi (Metode POST, PUT, DELETE)
Digunakan untuk menambah, mengubah, atau menghapus data. Endpoint ini dilindungi oleh *Middleware* keamanan.
1. Buka Postman dan pilih metode yang sesuai (contoh: **POST** untuk menambah data).
2. Masukkan URL tujuan, contoh: `http://localhost:3000/bookings`.
3. **Konfigurasi Keamanan (Wajib):**
   * Buka tab **Headers** (berada di bawah kolom URL).
   * Pada kolom *Key*, masukkan: `x-api-key`
   * Pada kolom *Value*, masukkan kata sandi API: `rahasia123` (sesuaikan dengan kode di *middleware*).
4. **Memasukkan Data (Body):**
   * Pindah ke tab **Body**.
   * Pilih opsi **raw** dan ubah format teks dari *Text* menjadi **JSON**.
   * Masukkan data JSON sesuai struktur entitas relasional. Contoh Payload Pembuatan Booking (memanfaatkan relasi `serviceId`):
     ```json
     {
       "customerName": "Arvin",
       "phone": "089912345678", 
       "serviceId": 5,
       "vehicleNumber": "BG 1 PG",
       "bookingDate": "2026-10-03 18:00"
     }
     ```
5. Klik tombol **Send**.
6. Jika berhasil, server akan mengembalikan status `201 Created` (untuk POST) atau `200 OK` (untuk PUT/DELETE), yang menandakan bahwa sistem *Auto-Register Customer* dan relasi antar-entitas (MVC) telah tereksekusi dengan baik.

---

## 4. Penanganan Eror (Troubleshooting)
* **401 Unauthorized / API Key Tidak Valid:** Pastikan telah memilih metode HTTP yang tepat (jangan tertukar antara GET dan POST) dan pastikan penulisan header `x-api-key` sudah benar.
* **500 Internal Server Error:** Terjadi jika ada kesalahan penulisan (*typo*) pada Controller/Model, atau file belum di-*save* dan di-*restart* (Ctrl + S lalu `npm start`).
* **Data Muncul "Tidak Diketahui" atau Null:** Pastikan input JSON di Postman sudah menggunakan parameter ID relasional (seperti `serviceId`) alih-alih menggunakan *string* teks manual.