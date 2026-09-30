# Performance, before and after

2026-09-30T10:20:33.186Z · 5 runs per page and deployment, cold cache, interleaved · median values

- **before**: `https://nuovasolution-design-preview-lbfoqes6v-nuovasolajs-projects.vercel.app`
- **after**: `https://nuovasolution-design-preview-fpfvnf19p-nuovasolajs-projects.vercel.app`

Desktop: 1440 × 900, no throttling. Mobile: 390 × 844, CPU slowed 4×, 1.6 Mbit/s down, 750 kbit/s up, 150 ms round trip.

| Page | Profile | State | TTFB ms | FCP ms | LCP ms (min–max) | CLS at load | CLS after scroll | Blocking ms | kB at load | kB after scroll | Images kB | Video kB | JS kB | DOM nodes | Page height px |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| /en | desktop | before | 34 | 496 | 912 (760–968) | 0 | 0 | 0 | 412 | 543 | 232 | 0 | 147 | 711 | 10533 |
| /en | desktop | after | 48 | 400 | 860 (772–1088) | 0 | 0 | 0 | 419 | 565 | 247 | 0 | 152 | 660 | 9225 |
| /en/packages | desktop | before | 52 | 400 | 876 (784–1020) | 0 | 0 | 0 | 406 | 408 | 103 | 0 | 149 | 418 | 4031 |
| /en/packages | desktop | after | 35 | 368 | 832 (816–1044) | 0 | 0 | 0 | 412 | 414 | 104 | 0 | 153 | 372 | 4288 |
| /es | desktop | before | 48 | 432 | 896 (784–1084) | 0 | 0 | 0 | 413 | 549 | 238 | 0 | 148 | 709 | 10622 |
| /es | desktop | after | 36 | 396 | 828 (796–860) | 0 | 0 | 0 | 419 | 559 | 242 | 0 | 152 | 661 | 9473 |
| /es/packages | desktop | before | 39 | 372 | 840 (788–856) | 0 | 0 | 0 | 406 | 408 | 103 | 0 | 149 | 418 | 4188 |
| /es/packages | desktop | after | 35 | 344 | 824 (752–892) | 0 | 0 | 0 | 412 | 414 | 103 | 0 | 153 | 372 | 4361 |
| /en | mobile | before | 35 | 1016 | 3080 (2728–3220) | 0 | 0 | 351 | 512 | 514 | 204 | 0 | 148 | 712 | 14428 |
| /en | mobile | after | 37 | 996 | 3084 (2720–3152) | 0 | 0 | 323 | 518 | 556 | 239 | 0 | 152 | 662 | 13004 |
| /en/packages | mobile | before | 35 | 908 | 2548 (2524–2588) | 0 | 0 | 51 | 405 | 408 | 103 | 0 | 149 | 423 | 6596 |
| /en/packages | mobile | after | 35 | 904 | 2596 (2560–2624) | 0 | 0 | 51 | 411 | 414 | 103 | 0 | 153 | 376 | 6854 |
| /es | mobile | before | 34 | 956 | 3076 (2596–3140) | 0 | 0 | 293 | 514 | 517 | 206 | 0 | 148 | 710 | 14777 |
| /es | mobile | after | 36 | 1012 | 3076 (2624–3188) | 0 | 0 | 324 | 512 | 551 | 234 | 0 | 152 | 661 | 13370 |
| /es/packages | mobile | before | 34 | 900 | 2584 (2564–2636) | 0 | 0 | 49 | 405 | 408 | 103 | 0 | 149 | 424 | 6679 |
| /es/packages | mobile | after | 35 | 908 | 2588 (2552–2764) | 0 | 0 | 68 | 411 | 414 | 103 | 0 | 153 | 376 | 7019 |
