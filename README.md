<h1 align='center'>Welcome👋 :wave:</h1>

<div align="center">
<img src="https://telegra.ph/file/3024b63e3b52707d6a696.jpg" alt="SEENKU MD" width="300" />
<p align="center">
 <img src="https://komarev.com/ghpvc/?username=xzeera-id&color=blue&label=Views" />
 </p>
</p>
<h1 align="center">Senkuu MD</h1>
</div>

## Sorotan

-   [x] Simple Penggunaan
-   [x] Mudah digunakan
-   [x] Mudah untuk dirawat/diperbaiki
-   [x] Ringan
-   [x] Anti delay
-   [x] Unik
-   [x] Anti Pasaran!

# Baca Ini!

- Change [Config](https://github.com/xzeera-id/Senkuu-MD/blob/main/lib/config.json)
- Heroku doesn't support figlet? Remove the console section here!! [Click Here](https://github.com/xzeera-id/Senkuu-MD/blob/main/main.js#L117)
- Session Name: senku-md.json

# Run On Heroku

WhatsApp Bot Multi Device

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/xzeera-id/Senkuu-MD)


# Heroku Buildpack

| BuildPack | LINK |
|--------|--------|
| **FFMPEG** |[HERE](https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest) |
| **IMAGEMAGICK** | [HERE](https://github.com/mcollina/heroku-buildpack-imagemagick.git) |
| **Node.js**     | heroku/nodejs|

### Statistics

[![GitHub Stats](https://github-readme-stats.vercel.app/api?username=xzeera-id&show_icons=true&hide=issues&theme=radical)](https://github-readme-stats.vercel.app)
[![Top Languages](https://github-readme-stats.vercel.app/api/top-langs?username=xzeera-id&layout=compact&theme=radical)](https://github-readme-stats.vercel.app)

## Request Fitur To
[`Creator Here`](https://wa.me/6281312960392?text=Bang+req+fitur) 

## Instalasi On Termux

### Clone Repo

```bash
> pkg install
> pkg upgrade
> pkg install git
> pkg install ffmpeg && pkg install libwebp
> pkg install nodejs
> git clone https://github.com/xzeera-id/Senkuu-MD
> cd Senkuu-MD
> npm install
> npm start
# Scan QR
```

## Instalasi

### Dibutuhkan

1.  [Nodejs](https://nodejs.org/en/download) 16x/17x
2.  [FFmpeg](https://ffmpeg.org)
3.  [libWebP](https://developers.google.com/speed/webp/download)

### Install Ffmpeg

-   Untuk pengguna Windows, kamu bisa lihat tutorial disini [WikiHow](https://www.wikihow.com/Install-Ffmpeg-on-Windows)<br />
-   Untuk pengguna Linux, kamu bisa pakai manager paket kamu sendiri. Contohnya;

```bash
# apt (Ubuntu)
apt install ffmpeg -y

# pacman (Arch Linux)
pacman -S ffmpeg
```

### Install libWebP

-   Untuk pengguna Windows,

1.  Unduh libWebP untuk Windows dari [sini](https://developers.google.com/speed/webp/download)
2.  Ekstrak ke C:\
3.  Ganti nama folder yang diekstrak ke `libwebp`
4.  Buka PowerShell dan jalankan perintah berikut;

```cmd
setx /m PATH "C:\libwebp\bin;%PATH%"
```

> Bila sukses terinstal dengan baik, silahkan check dengan perintah berikut di Command Prompt

```cmd
webpmux -version
```

-   Untuk pengguna Linux, kamu bisa pakai manager paket kamu. Contohnya;

```bash
# apt (Ubuntu)
apt install libwebp-dev -y

# pacman (Arch Linux)
pacman -S libwebp
```

### Clone Repo

```bash
# clone repo
git clone --depth=1 https://github.com/xzeera-id/Senkuu-MD

# ubah posisi direktori kamu
cd Senkuu-MD

# install semua module
npm install
# atau
yarn install

# bila libray @adiwajshing/baileys error, jalan kan kode yg ada dibawah ini

cd ./node_modules/@adiwajshing/baileys
npm install -g typescript
npm run build:tsc
```

### Start Bot

Start and Scan QR<br />

```bash
npm start
```

# Thanks To

-   [`RzkyFdlh`](https://github.com/Rizky878)
-   [`Zynfinity`](https://wa.me/639162506299)
-   [`Senkuu`](https://wa.me/6281312960392)
-   [`ZeeraID`](https://wa.me/6287798426632)
