import subprocess
import os

src_path = "/home/yash-jadhav/text_handwriting/src/server/uploads"
dst_path = "/home/yash-jadhav/text_handwriting/src/server/uploads/pnm"

os.makedirs(dst_path, exist_ok= True)

for file in os.listdir(src_path):
    print(file)
    if file.lower().endswith("png"):
        pnm_name = file.split('.')[0]
        pnm_dst_path = os.path.join(dst_path, f"{pnm_name}.pnm")
        pnm_cmd = subprocess.run(["convert", f"{os.path.join(src_path,file)}", f"{pnm_dst_path}"])
        if os.path.exists(pnm_dst_path):
            print(f"{pnm_dst_path} created")
