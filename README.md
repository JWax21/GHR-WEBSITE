# Grove Hill Research Landing Page

A clean, minimal Next.js landing page with email capture functionality using Resend.

## Features

- Built with Next.js 14 and TypeScript
- Full-bleed design using `dvh` and `dvw` units
- Soft white background (#F8F8F6)
- Email input with Resend integration
- Smooth slide-in animation for email form
- Responsive design with Montserrat font

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Create a `.env.local` file** in the root directory:
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

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `RESEND_API_KEY` environment variable in project settings
4. Deploy

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts       # API endpoint for sending emails
│   ├── layout.tsx             # Root layout with Montserrat font
│   ├── page.tsx               # Main landing page component
│   └── globals.css            # Global styles
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Customize Email

Edit `app/api/send-email/route.ts` to customize:
- `from` address (must be a verified domain in Resend)
- `to` address (recipient email)
- `subject` line
- Email HTML content

## Environment Variables

- `RESEND_API_KEY` - Your Resend API key (required)

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Font:** Montserrat (Google Fonts)
- **Email Service:** Resend
- **Deployment:** Vercel

## License

MIT
