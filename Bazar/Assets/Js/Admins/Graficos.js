function addFunctionBtnNav(fisrt = false) {
    const lis = document.querySelector('nav').querySelector('ul').querySelectorAll('li')
    for (let c = 0; c < lis.length; c++) {
        lis[c].addEventListener('click', () => {
            removerAciveSvgNav()
            lis[c].classList.add('btn_nav_active')
            
            updateURLParameter(lis[c].title)
            AbrirPagina(lis[c].title)
        })

        if(fisrt && lis[c].title == InfosPagina.Pagina || fisrt && InfosPagina.Pagina == null && lis[c].title == 'Home') {
            removerAciveSvgNav()
            lis[c].classList.add('btn_nav_active')
            AbrirPagina('Home')
        }
    }
} addFunctionBtnNav(true)

//? Vai limpar a url
function removerParametros() {
    // Obtém a URL atual
    var urlAtual = window.location.href;
  
    // Encontra o índice do caractere "?" na URL
    var indiceInterrogacao = urlAtual.indexOf('?');
  
    // Se houver um "?" na URL, remove tudo após ele
    if (indiceInterrogacao !== -1) {
      var novaUrl = urlAtual.substring(0, indiceInterrogacao);
      
      // Atualiza a URL sem recarregar a página
      window.history.pushState({ path: novaUrl }, '', novaUrl);
    }
}

function updateURLParameter(Page, ID) {
    removerParametros()
    
    const newUrl = `${window.location.href}?Pagina=${Page}`
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function AbrirPagina(Pagina) {
    FecharPaginas()
    document.querySelector('body').style.overflow = 'auto'
    const Paginas = document.querySelectorAll('.Paginas')
    
    for(let c = 0; c < Paginas.length; c++) {
        if(Paginas[c].id == Pagina && Pagina != null) {
            Paginas[c].style.display = 'block'
        } else if(Paginas[c].id == 'Home' && Pagina == null) {
            Paginas[c].style.display = 'block'
        }
    }
} AbrirPagina(InfosPagina.Pagina)

function FecharPaginas() {
    document.querySelector('body').style.overflow = 'auto'
    const Paginas = document.querySelectorAll('.Paginas')

    for(let c = 0; c < Paginas.length; c++) {
       Paginas[c].style.display = 'none'
    }
}

function removerAciveSvgNav() {
    const lis = document.querySelector('nav').querySelector('ul').querySelectorAll('li')
    for (let c = 0; c < lis.length; c++) {
        lis[c].classList.remove('btn_nav_active')
    }
}

//? Grafico circular
// Seus dados sobre a porcentagem de usuários por dispositivo
function GraficosValorComproKdDispositivo(data) {
    var data = {
        labels: ['Celular', 'Tablet', 'PC', 'Outro'],
        datasets: [{
            data: data, // Porcentagens respectivas
            backgroundColor: ['#2F80ED', '#00C3F8', '#FF392B', '#FFA000']
        }]
    };
    
    // Configurações do gráfico
    var options = {
        responsive: true,
        maintainAspectRatio: false
    };
    
    // Obtém o contexto do canvas
    var ctx = document.getElementById('users_por_dispositivos').getContext('2d');
    
    // Cria o gráfico circular
    var myChart = new Chart(ctx, {
        type: 'doughnut', // Gráfico circular
        data: data,
        options: options
    });
}

function GraficosQuantidadeUserPorTipoDispositivo(data) {
    var data = {
        labels: ['Celular', 'Tablet', 'PC', 'Outro'],
        datasets: [{
            label: 'Usuários por dispositovo',
            data: data, // Valores respectivos
            backgroundColor: ['#2F80ED', '#00C3F8', '#FF392B', '#FFA000']
        }]
    };
    
    // Configurações do gráfico
    var options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    };
    
    // Obtém o contexto do canvas
    var ctx = document.getElementById('valor_total_compro_por_cada_dispositivos').getContext('2d');
    
    // Cria o gráfico de colunas
    var myChart = new Chart(ctx, {
        type: 'bar', // Gráfico de colunas
        data: data,
        options: options
    });
    
}

//? Graficos Linha
function totalCompras(semanas, valores) {
    // Exemplo de dados (substitua isso pelos seus dados reais)
    var dados = {
        semanas: semanas,  // Número da semana
        quantidade: valores  // Quantidade de compras para cada semana
    };

    // Configuração do gráfico
    var ctx = document.getElementById('comprasChart').getContext('2d');
    var comprasChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dados.semanas,
            datasets: [{
                label: 'Compras por Semana',
                data: dados.quantidade,
                borderColor: 'rgba(255, 99, 132, 1)',  // Cor da linha (vermelha)
                borderWidth: 2,
                hoverRadius: 6,  // Raio dos pontos ao passar o mouse
                fill: true,  // Preencher abaixo da linha
                backgroundColor: 'transparent',  // Cor do preenchimento
                lineTension: 0.3,  // Adiciona suavidade à linha
                borderCapStyle: 'round'  // Cantos arredondados na linha
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 0,  // Posição da linha
                        borderColor: 'rgba(0, 0, 0, 0.1)',  // Cor da linha pontilhada
                        borderWidth: 1,
                        borderDash: [5, 5],  // Linha pontilhada
                        borderDashOffset: 0  // Deslocamento da linha pontilhada
                    }]
                }
            }
        }
    });
} totalCompras()

function TotalVisitantes(semanas, valores) {
    // Exemplo de dados (substitua isso pelos seus dados reais)
    var dados = {
        semanas: semanas,  // Número da semana
        quantidade: valores  // Quantidade de compras para cada semana
    };

    // Configuração do gráfico
    var ctx = document.getElementById('total_visitantes').getContext('2d');
    var comprasChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dados.semanas,
            datasets: [{
                label: 'Total de visitantes',
                data: dados.quantidade,
                borderColor: 'rgba(255, 99, 132, 1)',  // Cor da linha (vermelha)
                borderWidth: 2,
                hoverRadius: 6,  // Raio dos pontos ao passar o mouse
                fill: true,  // Preencher abaixo da linha
                backgroundColor: 'transparent',  // Cor do preenchimento
                lineTension: 0.3,  // Adiciona suavidade à linha
                borderCapStyle: 'round'  // Cantos arredondados na linha
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 0,  // Posição da linha
                        borderColor: 'rgba(0, 0, 0, 0.1)',  // Cor da linha pontilhada
                        borderWidth: 1,
                        borderDash: [5, 5],  // Linha pontilhada
                        borderDashOffset: 0  // Deslocamento da linha pontilhada
                    }]
                }
            }
        }
    });
} TotalVisitantes()