const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let x = 100, y = 100
canvas.width = inner
    
function draw(){
   ctx.fillStyle = "#9916ff";
   ctx.fillRect(x, y, 2, 2);
}

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    x += 0.5
    y += 0.2
    draw()
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)