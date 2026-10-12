# 🎂 ¡Feliz Cumpleaños, Ana Alcántara!

Página web interactiva de cumpleaños para **Ana Alcántara (La Negra Bella)** — tema romántico rosa/rojo.

Hecha con **HTML + CSS + JavaScript puro**, sin frameworks ni dependencias externas.

## 🎬 Qué incluye

1. **Pantalla de inicio** — "Toca para empezar" (activa la música).
2. **Hero** — globos flotantes y el título *"¡Feliz Cumpleaños, Ana!"* animado letra por letra.
3. **Pastel** — velas animadas; al pulsar **"Soplar las velas"** se apagan y explota **confeti de corazones** 💗.
4. **Mensaje** — se escribe solo: *"HBD Negra, espero mucho de ti. Disfruta tu día"* — firma **R.A.M**.
5. **Galería** — polaroids con tus fotos (se amplían al hacer clic).
6. **Final** — fecha *Octubre 12*, botón *Ver de nuevo* y *Más corazones*.

## 📁 Estructura

```
hbd-ana-alcantara/
├── index.html
├── styles.css
├── script.js
├── .nojekyll
├── README.md
└── assets/
    ├── audio/        ← aquí va la canción
    │   └── cancion.mp3
    └── img/          ← aquí van las fotos
        ├── foto1.jpg
        ├── foto2.jpg
        └── ...
```

## 🖼️ Cómo agregar las fotos

1. Coloca tus imágenes en `assets/img/`.
2. Nómbralas **`foto1.jpg`, `foto2.jpg`, … `foto6.jpg`** (hasta 6).
3. Si quieres más o menos, edita la sección `<!-- Galería -->` en `index.html` agregando/quitando bloques `<figure class="polaroid">`.
4. Si aún no hay fotos, se muestra un aviso; la página **no se rompe**.

> Consejo: usa fotos cuadradas o similares para que se vean mejor (se recortan en formato 1:1).

## 🎵 Cómo agregar la canción

1. Guarda tu audio como **`assets/audio/cancion.mp3`**.
2. Nada más: la página la reproduce al pulsar *"Toca para empezar"* y puedes pausar con el botón 🔊 (arriba a la derecha).
3. Si el archivo no existe, la página funciona igual (sin sonido, sin errores).

## ▶️ Ver en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# luego visita http://localhost:8000
```

## 🚀 Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "Feliz cumpleaños Ana 🎂"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/hbd-ana-alcantara.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `root` → Save**.
En un par de minutos estará en:

```
https://TU-USUARIO.github.io/hbd-ana-alcantara/
```

## ♿ Accesibilidad

- Respeta `prefers-reduced-motion` (menos animaciones si el sistema lo pide).
- Navegación por teclado: `Enter`/`Espacio` para empezar.
