
//? Pagina Home ------------------------------------------------------------------------------------
let AdminInfo = {}
function AtualizarInfos() {
    AdminInfo = {
        // Número total de produtos listados no site.
        TotalProducts: TodosProdutos.length,
    
        // Número total de transações de venda concluídas.
        TotalSales: 0,
    
        // Valor total das transações de venda concluídas.
        SalesRevenue: 0,
    
        // Número total de usuários registrados no site.
        TotalUsers: Todos_Users.length,
    
        // Status dos produtos com base na popularidade e categoria.
        ProductStatus: {
            MostLiked: [],         // Produtos com o maior número de curtidas.
            BestSellers: [],       // Produtos com as maiores vendas.
            CategoryPerformance: [],// Produtos categorizados do melhor para o pior em termos de desempenho.
        },
    
        // Estatísticas relacionadas a compras.
        Purchases: {
            // Número total de compras feitas em diferentes tipos de dispositivos.
            TotalPurchasesByDevice: {
                Desktop: 0,
                Mobile: 0,
                Tablet: 0,
                Other: 0,
            },
    
            // Número total de compras por dia da semana.
            TotalPurchasesPerWeekday: [],
        },

        // Número total de usuários com base no tipo de dispositivo usado para compras.
        TotalUsersByDeviceType: {
            Desktop: 0,
            Mobile: 0,
            Tablet: 0,
            Other: 0,
        },
    
        // Número total de visitantes do site por mês.
        TotalVisitorsPerMonth: [],
    
        // Número total de produtos em estoque.
        TotalStock: 0,
    
        // Número total de pedidos pendentes.
        TotalPendingOrders: 0,
    
        // Taxa de conversão de visitantes para compradores.
        ConversionRate: 0,
    
        // Número de usuários ativos no momento.
        ActiveUsers: 0,
    }

    document.querySelector('#total_produtos').innerText = AdminInfo.TotalProducts //? Total de produtos
    document.querySelector('#total_users').innerText = AdminInfo.TotalUsers //? Total de usuários
    document.querySelector('#total_users_cadastrados').innerText = AdminInfo.TotalUsers //? Total de usuários

    let users_online_agora = 0
    let users_offline_agora = 0

    obterDataHoraAtual().then(res => {
        let data_atual = {
            Ano: res.ano,
            Mes: res.mes,
            Dia: res.dia,
            Hora: res.hora,
            Minuto: res.minuto,
        }
        
        Todos_Users.forEach(User => {
            try {
                if(data_atual.Ano == User.online_em.Ano && data_atual.Mes == User.online_em.Mes && data_atual.Dia == User.online_em.Dia && data_atual.Hora == User.online_em.Hora && data_atual.Minuto - User.online_em.Minuto < 10) {
                    users_online_agora++
                } else {
                    users_offline_agora++
                }
            } catch (error) {
                console.warn(error)
            }
        })

        document.querySelector('#total_users_online').innerText = users_online_agora //? Total de usuários Online
        document.querySelector('#total_users_offline').innerText = users_offline_agora //? Total de usuários Offline
    })

    Todos_Users.forEach(User => {
        if(User.device == 'Desktop') {
            AdminInfo.TotalUsersByDeviceType.Desktop = AdminInfo.TotalUsersByDeviceType.Desktop + 1

        } else if(User.device == 'Mobile') {
            AdminInfo.TotalUsersByDeviceType.Mobile = AdminInfo.TotalUsersByDeviceType.Mobile + 1

        } else if(User.device == 'Tablet') {
            AdminInfo.TotalUsersByDeviceType.Tablet = AdminInfo.TotalUsersByDeviceType.Tablet + 1
            
        } else if(User.device == 'Outro') {
            AdminInfo.TotalUsersByDeviceType.Other = AdminInfo.TotalUsersByDeviceType.Other + 1
        }
    })

    //? Num de Dispositivos
    GraficosQuantidadeUserPorTipoDispositivo([AdminInfo.TotalUsersByDeviceType.Mobile, AdminInfo.TotalUsersByDeviceType.Tablet, AdminInfo.TotalUsersByDeviceType.Desktop, AdminInfo.TotalUsersByDeviceType.Other])

    //? Porcentagem de dispositivos
    const porcentagem_dispositivos_por_user = calcularPorcentagens([AdminInfo.TotalUsersByDeviceType.Mobile, AdminInfo.TotalUsersByDeviceType.Tablet, AdminInfo.TotalUsersByDeviceType.Desktop, AdminInfo.TotalUsersByDeviceType.Other])

    document.querySelectorAll('.porcentagem_dispositovos_user')[0].innerText = porcentagem_dispositivos_por_user.Desktop
    document.querySelectorAll('.porcentagem_dispositovos_user')[1].innerText = porcentagem_dispositivos_por_user.Mobile
    document.querySelectorAll('.porcentagem_dispositovos_user')[2].innerText = porcentagem_dispositivos_por_user.Tablet
    document.querySelectorAll('.porcentagem_dispositovos_user')[3].innerText = porcentagem_dispositivos_por_user.Others
}

//? Pagina Produtos ------------------------------------------------------------------------------------
const container_categorias_filtro = document.querySelector('#container_categorias_filtro')
const container_qtn_filtro = document.querySelector('#container_qtn_filtro')
const container_status_filtro = document.querySelector('#container_status_filtro')
let categorias_carregadas = false

//? Carregar Produtos
let TodosProdutos = []
function Carregar_Produtos(Pesquisa = null, Quantidade = null, Status = null) {
    const container_contaier_produtos = document.querySelector('#container_contaier_produtos')
    container_contaier_produtos.innerHTML = ''
    let Todas_Categorias = []
    let Todas_Qtns = []
    let Todos_Status = []
    TodosProdutos = []

    db.collection('Produtos').get().then((snapshot) => {
        snapshot.docs.forEach(Produtos => {
            const Produto = Produtos.data()
            TodosProdutos.push(Produto)
        })

        TodosProdutos.sort(compararPorData)

        TodosProdutos.forEach(Produto => {

            if(!categorias_carregadas) {
                //? Categorias
                for (let c = 0; c < Produto.Categorias.length; c++) {
                    Todas_Categorias.push(Produto.Categorias[c])
                }

                //? Qtns
                Todas_Qtns.push(Produto.Quantidade)

                //? Status
                Todos_Status.push(Produto.Status)
            }

            const nome_produto_formatado = formatarTexto(Produto.Nome)
            const categorias_produto_formatadas = Formatar_Arrays(Produto.Categorias)
            if(Pesquisa != null) {
                var pesquisa_formatada = formatarTexto(Pesquisa)
            }

            let categoria_passou = false
            for (let c = 0; c < categorias_produto_formatadas.length; c++) {
                if(Pesquisa != null) {
                    if(categorias_produto_formatadas[c].includes(pesquisa_formatada) || pesquisa_formatada.includes(categorias_produto_formatadas[c])) {
                        categoria_passou = true
                    }
                }
            }
            container_status_filtro
            if (Pesquisa == null || pesquisa_formatada.includes(nome_produto_formatado) || nome_produto_formatado.includes(pesquisa_formatada) || categoria_passou) {

                if(Quantidade == null || Quantidade == Produto.Quantidade) {
                    if(Status == null || Status == Produto.Status) {
                        const container_produtos_dashboard = document.createElement('div')
                        const produto_dashboard = document.createElement('div')
                        const ul = document.createElement('ul')
                        const li1 = document.createElement('li')
                        const li2 = document.createElement('li')
                        const li3 = document.createElement('li')
                        const li4 = document.createElement('li')
                        const li5 = document.createElement('li')
                        const li6 = document.createElement('li')
                        const li7 = document.createElement('li')
                        const container_img_produto_dashboard = document.createElement('div')
                        const container_img_produto = document.createElement('div')
                        const img_produto = document.createElement('img')
                        const nome_produto = document.createElement('p')
                        const preco_produto = document.createElement('p')
                        const categoria_produto = document.createElement('p')
                        const qtn_produto = document.createElement('p')
                        const data_produto = document.createElement('p')
                        const status_produto = document.createElement('p')
                        const acoes_produto = document.createElement('p')

                        img_produto.src = Produto.Imgs[0]
                        nome_produto.innerText = Produto.Nome
                        preco_produto.innerText = `R$${Produto.Valor}`
                        categoria_produto.innerText = Produto.Categorias[0]
                        qtn_produto.innerText = Produto.Quantidade

                        let Mes
                        const mesesAbreviados = {
                            1: 'Jan',
                            2: 'Feb',
                            3: 'Mar',
                            4: 'Apr',
                            5: 'May',
                            6: 'Jun',
                            7: 'Jul',
                            8: 'Aug',
                            9: 'Sep',
                            10: 'Oct',
                            11: 'Nov',
                            12: 'Dec'
                        }

                        if (Produto.Data.Mes in mesesAbreviados) {
                            Mes = mesesAbreviados[Produto.Data.Mes]
                        } else {
                            Mes = 'Desconhecido'
                        }
                        data_produto.innerText = `${Mes} ${Produto.Data.Dia}, ${Produto.Data.Ano}`
                        status_produto.innerText = Produto.Status

                        acoes_produto.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 13.3335H14" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 2.33316C11.2652 2.06794 11.6249 1.91895 12 1.91895C12.1857 1.91895 12.3696 1.95553 12.5412 2.0266C12.7128 2.09767 12.8687 2.20184 13 2.33316C13.1313 2.46448 13.2355 2.62038 13.3066 2.79196C13.3776 2.96354 13.4142 3.14744 13.4142 3.33316C13.4142 3.51888 13.3776 3.70277 13.3066 3.87435C13.2355 4.04593 13.1313 4.20184 13 4.33316L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.33316Z" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4H3.33333H14" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.33325 4.00016V2.66683C5.33325 2.31321 5.47373 1.97407 5.72378 1.72402C5.97383 1.47397 6.31296 1.3335 6.66659 1.3335H9.33325C9.68687 1.3335 10.026 1.47397 10.2761 1.72402C10.5261 1.97407 10.6666 2.31321 10.6666 2.66683V4.00016M12.6666 4.00016V13.3335C12.6666 13.6871 12.5261 14.0263 12.2761 14.2763C12.026 14.5264 11.6869 14.6668 11.3333 14.6668H4.66659C4.31296 14.6668 3.97382 14.5264 3.72378 14.2763C3.47373 14.0263 3.33325 13.6871 3.33325 13.3335V4.00016H12.6666Z" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.66675 7.3335V11.3335" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.33325 7.3335V11.3335" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 8.66683C8.36811 8.66683 8.66659 8.36835 8.66659 8.00016C8.66659 7.63197 8.36811 7.3335 7.99992 7.3335C7.63173 7.3335 7.33325 7.63197 7.33325 8.00016C7.33325 8.36835 7.63173 8.66683 7.99992 8.66683Z" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.6667 8.66683C13.0349 8.66683 13.3333 8.36835 13.3333 8.00016C13.3333 7.63197 13.0349 7.3335 12.6667 7.3335C12.2985 7.3335 12 7.63197 12 8.00016C12 8.36835 12.2985 8.66683 12.6667 8.66683Z" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.33341 8.66683C3.7016 8.66683 4.00008 8.36835 4.00008 8.00016C4.00008 7.63197 3.7016 7.3335 3.33341 7.3335C2.96522 7.3335 2.66675 7.63197 2.66675 8.00016C2.66675 8.36835 2.96522 8.66683 3.33341 8.66683Z" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>'

                        produto_dashboard.className = 'produto_dashboard'
                        container_img_produto_dashboard.className = 'container_img_produto_dashboard'
                        container_produtos_dashboard.className = 'container_produtos_dashboard'

                        container_img_produto.appendChild(img_produto)
                        container_img_produto_dashboard.appendChild(container_img_produto)
                        container_img_produto_dashboard.appendChild(nome_produto)
                        li1.appendChild(container_img_produto_dashboard)
                        li2.appendChild(preco_produto)
                        li3.appendChild(categoria_produto)
                        li4.appendChild(qtn_produto)
                        li5.appendChild(data_produto)
                        li6.appendChild(status_produto)
                        li7.appendChild(acoes_produto)

                        ul.appendChild(li1)
                        ul.appendChild(li2)
                        ul.appendChild(li3)
                        ul.appendChild(li4)
                        ul.appendChild(li5)
                        ul.appendChild(li6)
                        ul.appendChild(li7)
                        produto_dashboard.appendChild(ul)
                        container_produtos_dashboard.appendChild(produto_dashboard)
                        container_contaier_produtos.appendChild(container_produtos_dashboard)
                    }
                }
            }
        })

        categorias_carregadas = true

        //? Categorias
        Todas_Categorias = removerDuplicatas(Todas_Categorias)
        for (let c = 0; c < Todas_Categorias.length; c++) {
            const nova_categoria = document.createElement('p')
            nova_categoria.innerText = Todas_Categorias[c]

            container_categorias_filtro.appendChild(nova_categoria)

            nova_categoria.addEventListener('click', () => {
                Carregar_Produtos(Todas_Categorias[c])
            })
        }

        //? Qtns
        Todas_Qtns = removerDuplicatas(Todas_Qtns)
        for (let c = 0; c < Todas_Qtns.length; c++) {
            const nova_qtn = document.createElement('p')
            nova_qtn.innerText = Todas_Qtns[c]

            container_qtn_filtro.appendChild(nova_qtn)

            nova_qtn.addEventListener('click', () => {
                Carregar_Produtos(null, Todas_Qtns[c])
            })   
        }

        Todos_Status = removerDuplicatas(Todos_Status)
        for (let c = 0; c < Todos_Status.length; c++) {
            const nova_status = document.createElement('p')
            nova_status.innerText = Todos_Status[c]

            container_status_filtro.appendChild(nova_status)

            nova_status.addEventListener('click', () => {
                Carregar_Produtos(null, null, Todos_Status[c])
            })   
        }

        Carregar_Users()
    })

}

//? Vai organizar o array todos os produtos usando a data
function compararPorData(a, b) {
    const dataA = new Date(a.Data.Ano, a.Data.Mes - 1, a.Data.Dia, a.Data.Hora, a.Data.Minuto)
    const dataB = new Date(b.Data.Ano, b.Data.Mes - 1, b.Data.Dia, b.Data.Hora, b.Data.Minuto)
    return dataB - dataA
}

//? Vai pesquisar os produtos
function Pesquisar_Produtos(qm) {
    if(document.querySelector('#pesquisar_produtos').value.trim() != '') {
        Carregar_Produtos(document.querySelector('#pesquisar_produtos').value)
    } else {
        Carregar_Produtos()
    }
}

function Limpar_Pesquisa() {
    if(document.querySelector('#pesquisar_produtos').value.trim() == '') {
        Carregar_Produtos()
    }
}

//? Vai filtrar os produtos
const span_categorias = document.querySelector('#span_categorias')
const p_filtro = document.getElementsByClassName('p_filtro')
const container_filtros = document.getElementsByClassName('container_filtros')

for (let c = 0; c < p_filtro.length; c++) {
    p_filtro[c].addEventListener('click', () => {
        fechar_filtros()
        container_filtros[c].style.display = 'flex'
    })
    
}

document.addEventListener('click', (e) => {
    if(e.target.id != 'container_categorias_filtro' && e.target.className != 'p_filtro') {
        fechar_filtros()
    }
})

function fechar_filtros() {
    for (let c = 0; c < container_filtros.length; c++) {
        container_filtros[c].style.display = 'none'
    }
}

//? Pagina Users ------------------------------------------------------------------------------------

let Todos_Users = []
function Carregar_Users() {
    let contador_user = 0

    db.collection('Users').get().then((snapshot) => {
        snapshot.docs.forEach(Users => {
            const User = Users.data()
            Todos_Users.push(User)
            Todos_Users[contador_user].id = Users.id
            contador_user++
        })

        AtualizarInfos()
    })

}