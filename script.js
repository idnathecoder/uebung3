    const canvas = document.querySelector("canvas")
    const c = canvas.getContext("2d")

    const accuracy1 = 10
    const pushback = 5
    const friction = 0.97
    
    let framevelocity = {
        x: 0,
        y: 0
    }



    class Player {
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
            let accuracy2
            if(obstacle.width < obstacle.height){
                accuracy2 = obstacle.width/2
            } else {
                accuracy2 = obstacle.height/2
            }

            // Rechte Seite des Hindernisses
            if (this.is_touching_right(obstacle, accuracy1)) {
                if (framevelocity.x != 0){
                    this.velocity.x = framevelocity.x
                    framevelocity.x = 0
                }
                if (obstacle.mass === 0) {
                    this.velocity.x *= -1;
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
            if(this.is_touching_right(obstacle, accuracy2)){
                this.position.x += pushback 
            }
        
            // Linke Seite des Hindernisses
            if (this.is_touching_left(obstacle, accuracy1)) {
                if (framevelocity.x != 0){
                    this.velocity.x = framevelocity.x
                    framevelocity.x = 0
                }
                if (obstacle.mass === 0) {
                    this.velocity.x *= -1;
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
            if (this.is_touching_left(obstacle, accuracy2)){
                this.position.x -= pushback
            }
        
            // Obere Seite des Hindernisses
            if (this.is_touching_top(obstacle, accuracy1)) {
                if (framevelocity.y != 0){
                    this.velocity.y = framevelocity.y
                    framevelocity.y = 0
                }
                if (obstacle.mass === 0) {
                    this.velocity.y *= -1;
                } else {
                    const v11 = {
                        x: this.velocity.x,
                        y: this.velocity.y
                    }
                    this.velocity.x=(m1*this.velocity.x - obstacle.mass*this.velocity.x + 2*obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    this.velocity.y=(m1*this.velocity.y - obstacle.mass*this.velocity.y + 2*obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
    
                    obstacle.velocity.x=(2*m1*v11.x - m1*obstacle.velocity.x + obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    obstacle.velocity.y=(2*m1*v11.y - m1*obstacle.velocity.y + obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
                }
            }
            if (this.is_touching_top(obstacle, accuracy2)){
                this.position.y -= pushback
            }
        
            // Untere Seite des Hindernisses
            if (this.is_touching_bottom(obstacle, accuracy1)) {
                if (framevelocity.y != 0){
                    this.velocity.y = framevelocity.y
                    framevelocity.y = 0
                }
                if (obstacle.mass === 0) {
                    this.velocity.y *= -1;
                    this.position.y += 5
                } else {
                    const v11 = {
                        x: this.velocity.x,
                        y: this.velocity.y
                    }
                    this.velocity.x=(m1*this.velocity.x - obstacle.mass*this.velocity.x + 2*obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    this.velocity.y=-(m1*this.velocity.y - obstacle.mass*this.velocity.y + 2*obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)

                    obstacle.velocity.x=(2*m1*v11.x - m1*obstacle.velocity.x + obstacle.mass*obstacle.velocity.x)/(m1 + obstacle.mass)
                    obstacle.velocity.y=(2*m1*v11.y - m1*obstacle.velocity.y + obstacle.mass*obstacle.velocity.y)/(m1 + obstacle.mass)
                }
            }
            if(this.is_touching_bottom(obstacle, accuracy2)){
                this.position.y += pushback
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
                    c.beginPath();
            // Erstelle einen radialen Farbverlauf
            let gradient = c.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.radius);
            
            // Füge Farben zum Farbverlauf hinzu: von der Mitte nach außen
            gradient.addColorStop(0, '#00734e');  // Lila/Magenta für die Mitte (ähnlich der Enderperle)
            gradient.addColorStop(0.5, '#00a84f'); // Dunkleres Lila/Magenta in der Mitte (noch intensiver)
            gradient.addColorStop(1, '#1abc9c');  // Türkis für den Rand (heller und leuchtend)
        

            // Setze den Farbverlauf als Füllfarbe
            c.fillStyle = gradient;
            
            // Zeichne den Kreis
            c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            c.fill();
        }

        update(){
            for (let i = 0; i < allobstacles.length; i++) {
                this.handleCollision(allobstacles[i])

            }

            if (this.position.x > 1000){
                if(this.velocity.x > 0){
                    framevelocity.x = this.velocity.x
                } else {
                    this.position.x += this.velocity.x
                }
                
            } else if(this.position.x < 200){
                if(this.velocity.x < 0){
                    framevelocity.x = this.velocity.x
                } else {
                    this.position.x += this.velocity.x
                }

            } else {
                this.position.x += this.velocity.x
            }

            if (this.position.y > 600){
                if(this.velocity.y > 0){
                    framevelocity.y = this.velocity.y
                } else {
                    this.position.y += this.velocity.y
                }
                
            } else if(this.position.y < 200){
                if(this.velocity.y < 0){
                    framevelocity.y = this.velocity.y
                } else {
                    this.position.y += this.velocity.y
                }

            } else {
                this.position.y += this.velocity.y
            }

            this.velocity.x *= friction //0.96
            this.velocity.y *= friction

            framevelocity.x *= friction
            framevelocity.y *= friction

            

            this.draw()
            if(this.recordposition === 1){
                if(this.previousPositions.x.length >= 10){
                    for(let counter = 0; counter < this.previousPositions.x.length-1; counter++){
                        this.previousPositions.x[counter] = this.previousPositions.x[counter+1] - framevelocity.x
                        this.previousPositions.y[counter] = this.previousPositions.y[counter+1] - framevelocity.y
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
            let accuracy2
            if(obstacle.width < obstacle.height){
                accuracy2 = obstacle.width/2
            } else {
                accuracy2 = obstacle.height/2
            }

            // Rechte Seite des Hindernisses
            if (this.is_touching_right(obstacle, accuracy1)) {
                this.velocity.x *= -1;
            }
            if (this.is_touching_right(obstacle, accuracy2)){
                this.position.x += pushback;
            }
            
        
            // Linke Seite des Hindernisses
            if (this.is_touching_left(obstacle, accuracy1)) {
                this.velocity.x *= -1;
            }
            if (this.is_touching_left(obstacle, accuracy2)){
                this.position.x -= pushback;
            }
        
            // Obere Seite des Hindernisses
            if (this.is_touching_top(obstacle, accuracy1)) {
                this.velocity.y *= -1;
            }
            if (this.is_touching_top(obstacle, accuracy2)){
                this.position.y -= pushback;
            }
        
            // Untere Seite des Hindernisses
            if (this.is_touching_bottom(obstacle, accuracy1)) {
                this.velocity.y *= -1;
            }
            if (this.is_touching_bottom(obstacle, accuracy2)){
                this.position.y += pushback;
            }
        }

        is_touching_right(obstacle, accuracy){
            if(this.position.x <= obstacle.position.x + obstacle.width &&
                this.position.x > obstacle.position.x + obstacle.width - accuracy &&
                (this.position.y + this.height > obstacle.position.y &&
                this.position.y < obstacle.position.y + obstacle.height)
            ){
                return true
            } else {
                return false
            }
        }

        is_touching_left(obstacle, accuracy){
            if(this.position.x + this.width >= obstacle.position.x &&
                this.position.x + this.width < obstacle.position.x + accuracy &&
                (this.position.y + this.height > obstacle.position.y &&
                this.position.y < obstacle.position.y + obstacle.height)
            ){
                return true
            } else {
                return false
            }
        }
    
        is_touching_top(obstacle, accuracy){
            if(this.position.y + this.height >= obstacle.position.y &&
                this.position.y + this.height < obstacle.position.y + accuracy &&
                (this.position.x + this.width > obstacle.position.x &&
                this.position.x < obstacle.position.x + obstacle.width)
            ){
                return true
            } else {
                return false
            }
        }
    
        is_touching_bottom(obstacle, accuracy){
            if(this.position.y <= obstacle.position.y + obstacle.height &&
                this.position.y > obstacle.position.y + obstacle.height - accuracy &&
                (this.position.x + this.width > obstacle.position.x &&
                this.position.x < obstacle.position.x + obstacle.width)
            ){
                return true
            } else {
                return false
            }
        }
        
        draw(){
            c.beginPath();
            c.rect(this.position.x, this.position.y, this.width, this.height);
        
            
            let gradient = c.createRadialGradient(
                this.position.x + this.width / 2,  // Mittelpunkt des Rechtecks in x
                this.position.y + this.height / 2, // Mittelpunkt des Rechtecks in y
                0,                                  // Innerer Radius (Mitte des Rechtecks)
                this.position.x + this.width / 2,  // Mittelpunkt des Rechtecks in x
                this.position.y + this.height / 2, // Mittelpunkt des Rechtecks in y
                this.width / 2                      // Äußerer Radius (Rand des Rechtecks)
            );
        
            // Füge Farben zum Farbverlauf hinzu: von innen nach außen
            gradient.addColorStop(0, '#ff3333');  
            if(this.mass === 0){
                gradient.addColorStop(0, '#ff3333');
                gradient.addColorStop(1, '#bd0f0f'); 
            } else {
                gradient.addColorStop(0, '#f54040');
                gradient.addColorStop(1, '#d42222')
            }
            // Setze den Farbverlauf als Füllfarbe
            c.fillStyle = gradient;
            // Fülle das Rechteck
            c.fill();     
        }

        update(){
            if(this.mass != 0){
                this.position.x += this.velocity.x - framevelocity.x
                this.position.y += this.velocity.y - framevelocity.y
                this.velocity.x *= friction
                this.velocity.y *= friction

                for (let i = 0; i < allobstacles.length; i++) {
                    if (this != allobstacles[i]){
                        this.handleCollision(allobstacles[i])
                    }
                    
    
                }


                this.draw()
            } else {
                this.position.x -= framevelocity.x
                this.position.y -= framevelocity.y
                this.draw()
            }
        }
    }

    class Star {
        constructor(x, y) {
            this.x = x;        // Mittelpunkt des Sterns (x)
            this.y = y;        // Mittelpunkt des Sterns (y)
            this.img = new Image();  // Erstelle ein neues Image-Objekt
            this.img.src = "star.jpg";   // Setze den Bildpfad
        }
        
    
        draw() {
            
                c.drawImage(this.img, this.x, this.y, 100, 100);  // Zeichne das Bild
                console.log("out")
            
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
            if(m*Math.pow(time,n) > a-1){
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

    const player = new Player()
    const reward = new Star(500, 300)
    const allobstacles = [
        
        new Obstacle(2300, 200, -100, -100, 0),
        new Obstacle(2300, 200, -100, 1200, 0),
        new Obstacle(200, 1500, -100, -100, 0),
        new Obstacle(200, 1500, 2000, -100, 0),
        
        new Obstacle(200, 200, 100, 100, 0),
        new Obstacle(50, 50, 500, 500, 2),
        
        new Obstacle(400, 400, 600, 0, 0),
        new Obstacle(400, 80, 600, 410, 4),
        new Obstacle(400, 250, 600, 500, 0),

        new Obstacle(50, 80, 1500, 410, 0),



    ];



    function animate(){
        c.clearRect(0, 0, canvas.width, canvas.height)
        player.update()
        player.draw()

        reward.draw()

        for (let i = 0; i < allobstacles.length; i++) {
            allobstacles[i].draw()
            allobstacles[i].update()
        }

        requestAnimationFrame(animate)
    }

    animate()

