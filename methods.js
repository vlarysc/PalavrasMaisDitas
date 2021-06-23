const fs = require("fs");
const path = require("path");

function lerDiretorio(caminho) {
  return new Promise((resolve, reject) => {
    try {
      let arquivos = fs.readdirSync(caminho);
      arquivos = arquivos.map((arquivo) => path.join(caminho, arquivo));
      resolve(arquivos);
    } catch (e) {
      reject(e);
    }
  });
}

function lerArquivo(caminho) {
  return new Promise((resolve, reject) => {
    try {
      const conteudo = fs.readFileSync(caminho, { encoding: "utf-8" });
      resolve(conteudo.toString());
    } catch (e) {
      reject(e);
    }
  });
}
function lerArquivos(caminhos) {
  return Promise.all(caminhos.map((caminho) => lerArquivo(caminho)));
}
function elementosTerminadosCom(array, padraoTextual) {
  return array.filter((el) => el.endsWith(padraoTextual));
}
function removerSeVazio(array) {
  return array.filter((el) => el.trim());
}
function removerSeNum(array) {
  return array.filter((el) => el.trim());
}
function removerSeIncluir(array, padraoTextual) {
  return array.filter((el) => !el.includes(padraoTextual));
}
function removerSeNumber(array) {
  return array.filter((el) => {
    const num = parseInt(el.trim());
    return num !== num;
  });
}

function removerSimbolos(simbolos) {
  return function (array) {
    return array.map((el) => {
      let novoTexto = el;
      simbolos.forEach((simbolo) => {
        novoTexto = novoTexto.split(simbolo).join("");
      });
      return novoTexto;
    });
  };
}

function mesclarConteudo(array) {
  return array.join(" ");
}
function separarTextoPor(simbolo) {
  return function (texto) {
    return texto.split(simbolo);
  };
}

function agruparPalavras(palavras) {
  return Object.values(
    palavras.reduce((acc, palavras) => {
      const el = palavras.toLowerCase();
      const qtde = acc[el] ? acc[el].qtde + 1 : 1;
      acc[el] = { elemento: el, qtde };
      return acc;
    }, {})
  );
}

function ordenarPorNumero(attr, ordem = "asc") {
  return function (array) {
    const asc = (o1, o2) => o1[attr] - o2[attr];
    const desc = (o1, o2) => o2[attr] - o1[attr];
    return array.sort(ordem === "asc" ? asc : desc);
  };
}
module.exports = {
  lerDiretorio,
  elementosTerminadosCom,
  lerArquivo,
  lerArquivos,
  removerSeVazio,
  removerSeNum,
  removerSeIncluir,
  removerSeNumber,
  removerSimbolos,
  mesclarConteudo,
  separarTextoPor,
  agruparPalavras,
  ordenarPorNumero,
};
