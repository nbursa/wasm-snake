import init, { Snake, Direction } from '../wasm_snake/pkg/wasm_snake.js';

async function run() {
    await init();
    const snake = Snake.new();
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

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

    function checkCollision(): boolean {
        const snakeBody = snake.render().split("), (");
        const head = snakeBody[0].replace(/[()]/g, '').split(', ').map(Number);
        const [headX, headY] = head;

        if (headX < 0 || headY < 0 || headX >= canvas.width / 20 || headY >= canvas.height / 20) {
            return true;
        }

        for (let i = 1; i < snakeBody.length; i++) {
            const part = snakeBody[i].replace(/[()]/g, '').split(', ').map(Number);
            const [partX, partY] = part;
            if (headX === partX && headY === partY) {
                return true;
            }
        }

        return false;
    }

    function update() {
        snake.update();
        console.log('Snake updated:', snake.render());

        if (checkCollision()) {
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

