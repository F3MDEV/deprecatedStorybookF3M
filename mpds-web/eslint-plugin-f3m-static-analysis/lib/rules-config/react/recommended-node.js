// ESLint plugin (eslint-plugin-node) rules
module.exports = { 
    plugins: ["node"],
    rules: {
    // Disallow deprecated APIs
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-deprecated-api.md
    "node/no-deprecated-api": "error",

    // Ensure Node.js-style error-first callback pattern is followed
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-callback-literal.md
    "node/no-callback-literal": "off",

    // Disallow the assignment to exports
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-exports-assign.md
    "node/no-exports-assign": "off",

    // Disallow import declarations which import extraneous modules
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-extraneous-import.md
    "node/no-extraneous-import": "off",

    // Disallow require() expressions which import extraneous modules
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-extraneous-require.md
    "node/no-extraneous-require": "off",

    // Disallow import declarations which import non-existence modules
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-missing-import.md
    "node/no-missing-import": "off",

    // Disallow require() expressions which import non-existence modules
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-missing-require.md
    "node/no-missing-require": "off",

    // Disallow bin files that npm ignores
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-bin.md
    "node/no-unpublished-bin": "off",

    // Disallow import declarations which import private modules
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-import.md
    "node/no-unpublished-import": "off",

    // Disallow require() expressions which import private modules
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-require.md
    "node/no-unpublished-require": "off",

    // Disallow unsupported ECMAScript built-ins on the specified version
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unsupported-features/es-builtins.md
    "node/no-unsupported-features/es-builtins": "off",

    // Disallow unsupported ECMAScript syntax on the specified version
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unsupported-features/es-syntax.md
    "node/no-unsupported-features/es-syntax": "off",

    // Disallow unsupported Node.js built-in APIs on the specified version
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unsupported-features/node-builtins.md
    "node/no-unsupported-features/node-builtins": "off",

    // Make process.exit() expressions the same code path as throw
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/process-exit-as-throw.md
    "node/process-exit-as-throw": "error",

    // Suggest correct usage of shebang
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/shebang.md
    "node/shebang": "off",

    // Enforce either module.exports or exports
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/exports-style.md
    "node/exports-style": "off",

    // Enforce the style of file extensions in import declarations
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/file-extension-in-import.md
    "node/file-extension-in-import": "off",

    // Enforce either Buffer or require("buffer").Buffer
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/buffer.md
    "node/prefer-global/buffer": "off",

    // Enforce either console or require("console")
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/console.md
    "node/prefer-global/console": "off",

    // Enforce either process or require("process")
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/process.md
    "node/prefer-global/process": "off",

    // Enforce either TextDecoder or require("util").TextDecoder
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/text-decoder.md
    "node/prefer-global/text-decoder": "off",

    // Enforce either TextEncoder or require("util").TextEncoder
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/text-encoder.md
    "node/prefer-global/text-encoder": "off",

    // Enforce either URL or require("url").URL
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/url.md
    "node/prefer-global/url": "off",

    // Enforce either URLSearchParams or require("url").URLSearchParams
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-global/url-search-params.md
    "node/prefer-global/url-search-params": "off",

    // Enforce require("dns").promises
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-promises/dns.md
    "node/prefer-promises/dns": "off",

    // Enforce require("fs").promises
    // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/prefer-promises/fs.md
    "node/prefer-promises/fs": "off"

}}