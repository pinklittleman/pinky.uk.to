let LEFT,RIGHT,UP,DOWN,velocity_x,velocity_y,x,y,width,height,momentum_x,momentum_y;

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d")
let friction = 0.04

// inital setup for fps counter
let be = Date.now(),fps=0,info='';

canvas.height = innerHeight
canvas.width = innerWidth

// sets the canvas size to new screen size if the window is resized
var resize = function() {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
}
window.onresize = resize
resize()

// inital setup for the player
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
    DOWN: false,
    Moving: false

}

function resetCanvasSize(e){
    console.log(e)
}

function keyboardDown(e) {
    // sets the direction of movement for the later steps
    if(e.key === "w"){
        car.UP = true
        car.Moving = true
    }
    if(e.key === "s"){
        car.DOWN = true
        car.Moving = true
    }
    if(e.key === "a"){
        car.LEFT = true
        car.Moving = true
    }
    if(e.key === "d"){
        car.RIGHT = true
        car.Moving = true
    }
}
function keyboardUp(e) {
    // sets the movement to false if the player removes finger from the keyboard
    if(e.key === "w"){
        car.UP = false
        car.Moving = false
    }
    if(e.key === "s"){
        car.DOWN = false
        car.Moving = false
    }
    if(e.key === "a"){
        car.LEFT = false
        car.Moving = false
    }
    if(e.key === "d"){
        car.RIGHT = false
        car.Moving = false
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

    // makes the player visable on the screen
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
    // increments or decrements the momentum for each x and y
    if(car.UP){
        car.momentum_y -= 0.5
    }
    if(car.DOWN){
        car.momentum_y += 0.5
    }
    if(car.LEFT){
        car.momentum_x -= 0.5
    }
    if(car.RIGHT){
        car.momentum_x += 0.5
    }

    // makes a new velocity value by multiplying the momentum to the friction minus 1
    car.velocity_x = car.momentum_x * 1-friction
    car.velocity_y = car.momentum_y * 1-friction

    // makes sure the player won't move when movement buttons aren't pressed otherwise the player will "drift"
    if(car.momentum_x === 0 && car.momentum_y === 0){
        car.velocity_x = 0
        car.velocity_y = 0
    }

    // adds the "velocity" to the x and y cordinates
    car.x += car.velocity_x
    car.y += car.velocity_y


    // checks that the player isn't pressing any movement buttons then slows down using friction for smoothness. Once the momentum is low enough it will just stop and set to 0
    if(car.UP === false){
        if(car.momentum_y < 0){
            car.momentum_y *= 1.5-friction
            if((car.momentum_y.toFixed(3)) >= 0.000){
                car.momentum_y = 0                
            }      
        }
    }
    if(car.DOWN === false){
        if(car.momentum_y > 0){
            car.momentum_y *= 1.5-friction
            if((car.momentum_y.toFixed(3)) <= 0.000){
                car.momentum_y = 0                
            }      
        }
    }
    if(car.LEFT === false){
        if(car.momentum_x < 0){
            car.momentum_x *= 1.5-friction
            if((car.momentum_x.toFixed(3)) >= 0.000){
                car.momentum_x = 0                
            }      
        }
    }
    if(car.RIGHT === false){
        if(car.momentum_x > 0){
            car.momentum_x *= 1.5-friction
            if((car.momentum_x.toFixed(3)) <= 0.000){
                car.momentum_x = 0                
            }      
        }
    }
    
    if(car.y < 50){
        car.momentum_y += 1
    }
    if(car.y > canvas.height){
        car.momentum_y -= 1
    }

    if(car.x < 0){
        car.momentum_x += 1
    }
    if(car.x > canvas.width){
        car.momentum_x -= 1
    }


}

// main game loop that gets called on the new frame by the requestAnimationFrame function 
function gameloop(){
    // calls for the new framerate and other functions 
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