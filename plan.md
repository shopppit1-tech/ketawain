# Ketawain — 30+ Ide Video Absurd

## Ringkasan
Website statis berbahasa Indonesia untuk menjelajahi katalog konsep video lucu vertikal. Produk mengikuti pola referensi: setup serius, pemicu sederhana, transformasi absurd, reaksi datar, lalu punchline singkat.

## Desain
- **Design movement:** editorial zine digital bertemu control room kreator short-form.
- **Core principles:** komedi harus terbaca dalam satu lirikan; konten terasa siap produksi; navigasi cepat di layar ponsel; tiap interaksi punya respons kecil yang menyenangkan.
- **Color philosophy:** latar arang kebiruan memberi panggung, coral sebagai energi punchline, mint untuk status siap pakai, kuning mentega untuk momen absurd.
- **Layout paradigm:** hero asimetris dengan rail filter sticky dan katalog editorial; kartu memakai nomor besar dan mini-stage 9:16, bukan grid polos.
- **Signature elements:** stempel `ABSURD`, nomor indeks besar, mini-stage vertikal dengan emoji/shape, dan garis marker yang terasa seperti catatan storyboard.
- **Interaction philosophy:** pengguna bisa menyaring dengan cepat, membuka detail tanpa kehilangan konteks, dan menyimpan ide ke “Lemari Favorit”.
- **Animation:** reveal kartu berurutan, hover stage sedikit bergeser, pulse halus pada badge status, modal naik dari bawah pada mobile.
- **Typography system:** Space Grotesk untuk display dan UI; DM Mono untuk label metadata dan indeks.
- **Brand essence:** bank ide video pendek absurd untuk kreator yang ingin langsung punya premis lucu; lincah, nakal, siap syuting.
- **Brand voice:** lugas dan usil. Contoh: “Serius dulu. Rusuh kemudian.” dan “Satu setup, satu ledakan komedi.”
- **Wordmark:** kata `ketawain` lowercase dengan aksen garis senyum di bawah dua suku kata terakhir.
- **Signature brand color:** coral punch #ff6b5f.

## Implementasi
- `index.html`: shell aplikasi, hero, toolbar filter, katalog, modal detail, dan footer.
- `styles.css`: visual system responsif mobile-first, kartu, mini-stage, modal, dan state interaksi.
- `data.js`: 36 konsep lengkap dengan metadata produksi dan prompt video AI.
- `app.js`: pencarian, filter, sorting, favorit via localStorage, detail modal, copy prompt, shuffle, dan render statistik.
- `public/manus-routes.json`: manifest route root untuk Preview.
- `.nojekyll`: memastikan asset statis dilayani GitHub Pages.
- `README.md`: instruksi lokal dan GitHub Pages.

## Batasan produk
- Katalog berisi 36 konsep, melampaui permintaan minimal 30.
- Tidak ada login/backend; favorit tersimpan di browser pengguna.
- Konten adalah ide/prompt produksi, bukan 36 file video hasil render. Semua konsep menghindari instruksi berbahaya dan menggunakan properti/efek kartun.
