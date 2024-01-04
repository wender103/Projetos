const firebaseConfig = {
apiKey: "AIzaSyDRBGQG0fY0vmXcNCHYFYjr6wwuuU_MEX8",
authDomain: "clonewhatsapp-fc321.firebaseapp.com",
projectId: "clonewhatsapp-fc321",
storageBucket: "clonewhatsapp-fc321.appspot.com",
messagingSenderId: "569976818926",
appId: "1:569976818926:web:d939a662de1ec998c7f7ff"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

let currentUser
document.addEventListener("DOMContentLoaded", function () {
    //? Obeserva se há um usuário e mudanças na autenticação (login, logout)
    firebase.auth().onAuthStateChanged((usuario) => {
      if(usuario) {
        currentUser = usuario
      }
    })
})