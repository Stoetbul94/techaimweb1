# Match 50 promo video

| File | Purpose |
|------|---------|
| `match-50-promo.mp4` | Web-optimized encode (~25MB) — **committed**, used on homepage |
| `match-50-promo.source.mp4` | Original full-quality master — **gitignored** if you keep a backup |

## Regenerate web encode

```bash
# Place source at public/Video/match-50-promo.source.mp4 (or restore original name)
npm run compress:video
```

## YouTube (homepage default)

Promo: [youtu.be/N4bL8o1g_sQ](https://youtu.be/N4bL8o1g_sQ) — ID `N4bL8o1g_sQ` in `lib/assets.ts`.

Override in `.env.local` or Vercel:

```env
NEXT_PUBLIC_MATCH50_YOUTUBE_ID=N4bL8o1g_sQ
```
