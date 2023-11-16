const container_signIn = document.getElementById('container_signIn')
const background_orange = document.getElementById('background_orange')
const container_background_orange = document.getElementById('container_background_orange')
const container_CreatAcoonout = document.getElementById('container_CreatAcoonout')
let model_SignIn = true


function changeModel() {

    if(model_SignIn) {
        background_orange.className = 'left'
        scrollLeft()
        setTimeout(() => {
            container_CreatAcoonout.style.zIndex = 2
            container_signIn.style.zIndex = 0
        }, 300)
        container_CreatAcoonout.style.left = '50%'

        container_signIn.style.left = '50%'

    } else {
        background_orange.className = 'right'
        scrollRight()
        setTimeout(() => {
            container_signIn.style.zIndex = 2
            container_CreatAcoonout.style.zIndex = 0
        }, 300)
        container_signIn.style.left = '0%'


        container_CreatAcoonout.style.left = '0%'
    } 

    model_SignIn = !model_SignIn
}

// Adicione a lógica para rolar para a direita
function scrollRight() {
    container_background_orange.style.left = '-100%'
}

// Adicione a lógica para rolar para a esquerda
function scrollLeft() {
    container_background_orange.style.left = '0%'
}
