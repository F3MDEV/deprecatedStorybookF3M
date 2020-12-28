/**
 * @fileoverview Não permite uso de &#34;ola&#34; nos imports
 * @author cdrodrigues
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/regra-exemplo"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("regra-exemplo", rule, {

    valid: [

        // give me some code that won't trigger a warning
        "import $ from 'jquery';", 
        "import { filter } from 'lodash/fp'"
    ],

    invalid: [
        {
            code: "import ola from 'my-library';.",
            errors: [{
                message: "Não utilize 'ola' nos imports.",
                type: "ImportDeclaration"
            }]
        }
    ]
});
