const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

const accuracy1 = 10
const pushback = 5
const friction = 0.97

let framevelocity = {
    x: 0,
    y: 0
}

let frameposition = {
    x: 0,
    y: 0
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
    if(isRaceStarted){
        player.endLine()

        let alpha = Math.atan2((offsetY-player.position.y),(offsetX-player.position.x))
        let boost = calcboost(Date.now()-lastclick)
        //console.log(Date.now()-lastclick)
        
        player.velocity.x += Math.cos(alpha)*boost
        player.velocity.y += Math.sin(alpha)*boost

        lastclick = Date.now()
    }
    //console.log(offsetX-player.position.x)

    
})


function starttimer() {
    let beginDate = Date.now();
    let currentTime = Date.now()-beginDate;
    setInterval(()=>{
        let colon = ""
        currentTime = Date.now()-beginDate

        if(currentTime/1000>=60){
            document.getElementById("minutes").style.display = "inline"
            document.getElementById("minutes").innerHTML = Math.floor(currentTime/1000/60)

            colon = ":"
            document.getElementById("seconds").style.width = "70px"
        } else {
            document.getElementById("seconds").style.width = "60px"
        }

        if(Math.floor((Date.now()-beginDate)/1000%60)<10){
            document.getElementById("seconds").innerHTML = colon + "0" + Math.floor((Date.now()-beginDate)/1000%60)
        } else {
            document.getElementById("seconds").innerHTML = colon + Math.floor((Date.now()-beginDate)/1000%60)
        }
        
        let ms = Math.floor((Date.now()-beginDate)%1000)
        if(ms<10){
            document.getElementById("milliseconds").innerHTML = ".00" + ms
        } else if (ms < 100) {
            document.getElementById("milliseconds").innerHTML = ".0" + ms
        } else {
            document.getElementById("milliseconds").innerHTML = "." + ms
        }

    }, 1)
}


function doLevel(level){

    const svgUrl = "map" + level + ".svg"
    fetch(svgUrl)
    .then(response => response.text())  // Lade SVG als Text
    .then(svgContent => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
        console.log(svgDoc.querySelector('g').children)
        const rectangle = Array.from(svgDoc.querySelector('g').children)

        /*
        console.log(rectangle)
        console.log(rectangle[0].height.baseVal.value)
        console.log(rectangle[0].width.baseVal.value)
        console.log(rectangle[3].style.fill)
        console.log(rectangle[2].querySelector('desc').innerHTML)
        */

        rectangle.forEach((element) => {
            try{
                if(element.style.fill === "rgb(254, 0, 0)"){
                    console.log("rot")
                    tempObstacle = new Obstacle(element.width.baseVal.value, element.height.baseVal.value, element.x.baseVal.value, element.y.baseVal.value, 0)
                    allobstacles.push(tempObstacle)
                } else if (element.style.fill === "rgb(255, 76, 76)"){
                    console.log("sanft rot")
                    tempObstacle = new Obstacle(element.width.baseVal.value, element.height.baseVal.value, element.x.baseVal.value, element.y.baseVal.value, element.querySelector('desc').innerHTML)
                    allobstacles.push(tempObstacle)
                } else if (element.style.fill === "rgb(0, 191, 130)"){
                    console.log("türkis")
                    player.position.x = element.x.baseVal.value + element.width.baseVal.value/2
                    player.position.y = element.y.baseVal.value + element.height.baseVal.value/2
                } else {
                    console.log("farbe nicht erkannt")
                }
            } catch {
                console.log("kein rechteck")
            }

        });

        }
    )

    setTimeout(function() {
        isRaceStarted = true;
        document.getElementById("minutes").style.display = "none"
        starttimer()
        
    }, 3000);

    for (i=0; i<=3; i++){
        document.getElementById("minutes").style.display = "inline"
        let j = i
        setTimeout(function() {
            document.getElementById("minutes").innerText = 3-j
        }, j*1000);
        console.log("2", i)
    }
}



//--------------------------

let buttonRow = Array.from(document.getElementById("level-select").children);
let isRaceStarted = false


buttonRow.forEach(button => {
    button.addEventListener("click", function(){
        document.getElementById("timer").style.display = "flex";
        document.getElementsByTagName("canvas")[0].style.display = "block";
        document.getElementById("level-select").style.display = "none";
        doLevel(button.textContent.toString())
        
        animate()

    });
    
});





const player = new Player()
const allobstacles = [
        new Obstacle(5400, 200, -200, -200, 0),
        new Obstacle(5400, 200, -200, 2500, 0),
        new Obstacle(200, 2900, -200, -200, 0),
        new Obstacle(200, 2900, 5000, -200, 0)
]





function animate(){
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    player.update()
    player.draw()      

    for (let i = 0; i < allobstacles.length; i++) {
        allobstacles[i].update()
        allobstacles[i].draw()
    }

    

    requestAnimationFrame(animate)
}



