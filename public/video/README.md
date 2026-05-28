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

## YouTube instead of self-hosted

Set in `.env.local` (or Vercel env):

```env
NEXT_PUBLIC_MATCH50_YOUTUBE_ID=your_video_id
```

When set, the homepage block uses a YouTube embed instead of the local MP4.
