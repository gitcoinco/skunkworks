#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER ethuser WITH PASSWORD 'ethpassword' CREATEDB;
    CREATE DATABASE ethwallpaper;
    GRANT ALL PRIVILEGES ON DATABASE ethwallpaper TO ethuser;
EOSQL
