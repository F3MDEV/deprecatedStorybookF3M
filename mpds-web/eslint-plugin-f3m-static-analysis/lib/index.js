/**
 * @fileoverview Projeto com as diferentes configurações dos projetos com JavaScript.
 * @author cdrodrigues
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// var requireIndex = require("requireindex");
const allRules = {
    "regra-exemplo": require('./rules/regra-exemplo')
}

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
// module.exports.rules = requireIndex(__dirname + "/rules");


module.exports = {
    rules: allRules,
    configs: {
        reactRecommended: {
            extends: [
                './rules-config/base/recommended.js',
                './rules-config/react/recommended-import.js',
                './rules-config/react/recommended-jsx-a11y.js',
                './rules-config/react/recommended-node.js',
                './rules-config/react/recommended-react.js'
              ].map(require.resolve),
            plugins: [],
            rules: {}
        },
        preProd: {
            extends: [
                "plugin:f3m-static-analysis/reactRecommended"
            ],
            plugins: [
                "f3m-static-analysis"
            ],
            rules: {
                "multiline-comment-style": ["error", "starred-block"],
                "no-console": 2,
                "no-debugger": 2
            }
        },
        configExemplo: {
            extends: [
                "eslint:recommended"
            ],
            plugins: [],
            rules: {
                "f3m-static-analysis/regra-exemplo": 1
            }
        }
    }
}



