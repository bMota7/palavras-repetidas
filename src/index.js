const fs = require('fs'); // File system
const trataErros = require('./erros/funcoesErro')
const caminhoArquivo = process.argv; //vetor de argumento
const link = caminhoArquivo[2];

fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro
        contarPalavras(texto);
    } catch (erro) {
        trataErros(erro)
    }
})

function contarPalavras(texto) {
    const paragrafos = extraiParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
        return verificaPalavrasDuplicadas(paragrafo);
    })
    console.log(contagem)
}

function extraiParagrafos(texto) {
    return texto.toLowerCase().split('\n');
}

function limpaPalavras(palavra) {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') //RegEx
}

function verificaPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(' '); //array com as palavras
    const resultado = {}; //objeto com as palavras e quantidade
    listaPalavras.forEach((palavra) => {
        if (palavra.length >= 3){
            const palavraLimpa = limpaPalavras(palavra)
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1 //cria o objeto e conta as repeticoes
        }
    });
    return resultado
}
