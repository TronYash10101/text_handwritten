import os
import shutil
import numpy

src_path = "./extracted_letters"

# Your reverse_index dict is already correct
reverse_index = {
    0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h", 8: "i", 9: "j",
    10: "k", 11: "l", 12: "m", 13: "n", 14: "o", 15: "p", 16: "q", 17: "r", 18: "s", 19: "t",
    20: "u", 21: "v", 22: "w", 23: "x", 24: "y", 25: "z",
    26: "A", 27: "B", 28: "C", 29: "D", 30: "E", 31: "F", 32: "G", 33: "H", 34: "I", 35: "J",
    36: "K", 37: "L", 38: "M", 39: "N", 40: "O", 41: "P", 42: "Q", 43: "R", 44: "S", 45: "T",
    46: "U", 47: "V", 48: "W", 49: "X", 50: "Y", 51: "Z"
}

for image in os.listdir(src_path):
    if not image.lower().endswith(".png"):
        continue

    name = image.split(".")[0]

    # Skip files that aren't numeric
    if not name.isdigit():
        continue

    index = int(name)

    # Skip invalid indices
    if not reverse_index.keys().__contains__(index):
        print(f"Skipping: {image} (index {index} not in map)")
        continue

    letter = reverse_index[index]
    print(f"{index}----->{letter}")
    print(reverse_index.keys().__contains__(index))
    old_path = os.path.join(src_path, image)
    new_path = os.path.join(src_path, f"{letter}.png")

    # Avoid overwriting existing letter files
    if os.path.exists(new_path):
        print(f"Skip: {new_path} already exists")
        continue

    # shutil.move(old_path, new_path)
    # print(f"{image} → {letter}.png")

# arr  = []
# for i in os.listdir(src_path):
#     arr.append(int(i.split(".")[0]))
# arr = numpy.array(arr)
# arr = numpy.sort(arr)
# print(arr)
