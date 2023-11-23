import { drawInterface } from "../draw"
import { Ball } from "../Game"

export class Basketball {
	constructor() {
	}

	drawWaiting(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		context.clearRect(0, 0, canvas.width, canvas.height)
		drawBasketballCourt(context, canvas)

		context.font = "30px Arial Narrow"
		context.fillStyle = "white"
		const prompt = "Waiting for other player..."
		const promptWidth = context.measureText(prompt).width
		context.fillText(prompt, (canvas.width / 2) - (promptWidth / 2), canvas.height / 2)
	}

	drawIntro(i: number, socketID: string, dto: drawInterface) {
		dto.context.clearRect(0, 0, dto.canvas.width, dto.canvas.height)
		drawBasketballCourt(dto.context, dto.canvas)

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
		drawBasketballCourt(dto.context, dto.canvas)

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
		drawBasketballCourt(dto.context, dto.canvas)

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
// drawBasketballCourt
// drawBasketballCourt
function drawBasketballCourt(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    // Outer lines
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#1a1a1a"
    ctx.fill()
    ctx.lineWidth = 1
    ctx.strokeStyle = "#FFF"
    ctx.stroke()
    ctx.closePath()

    ctx.fillStyle = "#FFF"

    // Mid line
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.stroke()
    ctx.closePath()

    // Three-point arc
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 190, 0.4 * Math.PI, 1.6 * Math.PI, false)
    ctx.stroke()
    ctx.closePath()

    // Free throw line
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 190, canvas.height / 2 - 47)
    ctx.lineTo(canvas.width / 2 + 190, canvas.height / 2 - 47)
    ctx.stroke()
    ctx.closePath()

    // Free throw circle
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2 - 47, 15, 0, 2 * Math.PI, false)
    ctx.stroke()
    ctx.closePath()

    // Hoop
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 7.5, 0, 2 * Math.PI, false)
    ctx.fillStyle = "#FFD700"
    ctx.fill()
    ctx.closePath()

    // Backboard
    ctx.beginPath()
    ctx.rect(canvas.width / 2 - 30, canvas.height / 2 - 1, 60, 1)
    ctx.fillStyle = "#FFD700"
    ctx.fill()
    ctx.closePath()

    // Half-court circle
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 2 * Math.PI, false)
    ctx.stroke()
    ctx.closePath()

    // Backboard square
    ctx.beginPath()
    ctx.rect(canvas.width / 2 - 30, canvas.height / 2 - 30, 60, 60)
    ctx.stroke()
    ctx.closePath()
}

/*
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement
const context = canvas.getContext("2d")
drawBasketballCourt(context, canvas)
*/