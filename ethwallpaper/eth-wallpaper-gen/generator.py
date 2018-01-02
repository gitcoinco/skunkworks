import math
import sys

from PIL import Image, ImageDraw, ImageFont, ImageEnhance
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon


class WallpaperGenerator(object):

    """
    Class for generating Eth Wallpapers
    """
    # mirror directions
    mirrors = {
        "top-left":     "bottom-right",
        "top-right":    "bottom-left",
        "bottom-left":  "top-right",
        "bottom-right": "top-left",
    }

    WATERMARK = "ethwallpaper.co"
    FONT = "Aquabase.ttf"
    WATERMARK_OPACITY = 0.3
    WATERMARK_RATIO = 50

    def __init__(self, input_filename, output_filename, eth_scale=1):
        """
        :param input_filename:  input file path
        :param output_filename: output file path
        :param eth_scale:       a multiplier for the Ethereum logo
        """

        # relative polygon co-ordinates
        self.magics = {
            "top-left":     [(0.500, 0.183), (0.393, 0.445), (0.500, 0.538), (0.500, 0.183)],
            "top-right":    [(0.500, 0.183), (0.604, 0.445), (0.500, 0.538), (0.500, 0.183)],
            "bottom-left":  [(0.392, 0.472), (0.500, 0.567), (0.500, 0.697), (0.392, 0.472)],
            "bottom-right": [(0.605, 0.472), (0.500, 0.567), (0.500, 0.697), (0.605, 0.472)],
        }

        self._input_filename = input_filename
        self._output_filename = output_filename
        self._eth_scale = eth_scale
        self._image = None

    def scale(self, magic, width, height):
        """
        Used to convert an array of relative polygon co-ordinates into a absolute
        values by scaling it, given the width and the height of the image.

        :param magic:  relative polygon co-ordinates as an array of tuples
        :param width:  width of the image
        :param height: height of the image
        :return:       absolute polygon co-ordinates as an array of tuples
        """
        resized_magic = []
        for x, y in magic:
            dist = ((y - 0.5)**2 + (x - 0.5)**2)**0.5
            sin = (y - 0.5) / dist
            cos = (x - 0.5) / dist
            dist *= self._eth_scale
            resized_magic.append((dist * cos + 0.5, dist * sin + 0.5))

        return [(x * width, y * height) for (x, y) in resized_magic]

    def filter(self, pix):
        """
        Applies a filter on a given pixel.

        :param pix: the pixel to process
        :return:  the processed version of the pixel
        """
        limit = lambda x: int(min(x * 1.3, 255))
        return tuple([limit(x) for x in pix])

    def load_image(self):
        """
        Loads an image and pre-processes it before embedding the logo.
        """
        Image.MAX_IMAGE_PIXELS = None
        self._image = Image.open(self._input_filename)
        width, height = self._image.size

        m = 1920.00 / 1266
        if width / height > m:
            diff = width - (m * height)
            self._image = self._image.crop((diff / 2, 0, m * height, height))
        else:
            diff = height - width / m
            self._image = self._image.crop((0, diff / 2, width, width / m))

        self._image.convert("RGB")

    def draw_outline(self, magic):
        """
        Draw an outline of the Ethereum logo with a white-ish color.

        :param magic: the current polygon being drawn
        """
        drw = ImageDraw.Draw(self._image, "RGBA")
        fill_color = (180, 180, 180, 255)

        for i in range(len(magic)):
            j = (i + 1) % len(magic)
            drw.line(
                (magic[i][0], magic[i][1], magic[j][0], magic[j][1]),
                fill=fill_color)

        del drw

    def add_watermark(self):
        """
        Apply watermark to the wallpaper
        """

        watermark = Image.new('RGBA', self._image.size, (0, 0, 0, 0))
        size = int(watermark.size[0] / self.WATERMARK_RATIO)
        n_font = ImageFont.truetype(self.FONT, size)

        n_width, n_height = n_font.getsize(self.WATERMARK)

        draw = ImageDraw.Draw(watermark, 'RGBA')
        draw.text(((watermark.size[0] - n_width * 1.2),
                   (watermark.size[1] - n_height * 1.2)),
                  self.WATERMARK, font=n_font)

        alpha = watermark.split()[3]
        alpha = ImageEnhance.Brightness(alpha).enhance(self.WATERMARK_OPACITY)
        watermark.putalpha(alpha)
        return Image.composite(watermark, self._image, watermark)

    def generate(self):
        """
        Generate wallpaper
        """
        self.load_image()

        pixels = self._image.load()
        width, height = self._image.size

        for _, magic in self.magics.items():
            self.magics[_] = self.scale(magic, width, height)

        done, mul = 0, 1
        sys.stdout.write("0%... ")
        sys.stdout.flush()

        for _, magic in self.magics.items():
            # move pixels to each
            magic_polygon = Polygon(magic)
            (min_x, min_y, max_x, max_y) = magic_polygon.bounds
            todo = math.ceil(max_x) - math.floor(min_x)
            for x in range(math.floor(min_x), math.ceil(max_x)):
                for y in range(math.floor(min_y), math.ceil(max_y)):
                    if magic_polygon.contains(Point(x, y)):
                        other = self.magics[self.mirrors[_]]
                        x_trans = int(other[0][0] - magic[0][0])
                        y_trans = int(other[0][1] - magic[0][1])
                        v = pixels[x + x_trans, y + y_trans]
                        pixels[x, y] = self.filter(v)

                # update progress to console
                done += 1
                if done == int(todo * mul / 10 * 4):
                    sys.stdout.write("{}%... ".format(mul * 10))
                    sys.stdout.flush()
                    mul += 1

            self.draw_outline(magic)
        print("")
        magic_polygon = None
        self.add_watermark().save(self._output_filename)
