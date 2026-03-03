# Hassan Chemical Website

A premium, responsive product showcase website for **Hassan Chemical**, specializing in Textile Detergents and Food Chemicals.

## Features

- **Responsive Design**: Optimized for Mobile, Tablet, and Desktop.
- **Product Showcase**: Detailed list of 36+ products with search and category filtering.
- **Dynamic Detail Pages**: Comprehensive product specs organized into clean accordion sections.
- **Email Inquiry System**: Integrated with **EmailJS** for direct client-side inquiries.
- **Form Protection**: Includes validation and honeypot field for basic anti-spam.
- **Premium UI**: Modern industrial aesthetic with Montserrat and Inter typography.

## Tech Stack

- React + Vite (JS)
- React Router (Navigation)
- Plain CSS (Modular approach)
- Lucide React (Icons)
- EmailJS (Contact Form & Quotes)

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Development Mode

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

---

## Configuration & Customization

### Editing Products

All product data is centrally managed in:
`src/data/products.js`

You can easily add (id 37, 38, etc.) or edit products here. The UI automatically handles any new specification sections.

### Replacing Images

Products use local image paths (e.g., `/images/soda_ash.png`).

1. Place your images in `public/images/`.
2. Update the `image` path in `src/data/products.js`.

### EmailJS Setup (MANDATORY for Inquiry Feature)

To receive messages at `03447733778bilal@gmail.com`:

1.  **Account**: Sign up at [EmailJS](https://www.emailjs.com/).
2.  **Service**: Add an Email Service (e.g., Gmail) and connect your account.
3.  **Template**: Create an Email Template with these exact variable names:
    - `{{from_name}}`
    - `{{from_email}}`
    - `{{phone}}`
    - `{{subject}}`
    - `{{message}}`
    - `{{product}}` (for quote requests)
    - `{{to_email}}` (optional, can be hardcoded to `03447733778bilal@gmail.com` in the template)
4.  **Env Variables**: Create a `.env` file in the root (use `.env.example` as a guide):
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```
5.  **Restart**: You MUST restart the Vite dev server after creating or editing the `.env` file.

**Fallback UI**: If environment variables are missing, the website will show a friendly warning and provide a direct "Email Us" link.

---

## Deployment

This is a static site. You can deploy the `dist` folder to Netlify, Vercel, or GitHub Pages.

## EmailJS Configuration

To enable the contact form, follow these steps:

1.  **Environment Variables**: Create a `.env` file at the project root (same level as `package.json`).
2.  **Required Keys**: Add the following keys with your EmailJS credentials:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```
3.  **Local Development**: After changing the `.env` file, you **must restart the development server** for the changes to take effect.
4.  **Deployment**: When deploying (e.g., Netlify, Vercel), set these environment variables in your platform's dashboard settings. Note that the `.env` file is not uploaded to your repository.
