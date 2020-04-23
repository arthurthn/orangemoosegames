const background = document.querySelector('.win-background')
const winText = document.querySelector('.win-text')
let textXRandom
let textYRandom
let backgroundX = -300
background.style.left = `${backgroundX}px`
setInterval(() => 
{
    textXRandom = Math.floor(Math.random() * 15)
    textYRandom = Math.floor(Math.random() * 15)
    console.log(textXRandom, textYRandom)
    winText.style.left = `${textXRandom}px`
    winText.style.top = `${textYRandom}px`
    if(background.style.left == '-300px')
    {
        background.style.left = '0px'
        background.style.top = '-40px'
    }
    else
    {
        background.style.left = '-300px'
        background.style.top = '0px'

    }

}, 50);





