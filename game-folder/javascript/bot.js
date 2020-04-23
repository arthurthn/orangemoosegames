let bots = Array.from(document.querySelectorAll('.bot'))
const botCheckBoxs = Array.from(document.querySelectorAll('.bot-detection'))
const botGun = document.querySelector('.bot-gun')
let botSpeed = 5
let botBulletHit = false
let botCanShoot = true
let botIsShooting = false
let playerHealth = 3
const healthBar = document.querySelector('.health-bar')
let botCanMove= [true, true, true, true]
// Make alll our style of postion of the botCheckbox and bots to be able to get them in js
botCheckBoxs[0].style.top = `84px`
botCheckBoxs[1].style.top = `314px`
botCheckBoxs[2].style.top = `314px`
botCheckBoxs[3].style.top = `84px`

botCheckBoxs[0].style.left = `1280px`
botCheckBoxs[1].style.left = `1280px`
botCheckBoxs[2].style.left = `2100px`
botCheckBoxs[3].style.left = `2550px`

botCheckBoxs[0].style.width = `1000px`
botCheckBoxs[1].style.width = `700px`
botCheckBoxs[2].style.width = `1000px`
botCheckBoxs[3].style.width = `780px`

botCheckBoxs[0].style.height = `180px`
botCheckBoxs[1].style.height = `180px`
botCheckBoxs[2].style.height = `180px`
botCheckBoxs[3].style.height = `180px`

bots[0].style.top = `84px`
bots[1].style.top = `341px`
bots[2].style.top = `341px`
bots[3].style.top = `84px`
//  MAke an array with the X limites position of the bots to make them move in a specific area
const botLimit = [limit1 = {
                    x1 : 1950,
                    x2 : 1650
                },
                limit2 = {
                    x1 : 1650,
                    x2 : 1255
                },
                limit3 = {
                    x1 : 2545,
                    x2 : 2495
                },
                limit4 = {
                    x1 : 2800,
                    x2 : 2495
                }]

    
// Array with bos position X used on many function
const botPos = [1650,1255,2495,2495]
// Array with all the side the our bots are looking
const botSide = ['right','right','right','right']


//  Function that make the bots move into they limited area and change sides
function botMovements(botNumber, limit)
{
    // Set speed for ou bots and one is a bit slower
    if(botNumber == 2)
    {
        botSpeed = 2 
    }
    else
    {
        botSpeed = 5
    }

    // If our bot reach the limit we change his side
    if(botPos[botNumber] + botSpeed > limit[botNumber].x1)
    {
        botSide[botNumber] = 'left'
    }
    // Same on the other limit
    if(botPos[botNumber] - botSpeed < limit[botNumber].x2)
    {
        botSide[botNumber] = 'right'
    }
    // If the bot is in right side and if he's not shooting at the player he go on the right 
    if(botSide[botNumber] == 'right' && botIsShooting == false && botCanMove[botNumber] == true)
    {
        botPos[botNumber] = botPos[botNumber] + botSpeed
        bots[botNumber].style.transform = `scaleX(1)`
    }
    // If the bot is in left side and if he's not shooting at the player he go on the left 

    if(botSide[botNumber] == 'left' && botIsShooting == false && botCanMove[botNumber] == true)
    {
        botPos[botNumber] = botPos[botNumber] - botSpeed
        bots[botNumber].style.transform = `scaleX(-1)`
    }
    // When the bot isn't shooting at the player he's in a walk animation
    if(botIsShooting == false)
    {
        bots[botNumber].style.background = `url(../ressources/animation/walk-gard-animation.gif)`
        bots[botNumber].style.backgroundSize = `180px`
    }
    // When the bot is shooting at the player he's in a shoot animation
    if(botIsShooting == true || botCanMove[botNumber] == false)
    {
        bots[botNumber].style.background = `url(../ressources/animation/shoot-gard-animation.gif)`
        bots[botNumber].style.backgroundSize = `180px`
    }
    // Update the x position of the bot at each loop
    bots[botNumber].style.left = `${botPos[botNumber]}px`
}


// Function that look if the player is in an area where the bot should be alerted and decide if he's in position to take the shoot or not
function botShootCheck(botNumber)
{
    // We look if the player coordinate's are in the bot detection's area 
    if(playerPosX + 90 >  parseInt(botCheckBoxs[botNumber].style.left) && playerPosX + 90 <  parseInt(botCheckBoxs[botNumber].style.left) + parseInt(botCheckBoxs[botNumber].style.width)
        && playerPosY + 90 > parseInt(botCheckBoxs[botNumber].style.top) && playerPosY + 90 < parseInt(botCheckBoxs[botNumber].style.top) + parseInt(botCheckBoxs[botNumber].style.height))
    {
        // if the bot isn't already shooting he can shoot
        if(botCanShoot == true)
        {
            // Make the bot being able to shoot only if he's looking at the player
            if(playerPosX < parseInt(bots[botNumber].style.left))
            {
                if(botSide[botNumber] == 'left')
                {
                    // If he can shoot then we tell taht he's shooting that his bullet hasn't hit and that he can't shoot anymore
                    botCanMove[botNumber] = false
                    botIsShooting = true
                    botBulletHit = false
                    botCanShoot = false
                    // Call the bulletShoot funtion to make the bot shoot
                    botBulletShoot(parseInt(bots[botNumber].style.left), parseInt(bots[botNumber].style.top), botNumber)
                    bots[botNumber].style.background = `url(../ressources/animation/shoot-gard-animation.gif)`
                    bots[botNumber].style.backgroundSize = `180px`
                }
            }
            if(playerPosX > parseInt(bots[botNumber].style.left))
            {
                if(botSide[botNumber] == 'right')
                {
                    botCanMove[botNumber] = false
                    botIsShooting = true
                    botBulletHit = false
                    botCanShoot = false
                    botBulletShoot(parseInt(bots[botNumber].style.left), parseInt(bots[botNumber].style.top), botNumber)
                    bots[botNumber].style.background = `url(../ressources/animation/shoot-gard-animation.gif)`
                    bots[botNumber].style.backgroundSize = `180px`
                }
            }
        }
    }
    else{
        botCanMove[botNumber] = true
    }
    
}

// Fonction that gonna make the bot shoot appear
function botBulletShoot(entityPosX, entityPosY, botNumber)
{
    botGun.play()
    //  Create a div tha's gonna be the bullet et set her some coordinates and a class to give ehr some style
    const bullet = document.createElement('div')
    bullet.classList.add('botBullet')
    let bulletX = entityPosX 
    let bulletY = entityPosY + 47
    if(botSide[botNumber] == 'right')
    {
        bulletX = entityPosX + 120
    }
    if(botSide[botNumber] == 'right')
    {
        bulletX = entityPosX + 60
    }
    // Make a set intervall to udpate frequently the bullet position
    const bulletTravel = setInterval(() => 
    {
        //  Chnage bullet style to udpate coordinate
        bullet.style.left = `${bulletX}px`
        bullet.style.top = `${bulletY}px`

        // Make x coordinate of the bullet increase or dicrease depending of the bod side's
        if(botSide[botNumber] == 'right')
            bulletX  = bulletX + bulletSpeed
        if(botSide[botNumber] == 'left')
            bulletX  = bulletX - bulletSpeed
        // Finaly add the bullet in the dom
        background.appendChild(bullet)
        // If the function botBulletCollision return true, then the bullet disappear and the setinterval is ending to end the bulllettravel
        if(botBulletCollision(bulletX, bulletY))
        {
            bullet.remove(background)
            clearInterval(bulletTravel)
        }
    }, 5);
}

//  Function that determine collusion of the bullet to wall or player
function botBulletCollision(bulletPosX, bulletPosY)
{
    //  Look every coordinate of wall and collision thing to see if the bullet goes in it, if it does the function return true
    for(key in collisionsPosition)
    {
        if(bulletPosX + 10 < collisionsPosition[key].x2 && bulletPosX + 10 > collisionsPosition[key].x1 
            && bulletPosY > collisionsPosition[key].y1 && bulletPosY < collisionsPosition[key].y2

            || bulletPosX < collisionsPosition[key].x2 && bulletPosX > collisionsPosition[key].x1
            && bulletPosY > collisionsPosition[key].y1 && bulletPosY < collisionsPosition[key].y2
            )
        {
            botCanShoot = true
            botBulletHit = true
            return botBulletHit
        }
    } 
    if(cruch == true)
    {
        playerHeight = 100
    }
    if(cruch == false)
    {
        playerHeight = 0
    }
    // Look the coordinate of the player and the bullet and if they are at the same place the player lose some healt and the bullet disappear because the function return true
    if(bulletPosX + 10 > playerPosX + 80 && bulletPosX + 10 < playerPosX + 100 
        && bulletPosY > playerPosY + playerHeight && bulletPosY < playerPosY + 160

        || bulletPosX > playerPosX + 80 && bulletPosX < playerPosX + 100 
        && bulletPosY > playerPosY + playerHeight && bulletPosY < playerPosY + 160
        )
    {
        if(playerHealth > 0)
        {

            playerHealth = playerHealth - 1
            healthBar.setAttribute('src', `../ressources/hud/health-bar-${playerHealth}.png`)
        }
        botCanShoot = true
        botBulletHit = true
        return botBulletHit
    }             
      
}



//  Use setinterval to update frequently all our function and others things in our game

setInterval(() => 
{
    for(key in bots)
    {
        botIsShooting = false
        if(bots[key] != '')
        {
            
            botShootCheck(key)
            botMovements(key, botLimit)
        }
    }
}, 100);
