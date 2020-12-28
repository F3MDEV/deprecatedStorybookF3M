/**
 * @fileoverview Experiência para identificar como analisar os comentários
 * @author cdrodrigues
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/teste-comentario"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("teste-comentario", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "//** auth: cdrodrigues*/",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
