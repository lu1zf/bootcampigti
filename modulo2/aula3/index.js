console.log(process.argv[2]); // pega o valor passado como argumento na execução do arquivo
/**
 * em node index.js 1000
 * retorna '1000' (como string)
 */

console.log(parseInt(process.argv[2]));
/**
 * agora retorna 1000 em formato int
 */

const numero = parseInt(process.argv[2]);
const multiplos = [];

for (let i = 0; i < numero; i++) {
  if (i % 3 == 0 || i % 5 == 0) {
    multiplos.push(i);
  }
}

console.log(multiplos);
