import init, { Snake, Direction } from '../wasm_snake/pkg/wasm_snake.js';

async function run() {
    await init();
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const snake = Snake.new(canvas.width / 20, canvas.height / 20);

    console.log('Snake initialized:', snake.render());

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                if (snake.get_direction() !== Direction.Down) {
                    snake.change_direction(Direction.Up);
                }
                break;
            case 'ArrowDown':
                if (snake.get_direction() !== Direction.Up) {
                    snake.change_direction(Direction.Down);
                }
                break;
            case 'ArrowLeft':
                if (snake.get_direction() !== Direction.Right) {
                    snake.change_direction(Direction.Left);
                }
                break;
            case 'ArrowRight':
                if (snake.get_direction() !== Direction.Left) {
                    snake.change_direction(Direction.Right);
                }
                break;
        }
        console.log('Direction changed:', snake.get_direction());
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const snakeBody = snake.render().split("), (");
        console.log('Drawing snake body:', snakeBody);
        snakeBody.forEach((part: string) => {
            const cleanedPart = part.replace(/[()]/g, '').split(', ');
            const x = parseInt(cleanedPart[0]);
            const y = parseInt(cleanedPart[1]);
            console.log(`Drawing part at (${x}, ${y})`);
            if (!isNaN(x) && !isNaN(y)) {
                ctx.fillStyle = "lime";
                ctx.fillRect(x * 20, y * 20, 20, 20);
            } else {
                console.error(`Invalid coordinates (${x}, ${y})`);
            }
        });
    }

    function update() {
        snake.update();
        console.log('Snake updated:', snake.render());

        if (snake.check_collision()) {
            console.log('Game Over');
            return;
        }

        draw();
        setTimeout(update, 500);
    }

    draw();
    update();
}

run();

