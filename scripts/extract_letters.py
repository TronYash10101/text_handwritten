import cv2
import os
import numpy as np

# ---------- CONFIG ----------
IMAGE_PATH = "./letter.png"
OUTPUT_DIR = "extracted_letters"
MIN_AREA = 300   # filters tiny noise
PADDING = 10     # space around each letter
# ----------------------------

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load image
image = cv2.imread(IMAGE_PATH)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Invert + threshold
_, binary = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)

# Find contours (each letter)
contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Sort by left-to-right, top-to-bottom
contours = sorted(contours, key=lambda c: (cv2.boundingRect(c)[1] // 100, cv2.boundingRect(c)[0]))

count = 0

for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)

    if w * h < MIN_AREA:
        continue

    # Add padding
    x1 = max(x - PADDING, 0)
    y1 = max(y - PADDING, 0)
    x2 = min(x + w + PADDING, image.shape[1])
    y2 = min(y + h + PADDING, image.shape[0])

    letter_crop = image[y1:y2, x1:x2]

    filename = f"letter_{count:03d}.png"
    cv2.imwrite(os.path.join(OUTPUT_DIR, filename), letter_crop)
    count += 1

print(f"✅ Extracted {count} letters into '{OUTPUT_DIR}/'")

