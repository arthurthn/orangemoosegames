const openKey = document.querySelector('.openKey')
let keyCollected = false
const win = document.querySelector('.win')
const lose = document.querySelector('.lose')
const keyBounding = openKey.getBoundingClientRect()


setInterval(() => 
{
    if(playerPosX + 90> 1300 && playerPosX + 90 < 1360 && playerPosY + 90 > 314 && playerPosY + 90 < 600)
    {
        if(keyCollected == false)
        {
            openKey.style.display = 'none'
            keyPickcup.play()
            keyCollected = true
        }
    }
    if(playerPosX > 4100 && keyCollected == true)
    {
        win.click()
    }
    if(playerHealth == 0)
    {
        lose.click()
    }
}, 100);