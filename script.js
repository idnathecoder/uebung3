const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

class Ratte {
    constructor() {
        this.width = 50
        this.height = 20
        this.color = "green"

        //TODO change position according to width and according to height.
        this.position = {
            x: 100,
            y: 100  
        }
        
        this.velocity = {
            x: 0,
            y: 0,    
        }
    }
    
    draw(){
        c.beginPath()
        c.rect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = this.color
        c.fill()        
    }
    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.x *= 0.95
        this.velocity.y *= 0.95

        this.draw()
    }
}

function calcboost(time){
    return 5*(1-Math.exp(-10*time))
}

let lastclick = Date.now()
addEventListener("click", ({offsetX, offsetY}) => {
    
    console.log(offsetX-player.position.x)



    let alpha = Math.atan2((offsetY-player.position.y),(offsetX-player.position.x))
    let boost = calcboost(Date.now()-lastclick)
    
    player.velocity.x += Math.cos(alpha)*boost
    player.velocity.y += Math.sin(alpha)*boost

    lastclick = Date.now()

    





    
})

const player = new Ratte()

function animate(){
    
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    player.draw()

    requestAnimationFrame(animate)
    
}

animate()









/*
class Player {
    constructor() {
        this.width = 50
        this.height = 20
        this.color = "green"

        //TODO change position according to width and according to height.
        this.position = {
            x: 100,
            y: 100
        }
        
        this.velocity = {
            x: 0,
            y: 0,    
        }
    }
    
    draw(){
        c.beginPath()
        c.rect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = this.color
        c.fill()        
    }
    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
    }


}

class Obstacle {
    constructor(width, height, posx, posy) {
        this.width = width
        this.height = height
        this.color = "red"

        //TODO change position according to width and according to height.
        this.position = {
            x: posx,
            y: posy
        }
        
    }
    draw(){
        c.beginPath()           
        c.rect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = this.color
        c.fill()        
    }
}


const player = new Player()
const block = new Obstacle(20, 200, 100, 200)

console.log(areRectanglesColliding(player, block))





const keysPressed = {
    "a": false,
    "d": false,
}

let iskeypressed = [false, false, false, false] //wasd

function animate(){

    //0:w   1:a    2:s    3:d
    if (iskeypressed[0] === true && iskeypressed[2] === false){
        player.velocity.y = -2
        if(areRectanglesColliding(player, block)){
            player.velocity.y = 2
        }
    }
    if (iskeypressed[1] === true && iskeypressed[3] === false){
        
        if(areRectanglesColliding(player, block)){
            player.position.x += 4
        } else {
            player.velocity.x = -2
        }
    }
    if (iskeypressed[2] === true && iskeypressed[0] === false){
        player.velocity.y = 2
        if(areRectanglesColliding(player, block)){
            player.velocity.y = -2
        }
    }
    if (iskeypressed[3] === true && iskeypressed[1] === false){
        
        if(areRectanglesColliding(player, block)){
            player.position.x -= 2
        } else {
            player.velocity.x = 2
        }
    }

    if (iskeypressed[0] === false && iskeypressed[2] === false || iskeypressed[0] === true && iskeypressed[2] === true){
        player.velocity.y = 0
    }
    if (iskeypressed[1] === false && iskeypressed[3] === false || iskeypressed[1] === true && iskeypressed[3] === true){
        player.velocity.x = 0
    }



    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    block.draw()
    
    requestAnimationFrame(animate)
    

    
    //console.log(areRectanglesColliding(player, block))
    
}

animate()



addEventListener("keydown", ({key}) => {
    console.log(key)
    switch (key){
        case "w": 
            iskeypressed[0]=true
            break
        case "a": 
            iskeypressed[1]=true
            break   
        case "s": 
            iskeypressed[2]=true
            break
        case "d": 
            iskeypressed[3]=true
            break

        case "ArrowUp": 
            iskeypressed[0]=true
            break
        case "ArrowLeft": 
            iskeypressed[1]=true
            break   
        case "ArrowDown": 
            iskeypressed[2]=true
            break
        case "ArrowRight": 
            iskeypressed[3]=true
            break
                
        case " ":
            const newCircle = circles[0].clone();
            circles.push(newCircle);
            break
    }
})

addEventListener("keyup", ({key}) => {
    console.log(key)
    switch (key){
        case "w": 
            iskeypressed[0]=false
            break
        case "a": 
            iskeypressed[1]=false
            break   
        case "s": 
            iskeypressed[2]=false
            break
        case "d": 
            iskeypressed[3]=false
            break

        case "ArrowUp": 
            iskeypressed[0]=false
            break
        case "ArrowLeft": 
            iskeypressed[1]=false
            break   
        case "ArrowDown": 
            iskeypressed[2]=false
            break
        case "ArrowRight": 
            iskeypressed[3]=false
            break
    }
})

function areRectanglesColliding(rect1, rect2) {
    return (
        rect1.position.x < rect2.position.x + rect2.width &&
        rect1.position.x + rect1.width > rect2.position.x &&
        rect1.position.y < rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height > rect2.position.y
    );
}

function areRectanglesColliding2(rect1, rect2) {
    rect2.width += 2
    rect2.height += 2
    return (
        rect1.position.x < rect2.position.x + rect2.width &&
        rect1.position.x + rect1.width > rect2.position.x &&
        rect1.position.y < rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height > rect2.position.y
    );
}


*/


