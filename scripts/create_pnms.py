import subprocess
import os

src_path = "/home/yash-jadhav/extract_letters/letters"
dst_path = "/home/yash-jadhav/extract_letters/letters/pnm"


for file in os.listdir(src_path):
    if file.lower().endswith("png"):
        pnm_name = file.split('.')[0]
        pnm_dst_path = os.path.join(dst_path, f"{pnm_name}.pnm")
        pnm_cmd = subprocess.run(["convert", f"{os.path.join(src_path,file)}", f"{pnm_dst_path}"])
        if os.path.exists(pnm_dst_path):
            print(f"{pnm_dst_path} created")
