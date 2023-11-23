import { drawInterface } from "../draw"
import { Ball } from "../Game"

export class Night {
	constructor() {
	}

	drawWaiting(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		context.clearRect(0, 0, canvas.width, canvas.height)
		drawNight(context, canvas)

		context.font = "30px Arial Narrow" 
		context.fillStyle = "white" 
		const prompt = "Waiting for other player..." 
		const promptWidth = context.measureText(prompt).width
		context.fillText(prompt, (canvas.width / 2) - (promptWidth / 2), canvas.height / 2)
	}

	drawIntro(i: number, socketID: string, dto: drawInterface) {
		dto.context.clearRect(0, 0, dto.canvas.width, dto.canvas.height)
		drawNight(dto.context, dto.canvas)

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
		drawNight(dto.context, dto.canvas)

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
		drawNight(dto.context, dto.canvas)

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
function drawNight(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    // Space background
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000"; // Black color for space background
    ctx.fill();
    ctx.closePath();

    // Stars
    drawStar(ctx, 50, 50, 2, "#FFFFFF");  // Example star, you can add more stars
    drawStar(ctx, 150, 100, 3, "#FFFFFF");
    // Add more stars as needed

    // Planets
    drawPlanet(ctx, canvas.width / 2 - 50, canvas.height / 2 - 50, 30, "#CD853F");  // Example planet, you can add more planets
    drawPlanet(ctx, canvas.width - 100, canvas.height - 100, 20, "#808080");
    // Add more planets as needed
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawPlanet(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
