import { drawInterface } from "../draw"
import { Ball } from "../Game"

export class Beach {
	constructor() {
	}

	drawWaiting(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		context.clearRect(0, 0, canvas.width, canvas.height)
		drawBeach(context, canvas)

		context.font = "30px Arial Narrow" 
		context.fillStyle = "white" 
		const prompt = "Waiting for other player..." 
		const promptWidth = context.measureText(prompt).width
		context.fillText(prompt, (canvas.width / 2) - (promptWidth / 2), canvas.height / 2)
	}

	drawIntro(i: number, socketID: string, dto: drawInterface) {
		dto.context.clearRect(0, 0, dto.canvas.width, dto.canvas.height)
		drawBeach(dto.context, dto.canvas)

		dto.context.font = "30px Arial Narrow"
		dto.context.fillStyle = "white"
		if (i > 5) {
			const username = dto.gameState.left.socket != socketID ? dto.gameState.left.username : dto.gameState.right.username
			const prompt = "Playing against " + username
			const promptWidth = dto.context.measureText(prompt).width
			dto.context?.fillText(prompt, (dto.canvas.width / 2) - (promptWidth / 2), dto.canvas.height / 2)
		}
		else if (i > 3) {
			const prompt = "Ready?"
			const promptWidth = dto.context.measureText(prompt).width
			dto.context?.fillText(prompt, (dto.canvas.width / 2) - (promptWidth / 2), dto.canvas.height / 2)
		}
		else {
			const prompt = i.toString()
			const promptWidth = dto.context.measureText(prompt).width
			dto.context?.fillText(prompt, (dto.canvas.width / 2) - (promptWidth / 2), dto.canvas.height / 2)
		}
	}

	drawPlaying(ball: Ball, dto: drawInterface) {
		dto.context.clearRect(0, 0, dto.canvas.width, dto.canvas.height)
		drawBeach(dto.context, dto.canvas)

		/* Paddles */
		dto.context.fillStyle = "white"
		dto.context.fillRect(dto.gameState.left.x, dto.gameState.left.y, dto.gameState.left.width, dto.gameState.left.height)
		dto.context.fillStyle = "white"
		dto.context.fillRect(dto.gameState.right.x, dto.gameState.right.y, dto.gameState.right.width, dto.gameState.right.height)
		dto.context.fillRect(dto.gameState.left.x, dto.gameState.left.y, dto.gameState.left.width, dto.gameState.left.height)

		/* Score */
		dto.context.font = "30px Arial Narrow"
		dto.context.fillStyle = "white"
		dto.context?.fillText(dto.gameState.leftScore.toString(), 300, 40) /* Left */
		dto.context?.fillText(dto.gameState.rightScore.toString(), 390, 40) /* Right */

		/* Ball */
		dto.context.arc(ball.x, ball.y, ball.height, 0, Math.PI * 2)
		dto.context.fillStyle = "white"
		dto.context.fill()
	}

	drawEnd(winner: string, i: number, dto: drawInterface) {
		dto.context.clearRect(0, 0, dto.canvas.width, dto.canvas.height)
		drawBeach(dto.context, dto.canvas)

		dto.context.font = "30px Arial Narrow"
		dto.context.fillStyle = "white"
		if (!winner) {
			const prompt = "Draw!"
			const promptWidth = dto.context.measureText(prompt).width
			dto.context?.fillText(prompt, (dto.canvas.width / 2) - (promptWidth / 2), dto.canvas.height / 3)
			return
		}
		const prompt = "Winner: " + winner
		const promptWidth = dto.context.measureText(prompt).width
		dto.context?.fillText(prompt, (dto.canvas.width / 2) - (promptWidth / 2), dto.canvas.height / 3)
	
		/* Sending the user back to the lobby after 5 seconds */
		if (i > 1) {
			const prompt = "Sending you back to the lobby in " + (i).toString() + " seconds"
			const promptWidth = dto.context.measureText(prompt).width
			dto.context?.fillText(prompt, (dto.canvas.width / 2) - (promptWidth / 2), (dto.canvas.height / 3) * 2)
		}
	}
}

function drawBeach(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    // Sky
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height / 2)
    ctx.fillStyle = "#87CEEB" // Light blue color for the sky
    ctx.fill()
    ctx.closePath()

    // Sand
    ctx.beginPath()
    ctx.rect(0, canvas.height / 2, canvas.width, canvas.height / 2)
    ctx.fillStyle = "#F4A460" // Sandy color for the beach
    ctx.fill()
    ctx.closePath()

    // Sun
    ctx.beginPath()
    ctx.arc(canvas.width - 50, 50, 30, 0, 2 * Math.PI, false)
    ctx.fillStyle = "#FFD700" // Yellow color for the sun
    ctx.fill()
    ctx.closePath()

    // Ocean
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height / 2)
    ctx.fillStyle = "#00BFFF" // Blue color for the ocean
    ctx.fill()
    ctx.closePath()

    // Palm trees
    drawPalmTree(ctx, 100, canvas.height / 2 - 20)
    drawPalmTree(ctx, canvas.width - 150, canvas.height / 2 - 20)

    // Beach umbrella(s)
    drawUmbrella(ctx, canvas.width / 2 - 53, canvas.height / 2 + 13)
	drawUmbrella(ctx, canvas.width / 2 - 161, canvas.height / 2 + 42)
	drawUmbrella(ctx, canvas.width / 2 + 81, canvas.height / 2 + 42 * 2)
}

function drawPalmTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Tree trunk
    ctx.beginPath()
    ctx.rect(x, y, 20, 80)
    ctx.fillStyle = "#8B4513" // Brown color for the trunk
    ctx.fill()
    ctx.closePath()

    // Tree leaves
    ctx.beginPath()
    ctx.arc(x + 10, y - 40, 40, 0, 2 * Math.PI, false)
    ctx.fillStyle = "#008000" // Green color for the leaves
    ctx.fill()
    ctx.closePath()
}

function drawUmbrella(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Umbrella pole
    ctx.beginPath()
    ctx.rect(x + 10, y, 10, 60)
    ctx.fillStyle = "#8B4513" // Brown color for the pole
    ctx.fill()
    ctx.closePath()

    // Umbrella top
    ctx.beginPath()
    ctx.moveTo(x - 20, y)
    ctx.lineTo(x + 50, y)
    ctx.lineTo(x + 15, y - 30)
    ctx.fillStyle = "#FF0000" // Red color for the top
    ctx.fill()
    ctx.closePath()
}
