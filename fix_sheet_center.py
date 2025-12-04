from pathlib import Path

from PIL import Image


def center_sprite_sheet(path: Path, frames: int = 4) -> Path:
    """Horizontally center each frame of a 1xN sprite sheet.

    - Assumes the sheet is laid out horizontally: [f0][f1][f2][f3]
    - Detects non-transparent area per frame and recenters it
    - Outputs `<name>_centered.png` next to the original
    """

    img = Image.open(path).convert("RGBA")
    sheet_w, sheet_h = img.size

    if sheet_w % frames != 0:
        raise ValueError(f"Image width {sheet_w} is not divisible by frames={frames}.")

    frame_w = sheet_w // frames
    frame_h = sheet_h

    # New canvas with same overall size
    out = Image.new("RGBA", (sheet_w, sheet_h), (0, 0, 0, 0))

    for i in range(frames):
        # Crop one frame
        left = i * frame_w
        right = left + frame_w
        frame = img.crop((left, 0, right, frame_h))

        # Find bounding box of non-transparent pixels
        alpha = frame.split()[3]
        bbox = alpha.getbbox()

        if not bbox:
            # Empty frame, just paste as-is
            out.paste(frame, (left, 0))
            continue

        fx0, fy0, fx1, fy1 = bbox
        content = frame.crop((fx0, fy0, fx1, fy1))
        content_w, content_h = content.size

        # Target center: middle of the frame
        target_cx = frame_w // 2
        # Current center of the content
        current_cx = (fx0 + fx1) // 2
        shift_x = target_cx - current_cx

        # Compute new left/top inside this frame region
        new_left_in_frame = fx0 + shift_x
        # Clamp so we don't go out of bounds
        new_left_in_frame = max(0, min(frame_w - content_w, new_left_in_frame))
        new_top_in_frame = max(0, min(frame_h - content_h, fy0))

        # Paste onto the output sheet at global coordinates
        out_x = left + int(new_left_in_frame)
        out_y = int(new_top_in_frame)
        out.paste(content, (out_x, out_y), mask=content)

    out_path = path.with_name(path.stem + "_centered" + path.suffix)
    out.save(out_path)
    return out_path


def main() -> None:
    import sys

    if len(sys.argv) < 2:
        print("Usage: python fix_sheet_center.py <sheet.png> [frames=4]")
        sys.exit(1)

    img_path = Path(sys.argv[1])
    if not img_path.exists():
        print(f"File not found: {img_path}")
        sys.exit(1)

    frames = int(sys.argv[2]) if len(sys.argv) >= 3 else 4

    out_path = center_sprite_sheet(img_path, frames)
    print(f"Saved centered sheet to: {out_path}")


if __name__ == "__main__":
    main()
