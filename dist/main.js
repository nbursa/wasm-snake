var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import init, { Snake, Direction } from '../wasm_snake/pkg/wasm_snake.js';
function run() {
    return __awaiter(this, void 0, void 0, function () {
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var snakeBody = snake.render().split("), (");
            console.log('Drawing snake body:', snakeBody);
            snakeBody.forEach(function (part) {
                var cleanedPart = part.replace(/[()]/g, '').split(', ');
                var x = parseInt(cleanedPart[0]);
                var y = parseInt(cleanedPart[1]);
                console.log("Drawing part at (".concat(x, ", ").concat(y, ")"));
                if (!isNaN(x) && !isNaN(y)) {
                    ctx.fillStyle = "lime";
                    ctx.fillRect(x * 20, y * 20, 20, 20);
                }
                else {
                    console.error("Invalid coordinates (".concat(x, ", ").concat(y, ")"));
                }
            });
        }
        function checkCollision() {
            var snakeBody = snake.render().split("), (");
            var head = snakeBody[0].replace(/[()]/g, '').split(', ').map(Number);
            var headX = head[0], headY = head[1];
            if (headX < 0 || headY < 0 || headX >= canvas.width / 20 || headY >= canvas.height / 20) {
                return true;
            }
            for (var i = 1; i < snakeBody.length; i++) {
                var part = snakeBody[i].replace(/[()]/g, '').split(', ').map(Number);
                var partX = part[0], partY = part[1];
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
        var snake, canvas, ctx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    snake = Snake.new();
                    canvas = document.getElementById("gameCanvas");
                    ctx = canvas.getContext("2d");
                    console.log('Snake initialized:', snake.render());
                    document.addEventListener('keydown', function (event) {
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
                    draw();
                    update();
                    return [2 /*return*/];
            }
        });
    });
}
run();
