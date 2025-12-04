from PIL import Image
import sys
from pathlib import Path


def add_black_outline_1px(input_path: str, output_path: str | None = None) -> None:
    in_path = Path(input_path)
    if output_path is None:
        output_path = str(in_path.with_stem(in_path.stem + "_border"))

    img = Image.open(in_path).convert("RGBA")
    width, height = img.size

    # 元画像をベースに出力用をコピー
    out = img.copy()
    src = img.load()
    dst = out.load()

    # 8近傍（上下左右＋斜め）に1pxアウトラインを描く
    neighbors = [
        (-1, -1), (0, -1), (1, -1),
        (-1,  0),          (1,  0),
        (-1,  1), (0,  1), (1,  1),
    ]

    for y in range(height):
        for x in range(width):
            r, g, b, a = src[x, y]
            if a == 0:
                continue  # 完全透明はスキップ

            # 周りに「透明」か「画像外」のピクセルが1つでもあれば、ここを黒にする
            is_edge = False
            for dx, dy in neighbors:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    _, _, _, na = src[nx, ny]
                    if na == 0:
                        is_edge = True
                        break
                else:
                    # 画像の端も境界扱い
                    is_edge = True
                    break

            if is_edge:
                cr, cg, cb, _ = dst[x, y]
                dst[x, y] = (cr, cg, cb, 0)

    out.save(output_path)
    print(f"Saved outlined image to: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python add_border.py input_image [output_image]")
        sys.exit(1)

    input_image = sys.argv[1]
    output_image = sys.argv[2] if len(sys.argv) >= 3 else None

    add_black_outline_1px(input_image, output_image)