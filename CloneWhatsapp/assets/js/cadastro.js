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

//? Vai cadastrar -----------------------------
const inputEmailUserLogin = document.querySelector('#inputEmailUserLogin')
const inputSenhaUserLogin = document.querySelector('#inputSenhaUserLogin')

function FazerLogin() {
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(inputEmailUserLogin.value, inputSenhaUserLogin.value).then(() => {
        location.href = 'Home.html'

    }).catch((error) => {
        console.log(error);
        switch (error.code) {
            case 'auth/invalid-email':
              alert('Endereço de e-mail inválido. Por favor, verifique e tente novamente.');
              break;
            case 'auth/user-not-found':
              alert('Usuário não encontrado. Verifique se o e-mail está correto ou registre-se.');
              break;
            case 'auth/wrong-password':
              alert('Senha incorreta. Tente novamente com outra senha.');
              break;
            case 'auth/internal-error':
              alert('Email não cadastrado.');
              break;
            default:
              alert('Ocorreu um erro durante a autenticação. Por favor, tente novamente.');
              break;
        }
    })
}

const inputEmailUserCadastro = document.querySelector('#inputEmailUserCadastro')
const inputSenhaUserCadastro = document.querySelector('#inputSenhaUserCadastro')
const inputNomeUserCadastro = document.querySelector('#inputNomeUserCadastro')
function Cadastrar() {
    event.preventDefault()
    auth.createUserWithEmailAndPassword(inputEmailUserCadastro.value, inputSenhaUserCadastro.value).then(user => {
        const ContaUser = {
            Email: inputEmailUserCadastro.value,
            Nome: inputNomeUserCadastro.value,
            FotoPerfil: null,
            Recado: 'Estou usando o Whatsapp',
            InfoUser: {
                Contatos: [],
                Pendentes: []
            },
            Personalizar: {
                Tema: 'Claro',
            }
        }

        //? Vai salvar a conta do user
        db.collection('Users').add(ContaUser).then(() => {
            location.href = 'Home.html'
        }).catch((e) => {
            alert('Error ao tentar criar o user: ' + e)
        })

    }).catch(error => {
        console.warn('Error: ', error)
            
        if(error.code == 'auth/email-already-in-use') {
            alert('Email já cadastrado! Use outro Email ou faça login com essa conta.')
        }
    })
}