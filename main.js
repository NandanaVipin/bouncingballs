const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Adjust canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#111';

// Color palette
const colors = [
    "#FF4500", "#32CD32", "#FFD700", "#00FFFF", "#DC143C",
    "#1E90FF", "#FF1493", "#8A2BE2", "#FF8C00", "#00FA9A"
];

// Ball class
class Ball {
    constructor(x, y, radius, dx, dy, color, stationary = false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color || colors[Math.floor(Math.random() * colors.length)];
        this.stationary = stationary;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.lineWidth = 3;
        if (this.stationary) {
            ctx.strokeStyle = this.color;
            ctx.stroke();
        } else {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    move() {
        if (!this.stationary) {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx *= -1;
            }
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy *= -1;
            }
            this.x += this.dx;
            this.y += this.dy;
        }
        this.draw();
    }

    reposition(x, y) {
        this.x = x;
        this.y = y;
    }

    collidesWith(other) {
        const distX = this.x - other.x;
        const distY = this.y - other.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        return distance < this.radius + other.radius;
    }
}

const balls = [];
let vanishedBalls = 0;

// Generate bouncing balls
for (let i = 0; i < 30; i++) {
    let radius = 18;
    let x = Math.random() * (innerWidth - 2 * radius) + radius;
    let y = Math.random() * (innerHeight - 2 * radius) + radius;
    let dx = (Math.random() - 0.5) * 8;
    let dy = (Math.random() - 0.5) * 8;
    balls.push(new Ball(x, y, radius, dx, dy));
}

// Special interactive ball
const playerBall = new Ball(innerWidth / 2, innerHeight / 2, 20, 0, 0, '#FFF', true);
balls.push(playerBall);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // Display count
    ctx.fillStyle = '#FFF';
    ctx.font = '18px Arial';
    ctx.fillText(`Remaining Balls: ${30 - vanishedBalls}`, 20, 50);

    // Update and filter balls
    for (let i = balls.length - 1; i >= 0; i--) {
        if (balls[i] !== playerBall && playerBall.collidesWith(balls[i])) {
            balls.splice(i, 1);
            vanishedBalls++;
        } else {
            balls[i].move();
        }
    }
}

animate();

//