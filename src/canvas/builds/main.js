"use strict";
function setupCanvas(canvas) {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function draw_text(canvas, paragraph) {
    var ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    var LINE_SPACING = 33; //hardcoded change later
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var line = 0; line < paragraph.line.length; line++) {
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.moveTo(paragraph.line[line].line_pos[0], paragraph.line[line].line_pos[1]);
        ctx.lineTo(paragraph.line[line].line_pos[2], paragraph.line[line].line_pos[3]);
        ctx.stroke();
        ctx.font = "30px font1";
        ctx.fillStyle = "black";
        ctx.textBaseline = "top";
        ctx.fillText(paragraph.line[line].line_text, paragraph.line[line].line_pos[0], paragraph.line[line].line_pos[1] - LINE_SPACING);
    }
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
    // const pen_x = 0
    // const pen_y = 10
    // const line_width = 50
    var line_pos_1 = [0, 50, 1500, 0]; //hardcoded change later
    // let line_no = 0
    var paragraph_1 = { line: [] };
    input.addEventListener("input", function (e) {
        var target = e.currentTarget;
        add_buffer(paragraph_1, target.value, line_pos_1);
        console.log(paragraph_1);
        draw_text(canvas, paragraph_1);
    });
}
