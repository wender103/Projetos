function separarPorVirgula(input) {
    // Divida a string usando a vírgula como delimitador
    var array = input.split(',')

    // Remova espaços em branco no início e no final de cada elemento
    array = array.map(function(item) {
        return item.trim()
    })

    return array
}

//? Retornar hora
async function obterDataHoraAtual() {
    try {
      const resposta = await fetch('https://worldtimeapi.org/api/ip')
      const dados = await resposta.json()
  
      // Criando um objeto Date usando a hora UTC da API
      const dataHoraAtualUTC = new Date(dados.utc_datetime)
  
      // Ajustando para o fuso horário de Brasília (UTC-3)
      const fusoHorarioBrasilia = -3 * 60 // 3 horas * 60 minutos/hora
      const dataHoraBrasilia = new Date(dataHoraAtualUTC.getTime() + fusoHorarioBrasilia * 60 * 1000)
  
      return {
        dia: dataHoraBrasilia.getUTCDate(),
        mes: dataHoraBrasilia.getUTCMonth() + 1,
        ano: dataHoraBrasilia.getUTCFullYear(),
        hora: dataHoraBrasilia.getUTCHours(),
        minuto: dataHoraBrasilia.getUTCMinutes()
      }
    } catch (erro) {
      console.error('Erro ao obter a data e hora:', erro)
      return null
    }
}

//? Formatar texto
function formatarTexto(texto) {
  try {
    // Converte para minúsculas
    texto = texto.toLowerCase()

    // Remove acentos
    texto = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // Remove espaços em branco
    texto = texto.replace(/\s/g, '')

    return texto
  } catch (error){}
}

//? Vai formatar textos dos arrays
function Formatar_Arrays(categorias) {
  return categorias.map(categoria => formatarTexto(categoria))
}

//? Vai remover repetições do array
function removerDuplicatas(array) {
  return [...new Set(array)]
}

//? Detectar qual dispositivo do user
function detectarTipoDeDispositivo() {
  const userAgent = navigator.userAgent;

  if (/Mobile|Android|iPhone|iP[oa]d|Windows Phone/.test(userAgent)) {
      return "Mobile";
  } else if (/iPad|Android/.test(userAgent)) {
      return "Tablet";
  } else if (/Windows NT|Macintosh/.test(userAgent)) {
      return "Desktop";
  } else {
      return "Outro";
  }
}

//? Transforma em %
function calcularPorcentagens(array) {
  // Calcular a soma total dos valores no array
  const somaTotal = array.reduce((total, valor) => total + valor, 0)

  // Calcular as porcentagens
  const porcentagens = array.map((valor) => ((valor / somaTotal) * 100).toFixed(0) + "%")

  // Criar um objeto com os resultados
  const resultado = {
    Mobile: porcentagens[0],
    Tablet: porcentagens[1],
    Desktop: porcentagens[2],
    Others: porcentagens[3],
  }

  return resultado
}
