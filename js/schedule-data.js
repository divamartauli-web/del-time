/**
 * Database Jadwal Rutinitas Harian & Kehidupan Asrama Mahasiswa IT Del
 * Institut Teknologi Del (Laguboti, Toba) - Motto: MarTuhan, Marroha, Marbisuk
 * Jadwal Resmi yang Disesuaikan Sesuai Permintaan
 */

const IT_DEL_DATA = {
  campusInfo: {
    name: "Institut Teknologi Del",
    shortName: "IT Del",
    location: "Sitoluama, Laguboti, Toba, Sumatera Utara",
    motto: "MarTuhan, Marroha, Marbisuk",
    values: [
      { key: "MarTuhan", meaning: "Beriman dan mengandalkan Tuhan dalam setiap proses belajar dan kehidupan berasrama." },
      { key: "Marroha", meaning: "Memiliki hati nurani yang bersih, rendah hati, berintegritas, dan peduli sesama." },
      { key: "Marbisuk", meaning: "Bijaksana, unggul dalam penguasaan ilmu pengetahuan & teknologi, dan berdaya saing." }
    ]
  },

  // 1. JADWAL RUTINITAS SENIN - JUMAT (JADWAL UTAMA MAHASISWA IT DEL)
  weekdaySchedule: [
    {
      id: "w-1",
      start: "04:45",
      end: "05:00",
      title: "Bangun Pagi & Merapikan Tempat Tidur",
      category: "dorm",
      location: "Kamar Asrama",
      icon: "fa-sun",
      desc: "Bangun tepat waktu pukul 04.45, merapikan tempat tidur sesuai standar inspeksi asrama Del.",
      voiceMsg: "Selamat pagi mahasiswa IT Del! Jam 4 lewat 45. Waktunya bangun pagi dan rapikan tempat tidur dengan rapi.",
      uniform: "Pakaian Santai Asrama"
    },
    {
      id: "w-2",
      start: "05:00",
      end: "05:10",
      title: "Ibadah Pagi & Saat Teduh (Devotion)",
      category: "devotion",
      location: "Kamar Asrama / Ruang Bersama",
      icon: "fa-hands-praying",
      desc: "Mulai ibadah pagi jam 05.00. Saat teduh dan mengucap syukur kepada Tuhan mengawali hari.",
      voiceMsg: "Pukul 5 tepat. Mulai ibadah pagi dan saat teduh. Awali hari dengan doa dan ucapan syukur kepada Tuhan.",
      uniform: "Pakaian Sopan Asrama"
    },
    {
      id: "w-3",
      start: "05:10",
      end: "05:30",
      title: "Kurve Pagi Asrama",
      category: "dorm",
      location: "Area Kamar & Lorong Asrama",
      icon: "fa-broom",
      desc: "Mulai kurve jam 05.10. Membersihkan lantai, membuang sampah, dan memastikan kebersihan kamar asrama.",
      voiceMsg: "Pukul 5 lewat 10. Mulai kurve pagi asrama. Bersihkan kamar dan jaga kebersihan lingkungan asrama bersama.",
      uniform: "Pakaian Kurve / Santai"
    },
    {
      id: "w-4",
      start: "05:30",
      end: "06:30",
      title: "Mandi Pagi & Persiapan Seragam Kuliah",
      category: "health",
      location: "Kamar Mandi Asrama",
      icon: "fa-shower",
      desc: "Mulai mandi jam 05.30 dan bersiap mengenakan seragam resmi IT Del sesuai ketentuan hari ini.",
      voiceMsg: "Pukul 5 lewat 30. Waktunya mandi pagi dan bersiap mengenakan seragam resmi kuliah IT Del hari ini.",
      uniform: "Seragam Resmi Kuliah Lengkap"
    },
    {
      id: "w-5",
      start: "06:30",
      end: "07:00",
      title: "Keluar Asrama & Menuju Kantin / Kampus",
      category: "academic",
      location: "Area Kampus / Kantin",
      icon: "fa-person-walking-arrow-right",
      desc: "Keluar asrama jam 06.30, bergerak tertib menuju kantin dan lingkungan kampus.",
      voiceMsg: "Pukul 6 lewat 30. Waktunya keluar asrama dan bergerak tertib menuju kantin asrama.",
      uniform: "Seragam Resmi & Sepatu Pantofel"
    },
    {
      id: "w-6",
      start: "07:00",
      end: "08:00",
      title: "Makan Pagi di Kantin & Menuju Kelas",
      category: "meal",
      location: "Kantin Asrama IT Del",
      icon: "fa-utensils",
      desc: "Makan pagi jam 07.00 bersama seluruh rekan mahasiswa dan bersiap masuk ke ruang kelas perkuliahan.",
      voiceMsg: "Pukul 7 pagi tepat. Waktunya makan pagi bersama di kantin. Selamat menikmati sarapan dan bersiap masuk kelas.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-7",
      start: "08:00",
      end: "08:50",
      title: "Kuliah Sesi 1 (SKS 1 - 50 Menit)",
      category: "academic",
      location: "Ruang Kelas (Gedung 5/7/9)",
      icon: "fa-chalkboard-user",
      desc: "Kelas dimulai pukul 08.00. SKS 1 berdurasi 50 menit. Fokus pada materi perkuliahan.",
      voiceMsg: "Pukul 8 tepat. Kelas sesi 1 dimulai, SKS pertama berdurasi 50 menit. Fokus belajar dan aktif.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-8",
      start: "08:50",
      end: "09:40",
      title: "Kuliah Sesi 2 (SKS 2 - 50 Menit)",
      category: "academic",
      location: "Ruang Kelas / Lab Komputer",
      icon: "fa-laptop-code",
      desc: "Perkuliahan SKS 2 (50 menit). Pembahasan materi dan diskusi teoritikal.",
      voiceMsg: "Pukul 8 lewat 50. Memasuki perkuliahan SKS kedua.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-9",
      start: "09:40",
      end: "10:30",
      title: "Kuliah Sesi 3 (SKS 3 - 50 Menit)",
      category: "academic",
      location: "Ruang Kelas / Lab Komputer",
      icon: "fa-code",
      desc: "Perkuliahan SKS 3 (50 menit). Latihan soal dan pemahaman konsep komputasi.",
      voiceMsg: "Pukul 9 lewat 40. Memasuki perkuliahan SKS ketiga.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-10",
      start: "10:30",
      end: "11:20",
      title: "Kuliah Sesi 4 (SKS 4 - 50 Menit)",
      category: "academic",
      location: "Ruang Kelas / Lab Komputer",
      icon: "fa-book-open-reader",
      desc: "Perkuliahan SKS 4 (50 menit). Sesi lanjutan materi inti perkuliahan.",
      voiceMsg: "Pukul 10 lewat 30. Memasuki perkuliahan SKS keempat.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-11",
      start: "11:20",
      end: "12:10",
      title: "Kuliah Sesi 5 (SKS 5 - 50 Menit)",
      category: "academic",
      location: "Ruang Kelas / Lab",
      icon: "fa-display",
      desc: "Perkuliahan SKS 5 (50 menit). Penutupan sesi perkuliahan sebelum makan siang.",
      voiceMsg: "Pukul 11 lewat 20. Memasuki perkuliahan SKS kelima sebelum istirahat siang.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-12",
      start: "12:10",
      end: "13:00",
      title: "Istirahat & Makan Siang Bersama (Lunch Break)",
      category: "meal",
      location: "Kantin Kampus IT Del",
      icon: "fa-bowl-food",
      desc: "Makan siang bersama di kantin kampus dan istirahat sejenak memulihkan energi.",
      voiceMsg: "Pukul 12 lewat 10 siang. Waktunya istirahat dan makan siang bersama di kantin kampus.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-13",
      start: "13:00",
      end: "13:50",
      title: "Kuliah Sesi 6 / Praktikum Lab (SKS 6 - 50 Menit)",
      category: "academic",
      location: "Laboratorium Komputer / Kelas",
      icon: "fa-laptop-code",
      desc: "Kuliah sesi siang dan praktikum laboratorium komputer SKS 6 (50 menit).",
      voiceMsg: "Pukul 13 tepat siang. Kuliah sesi siang dan praktikum laboratorium SKS 6 dimulai.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-14",
      start: "13:50",
      end: "14:40",
      title: "Kuliah Sesi 7 / Praktikum Lab (SKS 7 - 50 Menit)",
      category: "academic",
      location: "Laboratorium Komputer / Kelas",
      icon: "fa-code",
      desc: "Praktikum pemrograman dan eksperimen sistem SKS 7 (50 menit).",
      voiceMsg: "Pukul 13 lewat 50. Memasuki perkuliahan SKS ketujuh.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-15",
      start: "14:40",
      end: "15:30",
      title: "Kuliah Sesi 8 / Praktikum Lab (SKS 8 - 50 Menit)",
      category: "academic",
      location: "Laboratorium Komputer / Kelas",
      icon: "fa-microchip",
      desc: "Praktikum dan asistensi laboratorium SKS 8 (50 menit).",
      voiceMsg: "Pukul 14 lewat 40. Memasuki perkuliahan SKS kedelapan.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-16",
      start: "15:30",
      end: "16:20",
      title: "Kuliah Sesi 9 / Asistensi (SKS 9 - 50 Menit)",
      category: "academic",
      location: "Kelas / Perpustakaan",
      icon: "fa-users-gear",
      desc: "Diskusi proyek kelompok dan asistensi dosen/asisten lab SKS 9 (50 menit).",
      voiceMsg: "Pukul 15 lewat 30. Memasuki perkuliahan SKS kesembilan.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-17",
      start: "16:20",
      end: "17:00",
      title: "Kuliah Sesi 10 / Selesai Kelas Jam 05.00 Sore",
      category: "academic",
      location: "Ruang Kelas / Gedung Kuliah",
      icon: "fa-circle-check",
      desc: "Sesi kuliah penutup (selesai tepat jam 05.00 sore / 17.00 WIB) dan persiapan kembali ke asrama.",
      voiceMsg: "Pukul 16 lewat 20. Sesi kuliah penutup hingga jam 5 sore. Siap-siap menyelesaikan kelas dan kembali ke asrama.",
      uniform: "Seragam Resmi Kuliah"
    },
    {
      id: "w-18",
      start: "17:00",
      end: "18:30",
      title: "Masuk Asrama, Olahraga / Kurve Sore & Mandi",
      category: "health",
      location: "Asrama & Lapangan IT Del",
      icon: "fa-dumbbell",
      desc: "Masuk asrama jam 05.00 sore. Waktu olahraga sore di lapangan, kurve kebersihan, dan mandi sore.",
      voiceMsg: "Pukul 5 sore tepat. Waktunya masuk asrama! Silakan berolahraga sore, kurve, dan mandi sore yang menyegarkan.",
      uniform: "Kaos Olahraga / Santai Asrama"
    },
    {
      id: "w-19",
      start: "18:30",
      end: "19:00",
      title: "Keluar Asrama Menuju Kantin / Persiapan Makan",
      category: "dorm",
      location: "Area Menuju Kantin Asrama",
      icon: "fa-person-walking",
      desc: "Keluar asrama jam 06.30 malam, bergerak menuju kantin asrama untuk makan malam.",
      voiceMsg: "Pukul 6 lewat 30 malam. Waktunya keluar asrama menuju kantin untuk makan malam.",
      uniform: "Pakaian Rapi Asrama"
    },
    {
      id: "w-20",
      start: "19:00",
      end: "19:45",
      title: "Makan Malam Bersama di Kantin Asrama",
      category: "meal",
      location: "Kantin Asrama IT Del",
      icon: "fa-utensils",
      desc: "Makan malam jam 07.00 malam bersama di kantin asrama secara tertib.",
      voiceMsg: "Pukul 7 malam tepat. Waktunya makan malam bersama di kantin asrama. Selamat menikmati hidangan.",
      uniform: "Pakaian Rapi Asrama"
    },
    {
      id: "w-21",
      start: "19:45",
      end: "21:45",
      title: "Waktu Belajar Mandiri Terjadwal (Study Time)",
      category: "study",
      location: "Gedung Kuliah / Ruang Belajar Asrama",
      icon: "fa-laptop-code",
      desc: "Wajib belajar malam (Study Time). Fokus mengerjakan tugas coding praktikum dan review materi perkuliahan.",
      voiceMsg: "Pukul 19 lewat 45. Waktunya Belajar Malam Terjadwal. Fokus tuntaskan tugas coding dan praktikum. MarTuhan, Marroha, Marbisuk!",
      uniform: "Pakaian Rapi Sopan Berkerah"
    },
    {
      id: "w-22",
      start: "21:45",
      end: "22:00",
      title: "Masuk Asrama & Persiapan Ibadah Malam",
      category: "dorm",
      location: "Asrama IT Del",
      icon: "fa-door-open",
      desc: "Jam 09.45 malam (21.45) seluruh mahasiswa masuk asrama dan berkumpul untuk ibadah malam.",
      voiceMsg: "Pukul 9 lewat 45 malam. Waktunya seluruh mahasiswa masuk asrama dan berkumpul untuk persiapan ibadah malam.",
      uniform: "Pakaian Sopan Asrama"
    },
    {
      id: "w-23",
      start: "22:00",
      end: "23:00",
      title: "Ibadah Malam Asrama (Evening Devotion) & Doa",
      category: "devotion",
      location: "Ruang Bersama / Lobi Asrama",
      icon: "fa-hands-praying",
      desc: "Mulai ibadah malam jam 10.00 malam (22.00). Ibadah bersama, perenungan firman, evaluasi, dan doa malam.",
      voiceMsg: "Pukul 10 malam tepat. Waktunya Ibadah Malam Asrama. Mari berkumpul berdoa dan mengucap syukur bersama.",
      uniform: "Pakaian Sopan Asrama"
    },
    {
      id: "w-24",
      start: "23:00",
      end: "04:45",
      title: "Jam Silent & Waktu Istirahat Tidur",
      category: "rest",
      location: "Kamar Asrama",
      icon: "fa-moon",
      desc: "Jam 11.00 malam (23.00) jam silent dimulai. Padamkan lampu utama, suasana hening, dan tidur nyenyak.",
      voiceMsg: "Pukul 11 malam. Jam Silent telah tiba. Seluruh asrama wajib hening, padamkan lampu, dan selamat beristirahat mahasiswa Del.",
      uniform: "Pakaian Tidur"
    }
  ],

  // 2. JADWAL HARI SABTU (KURVE AKBAR & UNIT KEGIATAN)
  saturdaySchedule: [
    {
      id: "s-1",
      start: "05:00",
      end: "05:30",
      title: "Bangun Pagi & Saat Teduh",
      category: "dorm",
      location: "Asrama",
      icon: "fa-sun",
      desc: "Bangun pagi akhir pekan dan saat teduh pribadi.",
      voiceMsg: "Selamat pagi hari Sabtu! Bangun pagi dan nikmati udara sejuk Danau Toba.",
      uniform: "Kaos Olahraga Del"
    },
    {
      id: "s-2",
      start: "05:30",
      end: "06:30",
      title: "Olahraga Santai & Mandi",
      category: "health",
      location: "Lapangan IT Del",
      icon: "fa-person-running",
      desc: "Olahraga pagi keliling kampus.",
      voiceMsg: "Pukul 5 lewat 30. Waktunya olahraga santai di lapangan kampus.",
      uniform: "Kaos Olahraga"
    },
    {
      id: "s-3",
      start: "06:30",
      end: "07:30",
      title: "Sarapan Pagi Bersama",
      category: "meal",
      location: "Kantin Asrama",
      icon: "fa-utensils",
      desc: "Sarapan pagi sebelum kegiatan kurve akbar.",
      voiceMsg: "Pukul 6 lewat 30. Waktunya sarapan pagi di kantin asrama.",
      uniform: "Pakaian Santai Rapi"
    },
    {
      id: "s-4",
      start: "07:30",
      end: "11:30",
      title: "Kurve Akbar Asrama & Lingkungan Kampus",
      category: "dorm",
      location: "Seluruh Area Asrama & Kampus Del",
      icon: "fa-broom",
      desc: "Kerja bakti pembersihan massal area asrama, taman, dan fasilitas kampus.",
      voiceMsg: "Pukul 7 lewat 30. Saatnya Kurve Akbar! Mari bersama-sama membersihkan kampus dan asrama Del tercinta.",
      uniform: "Kaos Kurve / Kaos Angkatan"
    },
    {
      id: "s-5",
      start: "11:30",
      end: "13:00",
      title: "Mandi, Istirahat & Makan Siang",
      category: "meal",
      location: "Asrama & Kantin",
      icon: "fa-bowl-food",
      desc: "Mandi setelah kurve dan makan siang bersama di kantin.",
      voiceMsg: "Pukul 11 lewat 30. Kurve selesai. Waktunya mandi dan makan siang di kantin.",
      uniform: "Pakaian Santai"
    },
    {
      id: "s-6",
      start: "13:00",
      end: "17:00",
      title: "Kegiatan Unit Kemahasiswaan / Workshop / Belajar",
      category: "academic",
      location: "Ruang Seminar / Kelas / Asrama",
      icon: "fa-lightbulb",
      desc: "Kegiatan organisasi mahasiswa, workshop, atau eksplorasi coding mandiri.",
      voiceMsg: "Pukul 13 siang. Waktu kegiatan organisasi mahasiswa atau eksplorasi coding mandiri.",
      uniform: "Pakaian Bebas Rapi"
    },
    {
      id: "s-7",
      start: "17:00",
      end: "18:30",
      title: "Masuk Asrama, Olahraga Bebas & Mandi",
      category: "health",
      location: "Lapangan Kampus Del",
      icon: "fa-futbol",
      desc: "Masuk asrama, olahraga sore, dan mandi sore.",
      voiceMsg: "Pukul 5 sore. Waktunya masuk asrama, olahraga sore dan relaksasi akhir pekan.",
      uniform: "Kaos Olahraga"
    },
    {
      id: "s-8",
      start: "18:30",
      end: "19:00",
      title: "Keluar Asrama Menuju Kantin",
      category: "dorm",
      location: "Kantin Asrama",
      icon: "fa-person-walking",
      desc: "Bergerak menuju kantin asrama.",
      voiceMsg: "Pukul 6 lewat 30 malam. Waktunya keluar asrama menuju kantin.",
      uniform: "Pakaian Rapi Asrama"
    },
    {
      id: "s-9",
      start: "19:00",
      end: "19:45",
      title: "Makan Malam Bersama",
      category: "meal",
      location: "Kantin Asrama",
      icon: "fa-utensils",
      desc: "Makan malam bersama di kantin.",
      voiceMsg: "Pukul 7 malam. Waktunya makan malam di kantin asrama.",
      uniform: "Pakaian Rapi Asrama"
    },
    {
      id: "s-10",
      start: "19:45",
      end: "21:45",
      title: "Belajar Mandiri & Diskusi Santai",
      category: "study",
      location: "Ruang Belajar Asrama",
      icon: "fa-book",
      desc: "Menyicil tugas proyek besar atau membaca buku.",
      voiceMsg: "Pukul 19 lewat 45. Waktunya mengulang materi dan menyelesaikan tugas proyek.",
      uniform: "Pakaian Rapi"
    },
    {
      id: "s-11",
      start: "21:45",
      end: "22:00",
      title: "Masuk Asrama & Persiapan Ibadah",
      category: "dorm",
      location: "Asrama",
      icon: "fa-door-open",
      desc: "Masuk asrama persiapan ibadah malam.",
      voiceMsg: "Pukul 9 lewat 45 malam. Masuk asrama persiapan ibadah malam.",
      uniform: "Pakaian Sopan"
    },
    {
      id: "s-12",
      start: "22:00",
      end: "23:00",
      title: "Ibadah Malam Asrama",
      category: "devotion",
      location: "Ruang Bersama Asrama",
      icon: "fa-hands-praying",
      desc: "Ibadah malam akhir pekan.",
      voiceMsg: "Pukul 10 malam. Waktunya Ibadah Malam Asrama.",
      uniform: "Pakaian Sopan"
    },
    {
      id: "s-13",
      start: "23:00",
      end: "05:00",
      title: "Jam Silent & Istirahat",
      category: "rest",
      location: "Kamar Asrama",
      icon: "fa-moon",
      desc: "Jam Silent malam hari Sabtu.",
      voiceMsg: "Pukul 11 malam. Jam Silent hari Sabtu. Selamat beristirahat seluruh mahasiswa IT Del.",
      uniform: "Pakaian Tidur"
    }
  ],

  // 3. JADWAL HARI MINGGU (KEBAKTIAN & PERSIAPAN PEKAN BARU)
  sundaySchedule: [
    {
      id: "su-1",
      start: "06:00",
      end: "07:00",
      title: "Bangun Pagi & Persiapan Ibadah",
      category: "devotion",
      location: "Kamar Asrama",
      icon: "fa-sun",
      desc: "Bangun pagi, saat teduh pribadi, mandi, dan mengenakan pakaian kebaktian resmi.",
      voiceMsg: "Selamat hari Minggu! Waktunya bangun pagi dan bersiap untuk Ibadah Kebaktian Minggu.",
      uniform: "Pakaian Ibadah Rapi & Sopan"
    },
    {
      id: "su-2",
      start: "07:00",
      end: "08:00",
      title: "Sarapan Pagi Bersama",
      category: "meal",
      location: "Kantin Asrama",
      icon: "fa-utensils",
      desc: "Sarapan pagi sebelum menuju tempat ibadah.",
      voiceMsg: "Pukul 7 pagi. Sarapan pagi di kantin asrama sebelum berangkat kebaktian.",
      uniform: "Pakaian Ibadah Resmi"
    },
    {
      id: "su-3",
      start: "08:30",
      end: "11:30",
      title: "Ibadah Kebaktian Minggu (Sunday Service)",
      category: "devotion",
      location: "Auditorium Kampus / Gereja Sekitar",
      icon: "fa-church",
      desc: "Mengikuti kebaktian Minggu bersama seluruh civitas akademika IT Del.",
      voiceMsg: "Pukul 8 lewat 30. Waktunya Ibadah Kebaktian Minggu. Selamat beribadah dan memuji Tuhan bersama.",
      uniform: "Kemeja Formal / Gaun Sopan Rapi"
    },
    {
      id: "su-4",
      start: "12:00",
      end: "13:30",
      title: "Makan Siang & Waktu Santai",
      category: "meal",
      location: "Kantin Asrama",
      icon: "fa-bowl-food",
      desc: "Makan siang dan bercengkerama santai bersama keluarga/teman.",
      voiceMsg: "Pukul 12 siang. Waktunya makan siang di kantin asrama.",
      uniform: "Pakaian Bebas Rapi"
    },
    {
      id: "su-5",
      start: "13:30",
      end: "17:00",
      title: "Waktu Istirahat / Kunjungan Keluarga / Cuci Pakaian",
      category: "dorm",
      location: "Asrama / Area Kampus",
      icon: "fa-shirt",
      desc: "Waktu bebas mencuci pakaian, istirahat siang, atau menerima kunjungan keluarga.",
      voiceMsg: "Pukul 13 lewat 30 siang. Waktu bebas untuk mencuci pakaian atau istirahat santai.",
      uniform: "Pakaian Santai"
    },
    {
      id: "su-6",
      start: "17:00",
      end: "18:30",
      title: "Masuk Asrama, Mandi & Persiapan Seragam Senin",
      category: "health",
      location: "Kamar Asrama",
      icon: "fa-bath",
      desc: "Masuk asrama, mandi sore dan mempersiapkan seragam resmi putih-hitam untuk hari Senin.",
      voiceMsg: "Pukul 5 sore. Masuk asrama, mandi sore dan siapkan seragam putih-hitam untuk besok pagi.",
      uniform: "Persiapan Seragam Senin (Putih-Hitam)"
    },
    {
      id: "su-7",
      start: "18:30",
      end: "19:00",
      title: "Keluar Asrama Menuju Kantin",
      category: "dorm",
      location: "Kantin Asrama",
      icon: "fa-person-walking",
      desc: "Bergerak menuju kantin asrama.",
      voiceMsg: "Pukul 6 lewat 30 malam. Waktunya keluar asrama menuju kantin.",
      uniform: "Pakaian Rapi Asrama"
    },
    {
      id: "su-8",
      start: "19:00",
      end: "19:45",
      title: "Makan Malam Bersama",
      category: "meal",
      location: "Kantin Asrama",
      icon: "fa-utensils",
      desc: "Makan malam bersama di kantin asrama.",
      voiceMsg: "Pukul 7 malam. Waktunya makan malam di kantin asrama.",
      uniform: "Pakaian Rapi Asrama"
    },
    {
      id: "su-9",
      start: "19:45",
      end: "21:45",
      title: "Belajar Mandiri & Persiapan Perkuliahan Senin",
      category: "study",
      location: "Ruang Belajar Asrama",
      icon: "fa-book-bookmark",
      desc: "Mempersiapkan materi kuliah hari Senin, memeriksa jadwal kelas, dan checklist praktikum.",
      voiceMsg: "Pukul 19 lewat 45. Waktunya belajar mandiri dan memeriksa persiapan perkuliahan pekan baru.",
      uniform: "Pakaian Rapi"
    },
    {
      id: "su-10",
      start: "21:45",
      end: "22:00",
      title: "Masuk Asrama & Persiapan Ibadah",
      category: "dorm",
      location: "Asrama",
      icon: "fa-door-open",
      desc: "Masuk asrama persiapan ibadah malam.",
      voiceMsg: "Pukul 9 lewat 45 malam. Masuk asrama persiapan ibadah malam.",
      uniform: "Pakaian Sopan"
    },
    {
      id: "su-11",
      start: "22:00",
      end: "23:00",
      title: "Ibadah Malam Asrama & Doa Pekan Baru",
      category: "devotion",
      location: "Ruang Bersama Asrama",
      icon: "fa-hands-praying",
      desc: "Ibadah malam menyambut pekan perkuliahan baru.",
      voiceMsg: "Pukul 10 malam. Waktunya Ibadah Malam Asrama. Mari mendoakan kelancaran studi pekan yang baru.",
      uniform: "Pakaian Sopan"
    },
    {
      id: "su-12",
      start: "23:00",
      end: "04:45",
      title: "Jam Silent & Istirahat",
      category: "rest",
      location: "Kamar Asrama",
      icon: "fa-moon",
      desc: "Tidur lebih awal untuk menyambut hari Senin dengan semangat prima.",
      voiceMsg: "Pukul 11 malam. Jam Silent hari Minggu. Selamat tidur nyenyak untuk menyambut hari Senin yang produktif.",
      uniform: "Pakaian Tidur"
    }
  ],

  // 4. JADWAL SERAGAM HARIAN IT DEL
  uniformGuide: [
    { day: "Senin", uniform: "Kemeja Putih Lengan Panjang, Celana/Rok Hitam Bahan, Dasi Del, Sepatu Pantofel Hitam, Kaus Kaki Hitam.", notes: "Seragam resmi apel pagi & perkuliahan pembuka pekan." },
    { day: "Selasa", uniform: "Kemeja Seragam Harian Del (Biru Muda / Kemeja Prodi), Celana/Rok Bahan Hitam/Gelap, Sepatu Pantofel.", notes: "Seragam praktikum lab & kelas teori." },
    { day: "Rabu", uniform: "Kemeja Batik Resmi / Batik Nusantara, Celana/Rok Bahan Hitam/Gelap, Sepatu Pantofel.", notes: "Hari Cinta Budaya & Batik Indonesia." },
    { day: "Kamis", uniform: "Kemeja Seragam Del / Kemeja Berkerah Rapi & Sopan, Celana/Rok Bahan, Sepatu Pantofel.", notes: "Perkuliahan reguler dan asistensi lab." },
    { day: "Jumat", uniform: "Kemeja Batik IT Del / Kemeja Almamater Resmi, Celana/Rok Bahan, Sepatu Pantofel.", notes: "Penutup pekan perkuliahan." },
    { day: "Sabtu", uniform: "Kaos Olahraga IT Del / Kaos Angkatan untuk Kurve Akbar, Sepatu Olahraga.", notes: "Kegiatan kurve kebersihan & unit organisasi." },
    { day: "Minggu", uniform: "Pakaian Ibadah Rapi, Bersih, dan Sopan (Kemeja Formal / Gaun Sopan).", notes: "Ibadah Kebaktian Minggu." }
  ],

  // 5. KUTIPAN NILAI 3M (MARTHUHAN, MARROHA, MARBISUK)
  quotes3M: [
    { motto: "MarTuhan", text: "Awali setiap baris kode dan lembar laporan praktikum dengan doa dan rasa syukur kepada Tuhan Yang Maha Esa." },
    { motto: "Marroha", text: "Integritas adalah nomor satu. Saling tolong menolong dalam kebaikan, jaga kebersihan asrama, dan hargai teman sekamar." },
    { motto: "Marbisuk", text: "Jadilah mahasiswa teknologi yang bijaksana, tekun mengasah logika berpikir, dan siap memberi dampak bagi bangsa." },
    { motto: "Kedisiplinan Del", text: "Disiplin waktu di asrama dan kampus adalah fondasi karakter pemimpin masa depan." }
  ]
};
