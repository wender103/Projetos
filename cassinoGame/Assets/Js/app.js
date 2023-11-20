function startGame() {
    document.getElementById('container_menu_inicio').style.display = 'none'
}

let infosGame = {
    tickets: 5,
    coins: 0
}

function abrirComprar() {
    document.getElementById('container_comprar_tickets').style.display = 'flex'
}

function fehcarComprar() {
    document.getElementById('container_comprar_tickets').style.display = 'none'
}

function Comprar() {
    if(infosGame.coins >= 50) {
        infosGame.coins = infosGame.coins - 50
        infosGame.tickets++
    } else {
        alert("Você não tem dinheiro suficiente para comprar mais tickets.")
    }

    atulizarInterface()
}

function atulizarInterface() {
    document.getElementById('total_coins').innerText = infosGame.coins
    document.getElementById('total_tickets').innerText = infosGame.tickets
}

const arr1 = ['cereja', 'cifrao', 'laranja', 'limao', 'sete', 'cereja', 'cifrao', 'laranja', 'limao', 'sete', 'cereja', 'cifrao', 'laranja', 'limao', 'sete', 'cereja', 'cifrao', 'laranja', 'limao', 'sete', 'cereja', 'cifrao', 'laranja', 'limao', 'sete', 'cereja', 'cifrao', 'laranja', 'limao', 'sete', 'cereja', 'cifrao', 'laranja', 'limao', 'sete', 'cereja', 'cifrao', 'laranja', 'limao', 'sete', 'cereja', 'cifrao', 'laranja', 'limao', 'sete', 'cereja', 'cifrao', 'laranja', 'limao', 'sete']

function embaralharArrays(arrOriginal) {
  const copiaArray = arrOriginal.slice();

  function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const arrayEmbaralhado1 = embaralhar(copiaArray.slice());
  const arrayEmbaralhado2 = embaralhar(copiaArray.slice());
  const arrayEmbaralhado3 = embaralhar(copiaArray.slice());

  return [arrayEmbaralhado1, arrayEmbaralhado2, arrayEmbaralhado3];
}

let contador = 0;
let arraysEmbaralhados = embaralharArrays(arr1);
console.log(arraysEmbaralhados)

let colocarNaTelaFeito = false
function checarTickets() {
    if(infosGame.tickets > 0) {
        infosGame.tickets--
        atulizarInterface()
        colocarNaTela(true)
    } else {
        alert('Você não tem mais tickets!')
    }
}

function colocarNaTela(limpar = false) {
    if (limpar) {
        document.querySelectorAll('.line_screen').forEach(function (div) {
            div.innerHTML = `<img src="Assets/Imgs/${arraysEmbaralhados[0][arraysEmbaralhados[0].length - 1]}.png">`;
            div.scrollTop = 0;
        });

        contador = 0;

        arraysEmbaralhados = embaralharArrays(arr1);
        colocarNaTela();
        colocarNaTela();
        colocarNaTela();
        scrollAleatorio();

    } else {

        for (let i = 0; i < arraysEmbaralhados[contador].length; i++) {
            document.getElementsByClassName('line_screen')[contador].innerHTML += `<img src="Assets/Imgs/${arraysEmbaralhados[contador][i]}.png">`;
        }

        contador++;
    }
}

const audioFundo = new Audio('./Assets/Audios/Caça-níqueis de som de jogo multimídia [TubeRipper.com].m4a');
audioFundo.loop = true; // Repete continuamente
audioFundo.volume = 0.5; // Ajuste o volume conforme necessário
function scrollAleatorio() {
    // Áudio para tocar enquanto as divs estão rolando

    const divs = document.querySelectorAll('.line_screen');

    divs.forEach(function (div) {
        const velocidade = Math.floor(Math.random() * 30) + 20;

        const scrollTimer = setInterval(function () {
        div.scrollTop += velocidade;

        if (div.scrollTop >= div.scrollHeight - div.clientHeight) {
            // Quando atingir o final, parar o intervalo e tocar o áudio de chegada
            clearInterval(scrollTimer);
            tocarAudioChegada();
        }
        }, 20);
    });
}

// Áudio para tocar quando cada div chega ao final do scroll
let checarFim = 0
function tocarAudioChegada() {
    const audioChegada = new Audio('./Assets/Audios/Efeito sonoro - dinheiro [TubeRipper.com].m4a');
    audioChegada.volume = 1; // Ajuste o volume conforme necessário
    audioChegada.play();
    checarFim++

    if(checarFim == 3) {
        checarFim = 0
        let c1 = arraysEmbaralhados[0][arraysEmbaralhados[0].length - 1]
        let c2 = arraysEmbaralhados[1][arraysEmbaralhados[0].length - 1]
        let c3 = arraysEmbaralhados[2][arraysEmbaralhados[0].length - 1]

        if(c1 == c2 && c1 == c3) {
            somarPontos(10000)
        } else if(c1 == c2 || c1 == c3 || c2 == c3) {
            somarPontos(100)
        } else {
            somarPontos(10)
        }
    }
}

let totalPontos = 0
function somarPontos(pontos) {
    totalPontos += pontos
    document.getElementById('point_0').innerText = totalPontos.toLocaleString('pt-BR')
    infosGame.coins += pontos
    atulizarInterface()

    if(totalPontos == 100000) {
        ganhouJogo()
    }
}

function ganhouJogo() {
    document.getElementById('container_vitoria').style.display = 'flex'
}

function playAgain() {
    location.reload()
}