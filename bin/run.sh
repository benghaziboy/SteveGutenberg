#!/bin/bash

docker-compose up -d wordpress 

# TODO: 
# 
# This is a workaround to prevent the wp-cli from running before the mysql
# application is available.
# 
# Ideally we should be checking the status until mysql is available.
sleep 10;
. ./bin/install.sh

npm run dev
