const player = document.querySelector('.player')
let posX = 0
let posY = 200
let speed = 20

let right = false
let left = false
let jump = false



setInterval(() => 
{
    if(right == true)
    {
        posX = posX + speed
    }
    if(left == true)
    {
        posX = posX - speed
    }
    player.style.top = `${posY}px`
    player.style.left = `${posX}px`
}, 100);

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
        posY = posY - 200
        setTimeout(() => 
        {
            posY = posY + 200
            player.style.top = `${posY}px`
            player.style.left = `${posX}px`
        }, 500);
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
})

