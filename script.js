const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

class Ratte {
    constructor() {
        this.radius = 25
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

    drawTrail() {
        // Draw a line from the previous position to the current position
        c.beginPath();
        c.moveTo(this.previousPosition.x, this.previousPosition.y); // Start at the previous position
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
        this.velocity.x *= 0.96
        this.velocity.y *= 0.96

        this.draw()
        //this.drawTrail()
    }
}

function calcboost(time){
    let a = 5
    let b = 1
    let c = 1/6
    time /= 1000
    console.log("test", 1/time)
    if (time < c){ 
        
        let n = Math.log(a/b)/Math.log(2)
        let m = a/(Math.pow(c,n))
        console.log(m*Math.pow(time,n))
        return m*Math.pow(time,n)
        

    } else {
        console.log(a)
        return a
    }
}

let lastclick = Date.now()
addEventListener("click", ({offsetX, offsetY}) => {
    
    //console.log(offsetX-player.position.x)



    let alpha = Math.atan2((offsetY-player.position.y),(offsetX-player.position.x))
    let boost = calcboost(Date.now()-lastclick)
    //console.log(Date.now()-lastclick)
    
    player.velocity.x += Math.cos(alpha)*boost
    player.velocity.y += Math.sin(alpha)*boost
    if(boost > 5){
        player.drawTrail()
    }

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

