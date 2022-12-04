let LEFT,RIGHT,UP,DOWN,velocity_x,velocity_y,x,y,width,height,momentum_x,momentum_y;

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d")
let friction = 0.04

let be = Date.now(),fps=0,info='';

canvas.height = innerHeight
canvas.width = innerWidth

var resize = function() {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
}
window.onresize = resize
resize()

let car = {
    x: canvas.width/2,
    y: canvas.height/2,

    velocity_x: 0,
    velocity_y: 0,

    momentum_x: 0,
    momentum_y: 0,

    LEFT: false,
    RIGHT: false,
    UP: false,
    DOWN: false

}

function resetCanvasSize(e){
    console.log(e)
}

function keyboardDown(e) {
    if(e.key === "w"){
        car.UP = true
    }
    if(e.key === "s"){
        car.DOWN = true
    }
    if(e.key === "a"){
        car.LEFT = true
    }
    if(e.key === "d"){
        car.RIGHT = true
    }
}
function keyboardUp(e) {
    if(e.key === "w"){
        car.UP = false
    }
    if(e.key === "s"){
        car.DOWN = false
    }
    if(e.key === "a"){
        car.LEFT = false
    }
    if(e.key === "d"){
        car.RIGHT = false
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // ctx.translate(car.x, car.y)
    // ctx.beginPath()

    // ctx.moveTo(0, 0)
    // ctx.lineTo(10, 10)
    // ctx.lineTo(0, -20)
    // ctx.lineTo(-10, 10)
    // ctx.lineTo(0, 0)

    // ctx.closePath()
    // ctx.stroke()
    ctx.fillStyle = "#FF5733";
    ctx.fillRect(car.x, car.y, 100, 100);
    ctx.fillStyle = "#302A3B";
    ctx.fillText(`x: ${car.x+50} y: ${car.y+50}`, car.x+10, car.y+10);
    ctx.fillText(`vel-x: ${car.velocity_x}  vel-y: ${car.velocity_y}`, car.x+10, car.y+20)
    ctx.fillText(`m_x: ${car.momentum_x} m_y: ${car.momentum_y}`, car.x+10, car.y+30)
    ctx.fillStyle = "green";
    ctx.fillText(`FPS: ${fps}`, 10, 10)

}

function checkupdates(){
    if(car.UP){
        car.momentum_y -= 1
    }
    if(car.DOWN){
        car.momentum_y += 1
    }
    if(car.LEFT){
        car.momentum_x -= 1
    }
    if(car.RIGHT){
        car.momentum_x += 1
    }

    car.velocity_x = car.momentum_x * 1-friction
    car.velocity_y = car.momentum_y * 1-friction

    if(car.momentum_x === 0 && car.momentum_y === 0){
        car.velocity_x = 0
        car.velocity_y = 0
    }

    car.x += car.velocity_x
    car.y += car.velocity_y

    if(car.UP === false){
        if(car.momentum_y < 0){
            car.momentum_y += 0.01
            console.log(car.momentum_y.toFixed(3))            
        }
    }
    if((car.momentum_y.toFixed(3)) === -0.000){
        car.momentum_y = 0
        
    }
}

function gameloop(){
    let now = Date.now()
    fps = Math.round(1000 / (now - be))
    be = now

    draw()
    checkupdates()

    requestAnimationFrame(gameloop)
}

document.addEventListener('keyup', keyboardUp)
document.addEventListener('keydown', keyboardDown)

requestAnimationFrame(gameloop)