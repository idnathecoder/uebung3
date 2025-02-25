class Finish{
    constructor(width, height, posx, posy) {
        this.width = width
        this.height = height

        this.position = {
            x: posx,
            y: posy
        }

        this.squaresize = 10
 
    }

    is_touching_player() {
        return (
            player.position.x + player.radius > this.position.x &&  // Spieler rechts von der linken Kante
            player.position.x - player.radius < this.position.x + this.width &&  // Spieler links von der rechten Kante
            player.position.y + player.radius > this.position.y &&  // Spieler unterhalb der oberen Kante
            player.position.y - player.radius < this.position.y + this.height // Spieler oberhalb der unteren Kante
        );
    }
    

    draw(){
        // Startposition für das Zeichnen
        const startX = this.position.x;
        const startY = this.position.y;

        // Zeichnen der Kacheln in Schachbrettmuster
        for (let row = 0; row < this.height / this.squaresize; row++) {
            for (let col = 0; col < this.width / this.squaresize; col++) {
                // Berechne die Position für jede Kachel
                const x = startX + col * this.squaresize;
                const y = startY + row * this.squaresize;

                // Wechselnde Farben für das Schachbrettmuster
                if ((row + col) % 2 === 0) {
                    c.fillStyle = 'black'; // Eine Farbe
                } else {
                    c.fillStyle = 'white'; // Andere Farbe
                }

                // Zeichne das Rechteck (Kachel)
                c.fillRect(x, y, this.squaresize, this.squaresize);
            }
        }
    }

    update(){

            this.position.x -= framevelocity.x
            this.position.y -= framevelocity.y
            this.draw()
            if(this.is_touching_player() && 
            document.getElementById("bottom-displays").style.justifyContent != "space-between" && // !="space-between", weil, dann werden schon alle 3 displays angezeigt -> endLevel wurde schon durchgeführt
            document.getElementById("milliseconds").style.display != "none"){ // != "none", weil es dass nur tun soll, wenn milliseconden gezeigt werden -> dann läuft der timer schon
                endLevel();
            }
    }


}