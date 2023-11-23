import { drawInterface } from "../draw"
import { Ball } from "../Game"

export class Farm {
	constructor() {
	}

	drawWaiting(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		context.clearRect(0, 0, canvas.width, canvas.height)
		drawFarm(context, canvas)

		context.font = "30px Arial Narrow" 
		context.fillStyle = "white" 
		const prompt = "Waiting for other player..." 
		const promptWidth = context.measureText(prompt).width
		context.fillText(prompt, (canvas.width / 2) - (promptWidth / 2), canvas.height / 2)
	}

	drawIntro(i: number, socketID: string, dto: drawInterface) {
		dto.context.clearRect(0, 0, dto.canvas.width, dto.canvas.height)
		drawFarm(dto.context, dto.canvas)

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
		drawFarm(dto.context, dto.canvas)

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
		drawFarm(dto.context, dto.canvas)

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

function drawFarm(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    // Sky
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height / 2);
    ctx.fillStyle = "#87CEEB"; // Light blue color for the sky
    ctx.fill();
    ctx.closePath();

    // Ground
    ctx.beginPath();
    ctx.rect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    ctx.fillStyle = "#8B4513"; // Brown color for the ground
    ctx.fill();
    ctx.closePath();

    // Sun
    ctx.beginPath();
    ctx.arc(canvas.width - 50, 50, 30, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#FFD700"; // Yellow color for the sun
    ctx.fill();
    ctx.closePath();

    // Barn
    drawBarn(ctx, canvas.width / 2 - 60, canvas.height / 2 - 80);

    // Trees
    drawTree(ctx, 100, canvas.height / 2 - 50);
    drawTree(ctx, canvas.width - 150, canvas.height / 2 - 50);
}

function drawBarn(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Barn base
    ctx.beginPath();
    ctx.rect(x, y, 120, 80);
    ctx.fillStyle = "#8B4513"; // Brown color for the barn
    ctx.fill();
    ctx.closePath();

    // Barn roof
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 60, y - 40);
    ctx.lineTo(x + 120, y);
    ctx.fillStyle = "#FF0000"; // Red color for the roof
    ctx.fill();
    ctx.closePath();
}

function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Tree trunk
    ctx.beginPath();
    ctx.rect(x, y, 20, 60);
    ctx.fillStyle = "#8B4513"; // Brown color for the trunk
    ctx.fill();
    ctx.closePath();

    // Tree leaves
    ctx.beginPath();
    ctx.arc(x + 10, y - 20, 30, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#008000"; // Green color for the leaves
    ctx.fill();
    ctx.closePath();
}
