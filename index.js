let LEFT,RIGHT,UP,DOWN,velocity_x,velocity_y,x,y,width,height
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d")

canvas.height = innerHeight
canvas.width = innerWidth

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

}
function keyboardDown(e) {
    console.log(e.key)
}

document.addEventListener('keydown', keyboardDown)
document.addEventListener('resize', resetCanvasSize)