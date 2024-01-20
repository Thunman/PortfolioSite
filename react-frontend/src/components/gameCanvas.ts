import { randomColorPicker } from "../helpers/gameHelpers";
import { CircleProps } from "./GameTypes";

function game(canvas: HTMLCanvasElement) {



    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let circleId = 0;
    let start = false;
    let timer = 0;
    let score = 0;

    let circles: CircleProps[] = [];

    const drawCircle = (circle: CircleProps) => {
        ctx.beginPath();
        ctx.arc(circle.left, circle.top, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = circle.color;
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
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ClickedCords = { x, y };
        console.log(ClickedCords);
        console.log(circles);    
        circles.forEach(circle => {
            
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
        //resetGame();
        alert("Game Over");
    }

    const removeCircle = (circle: CircleProps) => {
        if (circle.color === "white") timer += 5;
        circles = circles.filter(c => c.id !== circle.id);
        score++;
    };

    const addCircle = () => {
        const newCircle: CircleProps = {
            id: circleId++,
            top: Math.random() * canvas.height,
            left: Math.random() * canvas.width,
            radius: 20,
            color: randomColorPicker(),
            x: 0,
            y: 0 
        };
        circles.push(newCircle);
    }
    const gameLoop = () => {

        if (start && timer > 0) {
            
            addCircle();
            animate();
            console.log(circles)
            setTimeout(() => {
                timer--;
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
        timer = 1;
        console.log(start);
        console.log(timer);
        gameLoop();
    }
    return { startGame, timer, score }
}
export default game;