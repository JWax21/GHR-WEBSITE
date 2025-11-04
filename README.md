# Grove Hill Research Landing Page

A clean, minimal landing page with email capture functionality using Resend.

## Features

- Full-bleed design using `dvh` and `dvw` units
- Soft white background (#F8F8F6)
- Email input with Resend integration
- Responsive design

## Quick Start

1. **Install dependencies:**

```bash
npm install
```

2. **Create a `.env` file** in the root directory:

```bash
RESEND_API_KEY=your_actual_api_key_here
```

3. **Get your Resend API key** from [resend.com](https://resend.com)

4. **Run the development server:**

```bash
npm run dev
```

5. **Open your browser** to http://localhost:3000

## Deployment

This project can be deployed to Vercel or Netlify.

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add `RESEND_API_KEY` environment variable in project settings
4. Deploy

### Netlify

1. Push to GitHub
2. Import project in Netlify
3. Add `RESEND_API_KEY` environment variable in site settings
4. Deploy

## Customize Email

Edit `server.js` to customize:

- `from` address (must be a verified domain in Resend)
- `to` address (recipient email)
- `subject` line
- Email HTML content
