#!/usr/bin/env bash
# Re-review probes for 2089094. Local hosts only: :3107 stub build, :3108 same build with VERCEL_ENV=production,
# :3997 reviewer's own Q&A contract mock. Each block re-uses the original 2026-09-21 reproduction input.
A=http://localhost:3107; P=http://localhost:3108; J=$(mktemp -d)
h() { echo; echo "=== $1"; }
for u in $A/en $P/en; do for i in $(seq 1 60); do curl -s -o /dev/null "$u" && break; sleep 1; done; done
echo "UTC $(date -u +%FT%TZ)"

h "WR-05 open redirect (original inputs + variants), expect same-origin locale path only"
for n in '/%5Cevil.example/x' '/%09/evil.example' '//evil.example' 'https://evil.example/' '/en/../../evil' '/es/onboarding?x=1'; do
  printf '%-24s -> ' "$n"; curl -sI "$A/api/bff/auth/login?stub=1&next=$n" | grep -i '^location' | tr -d '\r'; done

h "WR-06 stub account surfaces with VERCEL_ENV=production (:3108)"
printf 'GET ?stub=1        '; curl -s -o /dev/null -w '%{http_code}\n' "$P/api/bff/auth/login?stub=1"
printf 'POST login any     '; curl -s -w ' %{http_code}\n' -X POST "$P/api/bff/auth/login" -H 'Content-Type: application/json' -d '{"email":"x@y.zz","password":"x"}'
printf 'POST signup        '; curl -s -w ' %{http_code}\n' -X POST "$P/api/bff/signup" -H 'Content-Type: application/json' -d '{"name":"R","email":"r@e.io","password":"12345678","language":"en","agency_name":"R"}'
printf 'POST case          '; curl -s -o /dev/null -w '%{http_code}\n' -X POST "$P/api/bff/onboarding/case" -H 'Content-Type: application/json' -d '{"case":3}'
printf 'signup page notice '; curl -s "$P/en/signup" | grep -oiE 'not available|stub|Demonstration only' | sort | uniq -c | tr '\n' ' '; echo
echo "control (:3107 default stub, preview-like):"; printf 'POST login any     '; curl -s -o /dev/null -w '%{http_code}\n' -X POST "$A/api/bff/auth/login" -H 'Content-Type: application/json' -d '{"email":"x@y.zz","password":"x"}'

h "WR-19 cross-origin state-changing POSTs, expect 403"
for r in auth/login auth/logout signup crm/select onboarding/touch tenant/activate; do printf '%-18s ' "$r"; curl -s -o /dev/null -w '%{http_code}\n' -X POST "$A/api/bff/$r" -H 'Content-Type: text/plain' -H 'Origin: https://evil.example' -H 'Cookie: nuova_session=stub' -d '{"email":"a@b.cd","password":"x","provider":"google_sheets","intent":"select","step":"crm","action":"visit"}'; done
printf '%-18s ' "qa"; curl -s -o /dev/null -w '%{http_code}\n' -X POST "$A/api/qa" -H 'Origin: https://evil.example' -H 'Content-Type: application/json' -d '{"question":"hi"}'

h "WR-12 logout clears refresh cookie on its own path; login stores no refresh token"
curl -si -X POST "$A/api/bff/auth/logout" -H 'Cookie: nuova_session=stub' | grep -i '^set-cookie' | tr -d '\r'
curl -si -X POST "$A/api/bff/auth/login" -H 'Content-Type: application/json' -d '{"email":"a@b.cd","password":"x"}' | grep -ci 'nuova_refresh' | sed 's/^/refresh cookies set on login: /'

h "WR-09 forged OAuth success, expect no success claim"
curl -s "$A/en/connect/callback?provider=hubspot&status=success" > $J/cb.html
echo "Connected-claim: $(grep -c 'Connected. You can go back' $J/cb.html)  HubSpot echoed: $(grep -o 'HubSpot' $J/cb.html | wc -l)"
grep -oE '<p role="status"[^>]*>.{0,40}[^<]{0,200}' $J/cb.html | sed -E 's/<[^>]+>//g' | head -2
curl -s "$A/en/connect/callback?provider=email&status=error&reason=user_cancelled" | grep -oE 'You cancelled[^<]{0,80}' | head -1

h "WR-10 / WR-01 onboarding (stub case 3): controls and CRM catalog states"
curl -s -b 'nuova_session=stub; nuova_stub_case=3' "$A/en/onboarding" > $J/ob.html
echo "bytes $(wc -c < $J/ob.html)  input:$(grep -o '<input' $J/ob.html | wc -l) select:$(grep -o '<select' $J/ob.html | wc -l) file:$(grep -o 'type="file"' $J/ob.html | wc -l) radio:$(grep -o 'type="radio"' $J/ob.html | wc -l) button:$(grep -o '<button' $J/ob.html | wc -l)"
for w in 'Google Sheets' 'Coming soon' 'HubSpot' 'GoHighLevel' 'Airtable' 'Connect HubSpot' 'Waiting on HubSpot' 'Demonstration only'; do printf '%-20s %s\n' "$w" "$(grep -o "$w" $J/ob.html | wc -l)"; done
curl -s -b 'nuova_session=stub' "$A/api/bff/crm/catalog" | head -c 900; echo
echo "select coming_soon as 'select' (expect 409): $(curl -s -o /dev/null -w '%{http_code}' -X POST $A/api/bff/crm/select -H 'Content-Type: application/json' -b 'nuova_session=stub' -d '{"provider":"hubspot","intent":"select"}')"
echo "interest unavailable (expect 409):          $(curl -s -o /dev/null -w '%{http_code}' -X POST $A/api/bff/crm/select -H 'Content-Type: application/json' -b 'nuova_session=stub' -d '{"provider":"gohighlevel","intent":"interest"}')"
echo "select without session (expect 401):        $(curl -s -o /dev/null -w '%{http_code}' -X POST $A/api/bff/crm/select -H 'Content-Type: application/json' -d '{"provider":"google_sheets","intent":"select"}')"
echo "client_id smuggled in body (field ignored?): $(curl -s -X POST $A/api/bff/crm/select -H 'Content-Type: application/json' -b 'nuova_session=stub' -d '{"provider":"google_sheets","intent":"select","client_id":"other_tenant","p_actor_subject":"x"}' | head -c 200)"

h "WR-11 raw gate keys in rendered onboarding (all six stub cases, EN+ES)"
for c in 1 2 3 4 5 6; do for l in en es; do n=$(curl -s -b "nuova_session=stub; nuova_stub_case=$c" "$A/$l/onboarding" | grep -oE '\b(white_label_legal|ai_disclosure|business_hours|routing_mode|test_scenarios|launch_approval|staff_provisioned|owner_admin|agency_tenant|plan_entitlements|lead_acquisition|property_source|property_experience)\b' | wc -l); printf 'case %s %s: %s  ' $c $l $n; done; echo; done
echo "(counts include HTML attributes such as id=step-...; see visible-text check below)"
curl -s -b 'nuova_session=stub; nuova_stub_case=1' "$A/en/onboarding" | sed -E 's/<script[^>]*>.*<\/script>//g; s/<[^>]+>/\n/g' | grep -E '\b(white_label_legal|ai_disclosure|business_hours|routing_mode|test_scenarios|launch_approval|staff_provisioned)\b' | head -5 | sed 's/^/VISIBLE: /'

h "WR-22 percentage number on onboarding"
for c in 2 3; do curl -s -b "nuova_session=stub; nuova_stub_case=$c" "$A/en/onboarding" | sed -E 's/<!-- -->//g' | grep -oE '[0-9]{1,3} ?% ?(complete|completo)' | head -2; done; echo "(empty = none)"

h "WR-02 Q&A disclosure strings in built output"
grep -rl --include='*.js' --include='*.html' -F 'Nothing you type here is stored with a client record' "$WT/.next" 2>/dev/null | wc -l | sed 's/^/old sentence files: /'

h "WR-04 forbidden claims on built pages (EN + ES, all routes in sitemap)"
for u in $(curl -s $A/sitemap.xml | grep -oE '<loc>[^<]+' | sed 's/<loc>//; s#https://[^/]*##'); do curl -s "$A$u"; done > $J/all.html
for p in '21 days' '21 días' 'hot lead' 'Hot lead' 'lead caliente' 'Nine languages' 'nine languages' 'nueve idiomas' 'Nueve idiomas' 'three properties' 'tres propiedades' 'Always synced' 'No setup needed' 'scored from 1 to 100'; do printf '%-22s %s\n' "$p" "$(grep -o "$p" $J/all.html | wc -l)"; done
echo "pages scanned: $(curl -s $A/sitemap.xml | grep -o '<loc>' | wc -l)"

h "WR-21 sitemap"
curl -s $A/sitemap.xml | grep -oE '<loc>[^<]+' | sed 's/<loc>//' | grep -E 'legal|onboarding|login|signup|connect' | head; echo "(legal/auth entries above; empty = none)"; curl -s $A/sitemap.xml | grep -oE '<loc>https?://[^/]+' | sort -u

h "WR-07 / WR-08 Q&A transport against reviewer mock (:3997)"
curl -s -c $J/qa -b $J/qa -X POST "$A/api/qa" -H 'Content-Type: application/json' -H "Origin: $A" -d '{"question":"Does Nuova work with WhatsApp?","locale":"en","contact":"visitor@example.invalid"}' > $J/qa1.json; cat $J/qa1.json; echo
MID=$(grep -oE 'web_[a-f0-9]{24}' $J/qa1.json | head -1)
for i in 1 2 3; do curl -s -b $J/qa "$A/api/qa/result?message_id=$MID"; echo; sleep 1; done
echo "other visitor (no cookie) reads same id: $(curl -s -o /dev/null -w '%{http_code}' "$A/api/qa/result?message_id=$MID")"
echo "foreign session cookie reads same id:    $(curl -s -b 'nuova_qa_session=s_00000000000000000000000000000000' "$A/api/qa/result?message_id=$MID")"

h "WR-25 test script / WR-28 stray files"
grep -o '"test:e2e": "[^"]*"' "$WT/package.json"; ls /c/Users/Usuario/Desktop/Nuovasolution/ | grep -c 'screenshots\$' | sed 's/^/stray PNGs in main repo root: /'

h "Security headers + client bundle secret scan (build 2089094)"
curl -sI $A/en | grep -iE '^(content-security-policy|strict-transport|x-frame|x-content)' | cut -c1-120
echo "client chunks: $(find "$WT/.next/static" -name '*.js' | wc -l)"
for p in QA_TENANT HMAC_SECRET SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE service_role SUPABASE_URL sb_secret_ sb_publishable_ eyJhbGciOi fflmmzapksycjfdcjdtd ckxqzfoukcacvqzpagcm OWNER_RELEASED_PRODUCTION NUOVA_STAGING_TARGET_APPROVED createHmac x-nuova-signature n8n.cloud /webhook/; do printf '%-32s %s\n' "$p" "$(grep -rl --include='*.js' -F "$p" "$WT/.next/static" | wc -l)"; done
rm -rf $J
