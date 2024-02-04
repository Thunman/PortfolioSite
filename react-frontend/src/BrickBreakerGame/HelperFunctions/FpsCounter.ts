

let lastTime = 0;
let fpsInterval = 1000 / 60; 
let frameCount = 0;
let startTime = 0;

export const calculateFPS = (timestamp: number) => {
    frameCount++;
    const elapsedTime = (timestamp - startTime) / 1000;
    const fps = frameCount / elapsedTime;

    if (elapsedTime > 1) {
        frameCount = 0;
        startTime = timestamp;
    }

    lastTime = timestamp - ((timestamp - lastTime) % fpsInterval);

    return fps;
};

export const shouldAnimate = (timestamp: number) => {
    return timestamp - lastTime >= fpsInterval;
};

export const resetFPS = () => {
    lastTime = 0;
    frameCount = 0;
    startTime = 0;
};