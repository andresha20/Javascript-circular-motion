const canvas = document.getElementById("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext("2d");
const x = canvas.width/2;
const y = canvas.height/2;
let radius;
let color;
// let r = () => (Math.random() * 256 >> 0)+1;
//let color = `hsl(${Math.random() * 360}, 50%, 50%)`;

onmousemove = e => {
    moveX = e.clientX;
    moveY = e.clientY;
}

class Particle {
    constructor (x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.radians = Math.random() * Math.PI*2;
        this.velocity = 0.05;
        this.distanceFromCenter = Math.floor(Math.random() * (120-10) + 10)
        this.lastMousePos = {x: x, y: y}
    }

    update () {
        const lastPosition = {
            x: this.x, y: this.y
        }

        // Drag effect

        this.lastMousePos.x += (moveX - this.lastMousePos.x) * 0.05;
        this.lastMousePos.y += (moveY - this.lastMousePos.y) * 0.05;

        // Move circles independently
        this.radians += this.velocity

        // Circular motion
        this.x = this.lastMousePos.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMousePos.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.drawParticle(lastPosition);
    }

    drawParticle (lastPosition) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastPosition.x, lastPosition.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }    
}

const particlesArray = []

// HEX Color generator

function colorGeneratorHEX () {
    var s = "0123456789ABCDEF";
    var c = "#";
    for (var i = 0; i < 6; i++) {
        c += s[Math.ceil(Math.random() * 15)]
    }
    return c
}

// Push the particles created into an array

function init () {
    for (let i = 0; i < 70; i++) {
        radius = (Math.random() * 5)+2;
        //color = `rgb(${r()}, ${r()}, ${r()})`;
        particlesArray.push(new Particle (x, y, radius, colorGeneratorHEX()))
    }
}

function animate () {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    particlesArray.forEach(particle => particle.update())
}


init();
animate();