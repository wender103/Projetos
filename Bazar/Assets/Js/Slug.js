let InfosPagina = {}
function PegarPagAtual() {
    // Obtenha a URL atual
    var url = window.location.href;

    // Crie um objeto URL
    var urlObj = new URL(url);

    // Obtenha os parâmetros da URL
    var parametros = urlObj.searchParams;

    // Obtém os valores de pagina, produto, categoria
    const url_parametros = {
        Pagina: parametros.get('Pagina'),
        Produto: parametros.get('Produto'),
        Categoria: parametros.get('Categoria')
    }

    InfosPagina = url_parametros

    // Verifique se há pelo menos um parâmetro
    if (parametros && parametros.toString().trim() !== "") {
        console.log(url_parametros);
        //? Caso exista parâmetros adicionais na URL vai mostar no menu a página que o user esta
        const container_svgs_nav = document.querySelectorAll('.container_svgs_nav')
        const lis_nav = document.querySelector('nav').querySelector('ul').querySelectorAll('li')

        for(let c = 0; c < container_svgs_nav.length; c++) {
            const p = lis_nav[c].querySelector('p')

            if(p.innerText == url_parametros.Pagina) {
                p.classList.add('p_active')
                container_svgs_nav[c].classList.add('svg_active')
            } else if(url_parametros.Pagina == null && p.innerText == 'Home') {
                p.classList.add('p_active')
                container_svgs_nav[c].classList.add('svg_active')
            }
        }


    } else {
        //? Caso não haja parâmetros adicionais na URL vai mostrar no menu que o user está no Home
        try {
            const container_svgs_nav = document.querySelectorAll('.container_svgs_nav')
            const lis_nav = document.querySelector('nav').querySelector('ul').querySelectorAll('li')
            lis_nav[0].querySelector('p').classList.add('p_active')
            container_svgs_nav[0].classList.add('svg_active')
        } catch{}
    }

} PegarPagAtual()