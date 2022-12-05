const socket = io.connect('wss://pinky.uk.to:5000');
let LEFT,RIGHT,UP,DOWN,velocity_x,velocity_y,x,y,width,height,momentum_x,momentum_y,count = 0;
let players = []
let sockets = []
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
    x: Math.floor(Math.random() * canvas.width-50) + 50,
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

class Car2 {
    constructor(x,y){
        this.x = x,
        this.y = y,
        this.velocity_x = 0,
        this.velocity_y = 0,
        this.momentum_x = 0,
        this.momentum_y = 0,
        players.push(this)

    }
    draw() {
        ctx.fillStyle = "#FF5733";
        ctx.fillRect(this.x, this.y, 100, 100);
        ctx.fillStyle = "#302A3B";
        ctx.fillText(`x: ${this.x.toFixed(3)} y: ${this.y.toFixed(3)}`, this.x+10, this.y+10);
        ctx.fillText(`vel-x: ${this.velocity_x.toFixed(3)}  vel-y: ${this.velocity_y.toFixed(3)}`, this.x+10, this.y+20)
        ctx.fillText(`m_x: ${this.momentum_x.toFixed(3)} m_y: ${this.momentum_y.toFixed(3)}`, this.x+10, this.y+30)
    }
    checkupdates(){ 
        // makes a new velocity value by multiplying the momentum to the friction minus 1
        this.velocity_x = this.momentum_x * 1-friction
        this.velocity_y = this.momentum_y * 1-friction
    
        // makes sure the player won't move when movement buttons aren't pressed otherwise the player will "drift"
        if(this.momentum_x === 0 && this.momentum_y === 0){
            this.velocity_x = 0
            this.velocity_y = 0
        }
    
        // adds the "velocity" to the x and y cordinates
        this.x += this.velocity_x
        this.y += this.velocity_y
    
    
        // checks that the player isn't pressing any movement buttons then slows down using friction for smoothness. Once the momentum is low enough it will just stop and set to 0
        
        if(this.momentum_y < 0){
            this.momentum_y *= 1-friction
            if((this.momentum_y.toFixed(3)) >= 0.000){
                this.momentum_y = 0                
            }      
        }
        

        if(this.momentum_y > 0){
            this.momentum_y *= 1-friction
            if((this.momentum_y.toFixed(3)) <= 0.000){
                this.momentum_y = 0                
            }      
        }
        
        
        if(this.momentum_x < 0){
            this.momentum_x *= 1-friction
            if((this.momentum_x.toFixed(3)) >= 0.000){
                this.momentum_x = 0                
            }      
        }
        
      
        if(this.momentum_x > 0){
            this.momentum_x *= 1-friction
            if((this.momentum_x.toFixed(3)) <= 0.000){
                this.momentum_x = 0                
            }      
        }
        
        if(this.y < 0){
            this.momentum_y = 0
            this.momentum_y = 1
        }
        if(this.y+100 > canvas.height){
            this.momentum_y = 0
            this.momentum_y = -1
        }
    
        if(this.x < 0){
            this.momentum_x = 0
            this.momentum_x = 1
        }
        if(this.x+100 > canvas.width){
            this.momentum_x = 0
            this.momentum_x = -1
        }
    
    
    }
}
function resetCanvasSize(e){
    console.log(e)
}

function keyboardDown(e) {
    // sets the direction of movement for the later steps
    if(e.key === "w"){
        car.UP = true
        car.Moving = true
        socket.emit('movement', {ID:socket.id, LEFT:car.LEFT , RIGHT:car.RIGHT , UP:car.UP , DOWN:car.DOWN, x:car.x, y:car.y})
    }
    if(e.key === "s"){
        car.DOWN = true
        car.Moving = true
        socket.emit('movement', {ID:socket.id, LEFT:car.LEFT , RIGHT:car.RIGHT , UP:car.UP , DOWN:car.DOWN, x:car.x, y:car.y})
    }
    if(e.key === "a"){
        car.LEFT = true
        car.Moving = true
        socket.emit('movement', {ID:socket.id, LEFT:car.LEFT , RIGHT:car.RIGHT , UP:car.UP , DOWN:car.DOWN, x:car.x, y:car.y})
    }
    if(e.key === "d"){
        car.RIGHT = true
        car.Moving = true
        socket.emit('movement', {ID:socket.id, LEFT:car.LEFT , RIGHT:car.RIGHT , UP:car.UP , DOWN:car.DOWN, x:car.x, y:car.y})
    }
}
function keyboardUp(e) {
    // sets the movement to false if the player removes finger from the keyboard
    if(e.key === "w"){
        car.UP = false
        car.Moving = false
        socket.emit('movementstop', {ID:socket.id, LEFT:car.LEFT , RIGHT:car.RIGHT , UP:car.UP , DOWN:car.DOWN, x:car.x, y:car.y})
    }
    if(e.key === "s"){
        car.DOWN = false
        car.Moving = false
        socket.emit('movementstop', {ID:socket.id, LEFT:car.LEFT , RIGHT:car.RIGHT , UP:car.UP , DOWN:car.DOWN, x:car.x, y:car.y})
    }
    if(e.key === "a"){
        car.LEFT = false
        car.Moving = false
        socket.emit('movementstop', {ID:socket.id, LEFT:car.LEFT , RIGHT:car.RIGHT , UP:car.UP , DOWN:car.DOWN, x:car.x, y:car.y})
    }
    if(e.key === "d"){
        car.RIGHT = false
        car.Moving = false
        socket.emit('movementstop', {ID:socket.id, LEFT:car.LEFT , RIGHT:car.RIGHT , UP:car.UP , DOWN:car.DOWN, x:car.x, y:car.y})
    }
}

function draw(){
    // makes the player visable on the screen
    ctx.fillStyle = "#FF5733";
    ctx.fillRect(car.x, car.y, 100, 100);
    ctx.fillStyle = "#302A3B";
    ctx.fillText(`x: ${car.x.toFixed(3)} y: ${car.y.toFixed(3)}`, car.x+10, car.y+10);
    ctx.fillText(`vel-x: ${car.velocity_x.toFixed(3)}  vel-y: ${car.velocity_y.toFixed(3)}`, car.x+10, car.y+20)
    ctx.fillText(`m_x: ${car.momentum_x.toFixed(3)} m_y: ${car.momentum_y.toFixed(3)}`, car.x+10, car.y+30)
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
            car.momentum_y *= 1-friction
            if((car.momentum_y.toFixed(3)) >= 0.000){
                car.momentum_y = 0                
            }      
        }
    }
    if(car.DOWN === false){
        if(car.momentum_y > 0){
            car.momentum_y *= 1-friction
            if((car.momentum_y.toFixed(3)) <= 0.000){
                car.momentum_y = 0                
            }      
        }
    }
    if(car.LEFT === false){
        if(car.momentum_x < 0){
            car.momentum_x *= 1-friction
            if((car.momentum_x.toFixed(3)) >= 0.000){
                car.momentum_x = 0                
            }      
        }
    }
    if(car.RIGHT === false){
        if(car.momentum_x > 0){
            car.momentum_x *= 1-friction
            if((car.momentum_x.toFixed(3)) <= 0.000){
                car.momentum_x = 0                
            }      
        }
    }
    
    if(car.y < 0){
        car.momentum_y = 0
        car.momentum_y = 1
    }
    if(car.y+100 > canvas.height){
        car.momentum_y = 0
        car.momentum_y = -1
    }

    if(car.x < 0){
        car.momentum_x = 0
        car.momentum_x = 1
    }
    if(car.x+100 > canvas.width){
        car.momentum_x = 0
        car.momentum_x = -1
    }


}

socket.on('newmov', helpme)

function helpme(data) {
    console.log(data)
    if(data.ID != socket.id){
        players.forEach(player => {
            if(data.UP){
                player.momentum_y -= 0.5
            }
            if(data.DOWN){
                player.momentum_y += 0.5
            }
            if(data.LEFT){
                player.momentum_x -= 0.5
            }
            if(data.RIGHT){
                player.momentum_x += 0.5
            }
        });
    }
}

// main game loop that gets called on the new frame by the requestAnimationFrame function 
function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // calls for the new framerate and other functions 
    let now = Date.now()
    fps = Math.round(1000 / (now - be))
    be = now

    draw()
    checkupdates()

    players.forEach(player => {
        player.draw()
        player.checkupdates()
    });

    requestAnimationFrame(gameloop)
}

socket.on('newusr', help)
function help(data){
    sockets = data
    let pos = sockets.indexOf(socket.id)
    sockets.splice(pos,pos+1)
    let leng = sockets.length
    sockets.forEach(sock => {
        if(sock != socket.id){
            if(count < leng){
                new Car2(200,200)
                count++
                players.forEach(player => {
                    sockets.forEach(sock => {
                        player["ID"] = sock
                    }); 
                    player.momentum_x += Math.floor(Math.random() * 5) + 0.2
                });
            }
            
        }
    });
}

document.addEventListener('keyup', keyboardUp)
document.addEventListener('keydown', keyboardDown)

requestAnimationFrame(gameloop)