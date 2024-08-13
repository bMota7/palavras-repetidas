//CLI - Command Line Interface (Interface de Linha de Comando)
import fs from 'fs';  // File system
import { contarPalavras } from './index.js';
import trataErros from './erros/funcoesErro.js';

const caminhoArquivo = process.argv; //vetor de argumento
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];

fs.readFile(link, 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro
        const resultado = contarPalavras(texto);
        criaESalvaArquivo(resultado, endereco)
    } catch (erro) {
        trataErros(erro)
    }
})

async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`
    const textoPalavras = JSON.stringify(listaPalavras)
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log(`Arquivo criado com sucesso!`)
    } catch (erro) {
        throw erro
    }
}
