"use strict";
var FONT_SIZE = 30;
function setupCanvas(canvas) {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function draw_text(canvas, paragraph) {
    var _a;
    var ctx = canvas.getContext("2d");
    if (!ctx)
        return -1;
    // const LINE_SPACING = 33 //hardcoded change later
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var line = 0; line < paragraph.line.length; line++) {
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.moveTo(paragraph.line[line].line_pos[0], paragraph.line[line].line_pos[1]);
        ctx.lineTo(paragraph.line[line].line_pos[2], paragraph.line[line].line_pos[3]);
        ctx.stroke();
        ctx.font = "".concat(FONT_SIZE, "px font1");
        ctx.fillStyle = "black";
        ctx.textBaseline = "alphabetic";
        ctx.fillText(paragraph.line[line].line_text, paragraph.line[line].line_pos[0], paragraph.line[line].line_pos[1]);
    }
    var curr_font = ctx.font;
    var fontsize = (_a = curr_font.match(/(\d+)px/)) === null || _a === void 0 ? void 0 : _a[1];
    return Number(fontsize);
}
function add_buffer(paragraph, fullText, line_pos) {
    var LINE_SPACING = 50; //hardcoded change later
    paragraph.line.length = 0;
    var lines = fullText.split("\n");
    var line_y = line_pos[1];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var new_line = {
            line_text: line,
            line_pos: [
                line_pos[0], line_y, line_pos[2], line_y
            ]
        };
        line_y += LINE_SPACING;
        paragraph.line.push(new_line);
    }
}
//Faster but does not handle backspace,insertion,etc ; need to manually handle that
/* function add_buffer(paragraph: IParagraph, char: string, line_pos: LinePosition) {
    const LINE_SPACING = 30
    if (paragraph.line.length === 0) {
        paragraph.line.push({
            line_text: "",
            line_pos: [...line_pos] as LinePosition
        })
    }
    if (char == "\n") {
        const new_line: ILine = {
            line_text: "",
            line_pos: [
                line_pos[0], line_pos[1] + LINE_SPACING, line_pos[2], line_pos[3] + LINE_SPACING
            ]
        }
        paragraph.line[paragraph.line.length + 1] = new_line
    } else {
        paragraph.line[paragraph.line.length - 1].line_text += char
    }

} */
var canvas = document.getElementById("Page");
setupCanvas(canvas);
var input = document.getElementById("input");
//Event Loop
if (input) {
    var line_pos_1 = [0, 45, 1500, 45]; //hardcoded change later
    var paragraph_1 = { line: [] };
    var fontsize_1 = draw_text(canvas, paragraph_1);
    input.addEventListener("input", function (e) {
        var target = e.currentTarget;
        var lines = target.value.split(/\r?\n/);
        var lastline_width = lines[lines.length - 1].length;
        if (fontsize_1 != null && lastline_width * fontsize_1 >= canvas.width + /* input.clientWidth */ 300) {
            target.value += "\n";
            console.log("true");
        }
        add_buffer(paragraph_1, target.value, line_pos_1);
        fontsize_1 = draw_text(canvas, paragraph_1);
    });
}
