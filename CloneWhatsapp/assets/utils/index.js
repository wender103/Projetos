function formatarTexto(texto) {
    // Remove acentos
    const textoSemAcentos = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
    // Remove espaços e converte para minúsculas
    const textoFormatado = textoSemAcentos.replace(/\s+/g, "").toLowerCase();
  
    return textoFormatado;
}

//? Retornar hora
async function obterDataHoraAtual() {
  try {
    const resposta = await fetch('https://worldtimeapi.org/api/ip');
    const dados = await resposta.json();

    // Criando um objeto Date usando a hora UTC da API
    const dataHoraAtualUTC = new Date(dados.utc_datetime);

    // Ajustando para o fuso horário de Brasília (UTC-3)
    const fusoHorarioBrasilia = -3 * 60; // 3 horas * 60 minutos/hora
    const dataHoraBrasilia = new Date(dataHoraAtualUTC.getTime() + fusoHorarioBrasilia * 60 * 1000);

    return {
      dia: dataHoraBrasilia.getUTCDate(),
      mes: dataHoraBrasilia.getUTCMonth() + 1,
      ano: dataHoraBrasilia.getUTCFullYear(),
      hora: dataHoraBrasilia.getUTCHours(),
      minuto: dataHoraBrasilia.getUTCMinutes()
    };
  } catch (erro) {
    console.error('Erro ao obter a data e hora:', erro);
    return null;
  }
}