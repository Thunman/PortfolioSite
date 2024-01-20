import { randomColorPicker } from "../helpers/gameHelpers";
import { CircleProps } from "./GameTypes";

function game(canvas: HTMLCanvasElement, setScore: (score: number) => void, setTimer: (timer: number) => void) {



    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    let circleId = 0;
    let start = false;
    let timer = 0;
    let score = 0;

    let circles: CircleProps[] = [];

    const drawCircle = (circle: CircleProps) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.stroke();
    };
    const drawTarget = (x: number, y: number) => {
        console.log("draw target");
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach(circle => {
            drawCircle(circle);
        });
        requestAnimationFrame(animate);
    };



    canvas.addEventListener('click', (e) => {
        console.log("click");

        const rect = canvas.getBoundingClientRect();
        console.log(rect.left, rect.top);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        drawTarget(100, 100);
        console.log(`x: ${x}, y: ${y}`);

        console.log(circles);
        circles.forEach(circle => {
            const circleCenterX = circle.x + circle.radius;
            const circleCenterY = circle.y + circle.radius;
            const distanceFromCenter = Math.sqrt(Math.pow(circle.x - x, 2) + Math.pow(circle.y - y, 2));
            if (distanceFromCenter <= circle.radius) {
                const clickedCircle = circles.find(c => c.id === circle.id);
                console.log("EUREKA");
                if (clickedCircle) removeCircle(clickedCircle);
            }
        });
    });


    const resetGame = () => {
        circles = [];
        start = false;
        circleId = 0;
        timer = 0;
    }
    const gameOver = () => {
        resetGame();
        alert("Game Over");
    }

    const removeCircle = (circle: CircleProps) => {
        console.log("remove circle");
        if (circle.color === "white") timer += 5;
        circles = circles.filter(c => c.id !== circle.id);
        setScore(score++);
    };

    const addCircle = () => {
        const newCircle: CircleProps = {
            id: circleId++,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 20,
            color: randomColorPicker(),

        };
        circles.push(newCircle);
    }
    const gameLoop = () => {

        if (start && timer > 0) {

            addCircle();
            animate();
            console.log(circles)
            setTimeout(() => {
                setTimer(timer--);
                console.log(timer);
                requestAnimationFrame(gameLoop);
            }, 1000);
        } else {
            console.log("game over");
            gameOver();
        }
    };
    const startGame = () => {
        console.log("start game");
        start = true;
        timer = 15;
        console.log(start);
        console.log(timer);
        gameLoop();
    }
    return { startGame, timer, score }
}
export default game;