const loseText = document.querySelector('.lost-text')
let texteAppear = true
setInterval(() => 
{
    instructionsAnimation()
}, 700);

function instructionsAnimation()
{
    if(loseText.style.opacity == '1')
    {
        loseText.style.opacity = '0.4'
    }
    else
    {
        loseText.style.opacity = '1'
    }
}