import fontforge, psMat
import os


offset_x = 10
offset_y = 20
transformation_matrix = (1, 0, 0, 1, offset_x, offset_y)

# curr_dir = os.getcwd()
svg_dir = "/home/yash-jadhav/extract_letters/letters/svg"
font_path = os.path.join(svg_dir, "font1.sfd")

font = fontforge.font()
DSEND_VALUE = 200 
#Use later if there are more related characters
# special_character_arr = {
#     "space" : 32,
#
# }

descender = ["p", "y", "j","g","q"]
space_unicode = fontforge.unicodeFromName("space")
font.createChar(space_unicode, "space")
font["space"].width = 700

for file in os.listdir(svg_dir):    

    if file.lower().endswith('svg'):
        svg_name = file.split('.')[0]
        unicode = fontforge.unicodeFromName(svg_name)
        glyph = font.createChar(unicode, svg_name)
        glyph.importOutlines(os.path.join(svg_dir, file))
        xmin, ymin , xmax, ymax = glyph.boundingBox()

        if svg_name in descender:
            transformation_matrix = (1,0,0,1,0,-(ymin+DSEND_VALUE))
        else:
            transformation_matrix = (1,0,0,1,0,-ymin)

        glyph.width = 600
        glyph.transform(transformation_matrix)
        print(glyph.width)


    font.save(font_path)

if os.path.exists(font_path):
    font_dst_dir = font_path.split('.')[0]
    font_dst_dir_ext =  ".".join([font_dst_dir,"ttf"]) 
    font.generate(font_dst_dir_ext)
    print(font_dst_dir_ext)
