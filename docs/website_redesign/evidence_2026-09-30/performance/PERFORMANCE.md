# Performance, before and after

2026-10-01T09:10:41.690Z · 5 runs per page and deployment, cold cache, interleaved · median values

- **before**: `https://nuovasolution-design-preview-fpfvnf19p-nuovasolajs-projects.vercel.app`
- **after**: `https://nuovasolution-design-preview-434wdh6bf-nuovasolajs-projects.vercel.app`

Desktop: 1440 × 900, no throttling. Mobile: 390 × 844, CPU slowed 4×, 1.6 Mbit/s down, 750 kbit/s up, 150 ms round trip.

| Page | Profile | State | TTFB ms | FCP ms | LCP ms (min–max) | CLS at load | CLS after scroll | Blocking ms | kB at load | kB after scroll | Images kB | Video kB | JS kB | DOM nodes | Page height px |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| /en | desktop | before | 33 | 412 | 916 (756–980) | 0 | 0 | 0 | 419 | 565 | 248 | 0 | 152 | 661 | 9225 |
| /en | desktop | after | 43 | 368 | 812 (764–892) | 0 | 0 | 0 | 458 | 566 | 248 | 0 | 154 | 632 | 9388 |
| /en/packages | desktop | before | 42 | 452 | 924 (828–1116) | 0 | 0 | 0 | 412 | 414 | 103 | 0 | 153 | 372 | 4288 |
| /en/packages | desktop | after | 36 | 372 | 816 (800–1060) | 0 | 0 | 0 | 414 | 416 | 104 | 0 | 155 | 379 | 4370 |
| /es | desktop | before | 34 | 376 | 808 (792–872) | 0 | 0 | 0 | 419 | 559 | 242 | 0 | 152 | 661 | 9473 |
| /es | desktop | after | 33 | 384 | 824 (756–932) | 0 | 0 | 0 | 420 | 560 | 242 | 0 | 153 | 632 | 9700 |
| /es/packages | desktop | before | 35 | 400 | 888 (832–952) | 0 | 0 | 0 | 413 | 414 | 103 | 0 | 153 | 372 | 4361 |
| /es/packages | desktop | after | 39 | 324 | 760 (732–824) | 0 | 0 | 0 | 414 | 416 | 103 | 0 | 154 | 379 | 4444 |
| /en | mobile | before | 35 | 988 | 3108 (2664–3144) | 0 | 0 | 259 | 518 | 557 | 240 | 0 | 152 | 661 | 13004 |
| /en | mobile | after | 35 | 988 | 3364 (2784–3424) | 0 | 0 | 74 | 555 | 558 | 240 | 0 | 153 | 631 | 13229 |
| /en/packages | mobile | before | 34 | 912 | 2560 (2548–2632) | 0 | 0 | 52 | 411 | 414 | 103 | 0 | 153 | 376 | 6854 |
| /en/packages | mobile | after | 34 | 900 | 2580 (2564–2600) | 0 | 0 | 43 | 412 | 416 | 103 | 0 | 155 | 383 | 6979 |
| /es | mobile | before | 34 | 1008 | 2588 (2580–2748) | 0 | 0 | 313 | 418 | 551 | 233 | 0 | 152 | 665 | 13370 |
| /es | mobile | after | 35 | 900 | 2596 (2592–2624) | 0 | 0 | 55 | 419 | 552 | 234 | 0 | 154 | 636 | 13578 |
| /es/packages | mobile | before | 34 | 904 | 2600 (2564–2724) | 0 | 0 | 52 | 411 | 414 | 103 | 0 | 153 | 376 | 7019 |
| /es/packages | mobile | after | 35 | 960 | 2564 (2548–2692) | 0 | 0 | 48 | 413 | 416 | 103 | 0 | 155 | 383 | 7168 |
