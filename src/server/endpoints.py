from fastapi import FastAPI, UploadFile, File
from typing import List
import os
import subprocess
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def run_pipeline():
    subprocess.run(["python3", "scripts/create_pnms.py"], check=True)
    subprocess.run(["python3", "scripts/create_svgs.py"], check=True)
    subprocess.run(["fontforge", "-script", "scripts/create_font.py"], check=True)

@app.post("/upload")
async def upload_letters(files: List[UploadFile] = File(...)):
    os.makedirs("uploads", exist_ok=True)

    for file in files:
        data = await file.read()
        with open(f"uploads/{file.filename}", "wb") as f:
            f.write(data)

    run_pipeline()

    return {"status": "font created"}

