// Initialize canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Fish parameters
var fishes = [{
        x: 100,
        y: 200,
        size: 40,
        color: "rgb(255, 0, 0)", // Red
        speed: 2
    },
    {
        x: 300,
        y: 150,
        size: 60,
        color: "rgb(0, 255, 0)", // Green
        speed: 3
    },
    {
        x: 500,
        y: 250,
        size: 50,
        color: "rgb(0, 0, 255)", // Blue
        speed: 1.5
    }
];

// Bubble parameters
var bubbles = [];
setInterval(function() {
    bubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        radius: Math.random() * 10 + 5,
        speed: Math.random() * 2 + 1
    });
}, 1000);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sea bed
    ctx.fillStyle = "rgb(81, 173, 196)";
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    // Draw seaweed
    ctx.strokeStyle = "rgb(86, 191, 0)";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.3, canvas.height);
    ctx.lineTo(canvas.width * 0.3, canvas.height * 0.6);
    ctx.stroke();

    ctx.fillStyle = "rgb(102, 227, 0)";
    ctx.beginPath();
    ctx.arc(canvas.width * 0.3, canvas.height * 0.6 - 30, 20, 0, Math.PI * 2);
    ctx.fill();

    // Draw pebbles
    ctx.fillStyle = "rgb(194, 194, 194)";
    ctx.beginPath();
    ctx.arc(canvas.width * 0.5, canvas.height * 0.8, 10, 0, Math.PI * 2);
    ctx.fill();

    // Draw bubbles
    for (var i = 0; i < bubbles.length; i++) {
        var bubble = bubbles[i];
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();
        bubble.y -= bubble.speed;
        if (bubble.y + bubble.radius < 0) {
            bubbles.splice(i, 1);
        }
    }

    // Draw fishes
    fishes.forEach(function(fish) {
        ctx.fillStyle = fish.color;
        ctx.beginPath();
        ctx.moveTo(fish.x, fish.y);
        ctx.quadraticCurveTo(fish.x - fish.size * 0.5, fish.y + fish.size * 0.5, fish.x - fish.size * 2, fish.y);
        ctx.lineTo(fish.x - fish.size * 2.5, fish.y - fish.size * 0.3);
        ctx.lineTo(fish.x - fish.size * 2.5, fish.y + fish.size * 0.3);
        ctx.closePath();
        ctx.fill();
        fish.x += fish.speed;
        if (fish.x > canvas.width + fish.size * 2) {
            fish.x = -fish.size * 2;
        }
    });

    requestAnimationFrame(draw);
}

draw();