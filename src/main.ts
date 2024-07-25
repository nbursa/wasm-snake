import init, { Snake, Direction, Position as WasmPosition } from '../wasm_snake/pkg/wasm_snake.js';

async function run() {
    await init();
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const gameStatus = document.getElementById("gameStatus") as HTMLHeadingElement;
    const ctx = canvas.getContext("2d")!;
    const snake = Snake.new(canvas.width / 20, canvas.height / 20);

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
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const snakeBody: WasmPosition[] = snake.get_body() as unknown as WasmPosition[];
        const foods: WasmPosition[] = snake.get_foods() as unknown as WasmPosition[];

        snakeBody.forEach((part: WasmPosition) => {
            ctx.fillStyle = "lime";
            ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
        });

        foods.forEach((food: WasmPosition) => {
            ctx.fillStyle = "red";
            ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
        });
    }

    function setStatus(newStatus: string) {
        gameStatus.textContent = newStatus;
    }

    function update() {
        snake.update();
        setStatus(`Playing - Level: ${snake.get_level()}`);

        if (snake.check_collision()) {
            setStatus("Game Over");
            return;
        }

        draw();
        requestAnimationFrame(update);
    }

    draw();
    update();
}

run();

