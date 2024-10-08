//CLI - Command Line Interface (Interface de Linha de Comando)
import fs from 'fs';  // File system
import path from 'path'; // Path
import { contarPalavras } from './index.js';
import trataErros from './erros/funcoesErro.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const { texto, destino } = options;

        if (!texto || !destino) {
            console.error(chalk.bgYellow('Erro: Insira o caminho de origem e destino'));
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.bgGreen('Texto processado com sucesso!'));
        } catch (erro) {
            console.log(chalk.bgRed('Ocorreu um erro no processamento: '), erro);
        }
    })

program.parse()

function processaArquivo(texto, destino) {
    fs.readFile(texto, 'utf-8', (erro, texto) => {
        try {
            if (erro) throw erro;
            const resultado = contarPalavras(texto);
            criaESalvaArquivo(resultado, destino);
        } catch (erro) {
            trataErros(erro);
        }
    }) 
}

async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`
    const textoPalavras = montaSaidaArquivo(listaPalavras)
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log(chalk.bgBlue(`Arquivo criado com sucesso`))
    } catch (erro) {
        throw erro
    }
} 
