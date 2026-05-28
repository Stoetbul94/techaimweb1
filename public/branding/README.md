# Branding assets

| File | Use |
|------|-----|
| `icon.svg` | Source for favicons (target mark) |
| `logos/` | Full wordmark SVGs |

Regenerate favicons after editing `icon.svg`:

```bash
npm run generate:favicon
```

Outputs: `app/icon.png`, `app/apple-icon.png`, `public/favicon-32x32.png`, `public/icon-192.png`, `public/icon-512.png`, `public/apple-icon.png`.
