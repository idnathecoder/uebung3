const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const friction = 0.98   

class Ratte {
    constructor() {
        this.radius = 25
        this.color = "green"

        //TODO change position according to width and according to height.
        this.position = {
            x: 500,
            y: 200  
        }
        
        this.velocity = {
            x: 0,
            y: 0,    
        }

        this.recordposition = 0
        this.previousPositions = {
            x: this.x = [],
            y: this.y = []
        }
    }

    startLine(){
        this.recordposition = 1
    }

    endLine(){
        this.recordposition = 0
    }

    clearpreviousPositions(){
        player.previousPositions.x = []
        player.previousPositions.y = []
    }

    handleCollision(obstacle) {
        // Rechte Seite des Hindernisses
        if (
            this.position.x - this.radius <= obstacle.position.x + obstacle.width &&
            this.position.x - this.radius > obstacle.position.x + obstacle.width - 10 &&
            (this.position.y + this.radius > obstacle.position.y &&
            this.position.y - this.radius < obstacle.position.y + obstacle.height)
        ) {
            if (obstacle.mass === 0) {
                this.velocity.x *= -1;
                this.position.x += 1;
            } else {
                obstacle.velocity.x = (2 * this.velocity.x) / (obstacle.mass + 1);
                obstacle.velocity.y = (2 * this.velocity.y) / (obstacle.mass + 1);
    
                this.velocity.x = -(obstacle.mass - 1) * this.velocity.x / (obstacle.mass + 1);
                this.velocity.y = (obstacle.mass - 1) * this.velocity.y / (obstacle.mass + 1);
                this.position.x += 1;
            }
        }
    
        // Linke Seite des Hindernisses
        if (
            this.position.x + this.radius >= obstacle.position.x &&
            this.position.x + this.radius < obstacle.position.x + 10 &&
            (this.position.y + this.radius > obstacle.position.y &&
            this.position.y - this.radius < obstacle.position.y + obstacle.height)
        ) {
            if (obstacle.mass === 0) {
                this.velocity.x *= -1;
                this.position.x -= 1;
            } else {
                obstacle.velocity.x = (2 * this.velocity.x) / (obstacle.mass + 1);
                obstacle.velocity.y = (2 * this.velocity.y) / (obstacle.mass + 1);
    
                this.velocity.x = -(obstacle.mass - 1) * this.velocity.x / (obstacle.mass + 1);
                this.velocity.y = (obstacle.mass - 1) * this.velocity.y / (obstacle.mass + 1);
                this.position.x -= 1;
            }
        }
    
        // Obere Seite des Hindernisses
        if (
            this.position.y + this.radius >= obstacle.position.y &&
            this.position.y + this.radius < obstacle.position.y + 10 &&
            (this.position.x + this.radius > obstacle.position.x &&
            this.position.x - this.radius < obstacle.position.x + obstacle.width)
        ) {
            if (obstacle.mass === 0) {
                this.velocity.y *= -1;
                this.position.y -= 1;
            } else {
                obstacle.velocity.x = (2 * this.velocity.x) / (obstacle.mass + 1);
                obstacle.velocity.y = (2 * this.velocity.y) / (obstacle.mass + 1);
    
                this.velocity.x = (obstacle.mass - 1) * this.velocity.x / (obstacle.mass + 1);
                this.velocity.y = -(obstacle.mass - 1) * this.velocity.y / (obstacle.mass + 1);
                this.position.y -= 1;
            }
        }
    
        // Untere Seite des Hindernisses
        if (
            this.position.y - this.radius <= obstacle.position.y + obstacle.height &&
            this.position.y - this.radius > obstacle.position.y + obstacle.height - 10 &&
            (this.position.x + this.radius > obstacle.position.x &&
            this.position.x - this.radius < obstacle.position.x + obstacle.width)
        ) {
            if (obstacle.mass === 0) {
                this.velocity.y *= -1;
                this.position.y += 1;
            } else {
                obstacle.velocity.x = (2 * this.velocity.x) / (obstacle.mass + 1);
                obstacle.velocity.y = (2 * this.velocity.y) / (obstacle.mass + 1);
    
                this.velocity.x = (obstacle.mass - 1) * this.velocity.x / (obstacle.mass + 1);
                this.velocity.y = -(obstacle.mass - 1) * this.velocity.y / (obstacle.mass + 1);
                this.position.y += 1;
            }
        }
    }
    
    
    drawLine(){
        c.beginPath();
        c.moveTo(this.previousPositions.x[0], this.previousPositions.y[0]); // Start at the previous position
        for(const counter in this.previousPositions.x){
            c.lineTo(this.previousPositions.x[counter], this.previousPositions.y[counter]); // Draw to the current position
        }
        c.lineTo(this.position.x, this.position.y); // Draw to the current position
        c.strokeStyle = "white"; // Line color
        c.lineWidth = 2; // Line thickness
        c.stroke();
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color
        c.fill()
    }

    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.x *= friction //0.96
        this.velocity.y *= friction

        this.handleCollision(obstacle1)
        this.handleCollision(obstacle2)

        this.draw()
        if(this.recordposition === 1){
            if(this.previousPositions.x.length >= 10){
                for(let counter = 0; counter < this.previousPositions.x.length-1; counter++){
                    this.previousPositions.x[counter] = this.previousPositions.x[counter+1]
                    this.previousPositions.y[counter] = this.previousPositions.y[counter+1]
                }
                this.previousPositions.x.pop()
                this.previousPositions.y.pop()
            } else {
                this.previousPositions.x.push(this.position.x)
                this.previousPositions.y.push(this.position.y) 
            }
            this.drawLine()
        }
    }
}

class Obstacle {
    constructor(width, height, posx, posy, mass) {
        this.width = width
        this.height = height
        this.mass = mass //mass = 1 entspricht der Masse des Spielers
        this.color = "red"

        

        //TODO change position according to width and according to height.
        this.position = {
            x: posx,
            y: posy
        }

        this.velocity = {
            x: 0,
            y: 0
        }
        
    }

    handleCollision(obstacle) {
        // Rechte Seite des Hindernisses
        if (
            this.position.x + this.width >= obstacle.position.x &&
            this.position.x + this.width < obstacle.position.x + 10 &&
            (this.position.y + this.height > obstacle.position.y &&
            this.position.y < obstacle.position.y + obstacle.height)
        ) {
            this.velocity.x *= -1;
            this.position.x -= 1;
        }
    
        // Linke Seite des Hindernisses
        if (
            this.position.x <= obstacle.position.x + obstacle.width &&
            this.position.x > obstacle.position.x + obstacle.width - 10 &&
            (this.position.y + this.height > obstacle.position.y &&
            this.position.y < obstacle.position.y + obstacle.height)
        ) {
            this.velocity.x *= -1;
            this.position.x += 1;
        }
    
        // Obere Seite des Hindernisses
        if (
            this.position.y + this.height >= obstacle.position.y &&
            this.position.y + this.height < obstacle.position.y + 10 &&
            (this.position.x + this.width > obstacle.position.x &&
            this.position.x < obstacle.position.x + obstacle.width)
        ) {
            this.velocity.y *= -1;
            this.position.y -= 1;
        }
    
        // Untere Seite des Hindernisses
        if (
            this.position.y <= obstacle.position.y + obstacle.height &&
            this.position.y > obstacle.position.y + obstacle.height - 10 &&
            (this.position.x + this.width > obstacle.position.x &&
            this.position.x < obstacle.position.x + obstacle.width)
        ) {
            this.velocity.y *= -1;
            this.position.y += 1;
        }
    }
    

    draw(){
        c.beginPath()           
        c.rect(this.position.x, this.position.y, this.width, this.height)
        c.fillStyle = this.color
        c.fill()        
    }

    update(){
        if(this.mass != 0){
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            this.velocity.x *= friction
            this.velocity.y *= friction

            this.handleCollision(obstacle1)

            this.draw()
        }
    }
}

function calcboost(time){
    let a = 5
    let b = 0.5
    let c = 1/6
    time /= 1000
    if (time < c){ 
        let n = Math.log(a/b)/Math.log(2)
        let m = a/(Math.pow(c,n))
        //console.log(m*Math.pow(time,n))
        if(m*Math.pow(time,n) > a -1){
            player.startLine()
        } else{
            player.clearpreviousPositions()
        }
        
        return m*Math.pow(time,n)
        
    } else {
        player.startLine()
        //console.log(a)
        return a
    }
}

let lastclick = Date.now()
addEventListener("click", ({offsetX, offsetY}) => {
    //console.log(offsetX-player.position.x)

    player.endLine()

    let alpha = Math.atan2((offsetY-player.position.y),(offsetX-player.position.x))
    let boost = calcboost(Date.now()-lastclick)
    //console.log(Date.now()-lastclick)
    
    player.velocity.x += Math.cos(alpha)*boost
    player.velocity.y += Math.sin(alpha)*boost

    lastclick = Date.now()
})

const player = new Ratte()
const obstacle1 = new Obstacle(200, 200, 100, 100, 0)
const obstacle2 = new Obstacle(50, 50, 500, 500, 2)


function animate(){
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    player.draw()
    obstacle1.draw()
    obstacle2.update()
    obstacle2.draw()
    

    requestAnimationFrame(animate)
}

animate()

