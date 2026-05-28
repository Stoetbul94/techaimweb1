# Asset migration report

**Date:** 2026-05-27  
**Scope:** Reorganize PNG assets from `public/models/` into `public/images/`; keep GLB files in `public/models/`.

## File moves

| Old filename | Old path | New filename | New path |
|---|---|---|---|
| `Software.png` | `public/models/Software.png` | `ta-software-dashboard-raw.png` | `public/images/software/ta-software-dashboard-raw.png` |
| `ta10-classic-front-view.png` | `public/models/ta10-classic-front-view.png` | `ta10-classic-front-perspective.png` | `public/images/products/ta10-classic/ta10-classic-front-perspective.png` |
| `ta10-pro-front-view.png` | `public/models/ta10-pro-front-view.png` | `ta10-pro-hero-render.png` | `public/images/products/ta10-pro/ta10-pro-hero-render.png` |
| `ta10-software-dashboard-tablet.png` | `public/models/ta10-software-dashboard-tablet.png` | `ta-dashboard-tablet-black-target.png` | `public/images/software/ta-dashboard-tablet-black-target.png` |
| `ta10-software-dashboard-tablet1.png` | `public/models/ta10-software-dashboard-tablet1.png` | `ta-dashboard-tablet-blue-target.png` | `public/images/software/ta-dashboard-tablet-blue-target.png` |
| `ta50-software-dashboard-tablet.png` | `public/models/ta50-software-dashboard-tablet.png` | `ta50-dashboard-tablet.png` | `public/images/products/ta50/ta50-dashboard-tablet.png` |
| `rangemanagment.png` | `public/models/rangemanagment.png` | `ta10x-plc-network-architecture.png` | `public/images/systems/ta10x-plc-network-architecture.png` |

**Unchanged (models):**

| File | Path |
|---|---|
| `hero-rifle.glb` | `public/models/hero-rifle.glb` |
| `hero-22lr-cartridge.glb` | `public/models/hero-22lr-cartridge.glb` |

## Codebase files updated

| File | Change |
|---|---|
| `lib/assets.ts` | **Created** — central registry for all model and image paths |
| `components/three/BulletHeroScene.tsx` | `useGLTF` and `useGLTF.preload` now use `models.heroRifle` from `lib/assets.ts` |

## References scan results

| Search term | Matches in app code (excluding this report) |
|---|---|
| Old PNG filenames (`Software.png`, `rangemanagment`, etc.) | **0** — PNGs were not referenced in code before migration |
| `/models/*.png` | **0** |
| Hardcoded `/models/hero-rifle.glb` | **0** (replaced by `lib/assets.ts`) |

## Missing / broken references

- **None found.** No broken image paths detected after migration.
- **Note:** Product, software, and systems pages still use text placeholders (`Product Image`, etc.). Wire images via `lib/assets.ts` when ready.

## Final inventory

### `public/models/` (GLB only)

- `hero-rifle.glb`
- `hero-22lr-cartridge.glb`

### `public/images/` (current — see naming alignment below)

```
images/
├── README.md
├── brand/.gitkeep
├── marketing/.gitkeep
├── products/
│   ├── README.md
│   ├── ta10-classic/ta10-classic-perspective.png
│   ├── ta10-pro/ta10-pro-front.png
│   ├── ta10x/.gitkeep
│   ├── ta50/ta50-dashboard-tablet.png
│   ├── ta100/.gitkeep
│   └── accessories/.gitkeep
├── software/
│   ├── README.md
│   ├── software-dashboard-raw.png
│   ├── software-dashboard-tablet-black-target.png
│   └── software-dashboard-tablet-blue-target.png
└── systems/
    ├── README.md
    └── system-plc-architecture.png
```

## Naming convention alignment (2026-05-27)

Renamed migrated files to match `public/images/README.md`. Added placeholder folders: `ta10x/`, `ta100/`, `accessories/`.

| Previous path | Current path |
|---|---|
| `products/ta10-classic/ta10-classic-front-perspective.png` | `products/ta10-classic/ta10-classic-perspective.png` |
| `products/ta10-pro/ta10-pro-hero-render.png` | `products/ta10-pro/ta10-pro-front.png` |
| `products/ta50/ta50-dashboard-tablet.png` | *(unchanged)* |
| `software/ta-software-dashboard-raw.png` | `software/software-dashboard-raw.png` |
| `software/ta-dashboard-tablet-black-target.png` | `software/software-dashboard-tablet-black-target.png` |
| `software/ta-dashboard-tablet-blue-target.png` | `software/software-dashboard-tablet-blue-target.png` |
| `systems/ta10x-plc-network-architecture.png` | `systems/system-plc-architecture.png` |

**Files updated:** `lib/assets.ts` (paths and keys), `public/images/**/README.md` (new), `.cursorrules` (asset rule).

## Usage

Import paths from `@/lib/assets` (see `public/images/README.md`):

```ts
import { models, images } from "@/lib/assets";

// 3D
useGLTF(models.heroRifle);

// Images
<Image src={images.products.ta10Pro.front} alt="..." />
```
