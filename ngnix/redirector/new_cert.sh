docker run --rm \
  -v $(pwd)/certs:/etc/letsencrypt \
  -v $(pwd)/html:/usr/share/nginx/html \
  certbot/certbot certonly --webroot \
  --webroot-path=/usr/share/nginx/html \
  -d www.ga-sporten.nl -d ga-sporten.nl \
  --email stolkie@gmail.com \
  --agree-tos \
  --non-interactive