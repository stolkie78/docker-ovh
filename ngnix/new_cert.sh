docker run --rm \
  -v $(pwd)/certs:/etc/letsencrypt \
  -v $(pwd)/html:/usr/share/nginx/html \
  certbot/certbot certonly --webroot \
  --webroot-path=/usr/share/nginx/html \
  -d www.victorybeach.nl -d victorybeach.nl \
  --email stolkie@gmail.com \
  --agree-tos \
  --non-interactive
