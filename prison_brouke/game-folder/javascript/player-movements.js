const player = document.querySelector('.player')
const background = document.querySelector('.background')
// Camera
let backgroundPos = 0
let cameraFollow = false
//player movement
let startPos = 0
let playerPosX = 90
let playerPosY = 341
let speed = 40
let jumpSpeed = 70
let right = false
let left = false
let jump = false
let canJump = true
let cruch = false 
const gravity = 1
let fall = true
// Hitbox
let playerHeight = 0
const collisionBoxs = document.querySelectorAll('.collision-box')
let collisionsPosition = []
let inCollision = false

// Ladders
const ladders = Array.from(document.querySelectorAll('.ladders'))
let canClimb = false
let climb = false
let disClimb = false
const climbSpeed = 25

// SOUNDS
const keyPickcup  = document.querySelector('.key-pickup')
const jumpSound  = document.querySelector('.jump-sound')
const gun  = document.querySelector('.gun')
const sirena  = document.querySelector('.sirena')
const run  = document.querySelector('.run')
const audios = document.querySelectorAll('.audio')
// Key animation
const zKey = document.querySelector('.z')
const qKey = document.querySelector('.q')
const sKey = document.querySelector('.s')
const dKey = document.querySelector('.d')
const spaceKey = document.querySelector('.space')
const eKey = document.querySelector('.e')
const altKey = document.querySelector('.alt')

for(audio of audios)
{
    audio.volume = 0.1
}

sirena.volume = 0.002

// Load all animations
player.style.background = `url(../ressources/animation/crouch-animation.gif)`
player.style.background = `url(../ressources/animation/crouch-walk-animation.gif)`
player.style.background = `url(../ressources/animation/down-ladders.gif)`
player.style.background = `url(../ressources/animation/shoot-animation.gif)`
player.style.background = `url(../ressources/animation/shoot-gard-animation.gif)`
player.style.background = `url(../ressources/animation/jump-animation.gif)`
player.style.background = `url(../ressources/animation/run-animation.gif)`
player.style.background = `url(../ressources/animation/up-ladders.gif)`
player.style.background = `url(../ressources/animation/shoot-gard-animation.gif)`



// Make a fonction that check if when we try to move the player, he's he gonna be in an object where he shouldnt be like a wall or a floor and others obstacles
function collisionCheck(keyboardKey)
{
    // Tell that there's no collision then check it
    inCollision = false
    // travel the array of possibles collision 
    for(key in collisionsPosition)
    {
        // Lower the hitbox of the player when he crouch an lower the speed when he's
        if(cruch)
        {    
            playerHeight = 70
            speed = 15
        }
        if(cruch == false)
        {    
            playerHeight = 0
            speed = 40
        }

        // Chech when we try on the right
        if(right)
        {
            if(playerPosX + 160 < collisionsPosition[key].x2 && playerPosX + 160 > collisionsPosition[key].x1 
                && playerPosY + playerHeight > collisionsPosition[key].y1 && playerPosY + playerHeight < collisionsPosition[key].y2

                || playerPosX + 160 < collisionsPosition[key].x2 && playerPosX + 160 > collisionsPosition[key].x1 
                && playerPosY + 140 > collisionsPosition[key].y1 && playerPosY + 140 < collisionsPosition[key].y2

                || playerPosX + 160 < collisionsPosition[key].x2 && playerPosX + 160 > collisionsPosition[key].x1 
                && playerPosY + 85 > collisionsPosition[key].y1 && playerPosY + 85 < collisionsPosition[key].y2)
            {
                inCollision = true
                return inCollision

            }
        }
        // Chech when we try on the left
        if(left)
        {
            if(playerPosX + 20 < collisionsPosition[key].x2 && playerPosX + 20 > collisionsPosition[key].x1 
                && playerPosY + playerHeight> collisionsPosition[key].y1 && playerPosY + playerHeight< collisionsPosition[key].y2 

                || playerPosX + 20 < collisionsPosition[key].x2 && playerPosX + 20 > collisionsPosition[key].x1 
                && playerPosY + 140 > collisionsPosition[key].y1 && playerPosY + 140 < collisionsPosition[key].y2
                || playerPosX + 20 < collisionsPosition[key].x2 && playerPosX + 20 > collisionsPosition[key].x1 
                && playerPosY + 75 > collisionsPosition[key].y1 && playerPosY + 75 < collisionsPosition[key].y2)
            {
                inCollision = true
                return inCollision
            }
        }
        // Chech when we try on the jump
        if(jump)
        {
            if(playerPosX < collisionsPosition[key].x2 && playerPosX > collisionsPosition[key].x1 
                && playerPosY > collisionsPosition[key].y1 && playerPosY < collisionsPosition[key].y2 

                || playerPosX + 180 < collisionsPosition[key].x2 && playerPosX + 180 > collisionsPosition[key].x1 
                && playerPosY + 120 > collisionsPosition[key].y1 && playerPosY + 120 < collisionsPosition[key].y2
                || playerPosX < collisionsPosition[key].x2 && playerPosX > collisionsPosition[key].x1 
                && playerPosY + 75 > collisionsPosition[key].y1 && playerPosY + 75 < collisionsPosition[key].y2
                || playerPosX + 180 < collisionsPosition[key].x2 && playerPosX + 180 > collisionsPosition[key].x1 
                && playerPosY + 75 > collisionsPosition[key].y1 && playerPosY + 75 < collisionsPosition[key].y2)
            {
                inCollision = true
                return inCollision
            }
        }
        
    }
    return inCollision
}

//  Function that get poistion for each boxs taht has collision and we call
function getBoxPosition(collisionObjects,posStock)
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
        posStock.push(position)
    }
}
// Call tthe fcuntion ot get all positions
getBoxPosition(collisionBoxs, collisionsPosition)


//  The function that check if the player ahs to fall or if he has to stand on the fllor or on a box or soemthing else
function fallCheck() 
{
    // Make a loop of 40 to check on every pixel moves if he's on a plateform or not
    for(let i = 0; i < 40; i++)
    {
        if(fall)
        {
            playerPosY = playerPosY + gravity 
        }
        fall  = true
        for(key in collisionsPosition)
        {
            if(playerPosX + 100 < collisionsPosition[key].x2 && playerPosX + 100 > collisionsPosition[key].x1 
                && playerPosY + 160 > collisionsPosition[key].y1 && playerPosY + 160 < collisionsPosition[key].y2
                
                || playerPosX + 80 < collisionsPosition[key].x2 && playerPosX + 80 > collisionsPosition[key].x1 
                && playerPosY + 160 > collisionsPosition[key].y1 && playerPosY + 160 < collisionsPosition[key].y2
                
                || playerPosX + 90 < collisionsPosition[key].x2 && playerPosX + 90 > collisionsPosition[key].x1 
                && playerPosY + 160 > collisionsPosition[key].y1 && playerPosY + 160 < collisionsPosition[key].y2)
                fall = false
        } 
    }      
        
}


function ladderBox()
{
    canClimb = false
    for(ladder of ladders)
    {
        const ladderBounding = ladder.getBoundingClientRect()
        ladderX1 = ladderBounding.x - backgroundPos
        ladderX2 = ladderBounding.x - backgroundPos + ladderBounding.width
        ladderY1 = ladderBounding.y
        ladderY2 = ladderBounding.y + ladderBounding.height 

        if( playerPosX + 90 < ladderX2 && playerPosX + 90 > ladderX1 
            && playerPosY + 150 > ladderY1 && playerPosY + 150 < ladderY2)
        {
            canClimb = true
            return canClimb
        }
    }
    return canClimb
}


// Listen every keydown to detect when the player press on the arrow to move the player
window.addEventListener('keydown', (event) =>
{
    if(event.code == 'ArrowRight' || event.code == 'KeyD')
    {
        dKey.style.color = 'black'
        dKey.style.background = 'yellow'
        if(canShoot == true)
            shootSide = 'right'
        right = true
        player.style.transform = 'scaleX(1)'
    }
    if(event.code == 'ArrowLeft' || event.code == 'KeyA')
    {
        qKey.style.color = 'black'
        qKey.style.background = 'yellow'
        if(canShoot == true)
            shootSide = 'left'
        left = true
        player.style.transform = 'scaleX(-1)'
    }
    if(event.code == 'Space' && canJump == true)
    {
        spaceKey.style.color = 'black'
        spaceKey.style.background = 'yellow'
        if(canJump)
            jumpSound.play()
        canJump = false
        setTimeout(() => {
            canJump = true
        }, 600);
        startPos = playerPosY
        jump = true
        
    }
    if(event.code == 'AltRight' || event.code == 'AltLeft')
    {
        altKey.style.color = 'black'
        altKey.style.background = 'yellow'
        cruch = true
    }
    if(event.code == 'ArrowUp' || event.code == 'KeyW')
    {
        zKey.style.color = 'black'
        zKey.style.background = 'yellow'
        climb = true
    }
    if(event.code == 'ArrowDown' || event.code == 'KeyS')
    {
        sKey.style.color = 'black'
        sKey.style.background = 'yellow'
        disClimb = true
    }
})

// Listen when the player release the key to detect that the movement he was doing has to stop

window.addEventListener('keyup', (event) =>
{
    if(event.code == 'ArrowRight' || event.code == 'KeyD')
    {
        dKey.style.color = 'white'
        dKey.style.background = 'none'
        right = false
    }
    if(event.code == 'ArrowLeft' || event.code == 'KeyA')
    {
        qKey.style.color = 'white'
        qKey.style.background = 'none'
        left = false
    }
    if(event.code == 'Space')
    {
        spaceKey.style.color = 'white'
        spaceKey.style.background = 'none'
        jump = false
    }
    if(event.code == 'AltRight' || event.code == 'AltLeft')
    {
        altKey.style.color = 'white'
        altKey.style.background = 'none'
        cruch = false
    }
    if(event.code == 'ArrowUp' || event.code == 'KeyW')
    {
        zKey.style.color = 'white'
        zKey.style.background = 'none'
        climb = false
    }
    if(event.code == 'ArrowDown' || event.code == 'KeyS')
    {
        sKey.style.color = 'white'
        sKey.style.background = 'none'
        disClimb = false
    }
})

//  Frequently refresh the postion of the player and make it appear correctly


setInterval(() => 
{ 
    // Get the middle of the screen
    let backgroundMiddle = window.innerWidth / 2
    //  check if the player has reach the middle if he does the we active the camera follow byt urning the var cameraFollow on true
    if(playerPosX + 90 < backgroundMiddle + 40 
        && playerPosX + 90 > backgroundMiddle - 40 )
    {
        cameraFollow = true
    }
    // If the cameraFollow is active then the postion of the background movve depending of the player position
    if(cameraFollow == true)
    {
        backgroundPos =  - (playerPosX - backgroundMiddle + 180)
    }
    // By default set the animation of the player in stand position
    if(cruch == false && left == false && right == false && jump == false && ladderBox() == false)
    {
        player.style.background = `url(../ressources/animation/stand-animation.gif)`
        player.style.backgroundSize = `180px`
    }
    // If the player isn't jumping we check if he has something under his foot to know if the gravity is active or not
    if(ladderBox() == false)
        fallCheck()
    // Make all our moves if the key are pressed and changing the animation 
    if(right && collisionCheck(event) == false)
    {
        sirena.play()
        player.style.background = `url(../ressources/animation/run-animation.gif)`
        player.style.backgroundSize = `180px`
        playerPosX = playerPosX + speed
        run.play()
    }
    if(left && collisionCheck(event) == false && playerPosX - speed > 0)
    {
        sirena.play()
        playerPosX = playerPosX - speed
        player.style.background = `url(../ressources/animation/run-animation.gif)`
        player.style.backgroundSize = `180px`
        run.play()
    }
    if(jump)
    {
        player.style.background = `url(../ressources/animation/jump-animation.gif)`
        player.style.backgroundSize = `180px`
        playerPosY = playerPosY - jumpSpeed
        setTimeout(() => {
            jump = false
        }, 200);
    } 
    
    if(cruch == true && right == true || cruch == true && left == true)
    {
        player.style.background = `url(../ressources/animation/crouch-walk-animation.gif)`
        player.style.backgroundSize = `180px`
    }
    else if(cruch ==true )
    {
        player.style.background = `url(../ressources/animation/crouch-animation.gif)`
        player.style.backgroundSize = `180px`
    }
    if(climb == true && ladderBox() == true)
    {
        playerPosY = playerPosY - climbSpeed
        player.style.background = `url(../ressources/animation/up-ladders.gif)`
        player.style.backgroundSize = `180px`
    }
    if(disClimb == true && ladderBox() == true && playerPosY < 320 + climbSpeed)
    {
        player.style.background = `url(../ressources/animation/down-ladders.gif)`
        player.style.backgroundSize = `180px`
        playerPosY = playerPosY + climbSpeed
    }
    // Update all our placement of the player ant the background
    background.style.left = `${backgroundPos}px`
    player.style.top = `${playerPosY}px`
    player.style.left = `${playerPosX}px`
}, 100);



