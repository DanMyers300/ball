const ball = document.querySelector("#ball");
let yPosition = 0;
let xPosition = 0;
let yVelocity = 0;
let xVelocity = 0;
let isDragging = false;
const size = 70;
const gravity = 0.5
const containerHeight = window.innerHeight - size;
const containerWidth = window.innerWidth - size;

ball.style.width = `${size}px`;
ball.style.height = `${size}px`;
ball.style.cursor = 'move';

const handleMouseUp = () => {
    isDragging = false;
    requestAnimationFrame(() => 
        animate()
    )
};

const handleMouseMove = (e) => {
    if (!isDragging) return

    const top = e.clientY - size;
    ball.style.top = `${top}px`
    yPosition = top;

    const left = e.clientX - size;
    ball.style.left = `${left}px`
};

const handleMouseDown = () => {
    isDragging = true;
    yPosition = parseInt(ball.style.top);
    xPosition = parseInt(ball.style.left);
};

const handleMouse = () => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
};

function animate() {

    if (isDragging) return;

    if (Math.abs(yVelocity) < 0.05) {
        yVelocity = 0;
    }

    if (yPosition < containerHeight) {
        yVelocity *= 0.995
        yVelocity += gravity;
        yPosition += yVelocity;
    } else if (
        yPosition >= containerHeight || yPosition <= 0
    ) {
        yVelocity *= 0.995
        yVelocity = -yVelocity
        yPosition += yVelocity;
    }

    ball.style.top = `${yPosition}px`;
    //ball.style.left = `${xPosition}px`;
    requestAnimationFrame(animate);
}

animate();
handleMouse();
