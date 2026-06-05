<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deployment

This project deploys to Cloudflare Workers with OpenNext. Use the runbook in `DEPLOYMENT.md`.

Required deployment commands:

```bash
npm run lint
npm run pages:build
npm run pages:deploy
```

Do not deploy this app through traditional Cloudflare Pages Git integration, `.vercel/output/static`, `next start`, or `npm run dev`. Keep `workers_dev = true` in `wrangler.toml` unless a custom route/domain is configured.
