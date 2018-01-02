#!/usr/bin/env python3

import sys

from generator import WallpaperGenerator

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("error: missing arguments")
        print("usage: ./main.py INPUT_IMAGE OUTPUT_IMAGE [ETH_SCALE]")
        sys.exit(0)

    if not os.path.isfile(sys.argv[1]):
        print("error: cannot open input file")
        sys.exit(0)

    ratio = 1
    if len(sys.argv) > 3:
        ratio = float(sys.argv[3])

    generator = WallpaperGenerator(sys.argv[1], sys.argv[2], ratio)
    generator.generate()
