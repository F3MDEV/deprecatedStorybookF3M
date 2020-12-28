// ESLint plugin (eslint-plugin-import) rules
module.exports = {
  plugins: ["import"],
  rules: {
    // Ensure a default export is present, given a default import.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/default.md
    "import/default": "off",

    // Enforce a leading comment with the webpackChunkName for dynamic imports.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/dynamic-import-chunkname.md
    "import/dynamic-import-chunkname": ["off",{"importFunctions":[],"webpackChunknameFormat":"[0-9a-zA-Z-_/.]+"}],

    // Report any invalid exports, i.e. re-export of the same name.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/export.md
    "import/export": "error",

    // Ensure all exports appear after other statements.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/exports-last.md
    "import/exports-last": "off",

    // Ensure consistent use of file extension within the import path.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/extensions.md
    "import/extensions": ["off","ignorePackages",{"js":"never","mjs":"never","jsx":"never"}],

    // Ensure all imports appear before other statements.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/first.md
    "import/first": "error",

    // Prefer named exports to be grouped together in a single export declaration.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/group-exports.md
    "import/group-exports": "off",

    // Limit the maximum number of dependencies a module can have.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/max-dependencies.md
    "import/max-dependencies": ["off",{"max":10}],

    // Ensure named imports correspond to a named export in the remote file.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/named.md
    "import/named": "error",

    // Ensure imported namespaces contain dereferenced properties as they are dereferenced.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/namespace.md
    "import/namespace": "off",

    // Enforce a newline after import statements.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/newline-after-import.md
    "import/newline-after-import": "error",

    // Forbid import of modules using absolute paths
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-absolute-path.md
    "import/no-absolute-path": ["error",{"esmodule":true,"commonjs":true,"amd":false}],

    // Report AMD `require` and `define` calls.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-amd.md
    "import/no-amd": "error",

    // Forbid anonymous values as default exports.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-anonymous-default-export.md
    "import/no-anonymous-default-export": ["off",{"allowArray":false,"allowArrowFunction":false,"allowAnonymousClass":false,"allowAnonymousFunction":false,"allowLiteral":false,"allowObject":false}],

    // Report CommonJS require `calls` and `module.exports` or `exports.*`.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-commonjs.md
    "import/no-commonjs": "off",

    // Forbid a module from importing a module with a dependency path back to itself.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-cycle.md
    "import/no-cycle": ["error",{"maxDepth":3}],

    // Forbid default exports.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-default-export.md
    "import/no-default-export": "off",

    // Report imported names marked with `@deprecated` documentation tag
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-deprecated.md
    "import/no-deprecated": "off",

    // Report repeated import of the same module in multiple places
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-duplicates.md
    "import/no-duplicates": "error",

    // Forbid `require()` calls with expressions.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-dynamic-require.md
    "import/no-dynamic-require": "error",

    // Forbid the use of extraneous packages.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-extraneous-dependencies.md
    "import/no-extraneous-dependencies": ["error",{"devDependencies":["test/**","tests/**","spec/**","**/__tests__/**","**/__mocks__/**","test.{js,jsx}","test-*.{js,jsx}","**/*{.,_}{test,spec}.{js,jsx}","**/jest.config.js","**/jest.setup.js","**/vue.config.js","**/webpack.config.js","**/webpack.config.*.js","**/rollup.config.js","**/rollup.config.*.js","**/gulpfile.js","**/gulpfile.*.js","**/Gruntfile{,.js}","**/protractor.conf.js","**/protractor.conf.*.js"],"optionalDependencies":false}],

    // Prevent importing the submodules of other modules.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-internal-modules.md
    "import/no-internal-modules": ["off",{"allow":[]}],

    // Forbid the use of mutable exports with `var` or `let`.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-mutable-exports.md
    "import/no-mutable-exports": "error",

    // Report use of exported name as identifier of default export
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-named-as-default.md
    "import/no-named-as-default": "error",

    // Report use of exported name as property of default export.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-named-as-default-member.md
    "import/no-named-as-default-member": "error",

    // Forbid named default exports.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-named-default.md
    "import/no-named-default": "error",

    // Forbid named exports.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-named-export.md
    "import/no-named-export": "off",

    // Forbid namespace (a.k.a. "wildcard" `*`) imports.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-namespace.md
    "import/no-namespace": "off",

    // No Node.js builtin modules.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-nodejs-modules.md
    "import/no-nodejs-modules": "off",

    // Forbid importing modules from parent directories.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-relative-parent-imports.md
    "import/no-relative-parent-imports": "off",

    // Restrict which files can be imported in a given folder.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-restricted-paths.md
    "import/no-restricted-paths": "off",

    // Forbid a module from importing itself.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-self-import.md
    "import/no-self-import": "error",

    // Forbid unassigned imports.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-unassigned-import.md
    "import/no-unassigned-import": "off",

    // Ensure imports point to a file/module that can be resolved.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-unresolved.md
    "import/no-unresolved": ["off",{"commonjs":true,"caseSensitive":true}],

    // Report modules without exports, or exports without matching import in another module.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-unused-modules.md
    "import/no-unused-modules": ["off",{"ignoreExports":[],"missingExports":true,"unusedExports":true}],

    // Prevent unnecessary path segments in import and require statements.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-useless-path-segments.md
    "import/no-useless-path-segments": "error",

    // Forbid webpack loader syntax in imports.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/no-webpack-loader-syntax.md
    "import/no-webpack-loader-syntax": "error",

    // Enforce a convention in module import.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/order.md
    "import/order": "off",

    // Prefer a default export if module exports a single name.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/prefer-default-export.md
    "import/prefer-default-export": "off",

    // Report potentially ambiguous parse goal.
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules/unambiguous.md
    "import/unambiguous": "off"
}}