import init, { Snake, Direction } from '../wasm_snake/pkg/wasm_snake.js';

async function run() {
    await init();
    const snake = Snake.new();
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                snake.change_direction(Direction.Up);
                break;
            case 'ArrowDown':
                snake.change_direction(Direction.Down);
                break;
            case 'ArrowLeft':
                snake.change_direction(Direction.Left);
                break;
            case 'ArrowRight':
                snake.change_direction(Direction.Right);
                break;
        }
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        const snakeBody = snake.render().split(", ");
        snakeBody.forEach((part: string) => {
            const [x, y] = part.slice(1, -1).split(", ").map(Number);
            ctx.fillStyle = "lime";
            ctx.fillRect(x * 20, y * 20, 20, 20); // Draw each part of the snake
        });
    }

    function update() {
        snake.update();
        draw();
        setTimeout(update, 500); // Update the snake's position every 500ms
    }

    update(); // Start the update loop
}

run();

