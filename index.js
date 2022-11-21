let LEFT,RIGHT,UP,DOWN,velocity_x,velocity_y,x,y,width,height
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d")

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
    x: innerHeight/2,
    y: innerWidth/2,

    velocity_x: 0,
    velocity_y: 0,

    LEFT: false,
    RIGHT: false,
    UP: false,
    DOWN: false
}

function resetCanvasSize(e){
    console.log(e)
}
function keyboardDown(e) {
    if(e.key = "w"){
        car.UP = true
    }
}
function keyboardUp(e) {
    if(e.key = "w"){
        car.UP = false
    }
}

function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

document.addEventListener('keyup', keyboardUp)
document.addEventListener('keydown', keyboardDown)

requestAnimationFrame(gameloop)