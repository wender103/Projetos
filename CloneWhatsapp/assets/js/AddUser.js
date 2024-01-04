function fecharPopUpAddUser() {
    input_codigo_add_user.value = ''
    pop_up_add_user.style.display = 'none'
}

function abrirPopUpAddUser() {
    pop_up_add_user.style.display = 'flex'
}

//? Adicionar um novo contato
function AddUser() {
    if(formatarTexto(input_codigo_add_user.value) != formatarTexto(User.ID)) {
        let podeAdd = true
        for(let i = 0; i < User.InfoUser.Contatos.length; i++) {
            if(User.InfoUser.Contatos[i].ID == input_codigo_add_user.value) {
                podeAdd = User.InfoUser.Contatos[i].Estado
            }
        }

        if(podeAdd == true) {
            let contatoAdicionado = false
            db.collection('Users').get().then((snapshot) => {
                snapshot.docs.forEach(Users => {
                    if(Users.id == input_codigo_add_user.value) {
                        contatoAdicionado = true
                        const NewContact = {
                            ID: Users.id,
                            Chat: [],
                            Estado: 'Pendente'
                        }
                        User.InfoUser.Contatos.push(NewContact)

                        const InfoUserContato = Users.data().InfoUser
                        InfoUserContato.Pendentes.push(User.ID)

                        db.collection('Users').doc(Users.id).update({ InfoUser: InfoUserContato })
                        db.collection('Users').doc(User.ID).update({ InfoUser: User.InfoUser })
                    }
                })

                if(!contatoAdicionado) {
                    alert('Usuário não encontrado. Certifique de copiar o código correto e tente novamente.')
                } else {
                    fecharPopUpAddUser()
                    alert('Pedido envieado com sucesso :)')
                }
            })
        } else if(podeAdd == 'Pendente') {
            alert('Você já enviou um pedido de amizade para este usuário. Espere ele(a) aceitar.')
        } else {
            alert('Este usuário já esta adicionado em seus contatos.')
        }
    }
}

//? Avisar pedido de amizade
let contadorAvisarPedidoDeAmizade = 0
let contatoPedidoAmizade
const container_aviso_pedido_amizade = document.querySelector('#container_aviso_pedido_amizade')
// function avisarPedidoDeAmizade() {

//     if(User.InfoUser.Pendentes.length > 0) {
//         for(let c = 0; c < TodosUsers.length; c++) {
//             if(TodosUsers[c].id == User.InfoUser.Pendentes[contadorAvisarPedidoDeAmizade]) {
//                 contatoPedidoAmizade = {
//                     User: TodosUsers[c],
//                     NumListaPendente: contadorAvisarPedidoDeAmizade
//                 }
//                 document.querySelector('#img_user_pedido_amizade').src = TodosUsers[c].User.FotoPerfil
//                 document.querySelector('#name_user_pedido_amizade').innerText = TodosUsers[c].User.Nome
//                 document.querySelector('#recado_user_pedido_amizade').innerText = TodosUsers[c].User.Recado
//                 container_aviso_pedido_amizade.classList.add('container_aviso_pedido_amizade_active')
//             }
//         }
//     }
// }

function avisarPedidoDeAmizade() {
    db.collection('Users').onSnapshot((snapshot) => {
        snapshot.docs.forEach(Users => {
            if(Users.id == User.ID) {
                if(Users.data().InfoUser.Pendentes.length > 0) {
                    for(let c = 0; c < TodosUsers.length; c++) {
                        if(TodosUsers[c].id == Users.data().InfoUser.Pendentes[contadorAvisarPedidoDeAmizade]) {
                            contatoPedidoAmizade = {
                                User: TodosUsers[c],
                                NumListaPendente: contadorAvisarPedidoDeAmizade
                            }
                            document.querySelector('#img_user_pedido_amizade').src = TodosUsers[c].User.FotoPerfil
                            document.querySelector('#name_user_pedido_amizade').innerText = TodosUsers[c].User.Nome
                            document.querySelector('#recado_user_pedido_amizade').innerText = TodosUsers[c].User.Recado
                            container_aviso_pedido_amizade.classList.add('container_aviso_pedido_amizade_active')
                        }
                    }
                }
            }
        })
    })
}

function fecharAvisarPedidoDeAmizade() {
    container_aviso_pedido_amizade.classList.remove('container_aviso_pedido_amizade_active')
    contadorAvisarPedidoDeAmizade++
    avisarPedidoDeAmizade()
}

function aceitarPedidoAmizade() {
    db.collection('Users').get().then((snapshot) => {
        snapshot.docs.forEach(Users => {
            if(Users.id == contatoPedidoAmizade.User.id) {
               for(let c = 0; c < Users.data().InfoUser.Contatos.length; c++) {
                    if(Users.data().InfoUser.Contatos[c].ID == User.ID) {
                        const NewContact = {
                            ID: Users.id,
                            Chat: Users.data().InfoUser.Contatos[c].Chat,
                            Estado: 'Ativo'
                        }
        
                        User.InfoUser.Contatos.push(NewContact)
                        User.InfoUser.Pendentes.splice( contatoPedidoAmizade.NumListaPendente, 1)
                        db.collection('Users').doc(User.ID).update({ InfoUser: User.InfoUser })

                        const infoUserContato = Users.data().InfoUser
                        infoUserContato.Contatos[c].Estado = 'Aceito'
                        db.collection('Users').doc(Users.id).update({ InfoUser: infoUserContato })
                        carregarContatosUser()
                        fecharAvisarPedidoDeAmizade()
                    }
               }
            }
        })
    })
}