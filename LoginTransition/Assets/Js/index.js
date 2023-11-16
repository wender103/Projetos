const container_signIn = document.getElementById('container_signIn') //? Section sign in
const background_orange = document.getElementById('background_orange') //? background laranja
const container_background_orange = document.getElementById('container_background_orange') //? container dentro do background laranja
const container_CreatAcoonout = document.getElementById('container_CreatAcoonout') //? Section create acconunt
const container_btn_theme = document.getElementById('container_btn_theme') //? container btn tema
const container_icon_theme = document.getElementById('container_icon_theme') //? btn tema
const icon_theme = document.getElementById('icon_theme') //? img tema
let model_SignIn = true //? Vai identificar se o user quer fazer login ou cadastrar
let themeLight = true //? Vai identificar se o tema é claro ou escuro

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

//? Adicione a lógica para rolar para a direita
function scrollRight() {
    container_background_orange.style.left = '-100%'
}

//? Adicione a lógica para rolar para a esquerda
function scrollLeft() {
    container_background_orange.style.left = '0%'
}

container_btn_theme.addEventListener('click', () => {
    clickChangeTheme()
})

function clickChangeTheme() {
    if(themeLight) {
        themeLight = false
        container_icon_theme.className = 'Dark_Active'
        setTimeout(() => {
            // icon_theme.src = '/Assets/Imgs/moon.png'
        }, 300)
        changeTheme(darkMod)

    } else {
        themeLight = true
        container_icon_theme.className = 'Light_Active'
        setTimeout(() => {
            // icon_theme.src = '/Assets/Imgs/night-mode.png'
        }, 300)
        changeTheme(linghtMod)
    }
}

window.onload = getThemeFromLocalStorage

const darkMod = {
    '--black': '#fff',
    '--white': '#292929',
}

const linghtMod = {
    '--black': '#000',
    '--white': '#fff',
}

function changeTheme(theme) {
    for (let [proeperty, value] of Object.entries(theme)) {
        changeProperty(proeperty, value)
    }

    saveThemeToLocalStorage(theme)
}

function changeProperty(proeperty, value) {
    const rootElement = document.documentElement //? Vai pegar o root
    rootElement.style.setProperty(proeperty, value)
}

function saveThemeToLocalStorage(theme) {
    localStorage.setItem('theme', JSON.stringify(theme))
}

function getThemeFromLocalStorage() {
    const theme = JSON.parse(localStorage.getItem('theme'))
    changeTheme(theme)
    if(isThemeEqual(theme, darkMod)) clickChangeTheme()

    setTimeout(() => {
        addTransitionTheme()
    }, 300)
}

function isThemeEqual(firstTheme, secondTheme) {
    for(let prop in firstTheme) {
        if(firstTheme[prop] !== secondTheme[prop]) return false;
    }
    return true
}