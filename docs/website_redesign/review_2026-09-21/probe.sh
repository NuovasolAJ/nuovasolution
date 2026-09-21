#!/usr/bin/env bash
# Read-only HTTP probes against the locally served pinned build. No external host is contacted.
B="${B:-http://localhost:3107}"
J=$(mktemp -d)
h() { echo; echo "=== $1"; }

for i in $(seq 1 30); do curl -s -o /dev/null "$B/en" && break; sleep 1; done
echo "UTC $(date -u +%FT%TZ)  base=$B"

h "P01 security headers on /en"
curl -sI "$B/en" | grep -iE '^(HTTP|content-security-policy|x-frame|x-content|referrer|permissions|strict-transport|x-powered|cache-control)'

h "P02 root locale negotiation"
curl -sI "$B/" -H 'Accept-Language: es-ES,es;q=0.9' | grep -iE '^(HTTP|location)'
curl -sI "$B/" -H 'Accept-Language: en-GB' | grep -iE '^(HTTP|location)'

h "P03 onboarding without session"
curl -sI "$B/en/onboarding" | grep -iE '^(HTTP|location)'

h "P04 stub session backdoor GET /api/bff/auth/login?stub=1 (no credentials)"
curl -sI "$B/api/bff/auth/login?stub=1&case=3&next=/en/onboarding" | grep -iE '^(HTTP|location|set-cookie)'

h "P05 open redirect via backslash in next"
curl -sI "$B/api/bff/auth/login?stub=1&next=/%5Cevil.example/x" | grep -iE '^(HTTP|location)'
curl -sI "$B/api/bff/auth/login?stub=1&next=/%09/evil.example" | grep -iE '^(HTTP|location)'

h "P06 POST login with arbitrary credentials"
curl -si -c "$J/c1" -X POST "$B/api/bff/auth/login" -H 'Content-Type: application/json' -d '{"email":"nobody@example.invalid","password":"x"}' | grep -iE '^(HTTP|set-cookie|x-nuova-stub)|"ok"'

h "P07 POST signup arbitrary -> claims created"
curl -si -X POST "$B/api/bff/signup" -H 'Content-Type: application/json' -d '{"name":"R","email":"r@example.invalid","password":"12345678","language":"en","agency_name":"Review"}' | grep -iE '^(HTTP|set-cookie|x-nuova-stub)|"ok"'

h "P08 cross-site text/plain POST login (login CSRF shape)"
curl -si -X POST "$B/api/bff/auth/login" -H 'Content-Type: text/plain' -H 'Origin: https://evil.example' -H 'Sec-Fetch-Site: cross-site' -d '{"email":"a@b.cd","password":"x"}' | grep -iE '^(HTTP|set-cookie)'

h "P09 logout cookie deletion attributes"
curl -si -X POST "$B/api/bff/auth/logout" -b "$J/c1" | grep -iE '^(HTTP|set-cookie)'

h "P10 onboarding with stub session: form controls present?"
curl -s -b "nuova_session=stub; nuova_stub_case=3" "$B/en/onboarding" > "$J/ob.html"
echo "bytes: $(wc -c < "$J/ob.html")"
echo "input elements:    $(grep -o '<input' "$J/ob.html" | wc -l)"
echo "select elements:   $(grep -o '<select' "$J/ob.html" | wc -l)"
echo "textarea elements: $(grep -o '<textarea' "$J/ob.html" | wc -l)"
echo "file inputs:       $(grep -o 'type="file"' "$J/ob.html" | wc -l)"
echo "links to /onboarding/<step>: $(grep -oE 'href="/en/onboarding/[a-z_]+' "$J/ob.html" | wc -l)"
echo "HubSpot mentions:  $(grep -o 'HubSpot' "$J/ob.html" | wc -l)"
echo "Google Sheets:     $(grep -oi 'Google Sheets' "$J/ob.html" | wc -l)"
echo "stub notice:       $(grep -o 'Nothing here is a real account' "$J/ob.html" | wc -l)"
echo "percent text:      $(grep -oE '[0-9]+% ' "$J/ob.html" | head -3 | tr '\n' ' ')"

h "P11 forged OAuth success (no server confirmation)"
curl -s "$B/en/connect/callback?provider=hubspot&status=success" | grep -oE 'Connected\. You can go back to the step\.|HubSpot' | sort | uniq -c
h "P11b unknown outcome"
curl -s "$B/en/connect/callback?provider=zzz&status=weird" | grep -oE 'could not complete the connection|the provider' | sort | uniq -c
h "P11c cancelled"
curl -s "$B/en/connect/callback?provider=email&status=error&reason=user_cancelled" | grep -oE 'You cancelled the connection\. Nothing has changed\.|Gmail' | sort | uniq -c

h "P12 Q&A with no target configured"
curl -si -X POST "$B/api/qa" -H 'Content-Type: application/json' -d '{"question":"What does Nuova do?","locale":"en"}' | grep -iE '^HTTP|"code"'

h "P13 legacy redirects"
for p in /legal-notice /privacy-policy /aviso-legal /politica-privacidad /live-demo /v2; do printf '%-22s ' "$p"; curl -sI "$B$p" | grep -iE '^(HTTP|location)' | tr '\r\n' '  '; echo; done

h "P14 sitemap / robots"
curl -s "$B/sitemap.xml" | grep -o '<loc>' | wc -l
curl -s "$B/sitemap.xml" | grep -oE '<loc>[^<]*(onboarding|login|signup|connect|legal)[^<]*' | head
curl -s "$B/robots.txt"

h "P15 stub-only endpoints and html lang"
curl -s "$B/es" | grep -oE '<html[^>]*lang="[a-z]+"' | head -1
curl -s "$B/en" | grep -oE '<html[^>]*lang="[a-z]+"' | head -1
echo "h1 count /en: $(curl -s "$B/en" | grep -o '<h1' | wc -l)   /es/trial: $(curl -s "$B/es/trial" | grep -o '<h1' | wc -l)"
echo "skip link /en: $(curl -s "$B/en" | grep -oiE 'href="#main"' | wc -l)"

h "P16 rate limit login (8/min)"
for i in $(seq 1 10); do curl -s -o /dev/null -w '%{http_code} ' -X POST "$B/api/bff/auth/login" -H 'Content-Type: application/json' -H 'X-Forwarded-For: 203.0.113.9' -d '{"email":"a@b.cd","password":"x"}'; done; echo
echo "spoofed XFF rotation:"; for i in $(seq 1 10); do curl -s -o /dev/null -w '%{http_code} ' -X POST "$B/api/bff/auth/login" -H 'Content-Type: application/json' -H "X-Forwarded-For: 198.51.100.$i" -d '{"email":"a@b.cd","password":"x"}'; done; echo

rm -rf "$J"
