const input_add_tarefa = document.getElementById('input_add_tarefa')
const container_tarefas_feitas = document.getElementById('container_tarefas_feitas').querySelector('article')
const container_tarefas_a_fazer = document.getElementById('container_tarefas_a_fazer').querySelector('article')
const container_tarefas_excluidas = document.getElementById('container_tarefas_excluidas').querySelector('article')

document.addEventListener('keypress', (e) => {
    if(e.key == 'Enter') {
        Adicionar_Tarefa()
    }
})

let Todas_Tarefas = []

if(localStorage.getItem('Tarefas')) {
    Todas_Tarefas = JSON.parse(localStorage.getItem('Tarefas'))

    for (let c = 0; c < Todas_Tarefas.length; c++) {
        Adicionar_Tarefa(true, Todas_Tarefas[c].Tarefa, Todas_Tarefas[c].Feito, Todas_Tarefas[c].ID)
        
    }
}

function Adicionar_Tarefa(Tarefa_Salvas = false, Tarefa = '', Feito = false, ID_Tarefa) {
    let nova_tarefa
    let ID

    if(Tarefa_Salvas) {
        nova_tarefa = Tarefa
        ID = ID_Tarefa
    } else {
        nova_tarefa = input_add_tarefa.value
        ID = Criar_Id_Aleatorio()
    }

    if(nova_tarefa.trim() != '') {
        const container_tarefas = document.createElement('div')
        const div = document.createElement('div')
        const marcador_feito = document.createElement('input')
        const p = document.createElement('p')
        const remover_tarefa = document.createElement('button')


        //? Classes
        if(Feito) {
            container_tarefas.classList.add('Tarefa_Feita')
        }
        container_tarefas.classList.add('container_tarefas')
        container_tarefas.id = ID
        marcador_feito.classList.add('marcador_feito')
        remover_tarefa.classList.add('remover_tarefa')

        //? Valores
        p.innerHTML = nova_tarefa
        remover_tarefa.innerText = 'x'
        marcador_feito.type = 'checkbox'
        marcador_feito.checked = Feito

        //? appendChild
        div.appendChild(marcador_feito)
        div.appendChild(p)
        container_tarefas.appendChild(div)
        container_tarefas.appendChild(remover_tarefa)

        if(Feito) {
            container_tarefas_feitas.appendChild(container_tarefas)

        } else {
            container_tarefas_a_fazer.appendChild(container_tarefas)
        }

        if(!Tarefa_Salvas) {
            Salvar_Tarefa_Memoria(false, nova_tarefa, false, ID)
        }

        input_add_tarefa.value = ''

        //? Funções
        remover_tarefa.addEventListener('click', () => {
            if(remover_tarefa.innerText == 'x') {
                if(confirm('Deseja realmente remover essa tarefa?')) {
                    Remover_Tarefa(ID)
                }
            }
        })

        marcador_feito.addEventListener('input', () => {
            Marcar_Feito(marcador_feito, remover_tarefa, container_tarefas, ID)
        })

    } else {
        alert('Insira uma tarefa primeiro.')
    }
}

function Marcar_Feito(InputFeito, btn_remover, Tarefa, ID) {
    if(InputFeito.checked) {
        Tarefa.classList.add('Tarefa_Feita')
        if(btn_remover.innerText == 'x') {
            container_tarefas_feitas.appendChild(Tarefa)
        }

    } else {
        Tarefa.classList.remove('Tarefa_Feita')
        if(btn_remover.innerText == 'x') {
            container_tarefas_a_fazer.appendChild(Tarefa)
        }
    }

    for (let c = 0; c < Todas_Tarefas.length; c++) {
        if(Todas_Tarefas[c].ID == ID) {
            Todas_Tarefas[c].Feito = InputFeito.checked 
            Salvar_Tarefa_Memoria(true)
        }
    }
}

function Remover_Tarefa(ID) {
    const Tarefa = document.getElementById(ID)
    const button = Tarefa.querySelector('button')
    const input_check = Tarefa.querySelector('div').querySelector('input')
    button.innerText = '✔'
    button.style.color = '#00af00'
    input_check.disabled = true
    Tarefa.classList.add('Tarefa_Excluida')
    container_tarefas_excluidas.appendChild(Tarefa)

    let Infos_Btn_Exluido
    
    for (let c = 0; c < Todas_Tarefas.length; c++) {
        console.log(Todas_Tarefas[c].ID, ID);
        if(Todas_Tarefas[c].ID == ID) {
            Infos_Btn_Exluido = Todas_Tarefas[c]
            Todas_Tarefas.splice(c, 1)
            Salvar_Tarefa_Memoria(true)
        }
    }

    button.addEventListener('click', () => {
        if(button.innerText == '✔') {
            Tarefa.remove()
            Adicionar_Tarefa(true, Infos_Btn_Exluido.Tarefa, Infos_Btn_Exluido.Feito, Infos_Btn_Exluido.ID)
            Salvar_Tarefa_Memoria(false, Infos_Btn_Exluido.Tarefa, Infos_Btn_Exluido.Feito, Infos_Btn_Exluido.ID)
        }
    })
}

function Salvar_Tarefa_Memoria(Apenas_Salvar = false, Tarefa, Feito, ID) {
    if(!Apenas_Salvar) {
        let Nova_Tarefa = {
            Tarefa,
            Feito,
            ID
        }
    
        Todas_Tarefas.push(Nova_Tarefa)
    }

    localStorage.setItem('Tarefas', JSON.stringify(Todas_Tarefas))
}

function Criar_Id_Aleatorio() {
    const comprimentoId = 8
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''
    
    for (let i = 0; i < comprimentoId; i++) {
        // Escolhe um caractere aleatório do conjunto de caracteres e adiciona ao ID
        id += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    }
    
    return id
}