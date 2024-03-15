//? Inputs de adicionar um produto
const input_nome_do_produto = document.querySelector('#input_nome_do_produto')
const input_valor_do_produto = document.querySelector('#input_valor_do_produto')
const input_categorias = document.querySelector('#input_categorias')
const input_quantidade = document.querySelector('#input_quantidade')
const Status_Add_Produto = document.querySelector('#Status_Add_Produto')
const input_desconto = document.querySelector('#input_desconto')
const input_tamanho = document.querySelector('#input_tamanho')
const input_cores_disponiveis = document.querySelector('#input_cores_disponiveis')

//? Btns add produto
const btn_cancel_add_produto = document.querySelector('#btn_cancel_add_produto')
const btn_add_produto = document.querySelector('#btn_add_produto')

//? Checar se já pode adicionar o produto
function ChecarPodeAddProduto() {
    if(input_nome_do_produto.value.trim() != '' && input_valor_do_produto.value.trim() != '' && input_categorias.value.trim() != '' && input_quantidade.value.trim() != '' && input_tamanho.value.trim() != '' && input_cores_disponiveis.value.trim() != '' && imgs_produto.length > 0) {
        btn_add_produto.style.backgroundColor = '#2AA952'
        return true
    } else {
        btn_add_produto.style.backgroundColor = '#9B9B9B'
        return false
    }
}

function CancelAddProduto() {
    input_nome_do_produto.value = ''
    input_valor_do_produto.value = ''
    input_categorias.value = ''
    input_quantidade.value = ''
    input_desconto.value = ''
    input_tamanho.value =  ''
    input_cores_disponiveis.value = ''
    imgs_produto = []
    contador_imgs_adicionadas = 0

    img_principal.src = 'Assets/Imgs/Icons/camisa.png'

    for (let c = 0; c < img_secundaria_produto.length; c++) {
        img_secundaria_produto[c].src = 'Assets/Imgs/Icons/camisa.png'
        
    }
}

//? Função para adiconar um produto -----------------
// Função para adicionar um produto
function AddProduto() {
    obterDataHoraAtual().then(res => {
      if (ChecarPodeAddProduto()) {
        const categorias_do_produto = separarPorVirgula(input_categorias.value)
        const tamanhos_do_produto = separarPorVirgula(input_tamanho.value)
        const cores_do_produto = separarPorVirgula(input_cores_disponiveis.value)
  
        // Adiciona imagens no Firebase Storage e, em seguida, salva o objeto no Firestore
        salvarImagensNoStorage().then(imgs_links => {
          const NovoProduto = {
            Responsavel: currentUser.User.email,
            Nome: input_nome_do_produto.value,
            Valor: input_valor_do_produto.value,
            Categorias: categorias_do_produto,
            Quantidade: input_quantidade.value,
            Desconto: input_desconto.value,
            Tamanho: tamanhos_do_produto,
            Cores: cores_do_produto,
            Status: Status_Add_Produto.value,
            Imgs: imgs_links,
            Data: {
              Ano: res.ano,
              Mes: res.mes,
              Dia: res.dia,
              Hora: res.hora,
              Minuto: res.minuto,
            },
            Promo: null
          }
  
          db.collection('Produtos').add(NovoProduto).then(() => {
            alert('Produto adicionado com sucesso!')
            CancelAddProduto() //? Vai limpar os imputs
            Carregar_Produtos()
          }).catch((e) => {
            console.warn(e)
            alert('Erro ao adicionar o produto')
          })
        })
      }
    })
}
  
// Função para salvar as imagens no Firebase Storage
function salvarImagensNoStorage() {
    return new Promise((resolve, reject) => {
      const storage = firebase.storage()
      const storageRef = storage.ref()
      const imgs_links = []
  
      // Cria um ID único para este produto (baseado no tempo)
      const produtoId = Date.now()
  
      // Itera sobre as imagens no array imgs_produto
      const promises = imgs_produto.map((imagemBase64, index) => {
        return new Promise((resolve, reject) => {
          const blob = dataURLtoBlob(imagemBase64)
          const imagemRef = storageRef.child(`imgs_produto/${produtoId}/${index}.jpg`)
  
          imagemRef.put(blob).then((snapshot) => {
            // console.log('Imagem enviada para o Firebase Storage com sucesso.')
  
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              imgs_links.push(downloadURL)
              resolve() // Resolve a promessa individualmente para cada imagem
            })
          }).catch((error) => {
            console.error('Erro ao enviar imagem para o Firebase Storage:', error)
            reject(error) // Rejeita a promessa em caso de erro
          })
        })
      })
  
      // Aguarda todas as promessas serem resolvidas
      Promise.all(promises)
        .then(() => resolve(imgs_links)) // Resolve a promessa com os links das imagens
        .catch((error) => reject(error)) // Rejeita a promessa em caso de erro
    })
}
  
// Função para converter uma representação base64 em Blob
function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
  
    return new Blob([u8arr], { type: mime })
}  

//? Adicionar imagens na tela
const fileInput = document.getElementById("fileInput")
const img_principal = document.getElementById("img_principal")
const img_secundaria_produto = document.querySelectorAll(".img_secundaria_produto")
let contador_imgs_adicionadas = 0
let imgs_produto = []

fileInput.addEventListener("change", function () {
  if (contador_imgs_adicionadas < 4) {
    const file = fileInput.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = function (e) {
        const imagemBase64 = e.target.result

        // Adiciona a imagem ao array
        imgs_produto.push(imagemBase64)

        // Atualiza as imagens na interface
        img_principal.src = imagemBase64
        img_secundaria_produto[contador_imgs_adicionadas].src = imagemBase64

        contador_imgs_adicionadas++
        ChecarPodeAddProduto()
      }
      reader.readAsDataURL(file)
    }
  } else {
    alert('Número máximo de imagens para esse produto atingido.');
  }
})