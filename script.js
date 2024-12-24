const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

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

    handleCollision(obstacle){
        // Rechte Seite des Hindernisses
        if (
            this.position.x - this.radius <= obstacle.position.x + obstacle.width &&
            this.position.x - this.radius > obstacle.position.x + obstacle.width - 10 &&
            (this.position.y + this.radius > obstacle.position.y &&
            this.position.y - this.radius < obstacle.position.y + obstacle.height)
        ) {
            this.velocity.x *= -1;
            this.position.x += 1;
            //console.log("rechts")
        }

        // Linke Seite des Hindernisses
        if (
            this.position.x + this.radius >= obstacle.position.x &&
            this.position.x + this.radius < obstacle.position.x + 10 &&
            (this.position.y + this.radius > obstacle.position.y &&
            this.position.y - this.radius < obstacle.position.y + obstacle.height)
        ) {
            this.velocity.x *= -1;
            this.position.x -= 1;
            //console.log("links")

        }

        // Obere Seite des Hindernisses
        if (
            this.position.y + this.radius >= obstacle.position.y &&
            this.position.y + this.radius < obstacle.position.y + 10 &&
            (this.position.x + this.radius > obstacle.position.x &&
            this.position.x - this.radius < obstacle.position.x + obstacle.width)
        ) {
            this.velocity.y *= -1;
            this.position.y -= 1;
            //console.log("oben")

        }

        // Untere Seite des Hindernisses
        if (
            this.position.y - this.radius <= obstacle.position.y + obstacle.height &&
            this.position.y - this.radius > obstacle.position.y + obstacle.height - 10 &&
            (this.position.x + this.radius > obstacle.position.x &&
            this.position.x - this.radius < obstacle.position.x + obstacle.width)
        ) {
            this.velocity.y *= -1;
            this.position.y += 1;
            //console.log("unten")

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
        this.velocity.x *= 0.97 //0.96
        this.velocity.y *= 0.97

        this.handleCollision(obstacle1)

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
const obstacle1 = new Obstacle(200, 200, 100, 100)


function animate(){
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    player.draw()
    obstacle1.draw()

    requestAnimationFrame(animate)
}

animate()

