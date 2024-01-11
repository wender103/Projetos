let player = 1
let num_local
let num_movimentos = {
    Player1: 0,
    Player2: 0,
}
let local_pode_marcar = [{Player: 0}, {Player: 0}, {Player: 0}, {Player: 0}, {Player: 0}, {Player: 0}, {Player: 0}, {Player: 0}, {Player: 0},]
const container_clicks = document.querySelectorAll('.local_click')
for (let c = 0; c < container_clicks.length; c++) {
    const element_container = container_clicks[c]
    element_container.addEventListener('click', () => {
        num_local = c
        marcar_jogada()
    })
}

let vitoria = false
function marcar_jogada() {
    if(!vitoria) {
        console.log(num_local)
        const element_container = container_clicks[num_local]
        const element = element_container.querySelector('div')

        if(player == 1 && element.className == '') {
            element.classList.add('quadrado')
            local_pode_marcar[num_local].Player = player
            player = 2
            num_movimentos.Player1++
            
            if(!vitoria) {
                // jogada_bot_random()
                jogada_bot_dificil()
                checar_vitoria()
            } else {
                setTimeout(() => {
                    location.reload()
                }, 1000)
            }
            
        } else if(player == 2 && element.className == '') {
            console.log('Movimentos do bot: ' + num_local)
            element.classList.add('circulo')
            local_pode_marcar[num_local].Player = player
            player = 1
            num_movimentos.Player2++
            // checar_vitoria()
        }

    }
}

let feito = false
function jogada_bot_random() {
    if(player == 2 && !vitoria) {
        let contador = Math.floor(Math.random() * 9)
        console.log(contador);

        if(local_pode_marcar[contador].Player == 0 && feito == false) {
            console.log(contador)
            feito = true
            num_local = contador
            local_pode_marcar[contador].Player = player
            marcar_jogada()
            setTimeout(() => {
                feito = false
            }, 100)

        } else if(local_pode_marcar[contador].Player != 0 && feito == false) {
            for (let c = 0; c < local_pode_marcar.length; c++) {
                if(local_pode_marcar[c].Player == 0) {
                    console.log('Tem espaço vazio para marcar');
                    jogada_bot_random()
                }
            }
        }
    }
}

function jogada_bot_dificil() {
    player = 2
    let jogada_feita = false
    //? Checar se é possivél ganhar
    if(local_pode_marcar[0].Player == 2 && local_pode_marcar[1].Player == 2 && local_pode_marcar[2].Player == 0) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if(local_pode_marcar[2].Player == 2 && local_pode_marcar[1].Player == 2 && local_pode_marcar[0].Player == 0) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[0].Player == 2 && local_pode_marcar[2].Player == 2 && local_pode_marcar[1].Player == 0) {
        jogada_feita = true
        contador = 1
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[3].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[5].Player == 0) {
        jogada_feita = true
        contador = 5
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[5].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[3].Player == 0) {
        jogada_feita = true
        contador = 3
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[3].Player == 2 && local_pode_marcar[5].Player == 2 && local_pode_marcar[4].Player == 0) {
        jogada_feita = true
        contador = 4
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[6].Player == 2 && local_pode_marcar[7].Player == 2 && local_pode_marcar[8].Player == 0) {
        jogada_feita = true
        contador = 8
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[7].Player == 2 && local_pode_marcar[8].Player == 2 && local_pode_marcar[6].Player == 0) {
        jogada_feita = true
        contador = 6
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[6].Player == 2 && local_pode_marcar[8].Player == 2 && local_pode_marcar[7].Player == 0) {
        jogada_feita = true
        contador = 7
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
        //? Vertical agora -----------------------------------
    } else if(local_pode_marcar[0].Player == 2 && local_pode_marcar[3].Player == 2 && local_pode_marcar[6].Player == 0) {
        jogada_feita = true
        contador = 6
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if(local_pode_marcar[6].Player == 2 && local_pode_marcar[3].Player == 2 && local_pode_marcar[0].Player == 0) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[0].Player == 2 && local_pode_marcar[6].Player == 2 && local_pode_marcar[3].Player == 0) {
        jogada_feita = true
        contador = 3
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[1].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[7].Player == 0) {
        jogada_feita = true
        contador = 7
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[4].Player == 2 && local_pode_marcar[7].Player == 2 && local_pode_marcar[1].Player == 0) {
        jogada_feita = true
        contador = 1
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[1].Player == 2 && local_pode_marcar[7].Player == 2 && local_pode_marcar[4].Player == 0) {
        jogada_feita = true
        contador = 4
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[2].Player == 2 && local_pode_marcar[5].Player == 2 && local_pode_marcar[8].Player == 0) {
        jogada_feita = true
        contador = 8
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[8].Player == 2 && local_pode_marcar[5].Player == 2 && local_pode_marcar[2].Player == 0) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[8].Player == 2 && local_pode_marcar[2].Player == 2 && local_pode_marcar[5].Player == 0) {
        jogada_feita = true
        contador = 5
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
        //? X agora -----------
    } else if(local_pode_marcar[0].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[8].Player == 0) {
        jogada_feita = true
        contador = 8
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if(local_pode_marcar[4].Player == 2 && local_pode_marcar[8].Player == 2 && local_pode_marcar[0].Player == 0) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[2].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[6].Player == 0) {
        jogada_feita = true
        contador = 6
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[6].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[2].Player == 0) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[6].Player == 2 && local_pode_marcar[2].Player == 2 && local_pode_marcar[4].Player == 0) {
        jogada_feita = true
        contador = 4
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
    }

    //? Jogadas em x
    if(local_pode_marcar[4].Player != 2 && local_pode_marcar[0].Player == 1 && local_pode_marcar[8].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 4
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[4].Player != 2 && local_pode_marcar[2].Player == 1 && local_pode_marcar[6].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 4
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[4].Player != 2 && local_pode_marcar[6].Player != 2 && local_pode_marcar[2].Player == 1 && local_pode_marcar[4].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 6
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if (local_pode_marcar[4].Player != 2 && local_pode_marcar[8].Player != 2 && local_pode_marcar[0].Player == 1 && local_pode_marcar[4].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 8
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if (local_pode_marcar[4].Player != 2 && local_pode_marcar[0].Player != 2 && local_pode_marcar[8].Player == 1 && local_pode_marcar[4].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if (local_pode_marcar[4].Player != 2 && local_pode_marcar[2].Player != 2 && local_pode_marcar[6].Player == 1 && local_pode_marcar[4].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } 

    console.log('Jogadas em x: ' + jogada_feita)

    //? Jogadas verticais
    if(local_pode_marcar[3].Player != 2 && local_pode_marcar[0].Player == 1 && local_pode_marcar[6].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 3
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[4].Player != 2 && local_pode_marcar[1].Player == 1 && local_pode_marcar[7].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 4
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[5].Player != 2 && local_pode_marcar[2].Player == 1 && local_pode_marcar[8].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 5
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[6].Player != 2 && local_pode_marcar[0].Player == 1 && local_pode_marcar[3].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 6
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if (local_pode_marcar[7].Player != 2 && local_pode_marcar[1].Player == 1 && local_pode_marcar[4].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 7
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if (local_pode_marcar[8].Player != 2 && local_pode_marcar[2].Player == 1 && local_pode_marcar[5].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 8
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if (local_pode_marcar[0].Player != 2 && local_pode_marcar[3].Player == 1 && local_pode_marcar[6].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if (local_pode_marcar[1].Player != 2 && local_pode_marcar[4].Player == 1 && local_pode_marcar[7].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 1
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if (local_pode_marcar[2].Player != 2 && local_pode_marcar[5].Player == 1 && local_pode_marcar[8].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    }

    console.log('Jogadas verticais: ' + jogada_feita)

    //? Jogadas na horizontal
    if(local_pode_marcar[1].Player != 2 && local_pode_marcar[0].Player == 1 && local_pode_marcar[2].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 1
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[4].Player != 2 && local_pode_marcar[3].Player == 1 && local_pode_marcar[5].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 4
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[7].Player != 2 && local_pode_marcar[6].Player == 1 && local_pode_marcar[8].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 7
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[0].Player != 2 && local_pode_marcar[1].Player == 1 && local_pode_marcar[2].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[3].Player != 2 && local_pode_marcar[4].Player == 1 && local_pode_marcar[5].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 3
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[6].Player != 2 && local_pode_marcar[7].Player == 1 && local_pode_marcar[8].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 6
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[2].Player != 2 && local_pode_marcar[0].Player == 1 && local_pode_marcar[1].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[5].Player != 2 && local_pode_marcar[3].Player == 1 && local_pode_marcar[4].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 5
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if (local_pode_marcar[8].Player != 2 && local_pode_marcar[6].Player == 1 && local_pode_marcar[7].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 8
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    }

    console.log('Jogadas na horizontal: ' + jogada_feita)
 
    //? Jogadas de estrategia iniciais
    if(local_pode_marcar[0].Player == 1 && jogada_feita == false && num_movimentos.Player1 == 1 || local_pode_marcar[1].Player == 1 && jogada_feita == false && num_movimentos.Player1 == 1 || local_pode_marcar[2].Player == 1 && jogada_feita == false && num_movimentos.Player1 == 1 || local_pode_marcar[3].Player == 1 && jogada_feita == false && num_movimentos.Player1 == 1 || local_pode_marcar[5].Player == 1 && jogada_feita == false && num_movimentos.Player1 == 1 || local_pode_marcar[6].Player == 1 && jogada_feita == false && num_movimentos.Player1 == 1 || local_pode_marcar[7].Player == 1 && jogada_feita == false && num_movimentos.Player1 == 1 || local_pode_marcar[8].Player == 1 && jogada_feita == false && num_movimentos.Player1 == 1) {
        jogada_feita = true
        contador = 4
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if(local_pode_marcar[4].Player == 1 && num_movimentos.Player1 == 1 && jogada_feita == false) {
        const nuns = [0, 2, 6, 8]
        let contador_random = Math.floor(Math.random() * nuns.length)
        jogada_feita = true
        contador = nuns[contador_random]
        num_local = nuns[contador_random]
        local_pode_marcar[nuns[contador_random]].Player = 2
        marcar_jogada()
    }

    console.log('Jogadas de estrategia iniciais: ' + jogada_feita)

    //? Jogadas de estrategia seguintes
    if(local_pode_marcar[5].Player == 1  && local_pode_marcar[6].Player == 1 && num_movimentos.Player1 < 4 && jogada_feita == false) {
        console.log('testeee');
        jogada_feita = true
        contador = 8
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if(local_pode_marcar[1].Player == 1 && local_pode_marcar[6].Player == 1 && num_movimentos.Player1 < 4 && jogada_feita == false) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if(local_pode_marcar[1].Player == 1 && local_pode_marcar[5].Player == 1 && num_movimentos.Player1 < 3 && jogada_feita == false) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[8].Player != 1 && local_pode_marcar[1].Player == 1 && local_pode_marcar[3].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[2].Player != 1 && local_pode_marcar[3].Player == 1 && local_pode_marcar[7].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 6
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
         
    } else if(local_pode_marcar[0].Player != 1 && local_pode_marcar[5].Player == 1 && local_pode_marcar[7].Player == 1 && jogada_feita == false) {
        jogada_feita = true
        contador = 8
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[1].Player == 1 && local_pode_marcar[7].Player == 1 && local_pode_marcar[4].Player == 2 && jogada_feita == false) {
        const nuns = [3, 5]
        let contador_random = Math.floor(Math.random() * nuns.length)
        jogada_feita = true
        contador = nuns[contador_random]
        num_local = nuns[contador_random]
        local_pode_marcar[nuns[contador_random]].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[3].Player == 1 && local_pode_marcar[5].Player == 1 && local_pode_marcar[4].Player == 2 && jogada_feita == false) {
        const nuns = [1, 7]
        let contador_random = Math.floor(Math.random() * nuns.length)
        jogada_feita = true
        contador = nuns[contador_random]
        num_local = nuns[contador_random]
        local_pode_marcar[nuns[contador_random]].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[0].Player == 1 && local_pode_marcar[5].Player == 1 && local_pode_marcar[4].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[2].Player == 1 && local_pode_marcar[3].Player == 1 && num_movimentos.Player1 < 2 && local_pode_marcar[4].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[3].Player == 1 && local_pode_marcar[8].Player == 1 && local_pode_marcar[4].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 6
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[1].Player == 1 && local_pode_marcar[8].Player == 1 && num_movimentos.Player1 < 3 && local_pode_marcar[4].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 5
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[7].Player == 1 && local_pode_marcar[2].Player == 1 && local_pode_marcar[4].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 8
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[2].Player == 1 && local_pode_marcar[4].Player == 1 && local_pode_marcar[8].Player == 1 && local_pode_marcar[3].Player == 1 && local_pode_marcar[0].Player == 2 && local_pode_marcar[5].Player == 2 && local_pode_marcar[6].Player == 2 && jogada_feita == false) {
        const nuns = [1, 7]
        let contador_random = Math.floor(Math.random() * nuns.length)
        jogada_feita = true
        contador = nuns[contador_random]
        num_local = nuns[contador_random]
        local_pode_marcar[nuns[contador_random]].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[0].Player == 1 && local_pode_marcar[2].Player == 1  && local_pode_marcar[4].Player == 1 && local_pode_marcar[7].Player == 1 && local_pode_marcar[1].Player == 2 && local_pode_marcar[6].Player == 2 && local_pode_marcar[8].Player == 2 && jogada_feita == false) {
        const nuns = [3, 5]
        let contador_random = Math.floor(Math.random() * nuns.length)
        jogada_feita = true
        contador = nuns[contador_random]
        num_local = nuns[contador_random]
        local_pode_marcar[nuns[contador_random]].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[0].Player == 1 && local_pode_marcar[4].Player == 1  && local_pode_marcar[6].Player == 1 && local_pode_marcar[5].Player == 1 && local_pode_marcar[2].Player == 2 && local_pode_marcar[3].Player == 2 && local_pode_marcar[8].Player == 2 && jogada_feita == false) {
        const nuns = [1, 7]
        let contador_random = Math.floor(Math.random() * nuns.length)
        jogada_feita = true
        contador = nuns[contador_random]
        num_local = nuns[contador_random]
        local_pode_marcar[nuns[contador_random]].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[1].Player == 1 && local_pode_marcar[4].Player == 1  && local_pode_marcar[6].Player == 1 && local_pode_marcar[8].Player == 1 && local_pode_marcar[0].Player == 2 && local_pode_marcar[2].Player == 2 && local_pode_marcar[7].Player == 2 && jogada_feita == false) {
        const nuns = [3, 5]
        let contador_random = Math.floor(Math.random() * nuns.length)
        jogada_feita = true
        contador = nuns[contador_random]
        num_local = nuns[contador_random]
        local_pode_marcar[nuns[contador_random]].Player = 2
        marcar_jogada()
        
    }

    console.log('Jogadas de estrategia seguintes: ' + jogada_feita)

    //? Jogadas de estrategia 3
    if(local_pode_marcar[2].Player == 1  && local_pode_marcar[4].Player == 1 && local_pode_marcar[6].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()

    } else if(local_pode_marcar[8].Player == 1  && local_pode_marcar[4].Player == 1 && local_pode_marcar[0].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
         
    } else if(local_pode_marcar[0].Player == 1  && local_pode_marcar[4].Player == 1 && local_pode_marcar[8].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[6].Player == 1  && local_pode_marcar[4].Player == 1 && local_pode_marcar[2].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[0].Player == 1  && local_pode_marcar[8].Player == 1 && local_pode_marcar[4].Player == 2 && jogada_feita == false || local_pode_marcar[2].Player == 1  && local_pode_marcar[6].Player == 1 && local_pode_marcar[4].Player == 2 && jogada_feita == false) {
        const nuns = [1, 3, 5, 7]
        let contador_random = Math.floor(Math.random() * nuns.length)
        jogada_feita = true
        contador = nuns[contador_random]
        num_local = nuns[contador_random]
        local_pode_marcar[nuns[contador_random]].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[0].Player == 1  && local_pode_marcar[5].Player == 1 && local_pode_marcar[7].Player == 1 && local_pode_marcar[4].Player == 2 && local_pode_marcar[8].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[2].Player == 1  && local_pode_marcar[3].Player == 1 && local_pode_marcar[7].Player == 1 && local_pode_marcar[4].Player == 2 && local_pode_marcar[6].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[1].Player == 1  && local_pode_marcar[3].Player == 1 && local_pode_marcar[8].Player == 1 && local_pode_marcar[4].Player == 2 && local_pode_marcar[0].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 2
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[1].Player == 1  && local_pode_marcar[2].Player == 1 && local_pode_marcar[3].Player == 1 && local_pode_marcar[8].Player == 1 && local_pode_marcar[0].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[5].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 7
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    } else if(local_pode_marcar[1].Player == 1  && local_pode_marcar[5].Player == 1 && local_pode_marcar[6].Player == 1 && local_pode_marcar[8].Player == 1 && local_pode_marcar[2].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[7].Player == 2 && jogada_feita == false) {
        jogada_feita = true
        contador = 0
        num_local = contador
        local_pode_marcar[contador].Player = 2
        marcar_jogada()
        
    }


    console.log('Jogadas de estrategia 3: ' + jogada_feita)
}

function checar_vitoria() {
    //? Player 1
    if(local_pode_marcar[0].Player == 1 && local_pode_marcar[1].Player == 1 && local_pode_marcar[2].Player == 1) {
        setTimeout(() => {
            alert(`O quadrado venceu o jogo`)
        }, 500)
        vitoria = true

    } else if (local_pode_marcar[3].Player == 1 && local_pode_marcar[4].Player == 1 && local_pode_marcar[5].Player == 1) {
        setTimeout(() => {
            alert(`O quadrado venceu o jogo`)
        }, 500)
        vitoria = true

    } else if (local_pode_marcar[6].Player == 1 && local_pode_marcar[7].Player == 1 && local_pode_marcar[8].Player == 1) {
        setTimeout(() => {
            alert(`O quadrado venceu o jogo`)
        }, 500)
        vitoria = true
        
    } else if (local_pode_marcar[0].Player == 1 && local_pode_marcar[3].Player == 1 && local_pode_marcar[6].Player == 1) {
        setTimeout(() => {
            alert(`O quadrado venceu o jogo`)
        }, 500)
        vitoria = true
        
    } else if (local_pode_marcar[1].Player == 1 && local_pode_marcar[4].Player == 1 && local_pode_marcar[7].Player == 1) {
        setTimeout(() => {
            alert(`O quadrado venceu o jogo`)
        }, 500)
        vitoria = true
        
    } else if (local_pode_marcar[2].Player == 1 && local_pode_marcar[5].Player == 1 && local_pode_marcar[8].Player == 1) {
        setTimeout(() => {
            alert(`O quadrado venceu o jogo`)
        }, 500)
        vitoria = true
        
    } else if (local_pode_marcar[0].Player == 1 && local_pode_marcar[4].Player == 1 && local_pode_marcar[8].Player == 1) {
        setTimeout(() => {
            alert(`O quadrado venceu o jogo`)
        }, 500)
        vitoria = true
        
    } else if (local_pode_marcar[2].Player == 1 && local_pode_marcar[4].Player == 1 && local_pode_marcar[6].Player == 1) {
        setTimeout(() => {
            alert(`O quadrado venceu o jogo`)
        }, 500)
        vitoria = true
    } else if(local_pode_marcar[0].Player == 2 && local_pode_marcar[1].Player == 2 && local_pode_marcar[2].Player == 2) {
        setTimeout(() => {
            alert(`O circulo(bot) venceu você!`)
        }, 500)
        vitoria = true

    } else if (local_pode_marcar[3].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[5].Player == 2) {
        setTimeout(() => {
            alert(`O circulo(bot) venceu você!`)
        }, 500)
        vitoria = true

    } else if (local_pode_marcar[6].Player == 2 && local_pode_marcar[7].Player == 2 && local_pode_marcar[8].Player == 2) {
        setTimeout(() => {
            alert(`O circulo(bot) venceu você!`)
        }, 500)
        vitoria = true
        
    } else if (local_pode_marcar[0].Player == 2 && local_pode_marcar[3].Player == 2 && local_pode_marcar[6].Player == 2) {
        setTimeout(() => {
            alert(`O circulo(bot) venceu você!`)
        }, 500)
        vitoria = true
        
    } else if (local_pode_marcar[1].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[7].Player == 2) {
        setTimeout(() => {
            alert(`O circulo(bot) venceu você!`)
        }, 500)
        vitoria = true
        
    } else if (local_pode_marcar[2].Player == 2 && local_pode_marcar[5].Player == 2 && local_pode_marcar[8].Player == 2) {
        setTimeout(() => {
            alert(`O circulo(bot) venceu você!`)
        }, 500)
        vitoria = true
        
    } else if (local_pode_marcar[0].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[8].Player == 2) {
        console.log('Vitoria do bot');
        vitoria = true
        setTimeout(() => {
            alert(`O circulo(bot) venceu você!`)
        }, 500)
        
    } else if (local_pode_marcar[2].Player == 2 && local_pode_marcar[4].Player == 2 && local_pode_marcar[6].Player == 2) {
        setTimeout(() => {
            alert(`O circulo(bot) venceu você!`)
        }, 500)
        vitoria = true
    } else {
        let ainda_tem_jogadas = false
        for (let c = 0; c < local_pode_marcar.length; c++) {
            if(local_pode_marcar[c].Player == 0) {
                ainda_tem_jogadas = true
            }
        }

        if(!ainda_tem_jogadas) {
           setTimeout(() => {
                alert('Deu velha!')
                location.reload()
           }, 500)
        }
    }
}