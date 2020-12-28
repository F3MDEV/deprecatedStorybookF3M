// ESLint (base) rules
module.exports = { 
  plugins: [],
  rules: {
    // Enforce getter and setter pairs in objects and classes
    // https://eslint.org/docs/rules/accessor-pairs
    "accessor-pairs": "off",

    // Enforce `return` statements in callbacks of array methods
    // https://eslint.org/docs/rules/array-callback-return
    "array-callback-return": ["error",{"allowImplicit":true}],

    // Enforce the use of variables within the scope they are defined
    // https://eslint.org/docs/rules/block-scoped-var
    "block-scoped-var": "error",

    // Enforce that class methods utilize `this`
    // https://eslint.org/docs/rules/class-methods-use-this
    "class-methods-use-this": "off",

    // Enforce a maximum cyclomatic complexity allowed in a program
    // https://eslint.org/docs/rules/complexity
    "complexity": "off",

    // Require `return` statements to either always or never specify values
    // https://eslint.org/docs/rules/consistent-return
    "consistent-return": "error",

    // Enforce consistent brace style for all control statements
    // https://eslint.org/docs/rules/curly
    "curly": ["error","multi-line"],

    // Require `default` cases in `switch` statements
    // https://eslint.org/docs/rules/default-case
    "default-case": "error",

    // Enforce default clauses in switch statements to be last
    // https://eslint.org/docs/rules/default-case-last
    // "default-case-last": "error",
    "default-case-last": "off",

    // Enforce default parameters to be last
    // https://eslint.org/docs/rules/default-param-last
    "default-param-last": "off",

    // Enforce consistent newlines before and after dots
    // https://eslint.org/docs/rules/dot-location
    "dot-location": ["error","property"],

    // Enforce dot notation whenever possible
    // https://eslint.org/docs/rules/dot-notation
    "dot-notation": ["error",{"allowKeywords":true}],

    // Require the use of `===` and `!==`
    // https://eslint.org/docs/rules/eqeqeq
    "eqeqeq": ["error","always",{"null":"ignore"}],

    // Require grouped accessor pairs in object literals and classes
    // https://eslint.org/docs/rules/grouped-accessor-pairs
    "grouped-accessor-pairs": "off",

    // Require `for-in` loops to include an `if` statement
    // https://eslint.org/docs/rules/guard-for-in
    "guard-for-in": "error",

    // Enforce a maximum number of classes per file
    // https://eslint.org/docs/rules/max-classes-per-file
    "max-classes-per-file": ["error",1],

    // Disallow the use of `alert`, `confirm`, and `prompt`
    // https://eslint.org/docs/rules/no-alert
    "no-alert": "error",

    // Disallow the use of `arguments.caller` or `arguments.callee`
    // https://eslint.org/docs/rules/no-caller
    "no-caller": "error",

    // Disallow lexical declarations in case clauses
    // https://eslint.org/docs/rules/no-case-declarations
    "no-case-declarations": "off",

    // Disallow returning value from constructor
    // https://eslint.org/docs/rules/no-constructor-return
    "no-constructor-return": "off",

    // Disallow division operators explicitly at the beginning of regular expressions
    // https://eslint.org/docs/rules/no-div-regex
    "no-div-regex": "off",

    // Disallow `else` blocks after `return` statements in `if` statements
    // https://eslint.org/docs/rules/no-else-return
    "no-else-return": ["error",{"allowElseIf":false}],

    // Disallow empty functions
    // https://eslint.org/docs/rules/no-empty-function
    "no-empty-function": ["error",{"allow":["arrowFunctions","functions","methods"]}],

    // Disallow empty destructuring patterns
    // https://eslint.org/docs/rules/no-empty-pattern
    "no-empty-pattern": "error",

    // Disallow `null` comparisons without type-checking operators
    // https://eslint.org/docs/rules/no-eq-null
    "no-eq-null": "off",

    // Disallow the use of `eval()`
    // https://eslint.org/docs/rules/no-eval
    "no-eval": "error",

    // Disallow extending native types
    // https://eslint.org/docs/rules/no-extend-native
    "no-extend-native": "error",

    // Disallow unnecessary calls to `.bind()`
    // https://eslint.org/docs/rules/no-extra-bind
    "no-extra-bind": "error",

    // Disallow unnecessary labels
    // https://eslint.org/docs/rules/no-extra-label
    "no-extra-label": "error",

    // Disallow fallthrough of `case` statements
    // https://eslint.org/docs/rules/no-fallthrough
    "no-fallthrough": "error",

    // Disallow leading or trailing decimal points in numeric literals
    // https://eslint.org/docs/rules/no-floating-decimal
    "no-floating-decimal": "error",

    // Disallow assignments to native objects or read-only global variables
    // https://eslint.org/docs/rules/no-global-assign
    "no-global-assign": "error",

    // Disallow shorthand type conversions
    // https://eslint.org/docs/rules/no-implicit-coercion
    "no-implicit-coercion": "error",

    // Disallow declarations in the global scope
    // https://eslint.org/docs/rules/no-implicit-globals
    "no-implicit-globals": "error",

    // Disallow the use of `eval()`-like methods
    // https://eslint.org/docs/rules/no-implied-eval
    "no-implied-eval": "error",

    // Disallow `this` keywords outside of classes or class-like objects
    // https://eslint.org/docs/rules/no-invalid-this
    "no-invalid-this": "off",

    // Disallow the use of the `__iterator__` property
    // https://eslint.org/docs/rules/no-iterator
    "no-iterator": "error",

    // Disallow labeled statements
    // https://eslint.org/docs/rules/no-labels
    "no-labels": ["error",{"allowLoop":false,"allowSwitch":false}],

    // Disallow unnecessary nested blocks
    // https://eslint.org/docs/rules/no-lone-blocks
    "no-lone-blocks": "error",

    // Disallow function declarations that contain unsafe references inside loop statements
    // https://eslint.org/docs/rules/no-loop-func
    "no-loop-func": "error",

    // Disallow magic numbers
    // https://eslint.org/docs/rules/no-magic-numbers
    "no-magic-numbers": ["warn", { "ignoreArrayIndexes":true, "ignore":[0,1,2], "enforceConst":false, "detectObjects":false }],

    // Disallow multiple spaces
    // https://eslint.org/docs/rules/no-multi-spaces
    "no-multi-spaces": ["error",{"ignoreEOLComments":false}],

    // Disallow multiline strings
    // https://eslint.org/docs/rules/no-multi-str
    "no-multi-str": "error",

    // Disallow `new` operators outside of assignments or comparisons
    // https://eslint.org/docs/rules/no-new
    "no-new": "error",

    // Disallow `new` operators with the `Function` object
    // https://eslint.org/docs/rules/no-new-func
    "no-new-func": "error",

    // Disallow `new` operators with the `String`, `Number`, and `Boolean` objects
    // https://eslint.org/docs/rules/no-new-wrappers
    "no-new-wrappers": "error",

    // Disallow octal literals
    // https://eslint.org/docs/rules/no-octal
    "no-octal": "error",

    // Disallow octal escape sequences in string literals
    // https://eslint.org/docs/rules/no-octal-escape
    "no-octal-escape": "error",

    // Disallow reassigning `function` parameters
    // https://eslint.org/docs/rules/no-param-reassign
    "no-param-reassign": "error",

    // Disallow the use of the `__proto__` property
    // https://eslint.org/docs/rules/no-proto
    "no-proto": "error",

    // Disallow variable redeclaration
    // https://eslint.org/docs/rules/no-redeclare
    "no-redeclare": ["error",{"builtinGlobals":false}],

    // Disallow certain properties on certain objects
    // https://eslint.org/docs/rules/no-restricted-properties
    "no-restricted-properties": ["error",{"object":"arguments","property":"callee","message":"arguments.callee is deprecated"},{"object":"global","property":"isFinite","message":"Please use Number.isFinite instead"},{"object":"self","property":"isFinite","message":"Please use Number.isFinite instead"},{"object":"window","property":"isFinite","message":"Please use Number.isFinite instead"},{"object":"global","property":"isNaN","message":"Please use Number.isNaN instead"},{"object":"self","property":"isNaN","message":"Please use Number.isNaN instead"},{"object":"window","property":"isNaN","message":"Please use Number.isNaN instead"},{"property":"__defineGetter__","message":"Please use Object.defineProperty instead."},{"property":"__defineSetter__","message":"Please use Object.defineProperty instead."},{"object":"Math","property":"pow","message":"Use the exponentiation operator (**) instead."}],

    // Disallow assignment operators in `return` statements
    // https://eslint.org/docs/rules/no-return-assign
    "no-return-assign": ["error","always"],

    // Disallow unnecessary `return await`
    // https://eslint.org/docs/rules/no-return-await
    "no-return-await": "error",

    // Disallow `javascript:` urls
    // https://eslint.org/docs/rules/no-script-url
    "no-script-url": "error",

    // Disallow assignments where both sides are exactly the same
    // https://eslint.org/docs/rules/no-self-assign
    "no-self-assign": ["error",{"props":true}],

    // Disallow comparisons where both sides are exactly the same
    // https://eslint.org/docs/rules/no-self-compare
    "no-self-compare": "error",

    // Disallow comma operators
    // https://eslint.org/docs/rules/no-sequences
    "no-sequences": "error",

    // Disallow throwing literals as exceptions
    // https://eslint.org/docs/rules/no-throw-literal
    "no-throw-literal": "error",

    // Disallow unmodified loop conditions
    // https://eslint.org/docs/rules/no-unmodified-loop-condition
    "no-unmodified-loop-condition": "error",

    // Disallow unused expressions
    // https://eslint.org/docs/rules/no-unused-expressions
    "no-unused-expressions": ["error",{"allowShortCircuit":false,"allowTernary":false,"allowTaggedTemplates":false}],

    // Disallow unused labels
    // https://eslint.org/docs/rules/no-unused-labels
    "no-unused-labels": "error",

    // Disallow unnecessary calls to `.call()` and `.apply()`
    // https://eslint.org/docs/rules/no-useless-call
    "no-useless-call": "error",

    // Disallow unnecessary `catch` clauses
    // https://eslint.org/docs/rules/no-useless-catch
    "no-useless-catch": "error",

    // Disallow unnecessary concatenation of literals or template literals
    // https://eslint.org/docs/rules/no-useless-concat
    "no-useless-concat": "error",

    // Disallow unnecessary escape characters
    // https://eslint.org/docs/rules/no-useless-escape
    "no-useless-escape": "error",

    // Disallow redundant return statements
    // https://eslint.org/docs/rules/no-useless-return
    "no-useless-return": "error",

    // Disallow `void` operators
    // https://eslint.org/docs/rules/no-void
    "no-void": "error",

    // Disallow specified warning terms in comments
    // https://eslint.org/docs/rules/no-warning-comments
    "no-warning-comments": ["warn",{"terms":["todo","fixme","xxx"],"location":"start"}],

    // Disallow `with` statements
    // https://eslint.org/docs/rules/no-with
    "no-with": "error",

    // Enforce using named capture group in regular expression
    // https://eslint.org/docs/rules/prefer-named-capture-group
    "prefer-named-capture-group": "off",

    // Require using Error objects as Promise rejection reasons
    // https://eslint.org/docs/rules/prefer-promise-reject-errors
    "prefer-promise-reject-errors": ["error",{"allowEmptyReject":false}],

    // Disallow use of the `RegExp` constructor in favor of regular expression literals
    // https://eslint.org/docs/rules/prefer-regex-literals
    "prefer-regex-literals": "off",

    // Enforce the consistent use of the radix argument when using `parseInt()`
    // https://eslint.org/docs/rules/radix
    "radix": "error",

    // Disallow async functions which have no `await` expression
    // https://eslint.org/docs/rules/require-await
    "require-await": "off",

    // Enforce the use of `u` flag on RegExp
    // https://eslint.org/docs/rules/require-unicode-regexp
    "require-unicode-regexp": "off",

    // Require `var` declarations be placed at the top of their containing scope
    // https://eslint.org/docs/rules/vars-on-top
    "vars-on-top": "error",

    // Require parentheses around immediate `function` invocations
    // https://eslint.org/docs/rules/wrap-iife
    "wrap-iife": ["error","outside",{"functionPrototypeMethods":false}],

    // Require or disallow "Yoda" conditions
    // https://eslint.org/docs/rules/yoda
    "yoda": ["error","never"],

    // Require braces around arrow function bodies
    // https://eslint.org/docs/rules/arrow-body-style
    "arrow-body-style": ["error","as-needed",{"requireReturnForObjectLiteral":false}],

    // Require parentheses around arrow function arguments
    // https://eslint.org/docs/rules/arrow-parens
    "arrow-parens": ["error","always"],

    // Enforce consistent spacing before and after the arrow in arrow functions
    // https://eslint.org/docs/rules/arrow-spacing
    "arrow-spacing": ["error",{"before":true,"after":true}],

    // Require `super()` calls in constructors
    // https://eslint.org/docs/rules/constructor-super
    "constructor-super": "error",

    // Enforce consistent spacing around `*` operators in generator functions
    // https://eslint.org/docs/rules/generator-star-spacing
    "generator-star-spacing": ["error",{"before":false,"after":true}],

    // Disallow reassigning class members
    // https://eslint.org/docs/rules/no-class-assign
    "no-class-assign": "error",

    // Disallow arrow functions where they could be confused with comparisons
    // https://eslint.org/docs/rules/no-confusing-arrow
    "no-confusing-arrow": ["error",{"allowParens":true}],

    // Disallow reassigning `const` variables
    // https://eslint.org/docs/rules/no-const-assign
    "no-const-assign": "error",

    // Disallow duplicate class members
    // https://eslint.org/docs/rules/no-dupe-class-members
    "no-dupe-class-members": "error",

    // Disallow duplicate module imports
    // https://eslint.org/docs/rules/no-duplicate-imports
    "no-duplicate-imports": "error",

    // Disallow `new` operators with the `Symbol` object
    // https://eslint.org/docs/rules/no-new-symbol
    "no-new-symbol": "error",

    // Disallow specified names in exports
    // https://eslint.org/docs/rules/no-restricted-exports
    "no-restricted-exports": "off",

    // Disallow specified modules when loaded by `import`
    // https://eslint.org/docs/rules/no-restricted-imports
    "no-restricted-imports": "off",

    // Disallow `this`/`super` before calling `super()` in constructors
    // https://eslint.org/docs/rules/no-this-before-super
    "no-this-before-super": "error",

    // Disallow unnecessary computed property keys in objects and classes
    // https://eslint.org/docs/rules/no-useless-computed-key
    "no-useless-computed-key": "error",

    // Disallow unnecessary constructors
    // https://eslint.org/docs/rules/no-useless-constructor
    "no-useless-constructor": "error",

    // Disallow renaming import, export, and destructured assignments to the same name
    // https://eslint.org/docs/rules/no-useless-rename
    "no-useless-rename": ["error",{"ignoreDestructuring":false,"ignoreImport":false,"ignoreExport":false}],

    // Require `let` or `const` instead of `var`
    // https://eslint.org/docs/rules/no-var
    "no-var": "error",

    // Require or disallow method and property shorthand syntax for object literals
    // https://eslint.org/docs/rules/object-shorthand
    "object-shorthand": ["error","always",{"ignoreConstructors":false,"avoidQuotes":true}],

    // Require using arrow functions for callbacks
    // https://eslint.org/docs/rules/prefer-arrow-callback
    "prefer-arrow-callback": ["error",{"allowNamedFunctions":false,"allowUnboundThis":true}],

    // Require `const` declarations for variables that are never reassigned after declared
    // https://eslint.org/docs/rules/prefer-const
    "prefer-const": ["error",{"destructuring":"any","ignoreReadBeforeAssign":true}],

    // Require destructuring from arrays and/or objects
    // https://eslint.org/docs/rules/prefer-destructuring
    "prefer-destructuring": ["error",{"VariableDeclarator":{"array":false,"object":true},"AssignmentExpression":{"array":false,"object":true}},{"enforceForRenamedProperties":false}],

    // Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals
    // https://eslint.org/docs/rules/prefer-numeric-literals
    "prefer-numeric-literals": "error",

    // Require rest parameters instead of `arguments`
    // https://eslint.org/docs/rules/prefer-rest-params
    "prefer-rest-params": "error",

    // Require spread operators instead of `.apply()`
    // https://eslint.org/docs/rules/prefer-spread
    "prefer-spread": "error",

    // Require template literals instead of string concatenation
    // https://eslint.org/docs/rules/prefer-template
    "prefer-template": "error",

    // Require generator functions to contain `yield`
    // https://eslint.org/docs/rules/require-yield
    "require-yield": "error",

    // Enforce spacing between rest and spread operators and their expressions
    // https://eslint.org/docs/rules/rest-spread-spacing
    "rest-spread-spacing": ["error","never"],

    // Enforce sorted import declarations within modules
    // https://eslint.org/docs/rules/sort-imports
    "sort-imports": "off",

    // Require symbol descriptions
    // https://eslint.org/docs/rules/symbol-description
    "symbol-description": "error",

    // Require or disallow spacing around embedded expressions of template strings
    // https://eslint.org/docs/rules/template-curly-spacing
    "template-curly-spacing": ["error", "never"],

    // Require or disallow spacing around the `*` in `yield*` expressions
    // https://eslint.org/docs/rules/yield-star-spacing
    "yield-star-spacing": ["error","after"],

    // Require `return` statements after callbacks
    // https://eslint.org/docs/rules/callback-return
    "callback-return": "off",

    // Require `require()` calls to be placed at top-level module scope
    // https://eslint.org/docs/rules/global-require
    "global-require": "error",

    // Require error handling in callbacks
    // https://eslint.org/docs/rules/handle-callback-err
    "handle-callback-err": "off",

    // Disallow use of the `Buffer()` constructor
    // https://eslint.org/docs/rules/no-buffer-constructor
    "no-buffer-constructor": "error",

    // Disallow `require` calls to be mixed with regular variable declarations
    // https://eslint.org/docs/rules/no-mixed-requires
    "no-mixed-requires": "error",

    // Disallow `new` operators with calls to `require`
    // https://eslint.org/docs/rules/no-new-require
    "no-new-require": "error",

    // Disallow string concatenation with `__dirname` and `__filename`
    // https://eslint.org/docs/rules/no-path-concat
    "no-path-concat": "error",

    // Disallow the use of `process.env`
    // https://eslint.org/docs/rules/no-process-env
    "no-process-env": "warn",

    // Disallow the use of `process.exit()`
    // https://eslint.org/docs/rules/no-process-exit
    "no-process-exit": "error",

    // Disallow specified modules when loaded by `require`
    // https://eslint.org/docs/rules/no-restricted-modules
    "no-restricted-modules": "off",

    // Disallow synchronous methods
    // https://eslint.org/docs/rules/no-sync
    "no-sync": "off",

    // Enforce "for" loop update clause moving the counter in the right direction.
    // https://eslint.org/docs/rules/for-direction
    "for-direction": "error",

    // Enforce `return` statements in getters
    // https://eslint.org/docs/rules/getter-return
    "getter-return": "error",

    // Disallow using an async function as a Promise executor
    // https://eslint.org/docs/rules/no-async-promise-executor
    "no-async-promise-executor": "error",

    // Disallow `await` inside of loops
    // https://eslint.org/docs/rules/no-await-in-loop
    "no-await-in-loop": "error",

    // Disallow comparing against -0
    // https://eslint.org/docs/rules/no-compare-neg-zero
    "no-compare-neg-zero": "error",

    // Disallow assignment operators in conditional expressions
    // https://eslint.org/docs/rules/no-cond-assign
    "no-cond-assign": "error",

    // Disallow the use of `console`
    // https://eslint.org/docs/rules/no-console
    "no-console": "warn",

    // Disallow constant expressions in conditions
    // https://eslint.org/docs/rules/no-constant-condition
    "no-constant-condition": ["error", { "checkLoops": true }],

    // Disallow control characters in regular expressions
    // https://eslint.org/docs/rules/no-control-regex
    "no-control-regex": "error",

    // Disallow the use of `debugger`
    // https://eslint.org/docs/rules/no-debugger
    "no-debugger": "error",

    // Disallow duplicate arguments in `function` definitions
    // https://eslint.org/docs/rules/no-dupe-args
    "no-dupe-args": "error",

    // Disallow duplicate conditions in if-else-if chains
    // https://eslint.org/docs/rules/no-dupe-else-if
    "no-dupe-else-if": "error",

    // Disallow duplicate keys in object literals
    // https://eslint.org/docs/rules/no-dupe-keys
    "no-dupe-keys": "error",

    // Disallow duplicate case labels
    // https://eslint.org/docs/rules/no-duplicate-case
    "no-duplicate-case": "error",

    // Disallow empty block statements
    // https://eslint.org/docs/rules/no-empty
    "no-empty": "error",

    // Disallow empty character classes in regular expressions
    // https://eslint.org/docs/rules/no-empty-character-class
    "no-empty-character-class": "error",

    // Disallow reassigning exceptions in `catch` clauses
    // https://eslint.org/docs/rules/no-ex-assign
    "no-ex-assign": "error",

    // Disallow unnecessary boolean casts
    // https://eslint.org/docs/rules/no-extra-boolean-cast
    "no-extra-boolean-cast": "error",

    // Disallow unnecessary parentheses
    // https://eslint.org/docs/rules/no-extra-parens
    "no-extra-parens": "off",

    // Disallow unnecessary semicolons
    // https://eslint.org/docs/rules/no-extra-semi
    "no-extra-semi": "error",

    // Disallow reassigning `function` declarations
    // https://eslint.org/docs/rules/no-func-assign
    "no-func-assign": "error",

    // Disallow assigning to imported bindings
    // https://eslint.org/docs/rules/no-import-assign
    "no-import-assign": "error",

    // Disallow variable or `function` declarations in nested blocks
    // https://eslint.org/docs/rules/no-inner-declarations
    "no-inner-declarations": "error",

    // Disallow invalid regular expression strings in `RegExp` constructors
    // https://eslint.org/docs/rules/no-invalid-regexp
    "no-invalid-regexp": "error",

    // Disallow irregular whitespace
    // https://eslint.org/docs/rules/no-irregular-whitespace
    "no-irregular-whitespace": "error",

    // Disallow characters which are made with multiple code points in character class syntax
    // https://eslint.org/docs/rules/no-misleading-character-class
    "no-misleading-character-class": "error",

    // Disallow calling global object properties as functions
    // https://eslint.org/docs/rules/no-obj-calls
    "no-obj-calls": "error",

    // Disallow calling some `Object.prototype` methods directly on objects
    // https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "error",

    // Disallow multiple spaces in regular expressions
    // https://eslint.org/docs/rules/no-regex-spaces
    "no-regex-spaces": "error",

    // Disallow returning values from setters
    // https://eslint.org/docs/rules/no-setter-return
    "no-setter-return": "off",

    // Disallow sparse arrays
    // https://eslint.org/docs/rules/no-sparse-arrays
    "no-sparse-arrays": "error",

    // Disallow template literal placeholder syntax in regular strings
    // https://eslint.org/docs/rules/no-template-curly-in-string
    "no-template-curly-in-string": "error",

    // Disallow confusing multiline expressions
    // https://eslint.org/docs/rules/no-unexpected-multiline
    "no-unexpected-multiline": "error",

    // Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements
    // https://eslint.org/docs/rules/no-unreachable
    "no-unreachable": "error",

    // Disallow control flow statements in `finally` blocks
    // https://eslint.org/docs/rules/no-unsafe-finally
    "no-unsafe-finally": "error",

    // Disallow negating the left operand of relational operators
    // https://eslint.org/docs/rules/no-unsafe-negation
    "no-unsafe-negation": "error",

    // Disallow useless backreferences in regular expressions
    // https://eslint.org/docs/rules/no-useless-backreference
    "no-useless-backreference": "off",

    // Disallow assignments that can lead to race conditions due to usage of `await` or `yield`
    // https://eslint.org/docs/rules/require-atomic-updates
    "require-atomic-updates": "off",

    // Require calls to `isNaN()` when checking for `NaN`
    // https://eslint.org/docs/rules/use-isnan
    "use-isnan": "error",

    // Enforce comparing `typeof` expressions against valid strings
    // https://eslint.org/docs/rules/valid-typeof
    "valid-typeof": "error",

    // Require or disallow strict mode directives
    // https://eslint.org/docs/rules/strict
    "strict": ["error","global"],

    // Enforce linebreaks after opening and before closing array brackets
    // https://eslint.org/docs/rules/array-bracket-newline
    "array-bracket-newline": ["off","consistent"],

    // Enforce consistent spacing inside array brackets
    // https://eslint.org/docs/rules/array-bracket-spacing
    "array-bracket-spacing": ["error","never"],

    // Enforce line breaks after each array element
    // https://eslint.org/docs/rules/array-element-newline
    "array-element-newline": ["off",{"multiline":true,"minItems":3}],

    // Disallow or enforce spaces inside of blocks after opening block and before closing block
    // https://eslint.org/docs/rules/block-spacing
    "block-spacing": ["error","always"],

    // Enforce consistent brace style for blocks
    // https://eslint.org/docs/rules/brace-style
    "brace-style": ["error","1tbs",{"allowSingleLine":true}],

    // Enforce camelcase naming convention
    // https://eslint.org/docs/rules/camelcase
    "camelcase": ["warn",{"properties":"never","ignoreDestructuring":false, "ignoreImports": false}],

    // Enforce or disallow capitalization of the first letter of a comment
    // https://eslint.org/docs/rules/capitalized-comments
    "capitalized-comments": "off",

    // Require or disallow trailing commas
    // https://eslint.org/docs/rules/comma-dangle
    "comma-dangle": ["error",{"arrays":"never","objects":"never","imports":"never","exports":"never","functions":"never"}],

    // Enforce consistent spacing before and after commas
    // https://eslint.org/docs/rules/comma-spacing
    "comma-spacing": ["error",{"before":false,"after":true}],

    // Enforce consistent comma style
    // https://eslint.org/docs/rules/comma-style
    "comma-style": ["error","last"],

    // Enforce consistent spacing inside computed property brackets
    // https://eslint.org/docs/rules/computed-property-spacing
    "computed-property-spacing": ["error","never"],

    // Enforce consistent naming when capturing the current execution context
    // https://eslint.org/docs/rules/consistent-this
    "consistent-this": "off",

    // Require or disallow newline at the end of files
    // https://eslint.org/docs/rules/eol-last
    "eol-last": ["error","always"],

    // Require or disallow spacing between function identifiers and their invocations
    // https://eslint.org/docs/rules/func-call-spacing
    "func-call-spacing": ["error","never"],

    // Require function names to match the name of the variable or property to which they are assigned
    // https://eslint.org/docs/rules/func-name-matching
    "func-name-matching": "error",

    // Require or disallow named `function` expressions
    // https://eslint.org/docs/rules/func-names
    "func-names": "off",

    // Enforce the consistent use of either `function` declarations or expressions
    // https://eslint.org/docs/rules/func-style
    "func-style": ["off","expression"],

    // Enforce line breaks between arguments of a function call
    // https://eslint.org/docs/rules/function-call-argument-newline
    "function-call-argument-newline": ["off","consistent"],

    // Enforce consistent line breaks inside function parentheses
    // https://eslint.org/docs/rules/function-paren-newline
    "function-paren-newline": ["error","consistent"],

    // Disallow specified identifiers
    // https://eslint.org/docs/rules/id-blacklist
    "id-blacklist": "off",

    // Enforce minimum and maximum identifier lengths
    // https://eslint.org/docs/rules/id-length
    "id-length": ["error", { "min": 2, "exceptions": ["a", "b", "e", "i", "j", "t"]}],

    // Require identifiers to match a specified regular expression
    // https://eslint.org/docs/rules/id-match
    "id-match": "off",

    // Enforce the location of arrow function bodies
    // https://eslint.org/docs/rules/implicit-arrow-linebreak
    "implicit-arrow-linebreak": ["error","beside"],

    // Enforce consistent indentation
    // https://eslint.org/docs/rules/indent
    "indent": ["error", 2],

    // Enforce the consistent use of either double or single quotes in JSX attributes
    // https://eslint.org/docs/rules/jsx-quotes
    "jsx-quotes": ["off","prefer-double"],

    // Enforce consistent spacing between keys and values in object literal properties
    // https://eslint.org/docs/rules/key-spacing
    "key-spacing": ["error",{"beforeColon":false,"afterColon":true}],

    // Enforce consistent spacing before and after keywords
    // https://eslint.org/docs/rules/keyword-spacing
    "keyword-spacing": ["error",{"before":true,"after":true}],

    // Enforce consistent linebreak style
    // https://eslint.org/docs/rules/linebreak-style
    "linebreak-style": ["error","windows"],

    // Enforce position of line comments
    // https://eslint.org/docs/rules/line-comment-position
    "line-comment-position": "off",

    // Require empty lines around comments
    // https://eslint.org/docs/rules/lines-around-comment
    "lines-around-comment": ["error", {"beforeBlockComment": true,"afterBlockComment": false,"beforeLineComment": false,"afterLineComment": false,"allowBlockStart": false,"allowBlockEnd": false, "allowClassStart": false, "allowClassEnd": false, "allowObjectStart": false, "allowObjectEnd": false, "allowArrayStart": false, "allowArrayEnd": false}],

    // Require or disallow an empty line between class members
    // https://eslint.org/docs/rules/lines-between-class-members
    "lines-between-class-members": ["error","always",{"exceptAfterSingleLine":true}],

    // Enforce a maximum depth that blocks can be nested
    // https://eslint.org/docs/rules/max-depth
    "max-depth": ["error",{"max":5}],

    // Enforce a maximum line length
    // https://eslint.org/docs/rules/max-len
    "max-len": ["error",150,2,{"ignoreUrls":true,"ignoreComments":false,"ignoreRegExpLiterals":true,"ignoreStrings":true,"ignoreTemplateLiterals":true}],

    // Enforce a maximum number of lines per file
    // https://eslint.org/docs/rules/max-lines
    "max-lines": "off",

    // Enforce a maximum number of line of code in a function
    // https://eslint.org/docs/rules/max-lines-per-function
    "max-lines-per-function": "off",

    // Enforce a maximum depth that callbacks can be nested
    // https://eslint.org/docs/rules/max-nested-callbacks
    "max-nested-callbacks": "off",

    // Enforce a maximum number of parameters in function definitions
    // https://eslint.org/docs/rules/max-params
    "max-params": "off",

    // Enforce a maximum number of statements allowed in function blocks
    // https://eslint.org/docs/rules/max-statements
    "max-statements": "off",

    // Enforce a maximum number of statements allowed per line
    // https://eslint.org/docs/rules/max-statements-per-line
    "max-statements-per-line": "off",

    // Enforce a particular style for multiline comments
    // https://eslint.org/docs/rules/multiline-comment-style
    "multiline-comment-style": "off",

    // Enforce newlines between operands of ternary expressions
    // https://eslint.org/docs/rules/multiline-ternary
    "multiline-ternary": ["off","never"],

    // Require constructor names to begin with a capital letter
    // https://eslint.org/docs/rules/new-cap
    "new-cap": ["error",{"newIsCap":true,"newIsCapExceptions":[],"capIsNew":false,"capIsNewExceptions":[],"properties": true}],

    // Require a newline after each call in a method chain
    // https://eslint.org/docs/rules/newline-per-chained-call
    "newline-per-chained-call": ["error",{"ignoreChainWithDepth":4}],

    // Enforce or disallow parentheses when invoking a constructor with no arguments
    // https://eslint.org/docs/rules/new-parens
    "new-parens": "error",

    // Disallow `Array` constructors
    // https://eslint.org/docs/rules/no-array-constructor
    "no-array-constructor": "error",

    // Disallow bitwise operators
    // https://eslint.org/docs/rules/no-bitwise
    "no-bitwise": "error",

    // Disallow `continue` statements
    // https://eslint.org/docs/rules/no-continue
    "no-continue": "error",

    // Disallow inline comments after code
    // https://eslint.org/docs/rules/no-inline-comments
    "no-inline-comments": "off",

    // Disallow `if` statements as the only statement in `else` blocks
    // https://eslint.org/docs/rules/no-lonely-if
    "no-lonely-if": "error",

    // Disallow mixed binary operators
    // https://eslint.org/docs/rules/no-mixed-operators
    "no-mixed-operators": ["error",{"groups":[["%","**"],["%","+"],["%","-"],["%","*"],["%","/"],["/","*"],["&","|","<<",">>",">>>"],["==","!=","===","!=="],["&&","||"]],"allowSamePrecedence":false}],

    // Disallow mixed spaces and tabs for indentation
    // https://eslint.org/docs/rules/no-mixed-spaces-and-tabs
    "no-mixed-spaces-and-tabs": "error",

    // Disallow use of chained assignment expressions
    // https://eslint.org/docs/rules/no-multi-assign
    "no-multi-assign": "error",

    // Disallow multiple empty lines
    // https://eslint.org/docs/rules/no-multiple-empty-lines
    "no-multiple-empty-lines": ["error",{"max":2,"maxBOF":1,"maxEOF":0}],

    // Enforce the location of single-line statements
    // https://eslint.org/docs/rules/nonblock-statement-body-position
    "nonblock-statement-body-position": ["error","beside",{"overrides":{}}],

    // Disallow negated conditions
    // https://eslint.org/docs/rules/no-negated-condition
    "no-negated-condition": "off",

    // Disallow nested ternary expressions
    // https://eslint.org/docs/rules/no-nested-ternary
    "no-nested-ternary": "warn",

    // Disallow `Object` constructors
    // https://eslint.org/docs/rules/no-new-object
    "no-new-object": "error",

    // Disallow the unary operators `++` and `--`
    // https://eslint.org/docs/rules/no-plusplus
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],

    // Disallow specified syntax
    // https://eslint.org/docs/rules/no-restricted-syntax
    "no-restricted-syntax": ["error",{"selector":"ForInStatement","message":"for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."},{"selector":"ForOfStatement","message":"iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations."},{"selector":"LabeledStatement","message":"Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."},{"selector":"WithStatement","message":"`with` is disallowed in strict mode because it makes code impossible to predict and optimize."}],

    // Disallow all tabs
    // https://eslint.org/docs/rules/no-tabs
    "no-tabs": "error",

    // Disallow ternary operators
    // https://eslint.org/docs/rules/no-ternary
    "no-ternary": "off",

    // Disallow trailing whitespace at the end of lines
    // https://eslint.org/docs/rules/no-trailing-spaces
    "no-trailing-spaces": ["error",{"skipBlankLines":false,"ignoreComments":false}],

    // Disallow dangling underscores in identifiers
    // https://eslint.org/docs/rules/no-underscore-dangle
    "no-underscore-dangle": ["error",{"allow":[],"allowAfterThis":false,"allowAfterSuper":false,"enforceInMethodNames":true}],

    // Disallow ternary operators when simpler alternatives exist
    // https://eslint.org/docs/rules/no-unneeded-ternary
    "no-unneeded-ternary": ["error",{"defaultAssignment":false}],

    // Disallow whitespace before properties
    // https://eslint.org/docs/rules/no-whitespace-before-property
    "no-whitespace-before-property": "error",

    // Enforce consistent line breaks inside braces
    // https://eslint.org/docs/rules/object-curly-newline
    "object-curly-newline": ["error",{"multiline":true,"consistent":true}],

    // Enforce consistent spacing inside braces
    // https://eslint.org/docs/rules/object-curly-spacing
    "object-curly-spacing": ["error","always"],

    // Enforce placing object properties on separate lines
    // https://eslint.org/docs/rules/object-property-newline
    "object-property-newline": ["error",{"allowAllPropertiesOnSameLine":true}],

    // Enforce variables to be declared either together or separately in functions
    // https://eslint.org/docs/rules/one-var
    "one-var": ["error","never"],

    // Require or disallow newlines around variable declarations
    // https://eslint.org/docs/rules/one-var-declaration-per-line
    "one-var-declaration-per-line": ["error","always"],

    // Require or disallow assignment operator shorthand where possible
    // https://eslint.org/docs/rules/operator-assignment
    "operator-assignment": ["error","always"],

    // Enforce consistent linebreak style for operators
    // https://eslint.org/docs/rules/operator-linebreak
    "operator-linebreak": ["error","after",{"overrides":{"?":"before",":":"before","|>":"before"}}],

    // Require or disallow padding within blocks
    // https://eslint.org/docs/rules/padded-blocks
    "padded-blocks": ["error",{"blocks":"never","classes":"never","switches":"never"},{"allowSingleLineBlocks":true}],

    // Require or disallow padding lines between statements
    // https://eslint.org/docs/rules/padding-line-between-statements
    "padding-line-between-statements": "off",

    // Disallow the use of `Math.pow` in favor of the `**` operator
    // https://eslint.org/docs/rules/prefer-exponentiation-operator
    "prefer-exponentiation-operator": "off",

    // Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead.
    // https://eslint.org/docs/rules/prefer-object-spread
    "prefer-object-spread": "error",

    // Require quotes around object literal property names
    // https://eslint.org/docs/rules/quote-props
    "quote-props": ["error","as-needed",{"keywords":true,"unnecessary":true,"numbers":false}],

    // Enforce the consistent use of either backticks, double, or single quotes
    // https://eslint.org/docs/rules/quotes
    "quotes": ["error","single",{"avoidEscape":true,"allowTemplateLiterals":false}],

    // Require or disallow semicolons instead of ASI
    // https://eslint.org/docs/rules/semi
    "semi": ["error","always"],

    // Enforce consistent spacing before and after semicolons
    // https://eslint.org/docs/rules/semi-spacing
    "semi-spacing": ["error",{"before":false,"after":true}],

    // Enforce location of semicolons
    // https://eslint.org/docs/rules/semi-style
    "semi-style": ["error","last"],

    // Require object keys to be sorted
    // https://eslint.org/docs/rules/sort-keys
    "sort-keys": "off",

    // Require variables within the same declaration block to be sorted
    // https://eslint.org/docs/rules/sort-vars
    "sort-vars": "off",

    // Enforce consistent spacing before blocks
    // https://eslint.org/docs/rules/space-before-blocks
    "space-before-blocks": ["error","always"],

    // Enforce consistent spacing before `function` definition opening parenthesis
    // https://eslint.org/docs/rules/space-before-function-paren
    "space-before-function-paren": ["error",{"anonymous":"always","named":"never","asyncArrow":"always"}],

    // Enforce consistent spacing after the `//` or `/*` in a comment
    // https://eslint.org/docs/rules/spaced-comment
    "spaced-comment": ["error","always",{"line":{"exceptions":["-","+"],"markers":["=","!"]},"block":{"exceptions":["-","+"],"markers":["=","!",":","::"],"balanced":true}}],

    // Require spacing around infix operators
    // https://eslint.org/docs/rules/space-infix-ops
    "space-infix-ops": "error",

    // Enforce consistent spacing inside parentheses
    // https://eslint.org/docs/rules/space-in-parens
    "space-in-parens": ["error","never"],

    // Enforce consistent spacing before or after unary operators
    // https://eslint.org/docs/rules/space-unary-ops
    "space-unary-ops": ["error",{"words":true,"nonwords":false,"overrides":{}}],

    // Enforce spacing around colons of switch statements
    // https://eslint.org/docs/rules/switch-colon-spacing
    "switch-colon-spacing": ["error",{"after":true,"before":false}],

    // Require or disallow spacing between template tags and their literals
    // https://eslint.org/docs/rules/template-tag-spacing
    "template-tag-spacing": ["error","never"],

    // Require or disallow Unicode byte order mark (BOM)
    // https://eslint.org/docs/rules/unicode-bom
    "unicode-bom": ["error","never"],

    // Require parenthesis around regex literals
    // https://eslint.org/docs/rules/wrap-regex
    "wrap-regex": "off",

    // Require or disallow initialization in variable declarations
    // https://eslint.org/docs/rules/init-declarations
    "init-declarations": "off",

    // Disallow deleting variables
    // https://eslint.org/docs/rules/no-delete-var
    "no-delete-var": "error",

    // Disallow labels that share a name with a variable
    // https://eslint.org/docs/rules/no-label-var
    "no-label-var": "error",

    // Disallow specified global variables
    // https://eslint.org/docs/rules/no-restricted-globals
    "no-restricted-globals": ["error","isFinite","isNaN"],

    // Disallow variable declarations from shadowing variables declared in the outer scope
    // https://eslint.org/docs/rules/no-shadow
    "no-shadow": "error",

    // Disallow identifiers from shadowing restricted names
    // https://eslint.org/docs/rules/no-shadow-restricted-names
    "no-shadow-restricted-names": "error",

    // Disallow the use of undeclared variables unless mentioned in `/*global */` comments
    // https://eslint.org/docs/rules/no-undef
    "no-undef": "error",

    // Disallow the use of `undefined` as an identifier
    // https://eslint.org/docs/rules/no-undefined
    "no-undefined": "error",

    // Disallow initializing variables to `undefined`
    // https://eslint.org/docs/rules/no-undef-init
    "no-undef-init": "error",

    // Disallow unused variables
    // https://eslint.org/docs/rules/no-unused-vars
    "no-unused-vars": ["off",{"vars":"all","args":"none","ignoreRestSiblings":true}],

    // Disallow the use of variables before they are defined
    // https://eslint.org/docs/rules/no-use-before-define
    "no-use-before-define": ["error",{"functions":false,"classes":true,"variables":true}]
  }
}