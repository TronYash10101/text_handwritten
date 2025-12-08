import subprocess
import os

# curr_dir = os.getcwd()
svg_dir = "/home/yash-jadhav/extract_letters/letters/svg"
pnm_dir = "/home/yash-jadhav/extract_letters/letters/pnm"

# Create svgs folder if it doesn't exist
os.makedirs(svg_dir, exist_ok=True)
os.makedirs(pnm_dir, exist_ok=True)

# all_files = os.listdir(curr_dir)

for pnm in os.listdir(pnm_dir):
    if pnm.lower().endswith("pnm"):
        svg_name = pnm.split('.')[0]
        svg_src_path = os.path.join(pnm_dir, pnm)
        svg_dst_path = os.path.join(svg_dir, f"{svg_name}.svg")
        svg_cmd = subprocess.run(["potrace", "-s", "-o", f"{svg_dst_path}", f"{svg_src_path}"])

