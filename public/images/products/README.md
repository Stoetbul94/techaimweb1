# Product images

One folder per product slug. Filename: **`{productSlug}-{view-or-detail}.png`**

## Standard views

| Suffix | Use |
|--------|-----|
| `front` | Front elevation |
| `side` | Side profile |
| `rear` | Rear view |
| `perspective` | 3/4 hero angle |

## Detail shots

| Suffix | Use |
|--------|-----|
| `detail-sensors` | Sensor array close-up |
| `detail-paper-roll` | Paper roll mechanism |
| `detail-connector` | Ports / connectors |

## Examples (`ta10-pro/`)

```
ta10-pro-front.png
ta10-pro-side.png
ta10-pro-rear.png
ta10-pro-perspective.png
ta10-pro-detail-sensors.png
ta10-pro-detail-paper-roll.png
ta10-pro-detail-connector.png
```

## Site product mapping

| Asset prefix / folder | Marketing product |
|----------------------|-------------------|
| `ta10-*` | Match 10 (`match-10`) |
| `ta50-*` | Match 50 (`match-50`) |
| `software/*tablet*` | Software UI on tablet (shown on product pages via `lib/imageRegistry.ts`) |

## Product folders

| Folder | Product line |
|--------|----------------|
| `ta10-classic/` | TA10 Classic |
| `ta10-pro/` | TA10 Pro |
| `ta10x/` | TA10X |
| `ta50/` | TA50 |
| `ta100/` | TA100 |
| `accessories/` | Accessories |

Other descriptors (e.g. `ta50-dashboard-tablet.png`) are allowed when they describe a specific asset type for that product.
