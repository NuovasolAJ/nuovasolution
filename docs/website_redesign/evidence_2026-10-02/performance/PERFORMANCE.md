# Performance, before and after

2026-10-02T13:23:51.764Z · 5 runs per page and deployment, cold cache, interleaved · median values

- **before**: `https://nuovasolution-design-preview-dfucsv37i-nuovasolajs-projects.vercel.app`
- **after**: `https://nuovasolution-design-preview-bhtj2apez-nuovasolajs-projects.vercel.app`

Desktop: 1440 × 900, no throttling. Mobile: 390 × 844, CPU slowed 4×, 1.6 Mbit/s down, 750 kbit/s up, 150 ms round trip.

| Page | Profile | State | TTFB ms | FCP ms | LCP ms (min–max) | CLS at load | CLS after scroll | Blocking ms | kB at load | kB after scroll | Images kB | Video kB | JS kB | DOM nodes | Page height px |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| /en | desktop | before | 39 | 528 | 956 (864–1080) | 0 | 0 | 0 | 458 | 566 | 248 | 0 | 154 | 632 | 9388 |
| /en | desktop | after | 35 | 400 | 852 (768–1352) | 0 | 0 | 0 | 463 | 838 | 514 | 0 | 157 | 646 | 9223 |
| /en/packages | desktop | before | 34 | 436 | 920 (828–1196) | 0 | 0 | 0 | 414 | 416 | 103 | 0 | 155 | 379 | 4370 |
| /en/packages | desktop | after | 35 | 424 | 896 (772–960) | 0 | 0 | 0 | 417 | 419 | 103 | 0 | 157 | 379 | 4146 |
| /es | desktop | before | 41 | 764 | 1388 (836–1896) | 0 | 0 | 30 | 420 | 560 | 242 | 0 | 153 | 633 | 9700 |
| /es | desktop | after | 38 | 424 | 916 (820–2344) | 0 | 0 | 85 | 462 | 840 | 517 | 0 | 156 | 646 | 9496 |
| /es/packages | desktop | before | 43 | 852 | 1496 (1296–1836) | 0.001 | 0.001 | 92 | 414 | 416 | 104 | 0 | 154 | 385 | 4444 |
| /es/packages | desktop | after | 45 | 860 | 1392 (1236–1748) | 0 | 0 | 134 | 417 | 420 | 104 | 0 | 157 | 379 | 4220 |
| /en | mobile | before | 36 | 1236 | 3460 (1672–3996) | 0 | 0 | 134 | 555 | 558 | 240 | 0 | 153 | 631 | 13229 |
| /en | mobile | after | 34 | 1184 | 2920 (2824–3288) | 0 | 0 | 143 | 459 | 813 | 491 | 0 | 157 | 649 | 13371 |
| /en/packages | mobile | before | 43 | 1340 | 2844 (1740–3148) | 0 | 0 | 290 | 412 | 416 | 103 | 0 | 154 | 383 | 6979 |
| /en/packages | mobile | after | 46 | 1528 | 2992 (2672–3016) | 0 | 0 | 412 | 416 | 419 | 103 | 0 | 157 | 383 | 6979 |
| /es | mobile | before | 46 | 2956 | 4572 (2812–4848) | 0 | 0 | 578 | 419 | 552 | 234 | 0 | 153 | 636 | 13578 |
| /es | mobile | after | 40 | 2156 | 3616 (2788–6644) | 0 | 0 | 450 | 459 | 820 | 497 | 0 | 156 | 650 | 13748 |
| /es/packages | mobile | before | 37 | 940 | 2664 (2640–2876) | 0 | 0 | 121 | 413 | 416 | 103 | 0 | 155 | 383 | 7168 |
| /es/packages | mobile | after | 34 | 1196 | 2952 (2680–3704) | 0 | 0 | 173 | 416 | 420 | 103 | 0 | 158 | 383 | 7168 |
