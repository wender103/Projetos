// Configuração do Firebase usando variáveis diretamente no código
const firebaseConfig = {
  apiKey: "AIzaSyCgAAjn5fi7reU671J71vmu6iZjGykwPFQ",
  authDomain: "bazarhvc.firebaseapp.com",
  projectId: "bazarhvc",
  storageBucket: "bazarhvc.appspot.com",
  messagingSenderId: "155873362408",
  appId: "1:155873362408:web:ccb21a083a5465e1f8245d"
}

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig)

// Restante do seu código
const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

//? Vai pegar o user que logou
let currentUser = {} //? Vai conter as informações do user
document.addEventListener("DOMContentLoaded", function () {
  //? Obeserva se há um usuário e mudanças na autenticação (login, logout)
  firebase.auth().onAuthStateChanged((usuario) => {
    // console.log(usuario);
    if(usuario) {
      currentUser.InfoEmail = usuario

      db.collection('Users').get().then((snapshot) => {
        // console.log('Chamada feita, carregar info user')

        snapshot.docs.forEach(Users => {
            const InfoUsers = Users.data()
            // console.log(InfoUsers);
           
            if(InfoUsers.email == currentUser.InfoEmail.email) {
              currentUser.User = InfoUsers
              currentUser.User.Id = Users.id

              obterDataHoraAtual().then(res => {
                currentUser.User.online_em = {
                  Ano: res.ano,
                  Mes: res.mes,
                  Dia: res.dia,
                  Hora: res.hora,
                  Minuto: res.minuto,
                }

                db.collection('Users').doc(Users.id).update({online_em: currentUser.User.online_em}).then(() => {
                  Carregar_Produtos()
                })
              })
            }
        }).catch((e) => {
          location.href = `Error.html`
        })
      })
    } else {
      // Obtém a URL atual
      var url = window.location.href

      // Divide a URL em partes usando a barra '/'
      var partesDaURL = url.split('/')

      // Obtém a última parte da URL, que é o nome do arquivo
      var nomeDoArquivo = partesDaURL[partesDaURL.length - 1]

      if(nomeDoArquivo != 'Cadastro.html' && nomeDoArquivo != 'Error.html') {
        location.href = `Cadastro.html`
      }
    }
  })
})
