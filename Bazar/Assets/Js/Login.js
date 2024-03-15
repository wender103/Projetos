const input_nome = document.querySelector('#input_nome')
const input_email = document.querySelector('#input_email')
const input_senha = document.querySelector('#input_senha')

//? Vai cehcar se pode ser cadastrado
document.querySelector('#form_Login').addEventListener('submit', event => {
  event.preventDefault()

  if(input_email.value.trim() != '' && input_senha.value.trim() != '') {
    Login_User()
  } else {
    console.log('Não')
  }
})

function Ver_Senha() {
  if (input_senha.type === 'password') {
    input_senha.type = 'text'
  } else {
    input_senha.type = 'password'
  }
}

function Login_User() {
  auth.signInWithEmailAndPassword(input_email.value, input_senha.value).then(() => {
    location.href = 'Home.html'
  }).catch((error) => {
    const responseObject = JSON.parse(error.message);
    console.log(responseObject);
    console.log(responseObject.error.message)
    if(responseObject.error.message == 'INVALID_LOGIN_CREDENTIALS') {
        alert('Email ou senha incorreto.')
    }
  })
}

function EnviarEsqueciSenha() {
    event.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if(emailRegex.test(input_email.value)) {
    auth.sendPasswordResetEmail(input_email.value)
    .then(() => {
      // E-mail enviado com sucesso
      console.log('E-mail de redefinição de senha enviado com sucesso.')
    })
    .catch((error) => {
      // Lidar com erros ao enviar e-mail
      console.error('Erro ao enviar e-mail de redefinição de senha:', error.message)
    })
  } else {
    alert('Escreva o seu email no input de email primeiro.')
  }
}

//? Vai fazer login usando o btn do google
async function LoginViaGoogle() {
  try {
    const result = await auth.signInWithPopup(provider)
    const val = await new Promise((resolve) => {
      auth.onAuthStateChanged((user) => resolve(user))
    })

    const snapshot = await db.collection('Users').get()
    let userFound = false

    snapshot.docs.forEach((userDoc) => {
      if (userDoc.data().email == val.email) {
        userFound = true
        location.href = 'Home.html'
      }
    })

    if (!userFound) {
      console.log('Usuário não encontrado na coleção')
      obterDataHoraAtual().then(res => {
        const userObject = {
          displayName: val.displayName, // Nome completo do usuário
          email: val.email, // Endereço de email do usuário
          phoneNumber: val.phoneNumber,
          device: detectarTipoDeDispositivo(),
          online_em: {
            Ano: res.ano,
            Mes: res.mes,
            Dia: res.dia,
            Hora: res.hora,
            Minuto: res.minuto,
          },
          personalInformation: {
            address: {
              street: '', // Rua ou Avenida
              number: '', // Número da residência
              complement: '', // Complemento (apartamento, bloco, sala, etc.)
              neighborhood: '', // Bairro
              city: '', // Cidade
              state: '', // Estado
              zipCode: '', // CEP (Código de Endereçamento Postal)
              reference: '' // Referência próxima ao endereço
            }
          }, // Informações pessoais do usuário
          userType: 'customer', // 'customer' para clientes normais, 'reseller' para revendedores
          businessInfo: {
            registrationNumber: '', // Número de registro do negócio (para revendedores)
            contactNumber: '' // Número de contato comercial (para revendedores)
          },
          preferences: {
            size: '', // Tamanho preferido para clientes normais
            communication: true // Preferência de receber comunicações
          },
          cart: [], // Carrinho de compras do usuário
          purchaseHistory: [], // Histórico de compras do usuário
          wishlist: [], // Lista de desejos do usuário
          shopping: {
            history: [], // Histórico de compras passadas
            onTheWay: [], // Compras em andamento
            delivered: [] // Compras entregues
          },
          recommendations: {
            purchaseHistory: {
              items: [], // Itens comprados anteriormente pelo cliente
              categories: [] // Categorias frequentemente compradas
            },
            stylePreferences: {
              clothingStyles: [], // Estilos de roupas preferidos
              favoriteColors: [], // Cores favoritas
              fabricTypes: [] // Tipos de tecidos preferidos
            },
            sizeAndMeasurements: {
              clothingSize: '', // Tamanho de roupas preferido
              height: '', // Altura
              weight: '' // Peso
            },
            cartAndWishlist: {
              cartItems: [], // Itens no carrinho
              wishlistItems: [] // Itens na lista de desejos
            },
            browsingHistory: {
              visitedPages: [], // Páginas visitadas recentemente
              exploredCategories: [] // Categorias de produtos exploradas
            },
            demographicData: {
              age: '', // Idade
              gender: '', // Gênero
              location: '' // Localização
            },
            seasonAndWeather: {
              seasonalPreferences: [], // Preferências sazonais
              localWeather: '' // Clima local
            },
            specialOffersAndPromotions: {
              promotionalProducts: [] // Produtos promocionais personalizados
            },
            customerFeedback: {
              customerReviews: [], // Avaliações e comentários anteriores
              sizeAndStyleFeedback: [] // Feedback sobre tamanhos ou estilos específicos
            },
            fashionTrends: {
              popularItems: [], // Itens atualmente populares
              currentTrends: [] // Tendências de moda atuais
            }
          }
        }
        console.log('Email cadastrado')
        db.collection('Users').add(userObject).then(() => {
          console.log('Conta Criada')
          location.href = 'Home.html'
        }).catch((e) => {
          console.warn(e)
          alert('Error ao fazer o cadastro')
        })
      })
    }

    console.log('Todas as verificações concluídas')
  } catch (error) {
      console.warn(error)
      alert('Erro ao fazer o login')
  }
}