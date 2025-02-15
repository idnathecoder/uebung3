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