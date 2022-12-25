const canveas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let x = 100, y = 100

function draw(){
   ctx.fillStyle = "#FF5733";
   ctx.fillRect(x, y, 2, 2);
}

function loop(){
    draw()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)