# eslint-plugin-f3m-static-analysis

Projeto com as diferentes configurações dos projetos com JavaScript.


## CONFIGURAR APÓS PULL DO PROJETO APENAS NA MINHA MÁQUINA(CDRODRIGUES)
1. Eliminar a pasta "eslint-plugin-f3m-static-analysis" dentro do projeto
2. Abrir cmd(admin) e executar o seguinte comando
``` powershell
mklink /J "[dirToPutJunction]" "C:\Projects\VSCode\eslint-plugin\eslint-plugin-f3m-static-analysis"
```
<!-- 
mklink /J "C:\Projects\VSCode\MpDS-1\eslint-plugin-f3m-static-analysis" "C:\Projects\VSCode\eslint-plugin\eslint-plugin-f3m-static-analysis"
 -->

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-f3m-static-analysis`:
Caso plugin esteja na pasta root do projeto executar o seguinte comando:

```
$ npm install "../eslint-plugin-f3m-static-analysis" --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-f3m-static-analysis` globally.

## Usage

Add `f3m-static-analysis` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "f3m-static-analysis"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "f3m-static-analysis/rule-name": 2
    }
}
```

## Supported Rules

* [f3m-static-analysis/regra-exemplo]: Exemplo de uma regra em que não permite o uso da palavra "ola" nos imports.



