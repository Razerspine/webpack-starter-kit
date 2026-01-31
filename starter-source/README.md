# 🚀 Webpack Starter Kit 

A lightweight, modern, and production-ready boilerplate for building static websites using **Webpack 5**, **Pug**, **SCSS**, and **ES6+**.

This starter kit includes a custom styling framework with a responsive grid system and built-in **Dark / Light theme** functionality.

---

## ✨ Features

* **Webpack 5** — optimized configuration for Development and Production
* **Pug** — clean and powerful templating engine for HTML
* **SCSS (Sass)** — modular styles with variables, mixins, and nesting
* **Custom Framework**

  * **Grid System** — Flexbox-based grid (`.container`, `.row`, `.col-*`)
  * **Theming** — built-in Dark / Light mode using CSS Variables
* **JavaScript** — ES6+ support via Babel
* **Dev Server** — Hot Module Replacement (HMR)

---

## 📁 Project Structure

```text
src/
├── assets/
│   ├── fonts/          # Local font files
│   ├── images/         # Images and icons
│   ├── scripts/        # JS modules (entry: app.js)
│   └── styles/         # SCSS files
│       ├── ui-kit/     # Core logic (grid, theme variables)
│       └── ...
├── views/
│   ├── layout/         # Main layout templates (header / aside / main / footer)
│   ├── pages/          # Individual pages (home, themes, etc.)
│   └── mixins/         # Pug mixins and variables
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Razerspine/webpack-starter-kit.git
cd webpack-starter-kit
```

### 2. Install dependencies

Make sure you have **Node.js** installed.

```bash
npm install
```

### 3. Development Mode

Starts a local development server at `http://localhost:8080` (or another available port).

```bash
npm start
```

### 4. Production Build

Builds the project for production into the `dist/` folder. Optimizes CSS, JavaScript, and HTML.

```bash
npm run build
```

---

## 🎨 Theming System

The project uses a native **CSS Variables** approach for theming.

You can customize theme colors in:

```
src/assets/styles/framework/themes/
```

The theme toggle logic is located in:

```
src/assets/scripts/modules/theme-toggle.js
```

The selected theme is saved to **localStorage** and restored on page reload.

---

## 📦 Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm start`     | Start development server with HMR |
| `npm run build` | Build optimized production files  |

---

## 📄 License

MIT License
