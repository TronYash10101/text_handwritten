from typing import Annotated
from fastapi import FastAPI, UploadFile, HTTPException, Request
from fastapi.staticfiles import StaticFiles
import os
import shutil

app = FastAPI()
curr_dir = os.getcwd()
local_font_path = os.path.join(curr_dir,"fonts")
os.makedirs(local_font_path, exist_ok = True)

@app.mount("/", StaticFiles(directory=os.path.join(curr_dir,"../static_files")), name = "typing_html")

@app.post("/upload_font")
async def recieve_font_png(file : UploadFile):
    font_name = file.filename

    if file.content_type != "image/png":
        raise HTTPException(status_code=422, detail="Only PNGs are allowed to be uploaded")
    
    with open(os.path.join(local_font_path,f"{font_name}"), "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)


    return {"response" : "Copied file to local system"}



