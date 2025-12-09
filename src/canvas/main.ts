const FONT_SIZE: number = 30

type LinePosition = [move_pen_x: number, move_pen_y: number, draw_x: number, draw_y: number]

interface ILine {
	line_text: string,
	line_pos: LinePosition
}

interface IParagraph {
	line: ILine[]
}

function setupCanvas(canvas: HTMLCanvasElement) {
	const dpr = window.devicePixelRatio || 1

	const rect = canvas.getBoundingClientRect()
	canvas.width = rect.width * dpr
	canvas.height = rect.height * dpr

	const ctx = canvas.getContext("2d")!
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}


function draw_text(canvas: HTMLCanvasElement, paragraph: IParagraph): number {
	const ctx = canvas.getContext("2d")
	if (!ctx) return -1

	// const LINE_SPACING = 33 //hardcoded change later

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for (let line = 0; line < paragraph.line.length; line++) {
		ctx.beginPath()
		ctx.setLineDash([])
		ctx.strokeStyle = "black"
		ctx.lineWidth = 2
		ctx.moveTo(paragraph.line[line].line_pos[0], paragraph.line[line].line_pos[1])
		ctx.lineTo(paragraph.line[line].line_pos[2], paragraph.line[line].line_pos[3])
		ctx.stroke()

		ctx.font = `${FONT_SIZE}px font1`
		ctx.fillStyle = "black"
		ctx.textBaseline = "alphabetic"

		ctx.fillText(paragraph.line[line].line_text, paragraph.line[line].line_pos[0], paragraph.line[line].line_pos[1])

	}
	const curr_font = ctx.font;
	const fontsize = curr_font.match(/(\d+)px/)?.[1];
	return Number(fontsize);
}

function add_buffer(paragraph: IParagraph, fullText: string, line_pos: LinePosition) {
	const LINE_SPACING = 50 //hardcoded change later

	paragraph.line.length = 0
	const lines = fullText.split("\n")
	let line_y = line_pos[1]

	for (const line of lines) {
		const new_line: ILine = {
			line_text: line,
			line_pos: [
				line_pos[0], line_y, line_pos[2], line_y
			]
		}
		line_y += LINE_SPACING
		paragraph.line.push(new_line)

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
const canvas = document.getElementById("Page") as HTMLCanvasElement
setupCanvas(canvas)
const input = document.getElementById("input") as HTMLTextAreaElement | null



//Event Loop
if (input) {
	const line_pos: LinePosition = [0, 45, 1500, 45] //hardcoded change later
	let paragraph: IParagraph = { line: [] }
	let fontsize: number | null = draw_text(canvas, paragraph)

	input.addEventListener("input", (e) => {
		let target = e.currentTarget as HTMLTextAreaElement
		const lines = target.value.split(/\r?\n/);
		let lastline_width = lines[lines.length - 1].length
		if (fontsize != null && lastline_width * fontsize >= canvas.width + /* input.clientWidth */ 300) {
			target.value += "\n"
			console.log("true")
		}
		add_buffer(paragraph, target.value, line_pos)
		fontsize = draw_text(canvas, paragraph)
	})
}
