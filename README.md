# Portofolio — Alfian Wardyanto

Website portofolio interaktif bergaya **Persona 5** untuk **Alfian Wardyanto** (*Software Engineer — Fraud Detection System*).

## Fitur Utama

* **Estetika Persona 5:** Navigasi menu *ransom-note* dinamis, spanduk nama miring, *slash wipe transition* (maju dan *reverse* saat menutup panel), efek getar halus, serta panel *dossier* di sisi kanan.
* **Bilingual (ID / EN):** Pengalih bahasa instan antara Bahasa Indonesia dan Bahasa Inggris yang tersimpan di `localStorage`.
* **Panel Dossier Interaktif:** Menampilkan *Overview*, *Experience*, *Tech Stack* (*Keahlian*), *Projects* (dengan filter kategori *All*, *Web*, *Android*, dan *Java*), serta *Contact* dan tautan *Resume* / *Certificates*.
* **Background Music & Sound Effects:** Kontrol BGM (`song.mp3`) dengan *auto-unlock* pada interaksi pertama serta efek suara *hover*, *select*, dan *cancel* menggunakan Web Audio API.
* **Responsif Desktop & Mobile:** Tata letak menyesuaikan otomatis untuk layar desktop maupun layar ponsel (*portrait*).

## Struktur Proyek

```text
├── assets
│   ├── css
│   │   └── persona.css
│   └── js
│       └── persona.js
└── index.html
```

> **Catatan aset media:** Pastikan file `assets/img/persona-bg.mp4` dan `assets/img/song.mp3` tersedia di folder `assets/img/` agar video latar dan musik latar dapat berjalan.

## Cara Menjalankan

Karena proyek ini menggunakan HTML, CSS, dan JavaScript statis:

1. Clone atau unduh repositori ini.
2. Letakkan file media (`persona-bg.mp4` dan `song.mp3`) di dalam folder `assets/img/`.
3. Buka `index.html` langsung di browser atau jalankan menggunakan *local server* (misalnya VS Code Live Server, XAMPP, atau `npx serve`).

## Kontak

* **Email:** alfianwardyanto@gmail.com
* **LinkedIn:** [Alfian Wardyanto](https://linkedin.com/in/alfian-wardyanto-6a5315246/)
* **GitHub:** [awardyanto](https://github.com/awardyanto)
* **Instagram:** [@awardyanto](https://instagram.com/awardyanto)
