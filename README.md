<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0a0a,40:1a1a1a,70:2d2d2d,100:1c3a5e&height=200&section=header&text=Hassan%20Chemicals&fontSize=52&fontColor=ffffff&fontAlignY=38&fontStyle=bold&desc=Premium%20Industrial%20Chemical%20Products%20%E2%80%94%20Built%20with%20React%20%2B%20Vite&descSize=15&descAlignY=62&descColor=a8c8f0" width="100%"/>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/EmailJS-Contact%20Forms-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Products-36%2B%20Listed-1c3a5e?style=flat-square"/>
  <img src="https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/Client%20Work-Delivered-success?style=flat-square"/>
</p>

<br/>

> A premium, fully responsive product showcase and inquiry platform for **Hassan Chemical**, covering 36+ products across Textile Detergent and Food Chemical categories — with real-time search, dynamic product detail pages, and a direct client inquiry system powered by EmailJS.

<br/>

🌐 **[View Live Site](#)** · **[Report an Issue](https://github.com/mahmedmajeedai/hassanchemicals/issues)**

</div>

---

## 📸 Project Overview

Hassan Chemicals needed a professional digital presence to showcase their industrial chemical product catalogue and allow clients to make direct product inquiries without a backend server. This site delivers exactly that — a fast, static React application deployed on Netlify with zero server costs and a fully functional contact system via EmailJS.

---

## ✨ Features

| Feature | Detail |
|---|---|
| 📦 **36+ Products** | Full chemical product catalogue with category filtering and live search |
| 🔍 **Smart Search** | Real-time product filtering by name and category |
| 📄 **Dynamic Detail Pages** | Per-product specification pages with accordion sections via React Router |
| 📧 **Email Inquiry System** | Client-side contact and quote request forms powered by EmailJS |
| 🛡️ **Spam Protection** | Form validation with honeypot field to filter bot submissions |
| 📱 **Fully Responsive** | Optimised layout for mobile, tablet, and desktop viewports |
| 🎨 **Premium Industrial UI** | Montserrat and Inter typography with a clean industrial aesthetic |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + Vite |
| **Routing** | React Router DOM |
| **Styling** | Plain CSS (modular, component-scoped) |
| **Icons** | Lucide React |
| **Email** | EmailJS (client-side, no backend needed) |
| **Linting** | ESLint |
| **Deployment** | Netlify (continuous deployment from GitHub) |

---

## 🚀 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/mahmedmajeedai/hassanchemicals.git
cd hassanchemicals
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

Open `.env` and add:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> You must restart the dev server after editing `.env` for changes to take effect.

### 4. Run in development mode

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

The output goes to the `dist/` folder, ready for deployment.

---

## 📧 EmailJS Setup

The inquiry and quote request forms use [EmailJS](https://www.emailjs.com/) to send messages directly from the browser without a backend.

**Required template variables:**

| Variable | Description |
|---|---|
| `{{from_name}}` | Sender's full name |
| `{{from_email}}` | Sender's email address |
| `{{phone}}` | Sender's phone number |
| `{{subject}}` | Message subject |
| `{{message}}` | Message body |
| `{{product}}` | Product name for quote requests |

**Fallback behaviour:** If the environment variables are missing or misconfigured, the site displays a friendly warning with a direct email link so inquiries are never lost.

---

## 📦 Adding or Editing Products

All product data lives in a single file:

```
src/data/products.js
```

To add a new product, append a new object following the existing structure. The UI handles any new product automatically — no component changes needed. Product IDs should continue sequentially (37, 38, etc.).

### Replacing product images

1. Place the image file in `public/images/`
2. Update the `image` field in `src/data/products.js` to match the filename

```js
{
  id: 37,
  name: "New Product",
  image: "/images/new_product.png",
  category: "Textile Detergents",
  ...
}
```

---

## 🌍 Deployment

This is a static site. The `dist/` folder produced by `npm run build` can be deployed to any static host.

### Netlify (recommended — already configured)

1. Connect the GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables under **Site Settings → Environment Variables**

> Never put real credentials in the `.env` file if the repo is public. Always use the Netlify dashboard for production secrets.

### netlify.toml (add to repo root for locked config)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The redirect rule is required for React Router to work correctly on page refresh and direct URL access.

---

## 📁 Project Structure

```
hassanchemicals/
│
├── public/
│   └── images/              Product images served as static assets
│
├── src/
│   ├── components/          Reusable UI components
│   ├── pages/               Route-level page components
│   ├── data/
│   │   └── products.js      Central product catalogue (add or edit here)
│   └── main.jsx             App entry point
│
├── .env.example             Environment variable template (safe to commit)
├── .gitignore               Excludes .env, node_modules, dist
├── index.html               Vite HTML entry point
├── vite.config.js           Vite build configuration
├── eslint.config.js         Linting rules
└── package.json             Dependencies and scripts
```

---

## 📄 License

This project was developed as a client engagement. All rights to the brand, product content, and business information belong to Hassan Chemical. The codebase is maintained by [Muhammad Ahmed Majeed](https://github.com/mahmedmajeedai).

---

<div align="center">

**Developed by [Muhammad Ahmed Majeed](https://github.com/mahmedmajeedai)**

*Professional web development — React, Vite, Netlify*

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1c3a5e,50:1a1a1a,100:0a0a0a&height=100&section=footer" width="100%"/>

</div>
