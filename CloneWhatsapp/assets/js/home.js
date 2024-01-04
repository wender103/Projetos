//? Vai carregar as principais informações
let User
let TodosUsers
const container_contacts = document.querySelector('#container_contacts')
function carregarInfos() {
    carregarInfosUser().then(() => {
        carregarContatosUser()
        avisarPedidoDeAmizade()
    })
} carregarInfos()

function carregarInfosUser() {
    return new Promise((resolve) => {
        TodosUsers = []
        db.collection('Users').get().then((snapshot) => {
            snapshot.docs.forEach(Users => {
                const format = {
                    User: Users.data(),
                    id: Users.id
                }
                TodosUsers.push(format)

                if(Users.data().Email == currentUser.email) {
                    User = Users.data()
                    User.ID = Users.id

                    //? Vai trocar as imgs do user pela foto de perfil do user
                    const img_perfil_user = document.querySelectorAll('.img_perfil_user')
                    for (let i = 0; i < img_perfil_user.length; i++) {
                        if(User.FotoPerfil != null) {
                            img_perfil_user[i].src = User.FotoPerfil
                        }
                    }

                    //? Vai trocar o nome user pelo nome defato do user
                    const nome_user = document.querySelectorAll('.nome_user')
                    for (let i = 0; i < nome_user.length; i++) {
                        nome_user[i].innerText = User.Nome
                    }

                    //? Vai trocar o lorem pelo recado do user
                    const recado_user = document.querySelectorAll('.recado_user')
                    for (let i = 0; i < recado_user.length; i++) {
                        recado_user[i].innerText = User.Recado
                    }

                    //? Vai informar o id do user
                    const span_codigo_user = document.querySelector('#span_codigo_user')
                    span_codigo_user.innerText = User.ID

                    resolve()
                }
            })
        })
    })
}

let UserConversando
function carregarContatosUser() {
    container_contacts.innerHTML = ''
    for(let c = 0; c < User.InfoUser.Contatos.length; c++) {
       for(let i = 0; i < TodosUsers.length; i++) {
            if(TodosUsers[i].id == User.InfoUser.Contatos[c].ID) {

                const contacts = document.createElement('div')
                const container_img_perfil = document.createElement('div')
                const img = document.createElement('img')
                const container_about_contact_msg = document.createElement('div')
                const about_contact = document.createElement('div')
                const name_contact = document.createElement('p')
                const last_msg = document.createElement('span')
                const infos_contact = document.createElement('div')
                const horario = document.createElement('p')
                const msg_read = document.createElement('span')

                if(TodosUsers[i].User.FotoPerfil != null) {
                    img.src = TodosUsers[i].User.FotoPerfil
                } else {
                    img.src = './assets/imgs/icons/user.png'
                }

                if(User.InfoUser.Contatos[c].Chat.length > 0) {
                    last_msg.innerText = User.InfoUser.Contatos[c].Chat[User.InfoUser.Contatos[c].Chat.length - 1].Texto

                    let hora = User.InfoUser.Contatos[c].Chat[User.InfoUser.Contatos[c].Chat.length - 1].Horario.hora
                    if(hora < 10) {
                        hora = `0${hora}`
                    }

                    let minutos = User.InfoUser.Contatos[c].Chat[User.InfoUser.Contatos[c].Chat.length - 1].Horario.minuto
                    if(minutos < 10) {
                        minutos = `0${minutos}`
                    }
                    horario.innerText = `${hora}:${minutos}`


                } else {
                    last_msg.innerText = 'Nehuma mensagem'
                    horario.innerText = ''
                }
                
                name_contact.innerText = TodosUsers[i].User.Nome
                msg_read.innerText = '✓✓'

                contacts.className = 'contacts'
                container_img_perfil.className = 'container_img_perfil'
                container_about_contact_msg.className = 'container_about_contact_msg'
                about_contact.className = 'about_contact'
                name_contact.className = 'name_contact'
                last_msg.className = 'last_msg'
                infos_contact.className = 'infos_contact'
                msg_read.className = 'msg_read'

                container_img_perfil.appendChild(img)
                about_contact.appendChild(name_contact)
                about_contact.appendChild(last_msg)
                container_about_contact_msg.appendChild(about_contact)
                infos_contact.appendChild(horario)
                infos_contact.appendChild(msg_read)
                container_about_contact_msg.appendChild(infos_contact)
                contacts.appendChild(container_img_perfil)
                contacts.appendChild(container_about_contact_msg)
                container_contacts.appendChild(contacts)

                contacts.addEventListener('click', () => {
                    document.querySelector('#name_contact_msgs_open').innerText = TodosUsers[i].User.Nome
                    UserConversando = TodosUsers[i]
                    abrirMensagensComContato(TodosUsers[i].id)
                })
            }
       }
    }
}

//? Funções de click ex: Abrir e fechar uma janela
const pop_up_add_user = document.querySelector('#pop_up_add_user')
const input_codigo_add_user = document.querySelector('#input_codigo_add_user')

const page_congig = document.querySelector('#page_congig')
function abrirConfig() {
    page_congig.style.display = 'flex'
}

function fehcarConfig() {
    page_congig.style.display = 'none'
}

function abrirMensagensComContato(idContato) {
    document.querySelector('#container_msgs').style.display = 'block'

    carregarMsgsComContato(idContato).then(() => {
        document.querySelector('#background_no_msgs').style.display = 'none'
    }).catch(() => {
        document.querySelector('#background_no_msgs').style.display = 'none'
    })
}

const container_msgs_contacts = document.querySelector('#container_msgs_contacts')
let numUltimaMsgEnviada = 0
function carregarMsgsComContato(idContato) {
    return new Promise((resolve, reject) => {
        container_msgs_contacts.innerHTML = ''
        let temMsgs = false
        for(let c = 0; c < User.InfoUser.Contatos.length; c++) {
            if(User.InfoUser.Contatos[c].ID == idContato) {
                for(let i = 0; i < User.InfoUser.Contatos[c].Chat.length; i++) {
                    temMsgs = true
                    mostarMsgNaTela(User.InfoUser.Contatos[c].Chat[i])
                    numUltimaMsgEnviada = User.InfoUser.Contatos[c].Chat[i].length - 1
                }
                resolve()
            }
        }

        if(!temMsgs) {
            reject()
        }
    })
}

const textarea_msg = document.querySelector('#textarea_msg')
function enviarMensagem() {
    let feito = false
    if(textarea_msg.value.trim() != '') {
        for(let c = 0; c < User.InfoUser.Contatos.length; c++) {
            if(User.InfoUser.Contatos[c].ID == UserConversando.id) {
                if(User.InfoUser.Contatos[c].Estado == 'Pendente' && feito == false) {
                    feito = true
                    console.log(111111111);
                    obterDataHoraAtual().then(dataHora => {
                        const NovaMsg = {
                            Texto: textarea_msg.value,
                            Horario: dataHora,
                            Responsavel: User.ID
                        } 
                        let InfoUserAtual = User.InfoUser
                        InfoUserAtual.Contatos[c].Chat.push(NovaMsg)

                        mostarMsgNaTela(User.InfoUser.Contatos[c].Chat[User.InfoUser.Contatos[c].Chat.length - 1])
                        db.collection('Users').doc(User.ID).update({ InfoUser: InfoUserAtual }).then(() => {
                            textarea_msg.value = ''
                        })
                    })

                } else {
                    db.collection('Users').get().then((snapshot) => {
                        snapshot.docs.forEach(Users => {
                            if(Users.id == UserConversando.id && feito == false) {
                                feito = true
                                //? Vai salvar a mensagem no banco do user que envio
                                obterDataHoraAtual().then(dataHora => {
                                    for(let c = 0; c < User.InfoUser.Contatos.length; c++) {
                                        const NovaMsg = {
                                            Texto: textarea_msg.value,
                                            Horario: dataHora,
                                            Responsavel: User.ID
                                        } 

                                        let InfoUserAtual = User.InfoUser
                                        InfoUserAtual.Contatos[c].Chat.push(NovaMsg)
                
                                        mostarMsgNaTela(User.InfoUser.Contatos[c].Chat[User.InfoUser.Contatos[c].Chat.length - 1])
                                        db.collection('Users').doc(User.ID).update({ InfoUser: InfoUserAtual })
                                    }

                                    //? Vai salvar a msg no banco do outro user
                                   for(let c = 0; c < Users.data().InfoUser.Contatos.length; c++) {
                                        if(Users.data().InfoUser.Contatos[c].ID == User.ID) {
                                            const NovaMsg = {
                                                Texto: textarea_msg.value,
                                                Horario: dataHora,
                                                Responsavel: User.ID
                                            } 
                                            let chatContato = Users.data().InfoUser
                                            chatContato.Contatos[c].Chat.push(NovaMsg)
                                            db.collection('Users').doc(Users.id).update({ InfoUser: chatContato }).then(() => {
                                                textarea_msg.value = ''
                                            })
                                        }
                                   }
                                })
                            }
                        })
                    })
                }
            }
        }
    } 
}

//? Sempre que uma mensagem for enviada ele vai atualizar

let pdAtualizar = false
function buscarMsgs() {
    db.collection('Users').onSnapshot((snapshot) => {
        // O código abaixo será executado sempre que houver uma alteração no snapshot
            snapshot.docs.forEach((Users) => {
                try {
                    if (Users.id == User.ID) {
                        console.log('Algo atualizou');

    
                        for (let i = 0; i < Users.data().InfoUser.Contatos.length; i++) {
                            try {
                                if (Users.data().InfoUser.Contatos[i].ID == UserConversando.id) {
                                    const numUltimaMsgEnviada = Users.data().InfoUser.Contatos[i].Chat.length - 1;
    
                                    // if (numUltimaMsgEnviada >= 0 && Users.data().InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].Texto != User.InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].Texto && Users.data().InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].Responsavel != User.InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].Responsavel && Users.data().InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].ano != User.InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].ano && Users.data().InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].mes != User.InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].mes && Users.data().InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].Horario.dia != User.InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].Horario.dia && Users.data().InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].hora != User.InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].hora && Users.data().InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].minuto != User.InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].minuto) {
        
                                    if (numUltimaMsgEnviada > User.InfoUser.Contatos[i].Chat.length - 1 && Users.data().InfoUser.Contatos[i].Chat[numUltimaMsgEnviada].Responsavel != User.ID) {
                                        User = Users.data();
                                        User.ID = Users.id;
                                        mostarMsgNaTela(Users.data().InfoUser.Contatos[i].Chat[numUltimaMsgEnviada]);
                                    } 
                                }
                            } catch{}
                        }
                    }
                } catch (error) {
                    // Lide com erros aqui, se necessário
                    console.error(error);
                }
            });
    
    });

} buscarMsgs()


function mostarMsgNaTela(mensagem) {
    carregarContatosUser()
    const msg = document.createElement('div')
    const inside_msg = document.createElement('div')
    const div = document.createElement('div')
    const horario = document.createElement('p')
    const container_msg_contact = document.createElement('div')
    const texto = document.createElement('p')
    const container_img_contact_msg_open = document.createElement('div')
    const img_perfil_user = document.createElement('img')

    let hora = mensagem.Horario.hora
    if(hora < 10) {
        hora = `0${hora}`
    }

    let minutos = mensagem.Horario.minuto
    if(minutos < 10) {
        minutos = `0${minutos}`
    }

    horario.innerText = `${hora}:${minutos}`
    texto.innerText = mensagem.Texto

    if(mensagem.Responsavel == User.ID) {
        msg.className = 'my_msgs'
        inside_msg.className = 'inside_my_msgs'

        if(User.FotoPerfil != null) {
            img_perfil_user.src = User.FotoPerfil
        } else {
            img_perfil_user.src = './assets/imgs/icons/user.png'
        }

    } else {
        msg.className = 'msg_contact'
        inside_msg.className = 'inside_contact_msgs'

        if(UserConversando.User.FotoPerfil != null) {
            img_perfil_user.src = UserConversando.User.FotoPerfil
        } else {
            img_perfil_user.src = './assets/imgs/icons/user.png'
        }
    }

    horario.className = 'horario_msgs'
    container_msg_contact.className = 'container_msg_contact'
    container_img_contact_msg_open.className = 'container_img_contact_msg_open'
    img_perfil_user.className = 'img_perfil_user'

    if(mensagem.Responsavel == User.ID) {
        div.appendChild(horario)
        container_msg_contact.appendChild(texto)
        div.appendChild(container_msg_contact)
        container_img_contact_msg_open.appendChild(img_perfil_user)
        inside_msg.appendChild(div)
        inside_msg.appendChild(container_img_contact_msg_open)

    } else {
        console.log('opa');
        container_img_contact_msg_open.appendChild(img_perfil_user)
        inside_msg.appendChild(container_img_contact_msg_open)
        div.appendChild(horario)
        container_msg_contact.appendChild(texto)
        div.appendChild(container_msg_contact)
        inside_msg.appendChild(div)
        
    }

    msg.appendChild(inside_msg)
    container_msgs_contacts.appendChild(msg)

    scrollParaOFinal()
}

function scrollParaOFinal() {
    var minhaSection = document.querySelector('#container_msgs')
    minhaSection.scrollTop = minhaSection.scrollHeight
}