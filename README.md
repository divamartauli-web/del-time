# ⏰ DelTime: Smart Campus Alarm & Routine Reminder Mahasiswa IT Del

Aplikasi web alarm cerdas dan pengingat jadwal kegiatan jam-ke-jam (*hourly routine*) yang dirancang khusus untuk mahasiswa **Institut Teknologi Del (IT Del)** di Laguboti, Toba.

Membantu mahasiswa Del menjaga kedisiplinan hidup berasrama dan perkuliahan dengan prinsip **MarTuhan, Marroha, Marbisuk**.

---

## 📁 Struktur Arsitektur Proyek (Clean Architecture)

Proyek ini dibangun dengan pemisahan tanggung jawab (*Separation of Concerns*) yang rapi dan modular:

```
itdel-smart-alarm/
│
├── index.html                  # Halaman utama (Semantic HTML5 terstruktur)
├── Buka_Alarm.bat              # Script peluncur cepat lokal
├── README.md                   # Dokumentasi lengkap proyek
├── .gitignore                  # Berkas ignore git standar
│
├── css/
│   └── style.css               # Styling modular (Tokens, Header, Clock, Timeline, Sidebar, Modals)
│
└── js/
    ├── schedule-data.js        # Model: Data jadwal resmi IT Del (Senin-Minggu, Seragam, Nilai 3M)
    ├── audio-alarm.js          # Service: Engine Audio (Westminster Bell, Chime, Digital, TTS)
    └── app.js                  # Controller: State management, live clock, UI rendering, event handlers
```

---

## 🌟 Fitur Utama

1. **🔔 Sistem Alarm Jam-ke-Jam Otomatis (Real-time Hourly Alarm)**:
   - Jam digital sinkron dengan waktu lokal (WIB).
   - Alarm berbunyi otomatis dan bersuara (*Voice TTS Pengumuman Bahasa Indonesia*) setiap pergantian jam kegiatan.
   - Pilihan 4 nada dering berkualitas tinggi:
     - 🔔 *Bell Kampus Del* (Westminster Chime)
     - 🎵 *Chime Asrama Lembut*
     - ⚡ *Alarm Digital Modern*
     - 🕊️ *Gong Devotion / Ibadah*

2. **📅 Timeline Jadwal Terpadu IT Del**:
   - **Senin - Jumat**:
     - 04.45: Bangun Pagi & Merapikan Tempat Tidur
     - 05.00: Ibadah Pagi & Saat Teduh (*Devotion*)
     - 05.10: Kurve Pagi Asrama
     - 05.30: Mandi Pagi & Memakai Seragam Kuliah Resmi
     - 06.30: Keluar Asrama menuju Kantin
     - 07.00: Makan Pagi Bersama di Kantin
     - 08.00 - 17.00: Sesi Perkuliahan & Lab (**Tiap SKS 50 Menit**)
     - 17.00: Masuk Asrama & Istirahat Sore
     - 18.30: Keluar Asrama menuju Kantin
     - 19.00: Makan Malam di Kantin & Belajar Mandiri
     - 21.45: Masuk Asrama
     - 22.00: Ibadah Malam Asrama
     - 23.00: **Jam Silent** (*Lights Out*)
   - **Sabtu**: Kurve Akbar Asrama, Unit Kegiatan Mahasiswa, dan Olahraga.
   - **Minggu**: Ibadah Kebaktian Minggu & Persiapan Akademik Pekan Baru.

3. **⏱️ Active Activity Live HUD**:
   - Menampilkan kegiatan yang **Sedang Berlangsung** (*Now Happening*), sisa waktu countdown, dan persentase progress.
   - Menampilkan kegiatan **Berikutnya** (*Upcoming Next*).

4. **👔 Panduan Seragam Harian IT Del**:
   - Menampilkan ketentuan seragam resmi per hari (Senin: Putih-Hitam Dasi, Selasa: Kemeja Seragam Del, Rabu: Batik, Sabtu: Kaos Kurve/Olahraga, Minggu: Pakaian Ibadah).

5. **📝 Manajemen Tugas & Praktikum (Task Tracker)**:
   - Pencatatan deadline laporan praktikum, kuis, dan piket kebersihan kamar asrama tersimpan di browser (*LocalStorage*).

6. **🕊️ Kutipan Nilai 3M Harian**:
   - Pesan motivasi harian berlandaskan *MarTuhan, Marroha, Marbisuk*.

---

## 🚀 Cara Menjalankan Aplikasi

1. Buka folder `itdel-smart-alarm`.
2. **Klik 2x file `Buka_Alarm.bat`** atau buka langsung file `index.html` di Google Chrome / browser favorit Anda:
   `file:///C:/Users/acer/.gemini/antigravity-ide/scratch/itdel-smart-alarm/index.html`

---

Developed with ❤️ for Mahasiswa Institut Teknologi Del (IT Del).
