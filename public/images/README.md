# TECH AIM — Image assets

Static images live under `public/images/`. **3D models** stay in `public/models/` (`.glb` only).

## Folder layout

```
images/
├── brand/           # Logos, wordmarks, favicons
├── marketing/       # Campaign, hero backgrounds, social
├── products/        # Hardware by product slug (see products/README.md)
├── software/        # App UI screenshots (see software/README.md)
└── systems/         # Architecture / network diagrams (see systems/README.md)
```

## Naming rules

| Category | Pattern | Folder |
|----------|---------|--------|
| Products | `{productSlug}-{view-or-detail}.png` | `products/{productSlug}/` |
| Software | `software-{descriptor}.png` | `software/` |
| Systems | `system-{descriptor}.png` | `systems/` |

- **kebab-case**, lowercase, hyphens only (no spaces)
- Product slug must match the folder name (e.g. `ta10-pro/`, `ta10x/`)
- Prefer descriptive suffixes: `front`, `side`, `rear`, `perspective`, `detail-*`

## Code usage

Do not hardcode paths in components. Use typed assets from [`lib/imageRegistry.ts`](../../lib/imageRegistry.ts):

```ts
import { images } from "@/lib/imageRegistry";
import { ProductImage } from "@/components/media";

<ProductImage asset={images.products.ta10Pro.front} variant="card" />
```

After adding PNGs, run `npm run optimize:images`, then register entries in `lib/imageRegistry.ts`.
