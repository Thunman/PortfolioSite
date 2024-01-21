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
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius);
        gradient.addColorStop(0, '#cccccc');
        gradient.addColorStop(1, circle.color);
    
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.stroke();
    
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach(circle => {
            drawCircle(circle);
        });
        requestAnimationFrame(animate);
    };

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        circles.forEach(circle => {
            const distanceFromCenter = Math.sqrt(Math.pow(circle.x - x, 2) + Math.pow(circle.y - y, 2));
            if (distanceFromCenter <= circle.radius) {
                const clickedCircle = circles.find(c => c.id === circle.id);
                if (clickedCircle) removeCircle(clickedCircle);
            }
        });
    });

    const resetGame = () => {
        circles = [];
        start = false;
        circleId = 0;
        timer = 0;
        score = 0;
    }
    const gameOver = () => {
        resetGame();
        alert("Game Over");
    }

    const removeCircle = (circle: CircleProps) => {
        if (circle.color === "gold") timer += 5;
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
    let lastCircleTimestamp = 0;
    const gameLoop = (timestamp: number) => {
        
        if (start && timer > 0) {
            if (!lastCircleTimestamp || timestamp - lastCircleTimestamp >= 1000) {
                addCircle();
                timer --;
                setTimer(timer);
                lastCircleTimestamp = timestamp;
                
            }
            animate();
            
            requestAnimationFrame(gameLoop);
        } else {
            gameOver();
        }
        
    };
    const startGame = () => {
        start = true;
        timer = 15;
        requestAnimationFrame(gameLoop);
    }
    return { startGame, timer, score }
}
export default game;