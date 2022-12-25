const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let x = 100, y = 100
canvas.width = innerWidth
canvas.height = innerHeight
let inc = 1, dec = 1, size = 5

function draw(){
   ctx.fillStyle = "#9916ff";
   ctx.fillRect(x, y, size, size);
}

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(x > canvas.width-size){
        inc = -1
    }
    if(x < 0+size){
        inc = 1
    }
    if(x > canvas.width-size){
        inc = -1
    }
    if(x < 0+size){
        inc = 1
    }
    x += inc
    y += dec
    draw()
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)