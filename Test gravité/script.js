const player = document.querySelector('.player')
let posX = 000
let posY = 200
let speed = 40
const gravity = 2
const collisionBoxs = document.querySelectorAll('.collision-box')
let right = false
let left = false
let fall = true
let jump = false
let collisionsPosition = []
let inCollision = false

function collisionCheck(keyboardKey)
{
    inCollision = false
    for(key in collisionsPosition)
    {
        if(right)
        {
            if(posX + 180 < collisionsPosition[key].x2 && posX + 180 > collisionsPosition[key].x1 
                && posY > collisionsPosition[key].y1 && posY < collisionsPosition[key].y2

                || posX + 180 < collisionsPosition[key].x2 && posX + 180 > collisionsPosition[key].x1 
                && posY + 170 > collisionsPosition[key].y1 && posY + 170 < collisionsPosition[key].y2

                || posX + 180 < collisionsPosition[key].x2 && posX + 180 > collisionsPosition[key].x1 
                && posY + 85 > collisionsPosition[key].y1 && posY + 85 < collisionsPosition[key].y2)
            {
                inCollision = true
                return inCollision

            }
        }
        if(left)
        {
            if(posX < collisionsPosition[key].x2 && posX > collisionsPosition[key].x1 
                && posY > collisionsPosition[key].y1 && posY < collisionsPosition[key].y2 

                || posX < collisionsPosition[key].x2 && posX > collisionsPosition[key].x1 
                && posY + 170 > collisionsPosition[key].y1 && posY + 170 < collisionsPosition[key].y2
                || posX < collisionsPosition[key].x2 && posX > collisionsPosition[key].x1 
                && posY + 85 > collisionsPosition[key].y1 && posY + 85 < collisionsPosition[key].y2)
            {
                inCollision = true
                return inCollision
            }
        }
        
    }
    return inCollision
}

function getBoxPosition(collisionObjects)
{
    for(collisionObject of collisionObjects)
    {
        const bounding = collisionObject.getBoundingClientRect()
        const position = {
            x1 : bounding.x,
            x2 : bounding.x + bounding.width,
            y1 : bounding.y,
            y2 : bounding.y + bounding.height
        }
        collisionsPosition.push(position)
    }
}
getBoxPosition(collisionBoxs)

window.addEventListener('keydown', (event) =>
{
    if(event.code == 'ArrowRight')
    {
        right = true
        player.style.transform = 'scaleX(1)'
    }
    if(event.code == 'ArrowLeft')
    {
        left = true
        player.style.transform = 'scaleX(-1)'
    }
    if(event.code == 'Space')
    {
        jump = true
       
    }
})

window.addEventListener('keyup', (event) =>
{
    if(event.code == 'ArrowRight')
    {
        right = false
    }
    if(event.code == 'ArrowLeft')
    {
        left = false
    }
    if(event.code == 'Space')
    {
        jump = false
    }
})




setInterval(() => 
{
    fallCheck()
    if(right && collisionCheck(event) == false)
        posX = posX + speed
    
    if(left && collisionCheck(event) == false)
        posX = posX - speed
    console.log(jump, collisionCheck(event) )
    if(jump && collisionCheck(event) == false)
        posY = posY - speed
    
    player.style.top = `${posY}px`
    player.style.left = `${posX}px`
}, 100);


function fallCheck() 
{
    for(let i = 0; i < 40; i++)
    {
        if(fall)
        {
            console.log(fall)
            posY = posY + gravity 
        }
        fall  = true
        for(key in collisionsPosition)
        {
            if(posX + 90 < collisionsPosition[key].x2 && posX + 90 > collisionsPosition[key].x1 
                && posY + 175 > collisionsPosition[key].y1 && posY + 175 < collisionsPosition[key].y2)
                fall = false
                
                
        } 
    }      
        
}