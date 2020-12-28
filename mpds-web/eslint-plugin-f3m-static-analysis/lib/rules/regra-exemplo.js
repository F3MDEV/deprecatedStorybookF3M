/**
 * @fileoverview Não permite uso de "ola" nos imports
 * @author cdrodrigues
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Não permite uso de \"ola\" nos imports",
            category: "Fill me in",
            recommended: false,
            url: "https://example.com/"
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            // give me methods
            ImportDeclaration: function (node) {

                node.specifiers.forEach(function (specifier) {
                    if (specifier.type == 'ImportDefaultSpecifier' &&
                        specifier.local.type == 'Identifier' &&
                        specifier.local.name == 'ola') {

                        context.report(node, 'Não utilize "ola" nos imports.');
                    }
                });
            }

        };
    }
};
