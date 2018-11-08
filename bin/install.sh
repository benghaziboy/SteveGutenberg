#!/bin/bash

if [[ -z "$WP_URL" ]]; then
  WP_URL="http://localhost:8888"
fi

if [[ -z "$WP_TITLE" ]]; then
  WP_TITLE="SteveLand"
fi

if [[ -z "$WP_USER" ]]; then
  WP_USER="admin"
fi

if [[ -z "$WP_PASSWORD" ]]; then
  WP_PASSWORD="very_weak_password"
fi

if [[ -z "$WP_EMAIL" ]]; then
  WP_EMAIL="email@example.com"
fi

docker-compose run cli /bin/bash -c "wp core install --url=${WP_URL} --title=${WP_TITLE} --admin_user=${WP_USER} --admin_password=${WP_PASSWORD} --admin_email=${WP_EMAIL} &&
  wp plugin activate gutenberg &&
  wp plugin activate SteveGutenberg"
