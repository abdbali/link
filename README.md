# Teacher Platform (Vercel Serverless)

Next.js 14 App Router tabanlı; öğretmen profili, kısa link, takvim/randevu, premium Stripe, admin paneli içeren serverless mimari iskeleti.

## Özellikler
- Next.js 14 App Router + Route Handlers
- NextAuth (Auth.js) JWT session
- Prisma + PostgreSQL (serverless uyumlu bağlantı yaklaşımı)
- UploadThing entegrasyon hazırlığı
- Stripe checkout/portal + Node runtime webhook
- Vercel Cron endpoint
- Middleware RBAC (`/admin/*`)
- ISR (`/[username]`) + SSR (`/dashboard`)

## Çalıştırma
1. `env/.env.example` dosyasını `.env` olarak kopyalayın.
2. `npm install`
3. `npx prisma generate`
4. `npm run dev`
