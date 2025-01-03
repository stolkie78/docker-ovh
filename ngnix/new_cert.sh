docker run --rm \
  -v $(pwd)/certs:/etc/letsencrypt \
  -v $(pwd)/html:/usr/share/nginx/html \
  certbot/certbot certonly --webroot \
  --webroot-path=/usr/share/nginx/html \
  -d www.stolkies.com -d stolkies.com \
  --email stolkie@gmail.com \
  --agree-tos \
  --non-interactive
