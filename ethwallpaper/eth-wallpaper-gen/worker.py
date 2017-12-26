#!/usr/bin/env python3

import os
import email_helper
from generator import WallpaperGenerator

import psycopg2

PREVIEW_URL = "https://ethwallpaper.co/preview/"
IMAGES_PATH = "../backend/static/wallpapers/"


# Connect to an existing database
conn = psycopg2.connect(
    "dbname=ethwallpaper user=postgres host=127.0.0.1")

# Open a cursor to perform database operations
cur = conn.cursor()

# Query the database and obtain data as Python objects
cur.execute("SELECT * FROM api_wallpapers WHERE status='Pending';")
cur.fetchone()

# Make the changes to the database persistent
conn.commit()

# Close communication with the database
cur.close()
conn.close()

# load pending images
images = []

# loop through emages, process them and send email

for image in images:
    image_filename = "{}.{}".format(image['id'], image['ext'])
    preview_url = "{}{}.{}".format(PREVIEW_URL, image['id'], image['ext'])

    dir_path = os.path.dirname(os.path.realpath(__file__))
    image_path = os.path.join(dir_path, IMAGES_PATH, image_filename)

    image_path = os.path.normpath(image_path)

    generator = WallpaperGenerator(image_path, image_path, image['ratio'])
    generator.generate()
    email_helper.send_email_for_wallpaper(
        image['email'], preview_url)
