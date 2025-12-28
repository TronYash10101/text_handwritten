from fastapi import FastAPI, UploadFile, File
from typing import List
import os
import subprocess
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.responses import RedirectResponse

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

CANVAS_DIR = "/home/yash-jadhav/text_handwriting/src/canvas/builds"
FONTS_DIR = "/home/yash-jadhav/text_handwriting/src/server/uploads/svg/fonts"
STATIC_DIR = os.path.join(BASE_DIR, "static_files")
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files
print(CANVAS_DIR)
app.mount("/canvas", StaticFiles(directory=CANVAS_DIR), name="canvas")
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/fonts", StaticFiles(directory=FONTS_DIR), name="fonts")


def run_pipeline():
    base = os.path.dirname(os.path.abspath(__file__))

    subprocess.run(
        ["python3", "scripts/create_pnms.py"],
        cwd=base,
        check=True
    )

    subprocess.run(
        ["python3", "scripts/create_svgs.py"],
        cwd=base,
        check=True
    )

    subprocess.run(
        ["fontforge", "-script", "scripts/create_font.py"],
        cwd=base,
        check=True
    )

@app.get("/upload_page")
def render_upload_page():
    return FileResponse(os.path.join(STATIC_DIR, "upload_letters.html"))

@app.get("/writer_page")
def render_writer_page():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))


@app.post("/upload")
async def upload_letters(files: List[UploadFile] = File(...)):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    for file in files:
        print("Received:", file.filename, file.content_type)

        name, ext = os.path.splitext(file.filename)

        if file.content_type != "image/png" or ext.lower() != ".png":
            print("Skipping non-png:", file.filename)
            continue

        filepath = os.path.join(UPLOAD_DIR, f"{name}.png")

        data = await file.read()
        with open(filepath, "wb") as f:
            f.write(data)

    run_pipeline()

    return RedirectResponse(url="/writer_page", status_code=303)
