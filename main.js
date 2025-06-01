const ball = document.querySelector("#ball");
let yPosition = 0;
let xPosition = 0;
let yVelocity = 0;
let xVelocity = 0;
let isDragging = false;
const xDrag = 0.7;
const yDrag = 0.99;
const size = 70;
const gravity = 0.5;
let mouseStartX = 0;
let mouseStartY = 0;
let bounceFactor = 0.9;
const containerHeight = window.innerHeight - size;
const containerWidth = window.innerWidth - size;

ball.style.width = `${size}px`;
ball.style.height = `${size}px`;
ball.style.cursor = 'move';

const handleMouseUp = () => {
    isDragging = false;
    requestAnimationFrame(() => animate());
};

const handleMouseMove = (e) => {
    if (!isDragging) return;

    const top = e.clientY - size;
    ball.style.top = `${top}px`;
    yPosition = top;

    const left = e.clientX - size;
    ball.style.left = `${left}px`;
    xPosition = left;

    xVelocity = e.clientX - mouseStartX;
    mouseStartX = e.clientX;

    yVelocity = e.clientY - mouseStartY;
    mouseStartY = e.clientY;

    if (xPosition >= containerWidth) {
        xPosition = containerWidth;
    } else if (xPosition <= 0) {
        xPosition = 0;
    }

    if (yPosition >= containerHeight) {
        yPosition = containerHeight
    } else if (yPosition <= 0) {
        yPosition = 0;
    }
};

const handleMouseDown = (e) => {
    isDragging = true;
    yPosition = parseInt(ball.style.top);
    xPosition = parseInt(ball.style.left);
    yVelocity = 0;
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
};

const handleMouse = () => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
};

function animate() {
    if (isDragging) return;

    if (Math.abs(yVelocity) < 0.1) {
        yVelocity = 0;
    }

    if (Math.abs(xVelocity) < 0.1) {
        xVelocity = 0;
    }

    if (yPosition < 0) {
        yVelocity *= yDrag;
        yVelocity = -yVelocity;
        yPosition += yVelocity;
    } else if (yPosition < containerHeight) {
        yVelocity *= yDrag;
        yVelocity += gravity;
        yPosition += yVelocity;
    } else if (yPosition >= containerHeight) {
        yVelocity *= yDrag;
        yVelocity = -yVelocity;
        yPosition += yVelocity;
    }

    xPosition += xVelocity;
    if (xPosition < 0) {
        xVelocity *= xDrag;
        xVelocity = -xVelocity;
        xPosition += xVelocity;
    } else if (xPosition > containerWidth) {
        xVelocity *= xDrag;
        xVelocity = -xVelocity;
        xPosition += xVelocity;
    }

    ball.style.top = `${yPosition}px`;
    ball.style.left = `${xPosition}px`;
    requestAnimationFrame(animate);
}

animate();
handleMouse();
