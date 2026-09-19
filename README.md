# TenderIQ frontend

Next.js App Router frontend for the tender scraping platform. Tender listings, statistics, detail pages, and intelligence charts are rendered from the NestJS tender API.

## Getting Started

Copy the environment example and make sure the backend is running on port 3001:

```powershell
Copy-Item .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

`TENDER_API_URL` is server-only and defaults to `http://127.0.0.1:3001/api/v1`. The UI provides explicit loading and service-unavailable states when the backend cannot be reached.
