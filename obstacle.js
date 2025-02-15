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
            if (obstacle.mass === 0) {
                this.velocity.x *= -1;
            } else {
                const v11 = {
                    x: this.velocity.x,
                    y: this.velocity.y
                }
                this.velocity.x=-(this.mass*this.velocity.x - obstacle.mass*this.velocity.x + 2*obstacle.mass*obstacle.velocity.x)/(this.mass + obstacle.mass)
                this.velocity.y=(this.mass*this.velocity.y - obstacle.mass*this.velocity.y + 2*obstacle.mass*obstacle.velocity.y)/(this.mass + obstacle.mass)

                obstacle.velocity.x=(2*this.mass*v11.x - this.mass*obstacle.velocity.x + obstacle.mass*obstacle.velocity.x)/(this.mass + obstacle.mass)
                obstacle.velocity.y=(2*this.mass*v11.y - this.mass*obstacle.velocity.y + obstacle.mass*obstacle.velocity.y)/(this.mass + obstacle.mass)
            }
        }
        if (this.is_touching_right(obstacle, accuracy2)){
            this.position.x += pushback;
        }
        
    
        // Linke Seite des Hindernisses
        if (this.is_touching_left(obstacle, accuracy1)) {
            if (obstacle.mass === 0) {
                this.velocity.x *= -1;
            } else {
                const v11 = {
                    x: this.velocity.x,
                    y: this.velocity.y
                }
                this.velocity.x=-(this.mass*this.velocity.x - obstacle.mass*this.velocity.x + 2*obstacle.mass*obstacle.velocity.x)/(this.mass + obstacle.mass)
                this.velocity.y=(this.mass*this.velocity.y - obstacle.mass*this.velocity.y + 2*obstacle.mass*obstacle.velocity.y)/(this.mass + obstacle.mass)

                obstacle.velocity.x=(2*this.mass*v11.x - this.mass*obstacle.velocity.x + obstacle.mass*obstacle.velocity.x)/(this.mass + obstacle.mass)
                obstacle.velocity.y=(2*this.mass*v11.y - this.mass*obstacle.velocity.y + obstacle.mass*obstacle.velocity.y)/(this.mass + obstacle.mass)
            }
        }
        if (this.is_touching_left(obstacle, accuracy2)){
            this.position.x -= pushback;
        }
    
        // Obere Seite des Hindernisses
        if (this.is_touching_top(obstacle, accuracy1)) {
            if (obstacle.mass === 0) {
                this.velocity.y *= -1;
            } else {
                const v11 = {
                    x: this.velocity.x,
                    y: this.velocity.y
                }
                this.velocity.x=(this.mass*this.velocity.x - obstacle.mass*this.velocity.x + 2*obstacle.mass*obstacle.velocity.x)/(this.mass + obstacle.mass)
                this.velocity.y=(this.mass*this.velocity.y - obstacle.mass*this.velocity.y + 2*obstacle.mass*obstacle.velocity.y)/(this.mass + obstacle.mass)

                obstacle.velocity.x=(2*this.mass*v11.x - this.mass*obstacle.velocity.x + obstacle.mass*obstacle.velocity.x)/(this.mass + obstacle.mass)
                obstacle.velocity.y=(2*this.mass*v11.y - this.mass*obstacle.velocity.y + obstacle.mass*obstacle.velocity.y)/(this.mass + obstacle.mass)
            }
        }
        if (this.is_touching_top(obstacle, accuracy2)){
            this.position.y -= pushback;
        }
    
        // Untere Seite des Hindernisses
        if (this.is_touching_bottom(obstacle, accuracy1)) {
            if (obstacle.mass === 0) {
                this.velocity.y *= -1;
                this.position.y += 5
            } else {
                const v11 = {
                    x: this.velocity.x,
                    y: this.velocity.y
                }
                this.velocity.x=(this.mass*this.velocity.x - obstacle.mass*this.velocity.x + 2*obstacle.mass*obstacle.velocity.x)/(this.mass + obstacle.mass)
                this.velocity.y=-(this.mass*this.velocity.y - obstacle.mass*this.velocity.y + 2*obstacle.mass*obstacle.velocity.y)/(this.mass + obstacle.mass)

                obstacle.velocity.x=(2*this.mass*v11.x - this.mass*obstacle.velocity.x + obstacle.mass*obstacle.velocity.x)/(this.mass + obstacle.mass)
                obstacle.velocity.y=(2*this.mass*v11.y - this.mass*obstacle.velocity.y + obstacle.mass*obstacle.velocity.y)/(this.mass + obstacle.mass)
            }
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