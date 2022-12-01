let LEFT,RIGHT,UP,DOWN,velocity_x,velocity_y,x,y,width,height,acceleration
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d")
let friction = 0.04

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

    acceleration: 1,

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
    ctx.fillStyle = "white";
    ctx.fillRect(car.x, car.y, 100, 100);
    ctx.fillText("sus", car.x, car.y);
}

function checkupdates(){
    if(car.UP){
        car.y --
    }
    if(car.DOWN){
        car.y ++
    }
    if(car.LEFT){
        car.x -= 1-friction
    }
    if(car.RIGHT){
        car.x ++
    }
}

function gameloop(){
    draw()
    checkupdates()

    requestAnimationFrame(gameloop)
}

document.addEventListener('keyup', keyboardUp)
document.addEventListener('keydown', keyboardDown)

requestAnimationFrame(gameloop)