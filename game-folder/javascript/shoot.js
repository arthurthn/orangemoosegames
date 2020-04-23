const bulletSpeed  = 5
// create our var to know if the bullet has hit if the bot can shot or if he's currently shooting 
let bulletHit = false
let shootSide = 'right'
let canShoot = true
let botKill = false




// Fonction that gonna make the player shoot appear and move
function bulletShoot(entityPosX, entityPosY)
{
    //  Create a div tha's gonna be the bullet et set her some coordinates and a class to give ehr some style
    const bullet = document.createElement('div')
    bullet.classList.add('bullet')
    let bulletX = entityPosX 
    let bulletY = entityPosY + 40


    if(shootSide == 'right')
        bulletX = bulletX + 100

    if(shootSide == 'left')
        bulletX = bulletX + 80

     // Make a set intervall to udpate frequently the bullet position   
    const bulletTravel = setInterval(() => 
    {
         //  Chnage bullet style to udpate coordinate
        bullet.style.left = `${bulletX}px`
        bullet.style.top = `${bulletY}px`

         // Make x coordinate of the bullet increase or dicrease depending of the player side's
        if(shootSide == 'right')
            bulletX  = bulletX + bulletSpeed
        if(shootSide == 'left')
            bulletX  = bulletX - bulletSpeed
        // Finaly add the bullet in the dom
        background.appendChild(bullet)

        // If the function BulletCollision return true, then the bullet disappear and the setinterval is ending to end the bulllettravel
        if(bulletCollision(bulletX, bulletY))
        {
            bullet.remove(background)
            clearInterval(bulletTravel)
        }
    }, 5);
}

//  Look if the bullet hit a wall or a  bot
function bulletCollision(bulletPosX, bulletPosY)
{
    // Look for every wall or collisions htings
    for(key in collisionsPosition)
    {
        if(bulletPosX + 10 < collisionsPosition[key].x2 && bulletPosX + 10 > collisionsPosition[key].x1 
            && bulletPosY > collisionsPosition[key].y1 && bulletPosY < collisionsPosition[key].y2

            || bulletPosX < collisionsPosition[key].x2 && bulletPosX > collisionsPosition[key].x1
            && bulletPosY > collisionsPosition[key].y1 && bulletPosY < collisionsPosition[key].y2
            )
        {
            // If he hit one of them,t hen the bullet hit so bulletHit = true and he can cann shoot again et the function return true
            bulletHit = true
            canShoot = true
            return bulletHit
        }
    } 
    // Look for every bots
    for(key in  bots)
    {
        if(bots[key] != '')
        {
            if(bulletPosX > parseInt(bots[key].style.left) + 60  && bulletPosX < parseInt(bots[key].style.left) + 120
            && bulletPosY > parseInt(bots[key].style.top) && bulletPosY < parseInt(bots[key].style.top) + 160)
            {
                bulletHit = true
                // If it hit the bot, remove the bot from the game
                bots[key].remove(background)
                //replace the bot from the array by nothing 
                bots.splice(key, 1,'')
                 // If he hit one of them,t hen the bullet hit so bulletHit = true and he can cann shoot again et the function return true
                canShoot = true
                return bulletHit 
            } 
        }
    }                 
}


// We listen the E key to know if the player shoot or not
window.addEventListener('keydown', (event) =>
{
    // Key animation
    if(event.code == 'KeyE')
    {
        eKey.style.color = 'black'
        eKey.style.background = 'yellow'
    }
    // The player can't shoot when crouch
    if(cruch == false)
    {
        // He can shoot only if canShoot is true
        if(event.code == 'KeyE' && canShoot == true)
        {
            // Play a sound
            gun.play()
            // The bullet hasn't hit yet 
            bulletHit = false
            // Call the bullet shoot fu ction to create the bullet  and make it move
            bulletShoot(playerPosX, playerPosY)
            canShoot = false
            player.style.background = `url(../ressources/animation/shoot-animation.gif)`
            player.style.backgroundSize = `180px`
        }
    }
})

// Key board animation
window.addEventListener('keyup', (event) =>
{
    if(event.code == 'KeyE')
    {
        eKey.style.color = 'white'
        eKey.style.background = 'none'
    }
})
