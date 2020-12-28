/**
 * Inicio
 */

// const Linter = require('eslint').Linter;
const CLIEngine = require('eslint').CLIEngine;
// import { Linter, CLIEngine } from 'eslint';
// File reader/writer
fs = require('fs');

/**
 * Abreviatura de console.log().
 * @param {any} o Objecto a imprimir.
 */
function c(o, ...remaining) {
  console.log(o, ...remaining);
}

/**
 * Abreviatura de JSON.stringify().
 * @param {object} object
 * @return {String} Objecto em string
 */
function p(object) {
  if (typeof object === 'string') return object;
  if (typeof object === 'object') return JSON.stringify(object);
  return false;
}

/**
 * Ordena as propriedades de um objecto.
 * @param {{}} obj Objecto a ordenar as propriedades
 * @return {String} Objecto ordenado.
 */
function sortJsonObject(obj) {
  let output = `{
  `;
  const sortedKeys = Object.keys(obj).sort();
  sortedKeys.forEach(
    (key) =>
      (output = output.concat(`"${key}": ${p(obj[key])},
  `))
  );
  if (output.length > 10) output = output.slice(0, -4);
  output = output.concat(`
}`);

  return output;
}

// //////////////////////////////////////////////////////////////////////// //
// ////////////////////////////// Constantes ////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

// const linter = new Linter( {
//     cwd: 'C:/Projects/VSCode/React-Redux-StartProject/react-redux-tutorial'
// } );
const cli = new CLIEngine({
  useEslintrc: true,
  configFile: '.eslintrc.json'
});

// let numeros = 0;
// rules.forEach((value, key, map) => {
//   const keyString = String(key);
//   if (keyString.includes('/')) {
//     numeros += 1;
//   }
// });

/**
 * Contem as regras carregadas pela configuração atual
 */
const rulesLoaded = cli.getRules();
c(`Número de regras carregadas: ${rulesLoaded.size}`);
// c(rulesLoaded.get('prettier/prettier'));

let rulesLoadedIter = rulesLoaded.entries();

// var meuMap = new Map();
// meuMap.set('0', 'foo');
// meuMap.set(1, 'bar');
// meuMap.set({}, 'baz');

// var mapIter = meuMap.entries();

// console.log(mapIter.next()); // ["0", "foo"]
// console.log(mapIter.next()); // [1, "bar"]
// console.log(mapIter.next()); // [Object, "baz"]
// c(mapIter.next().value[0]);

let output = `{
  `;
let elem = rulesLoadedIter.next()
while (!(elem.done)) {
  output = output.concat(`"${elem.value[0]}": ${p(elem.value[1])},
  `)

  elem = rulesLoadedIter.next()
}
if (output.length > 10) output = output.slice(0, -4);
output = output.concat(`
}`);

// let a = 0
// for (var [name, value] of rulesLoadedIter) {
//     if (a < 10) {
//         c();
//         c(`Nome da regra: ${name}`);
//         c(`description: ${value.meta.docs.description}`);
//         c(`category: ${value.meta.docs.category}`);
//         c(`recommended: ${value.meta.docs.recommended}`);
//         c(`url: ${value.meta.docs.url}`);
//         c(`fixable: ${value.meta.fixable}`)
//         c(`schema: ${p(value.meta.schema)}`)
//         c(`-------------------------------`);
//         c(p(value));
//         a += 1
//     }
// }
// c(rulesLoaded.get('semi'))

/**
 * Contem as opções do ficheiro de configuração
 */
const configurationFile = cli.getConfigForFile('src/App.js');
// c(configurationFile)

/**
 * Contem todas as regras do ficheiro de configuração
 */
const rulesConfiged = configurationFile.rules;
// c(rulesConfiged)

/**
 * Contem as regras do ficheiro de configuração (string)
 */
const rulesConfigedSorted = sortJsonObject(rulesConfiged);
// const rulesConfigedString = p(rulesConfigedSorted)

const fileName = 'dados.json';
fs.writeFile(fileName, rulesConfigedSorted, function(err) {
  if (err) console.log(err);
  console.log(`escreveu no ficheiro "${fileName}"`);
});

// console.log(JSON.stringify(rules.get('react/sort-comp')));
// console.log(rules.size.toString());
// console.log(rulesConfigedString);
