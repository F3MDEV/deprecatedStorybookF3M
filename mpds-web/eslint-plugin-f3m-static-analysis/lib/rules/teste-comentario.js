/**
 * @fileoverview Experiência para identificar como analisar os comentários
 * @author cdrodrigues
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Experiência para identificar como analisar os comentários",
            category: "Fill me in",
            recommended: false
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
            Program() {
                const comments = sourceCode.getAllComments();

                // comments.filter(token => token.type !== "Shebang").forEach(checkCommentForSpace);
            }

        };
    }
};
