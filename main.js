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

    moveTowards(targetX, targetY) {
        let speed = 5; // Adjust speed here for smoothness
        let angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.dx = Math.cos(angle) * speed;
        this.dy = Math.sin(angle) * speed;
        this.x
