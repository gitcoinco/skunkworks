#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import fcntl
import os
import sys
from configparser import ConfigParser

import psycopg2

from email_helper import EmailHelper
from generator import WallpaperGenerator

pid_file = 'worker.pid'
fp = open(pid_file, 'w')
try:
    fcntl.lockf(fp, fcntl.LOCK_EX | fcntl.LOCK_NB)
except IOError:
    # another instance is running
    print('Alredy running!')
    sys.exit(1)


PREVIEW_URL = "https://ethwallpaper.co/preview/"
IMAGES_PATH = "../backend/static/wallpapers/"
images = []
dir_path = os.path.dirname(os.path.realpath(__file__))

config = ConfigParser()
config_path = os.path.join(dir_path, '../config.ini')
config_path = os.path.normpath(config_path)
config.read(config_path)
pgconfig = {}

email_client = EmailHelper(config['sendgrid']['api_key'])

for param in config.items('postgresql'):
    pgconfig[param[0]] = param[1]

# Connect to an existing database
conn = psycopg2.connect(**pgconfig)
cur = conn.cursor()

cur.execute(
    "SELECT id, ext, logo_size, author_email FROM api_wallpaper WHERE status='Pending';")

images_done = []

while True:
    row = cur.fetchone()
    if row is None:
        break

    image = {
        "id": row[0],
        "ext": row[1],
        "logo_size": row[2],
        "author_email": row[3],
    }

    image_filename = "{}.{}".format(image['id'], image['ext'])
    preview_url = "{}{}".format(PREVIEW_URL, image['id'])
    image_path = os.path.join(dir_path, IMAGES_PATH, image_filename)
    image_path = os.path.normpath(image_path)
    generator = WallpaperGenerator(image_path, image_path, image['logo_size'])

    try:
        generator.generate()
        images_done.append(image['id'])

        if image['author_email']:
            email_client.send_email_for_wallpaper(
                image['author_email'], preview_url)

    except Exception as error:
        print(error)


update_sql = """ UPDATE api_wallpaper
            SET status='Active'
            WHERE id='{}'"""

# update processed images
for id in images_done:
    cur.execute(update_sql.format(id))

conn.commit()
cur.close()
conn.close()
