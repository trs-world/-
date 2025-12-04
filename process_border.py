import os
import subprocess
import sys


def process_image(filename: str) -> None:
    """Run del_border.py then add_border.py on the given filename.

    Expected behavior (per user spec):
    - `python del_border.py <filename>`
        - deletes `<filename>`
        - renames `<name>_border.png` to `<filename>`
    - `python add_border.py <filename>`
        - deletes `<filename>`
        - renames `<name>_blackborder.png` to `<filename>`
    """

    if not os.path.exists(filename):
        print(f"[ERROR] File not found: {filename}")
        sys.exit(1)

    # 1) del_border.py
    print(f"[INFO] Running del_border.py {filename}")
    result = subprocess.run(
        [sys.executable, "del_border.py", filename],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    print(result.stdout)
    if result.returncode != 0:
        print("[ERROR] del_border.py failed")
        sys.exit(result.returncode)

    if not os.path.exists(filename):
        print(f"[ERROR] After del_border.py, {filename} does not exist.")
        sys.exit(1)

    # 2) add_border.py
    print(f"[INFO] Running add_border.py {filename}")
    result = subprocess.run(
        [sys.executable, "add_border.py", filename],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    print(result.stdout)
    if result.returncode != 0:
        print("[ERROR] add_border.py failed")
        sys.exit(result.returncode)

    if not os.path.exists(filename):
        print(f"[ERROR] After add_border.py, {filename} does not exist.")
        sys.exit(1)

    print(f"[DONE] Finished processing {filename}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python process_border.py <画像ファイル名>")
        sys.exit(1)

    target = sys.argv[1]
    process_image(target)
