#!/bin/sh
# Local (simulation) check of the BFF's own answers on the built commit: H1..H5 of API's contract.
# No intake environment is set here, so H1 answers "simulated" (the real "sent" + row is API's staging run).
set -u
ROOT=/c/Users/Usuario/Desktop/Nuovasolution
OUT=${1:-/c/Users/Usuario/AppData/Local/Temp/claude/d06aa7b2d3814af7/941acdf5-e980-442b-84bf-feb36682f07b/scratchpad/bff-consent-local-8159531.json}
PORT=3177
COMMIT=$(cd "$ROOT" && git rev-parse --short HEAD)
base="http://127.0.0.1:$PORT/api/pilot-request"
body_ok='{"agency":"Agencia Prueba F-e","name":"Prueba","email":"prueba@example.invalid","interest":"trial","message":"local check","locale":"es"'

start() { (cd "$ROOT" && env PORT=$PORT "$@" npx next start -p $PORT >/dev/null 2>&1 &) ; for i in $(seq 1 40); do curl -s -o /dev/null "http://127.0.0.1:$PORT/api/build" && return 0; sleep 1; done; echo "server did not start" >&2; return 1; }
stop() { for p in $(netstat -ano | grep ":$PORT " | grep LISTENING | awk '{print $5}' | sort -u); do taskkill //PID "$p" //F >/dev/null 2>&1; done; sleep 1; }
post() { curl -s -o /tmp/bff_body -w '%{http_code}' -H 'content-type: application/json' -X POST "$base" --data "$1"; }

stop
start || exit 1
h1=$(post "$body_ok,\"consent\":true}"); b1=$(cat /tmp/bff_body)
h2=$(post "$body_ok}"); b2=$(cat /tmp/bff_body)
h3=$(post "$body_ok,\"consent\":\"true\"}"); b3=$(cat /tmp/bff_body)
h4=$(post "$body_ok,\"consent\":true,\"web\":\"x\"}"); b4=$(cat /tmp/bff_body)
stop
start VERCEL_ENV=production || exit 1
h5=$(post "$body_ok,\"consent\":true}"); b5=$(cat /tmp/bff_body)
stop

cat > "$OUT" <<EOF
{
 "at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
 "website_commit": "$COMMIT",
 "mode": "local next start, no intake environment (simulation; the real intake run is API's)",
 "checks": [
  {"id":"H1","expected":"200 (here: simulated, no intake env; API's staging run: sent + row)","status":$h1,"body":$b1,"pass":$([ "$h1" = 200 ] && echo true || echo false)},
  {"id":"H2","expected":"422 fields [consent] from the BFF","status":$h2,"body":$b2,"pass":$([ "$h2" = 422 ] && echo true || echo false)},
  {"id":"H3","expected":"422 like H2 (consent as a string)","status":$h3,"body":$b3,"pass":$([ "$h3" = 422 ] && echo true || echo false)},
  {"id":"H4","expected":"200 simulated (honeypot)","status":$h4,"body":$b4,"pass":$([ "$h4" = 200 ] && echo true || echo false)},
  {"id":"H5","expected":"503 intake_unconfigured (production without intake)","status":$h5,"body":$b5,"pass":$([ "$h5" = 503 ] && echo true || echo false)}
 ]
}
EOF
cat "$OUT"
