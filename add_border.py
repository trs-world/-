from __future__ import annotations

from pathlib import Path
import sys

from PIL import Image


def add_black_border_1px(input_path: str, output_path: str | None = None) -> None:
    """透過している外側1ピクセルだけを黒で縁取る。

    - RGBA 画像を前提とし、アルファ 0 のピクセルを「透明」とみなす。
    - 透明ピクセルの8近傍のどこかに不透明ピクセルがあれば、その透明ピクセルを黒(0,0,0,255)にする。
    - 元画像の不透明ピクセル自体の色は変えない（外側だけ黒で縁取る）。
    """

    in_path = Path(input_path)
    if output_path is None:
        output_path = str(in_path.with_stem(in_path.stem + "_blackborder"))

    img = Image.open(in_path).convert("RGBA")
    width, height = img.size

    src = img.load()
    out = img.copy()
    dst = out.load()

    # 8近傍（上下左右＋斜め）
    neighbors = [
        (-1, -1), (0, -1), (1, -1),
        (-1,  0),          (1,  0),
        (-1,  1), (0,  1), (1,  1),
    ]

    for y in range(height):
        for x in range(width):
            r, g, b, a = src[x, y]

            # 透明ピクセルだけを対象にする
            if a != 0:
                continue

            # 近傍に不透明ピクセルがあれば、この透明ピクセルを黒で塗る
            touches_opaque = False
            for dx, dy in neighbors:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    _, _, _, na = src[nx, ny]
                    if na != 0:
                        touches_opaque = True
                        break

            if touches_opaque:
                dst[x, y] = (0, 0, 0, 255)

    out.save(output_path)
    print(f"Saved black-bordered image to: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python add_black_border.py input_image [output_image]")
        sys.exit(1)

    input_image = sys.argv[1]
    output_image = sys.argv[2] if len(sys.argv) >= 3 else None

    add_black_border_1px(input_image, output_image)
