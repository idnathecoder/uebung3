    const canvas = document.querySelector("canvas")
    const c = canvas.getContext("2d")






    const friction = 0.97



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

            this.screenPosition = {
                x: 0,
                y: 0
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
            const m1 = 1
            const accuracy1 = 10
            let accuracy2
            if(obstacle.width < obstacle.height){
                accuracy2 = obstacle.width/2
            } else {
                accuracy2 = obstacle.height/2
            }

            // Rechte Seite des Hindernisses
            if (this.is_touching_right(obstacle, accuracy1)) {
                if (obstacle.mass === 0) {
                    this.velocity.x *= -1;
                    this.position.x += 1;
                } else {
                    const v11 = {
                        x: this.velocity.x,
                        y: this.velocity.y
                    }

                    this.velocity.x=-(m1*this.velocity.x - obstacle.mass*this.velocity.x + 2*obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    this.velocity.y=(m1*this.velocity.y - obstacle.mass*this.velocity.y + 2*obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
    
                    obstacle.velocity.x=(2*m1*v11.x - m1*obstacle.velocity.x + obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    obstacle.velocity.y=(2*m1*v11.y - m1*obstacle.velocity.y + obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
                }
            }
            if(this.is_touching_right(obstacle, accuracy2) && obstacle.mass != 0){
                this.position.x += 1
            }
        
            // Linke Seite des Hindernisses
            if (this.is_touching_left(obstacle, accuracy1)) {
                if (obstacle.mass === 0) {
                    this.velocity.x *= -1;
                    this.position.x -= 1;
                } else {
                    const v11 = {
                        x: this.velocity.x,
                        y: this.velocity.y
                    }

                    this.velocity.x=-(m1*this.velocity.x - obstacle.mass*this.velocity.x + 2*obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    this.velocity.y=(m1*this.velocity.y - obstacle.mass*this.velocity.y + 2*obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
    
                    obstacle.velocity.x=(2*m1*v11.x - m1*obstacle.velocity.x + obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    obstacle.velocity.y=(2*m1*v11.y - m1*obstacle.velocity.y + obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
                    this.position.x -= 1 
                }
            }
            if(this.is_touching_left(obstacle, accuracy2) && obstacle.mass != 0){
                this.position.x -= 1
            }
        
            // Obere Seite des Hindernisses
            if (this.is_touching_top(obstacle, accuracy1)) {
                if (obstacle.mass === 0) {
                    this.velocity.y *= -1;
                    this.position.y -= 1;
                } else {
                    const v11 = {
                        x: this.velocity.x,
                        y: this.velocity.y
                    }

                    this.velocity.x=(m1*this.velocity.x - obstacle.mass*this.velocity.x + 2*obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    this.velocity.y=(m1*this.velocity.y - obstacle.mass*this.velocity.y + 2*obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
    
                    obstacle.velocity.x=(2*m1*v11.x - m1*obstacle.velocity.x + obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    obstacle.velocity.y=(2*m1*v11.y - m1*obstacle.velocity.y + obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
                    this.position.y -= 1
                    
                }
            }
            if(this.is_touching_top(obstacle, accuracy2) && obstacle.mass != 0){
                this.position.y -= 1
            }
        
            // Untere Seite des Hindernisses
            if (this.is_touching_bottom(obstacle, accuracy1)) {
                if (obstacle.mass === 0) {
                    this.velocity.y *= -1;
                    this.position.y += 1;
                } else {
                    const v11 = {
                        x: this.velocity.x,
                        y: this.velocity.y
                    }

                    this.velocity.x=(m1*this.velocity.x - obstacle.mass*this.velocity.x + 2*obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    this.velocity.y=-(m1*this.velocity.y - obstacle.mass*this.velocity.y + 2*obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
    
                    obstacle.velocity.x=(2*m1*v11.x - m1*obstacle.velocity.x + obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    obstacle.velocity.y=(2*m1*v11.y - m1*obstacle.velocity.y + obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
                    this.position.y += 1 
                }
            }
            if(this.is_touching_bottom(obstacle, accuracy2) && obstacle.mass != 0){
                this.position.y += 1
            }
        }

        is_touching_right(obstacle, accuracy){
            if(this.position.x - this.radius <= obstacle.position.x + obstacle.width &&
                this.position.x - this.radius > obstacle.position.x + obstacle.width - accuracy &&
                (this.position.y + this.radius > obstacle.position.y &&
                this.position.y - this.radius < obstacle.position.y + obstacle.height)
            ){
                return true
            } else {
                return false
            }
        }
    
        is_touching_left(obstacle, accuracy){
            if(this.position.x + this.radius >= obstacle.position.x &&
                this.position.x + this.radius < obstacle.position.x + accuracy &&
                (this.position.y + this.radius > obstacle.position.y &&
                this.position.y - this.radius < obstacle.position.y + obstacle.height)
            
            ){
                return true
            } else {
                return false
            }
        }
    
        is_touching_top(obstacle, accuracy){
            if(this.position.y + this.radius >= obstacle.position.y &&
                this.position.y + this.radius < obstacle.position.y + accuracy &&
                (this.position.x + this.radius > obstacle.position.x &&
                this.position.x - this.radius < obstacle.position.x + obstacle.width)
            ){
                return true
            } else {
                return false
            }
        }
    
        is_touching_bottom(obstacle, accuracy){
            if(this.position.y - this.radius <= obstacle.position.y + obstacle.height &&
                this.position.y - this.radius > obstacle.position.y + obstacle.height - accuracy &&
                (this.position.x + this.radius > obstacle.position.x &&
                this.position.x - this.radius < obstacle.position.x + obstacle.width)
            ){
                return true
            } else {
                return false
            }
        }

        moveFrame(){
            if(this.position.x > 800){

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
            const accuracy = 10

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
        let b = 0.8
        let c = 1/3.5
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





    //--------------------------

    const player = new Ratte()
    const obstacle1 = new Obstacle(200, 200, 100, 100, 0)
    const obstacle2 = new Obstacle(50, 50, 500, 500, 1)


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

