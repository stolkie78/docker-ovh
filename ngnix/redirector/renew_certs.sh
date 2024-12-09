#!/bin/bash
docker run --rm -v $(pwd)/certs:/etc/letsencrypt -v $(pwd)/html:/usr/share/nginx/html certbot/certbot renew

echo "CRONTAB"
echo docker run --rm -v $(pwd)/certs:/etc/letsencrypt -v $(pwd)/html:/usr/share/nginx/html certbot/certbot renew

