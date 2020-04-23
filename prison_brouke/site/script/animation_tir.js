const button = document.querySelector('.boutton')
const changeImage = document.querySelector('.principal')
const imageTir = document.querySelector('.tir')

button.addEventListener('mouseover', () =>
{
    {
        changeImage.style.visibility = 'hidden'
        imageTir.style.visibility = 'visible'
    }
})
button.addEventListener('mouseout', () =>
{
    changeImage.style.visibility = 'visible'
    imageTir.style.visibility = 'hidden'
})

