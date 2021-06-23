const path = require('path')
const fn = require('./methods')

const caminho = path.join(__dirname, '..', 'dados', 'legendas')

const simbolos = [
    '.', '?', ',', '"', '♪', '_', '-', '<i>', '</i>', '\r', '[', ']', '(', ')'
]




fn.lerDiretorio(caminho)
    .then(arquivos => fn.elementosTerminadosCom(arquivos, '.srt'))
    .then(arquivosSRT => fn.lerArquivos(arquivosSRT))
    .then(fn.mesclarConteudo)
    .then(fn.separarTextoPor('\n'))   
    .then(linhas => fn.removerSeVazio(linhas))    
    .then(linhas => fn.removerSeIncluir(linhas, '-->'))
    .then(linhas => fn.removerSeNumber(linhas))
    .then(fn.removerSimbolos(simbolos))
    .then(fn.mesclarConteudo)
    .then(fn.separarTextoPor(' '))  
    .then(linhas => fn.removerSeVazio(linhas))
    .then(linhas => fn.removerSeNumber(linhas))
    .then(fn.agruparPalavras)
    .then(fn.ordenarPorNumero('qtde', 'desc'))
    .then(console.log)