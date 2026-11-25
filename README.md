# Ketawain

Katalog 36 ide video lucu vertikal berbahasa Indonesia. Website ini dibuat statis agar bisa langsung dipasang di GitHub Pages, tanpa backend atau database.

## Menjalankan lokal

```bash
python3 -m http.server 3000 --bind 0.0.0.0
```

Buka `http://localhost:3000`.

## GitHub Pages

1. Push seluruh isi repository ke branch `main`.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main`, folder `/ (root)`, lalu **Save**.

Website tidak memakai build step. Favorit tersimpan di `localStorage` browser masing-masing. Jika memakai GitHub Actions, static files bisa dipublish dengan workflow Pages standar.

## Isi website

Katalog berisi 36 konsep dengan filter koleksi, gaya, durasi, pencarian, sorting, favorit, panel detail resep komedi, dan prompt video AI siap dikembangkan. Properti berbahaya di premis dibuat sebagai objek fiksi atau efek kartun; jangan meniru aksi berisiko di dunia nyata.

## PWA

Ketawain dapat dipasang dari browser yang mendukung instalasi PWA. Manifest berada di `manifest.webmanifest`, ikon ada di `icons/`, dan `sw.js` melakukan cache offline-first untuk shell aplikasi. Data katalog tetap berjalan tanpa backend; favorit tersimpan di `localStorage`.
