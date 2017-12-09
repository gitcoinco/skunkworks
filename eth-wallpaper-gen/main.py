#!/usr/bin/env python3

import os
import sys
from PIL import Image, ImageDraw
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon


# relative polygon co-ordinates
magics = {
    "top-left":     [(0.498, 0.183), (0.393, 0.445), (0.498, 0.538), (0.498, 0.183)],
    "top-right":    [(0.498, 0.183), (0.604, 0.445), (0.498, 0.538), (0.498, 0.183)],
    "bottom-left":  [(0.392, 0.472), (0.498, 0.567), (0.498, 0.697), (0.392, 0.472)],
    "bottom-right": [(0.605, 0.472), (0.498, 0.567), (0.498, 0.697), (0.605, 0.472)],
}

# mirror directions
mirrors = {
    "top-left":     "bottom-right",
    "top-right":    "bottom-left",
    "bottom-left":  "top-right",
    "bottom-right": "top-left",
}

def scale(ms, width, height):
    """
    Used to convert an array of relative polygon co-ordinates into a absolute
    values by scaling it, given the width and the height of the image.

    :param ms:     relative polygon co-ordinates as an array of tuples
    :param width:  width of the image
    :param height: height of the image
    :return:       absolute polygon co-ordinates as an array of tuples
    """
    return [(x*width, y*height) for (x, y) in ms]

def load_image(filename):
    """
    Loads an image and pre-processes it before embedding the logo.

    :param filename: the input file
    :return:         a PIL `Image`
    """
    im = Image.open(filename)
    width, height = im.size

    m = 1920.00/1266;
    if width/height > m:
        diff = width - (m*height)
        im = im.crop((diff/2, 0, m*height, height))
    else:
        diff = height - width/m
        im = im.crop((0, diff/2, width, width/m))

    im.convert("RGB")
    return im

def draw_outline(im, magic):
    """
    Draw an outline of the Ethereum logo with a white-ish color.

    :param im:    the input PIL image
    :param magic: the current polygon being drawn
    """
    width, height = im.size
    drw = ImageDraw.Draw(im, "RGBA")
    fill_color = (180, 180, 180, 255)

    for i in range(len(magic)):
        j = (i+1)%len(magic)
        drw.line(
            (width*magic[i][0], height*magic[i][1], width*magic[j][0], height*magic[j][1]),
            fill=fill_color)

    del drw

def main(input_filename, output_filename):
    """
    Program main logic. Accepts an input file and produces output in another file.

    :param input_filename:  input file path
    :param output_filename: output file path
    """
    im = load_image(input_filename)
    pixels = im.load()
    width, height = im.size

    todo, done, mul = height*len(magics), 0, 1

    for _, magic in magics.items():
        # move pixels to each 
        magic_polygon = Polygon(scale(magic, width, height))
        for x in range(height):
            for y in range(width):
                if magic_polygon.contains(Point(x, y)):
                    other = magics[mirrors[_]]
                    x_trans = int((other[0][0] - magic[0][0])*width)
                    y_trans = int((other[0][1] - magic[0][1])*height)
                    v = pixels[x+x_trans, y+y_trans]
                    pixels[x, y] = (int(v[0]*0.8), int(v[1]*0.8), int(v[2]*0.8))

            # update progress to console
            done += 1
            if done == int(todo*mul/10):
                sys.stdout.write("{}%... ".format(mul*10))
                sys.stdout.flush()
                mul += 1

        draw_outline(im, magic)
    print("")

    im.save(output_filename)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("error: missing arguments")
        print("usage: ./main.py INPUT_IMAGE OUTPUT_IMAGE")

    if not os.path.isfile(sys.argv[1]):
        print("error: cannot open input file")

    main(sys.argv[1], sys.argv[2])
