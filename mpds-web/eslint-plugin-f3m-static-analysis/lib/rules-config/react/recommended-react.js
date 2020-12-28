// ESLint plugin (eslint-plugin-react) rules
module.exports = {
  plugins: ["react"],
  rules: {
    //  Enforce all defaultProps are defined and not "required" in propTypes.
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/default-props-match-prop-types.md
    "react/default-props-match-prop-types": "off",
    
    //  Forbid certain propTypes
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/forbid-prop-types.md
    "react/forbid-prop-types": "off",
    
    //  Limit maximum of props on a single line in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-max-props-per-line.md
    "react/jsx-max-props-per-line": ["error",{"maximum":1,"when":"multiline"}],
    
    //  Enforce default props alphabetical sorting
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-sort-default-props.md
    "react/jsx-sort-default-props": "off",
    
    //  Prevent definitions of unused prop types
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-unused-prop-types.md
    "react/no-unused-prop-types": ["error",{"customValidators":[],"skipShapeProps":true}],
    
    //  Prevent missing props validation in a React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/prop-types.md
    "react/prop-types": ["error",{"ignore":[],"customValidators":[],"skipUndeclared":false}],
    
    //  Enforces consistent naming for boolean props
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/boolean-prop-naming.md
    "react/boolean-prop-naming": "off",
    
    //  Forbid "button" element without an explicit "type" attribute
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/button-has-type.md
    "react/button-has-type": ["error",{"button":true,"submit":true,"reset":false}],
    
    //  Enforce consistent usage of destructuring assignment of props, state, and context
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    
    //  Prevent missing displayName in a React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/display-name.md
    "react/display-name": "off",
    
    //  Forbid certain props on components
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/forbid-component-props.md
    "react/forbid-component-props": "off",
    
    //  Forbid certain props on DOM Nodes
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/forbid-dom-props.md
    "react/forbid-dom-props": "off",
    
    //  Forbid certain elements
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/forbid-elements.md
    "react/forbid-elements": "off",
    
    //  Forbid using another component"s propTypes
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/forbid-foreign-prop-types.md
    "react/forbid-foreign-prop-types": "warn",
    
    //  Standardize the way function component get defined
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/function-component-definition.md
    "react/function-component-definition": "off",
    
    //  Enforce boolean attributes notation in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-boolean-value.md
    "react/jsx-boolean-value": "off",
    
    //  Ensures inline tags are not rendered without spaces between them
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-child-element-spacing.md
    "react/jsx-child-element-spacing": "off",
    
    //  Validate closing bracket location in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-closing-bracket-location.md
    "react/jsx-closing-bracket-location": ["error","line-aligned"],
    
    //  Validate closing tag location for multiline JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-closing-tag-location.md
    "react/jsx-closing-tag-location": "error",
    
    //  Disallow unnecessary JSX expressions when literals alone are sufficient or enfore JSX expressions on literals in JSX children or attributes
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-curly-brace-presence.md
    "react/jsx-curly-brace-presence": ["error",{"props":"never","children":"never"}],
    
    //  enforce consistent line breaks inside jsx curly
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-curly-newline.md
    "react/jsx-curly-newline": ["error",{"multiline":"consistent","singleline":"consistent"}],
    
    //  Enforce or disallow spaces inside of curly braces in JSX attributes
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-curly-spacing.md
    "react/jsx-curly-spacing": ["error","never",{"allowMultiline":true}],
    
    //  Disallow or enforce spaces around equal signs in JSX attributes
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-equals-spacing.md
    "react/jsx-equals-spacing": ["error","never"],
    
    //  Restrict file extensions that may contain JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-filename-extension.md
    "react/jsx-filename-extension": ["off",{"extensions":[".js", ".jsx", "tsx"]}],
    
    //  Ensure proper position of the first property in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-first-prop-new-line.md
    "react/jsx-first-prop-new-line": ["error","multiline-multiprop"],
    
    //  Enforce shorthand or standard form for React fragments
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-fragments.md
    "react/jsx-fragments": ["error","syntax"],
    
    //  Enforce event handler naming conventions in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-handler-names.md
    "react/jsx-handler-names": ["warn", {"eventHandlerPrefix": "handle", "eventHandlerPropPrefix": "on", "checkLocalVariables": false }],
    
    //  Validate JSX indentation
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-indent.md
    "react/jsx-indent": ["error", 2, {"checkAttributes": true, "indentLogicalExpressions": true}],
    
    //  Validate props indentation in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-indent-props.md
    "react/jsx-indent-props": "off",
    
    //  Report missing key props in iterators/collection literals
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-key.md
    "react/jsx-key": "warn",
    
    //  Validate JSX maximum depth
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-max-depth.md
    "react/jsx-max-depth": "off",
    
    //  Prevents usage of Function.prototype.bind and arrow functions in React component props
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-no-bind.md
    "react/jsx-no-bind": ["error",{"ignoreRefs":true,"allowArrowFunctions":true,"allowFunctions":false,"allowBind":false,"ignoreDOMComponents":true}],
    
    //  Comments inside children section of tag should be placed inside braces
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-no-comment-textnodes.md
    "react/jsx-no-comment-textnodes": "error",
    
    //  Enforce no duplicate props
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-no-duplicate-props.md
    "react/jsx-no-duplicate-props": ["error",{"ignoreCase":true}],
    
    //  Prevent using string literals in React component definition
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-no-literals.md
    "react/jsx-no-literals": "off",
    
    //  Forbid javascript: URLs
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-no-script-url.md
    "react/jsx-no-script-url": "error",
    
    //  Forbid target="_blank" attribute without rel="noopener noreferrer"
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-no-target-blank.md
    "react/jsx-no-target-blank": "off",
    
    //  Disallow undeclared variables in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-no-undef.md
    "react/jsx-no-undef": "error",
    
    //  Disallow unnecessary fragments
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-no-useless-fragment.md
    "react/jsx-no-useless-fragment": "error",
    
    //  Limit to one expression per line in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-one-expression-per-line.md
    "react/jsx-one-expression-per-line": ["error",{"allow":"single-child"}],
    
    //  Enforce PascalCase for user-defined JSX components
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-pascal-case.md
    "react/jsx-pascal-case": ["error", { "allowAllCaps": false, "ignore": [] }],
    
    //  Disallow multiple spaces between inline JSX props
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-props-no-multi-spaces.md
    "react/jsx-props-no-multi-spaces": "error",
    
    //  Prevent JSX prop spreading
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-props-no-spreading.md
    "react/jsx-props-no-spreading": ["warn", { "html": "enforce", "custom": "enforce", "explicitSpread": "enforce", "exceptions": [] }],
    
    //  Enforce props alphabetical sorting
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-sort-props.md
    "react/jsx-sort-props": "off",
    
    //  Validate spacing before closing bracket in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-space-before-closing.md
    "react/jsx-space-before-closing": ["error","always"],
    
    //  Validate whitespace in and around the JSX opening and closing brackets
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-tag-spacing.md
    "react/jsx-tag-spacing": ["error", {  "closingSlash": "never",  "beforeSelfClosing": "always",  "afterOpening": "never",  "beforeClosing": "allow" }],
    
    //  Prevent React to be marked as unused
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-uses-react.md
    "react/jsx-uses-react": "error",
    
    //  Prevent variables used in JSX to be marked as unused
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-uses-vars.md
    "react/jsx-uses-vars": "error",
    
    //  Prevent missing parentheses around multilines JSX (fixable)
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/jsx-wrap-multilines.md
    "react/jsx-wrap-multilines": ["error",{"declaration":"parens-new-line","assignment":"parens-new-line","return":"parens-new-line","arrow":"parens-new-line","condition":"parens-new-line","logical":"parens-new-line","prop":"parens-new-line"}],
    
    //  Reports when this.state is accessed within setState
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-access-state-in-setstate.md
    "react/no-access-state-in-setstate": "warn",
    
    //  Prevent adjacent inline elements not separated by whitespace.
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-adjacent-inline-elements.md
    "react/no-adjacent-inline-elements": "error",
    
    //  Prevent usage of Array index in keys
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-array-index-key.md
    "react/no-array-index-key": "warn",
    
    //  Prevent passing of children as props.
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-children-prop.md
    "react/no-children-prop": "error",
    
    //  Prevent usage of dangerous JSX props
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-danger.md
    "react/no-danger": "error",
    
    //  Report when a DOM element is using both children and dangerouslySetInnerHTML
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-danger-with-children.md
    "react/no-danger-with-children": "error",
    
    //  Prevent usage of deprecated methods
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-deprecated.md
    "react/no-deprecated": "warn",
    
    //  Prevent usage of setState in componentDidMount
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-did-mount-set-state.md
    "react/no-did-mount-set-state": "off",
    
    //  Prevent usage of setState in componentDidUpdate
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-did-update-set-state.md
    "react/no-did-update-set-state": "off",
    
    //  Prevent direct mutation of this.state
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-direct-mutation-state.md
    "react/no-direct-mutation-state": "error",
    
    //  Prevent usage of findDOMNode
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-find-dom-node.md
    "react/no-find-dom-node": "error",
    
    //  Prevent usage of isMounted
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-is-mounted.md
    "react/no-is-mounted": "error",
    
    //  Prevent multiple component definition per file
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-multi-comp.md
    "react/no-multi-comp": "off",
    
    //  Flag shouldComponentUpdate when extending PureComponent
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-redundant-should-component-update.md
    "react/no-redundant-should-component-update": "error",
    
    //  Prevent usage of the return value of React.render
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-render-return-value.md
    "react/no-render-return-value": "error",
    
    //  Prevent usage of setState
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-set-state.md
    "react/no-set-state": "off",
    
    //  Prevent string definitions for references and prevent referencing this.refs
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-string-refs.md
    "react/no-string-refs": "error",
    
    //  Report "this" being used in stateless components
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-this-in-sfc.md
    "react/no-this-in-sfc": "error",
    
    //  Prevent common typos
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-typos.md
    "react/no-typos": "error",
    
    //  Detect unescaped HTML entities, which might represent malformed tags
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-unescaped-entities.md
    "react/no-unescaped-entities": "error",
    
    //  Prevent usage of unknown DOM property
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-unknown-property.md
    "react/no-unknown-property": "error",
    
    //  Prevent usage of unsafe lifecycle methods
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-unsafe.md
    "react/no-unsafe": "off",
    
    //  Prevent definition of unused state fields
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-unused-state.md
    "react/no-unused-state": "warn",
    
    //  Prevent usage of setState in componentWillUpdate
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/no-will-update-set-state.md
    "react/no-will-update-set-state": "error",
    
    //  Enforce ES5 or ES6 class for React Components
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/prefer-es6-class.md
    "react/prefer-es6-class": ["error","always"],
    
    //  Require read-only props.
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/prefer-read-only-props.md
    "react/prefer-read-only-props": "off",
    
    //  Enforce stateless components to be written as a pure function
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/prefer-stateless-function.md
    "react/prefer-stateless-function": ["error",{"ignorePureComponents":true}],
    
    //  Prevent missing React when using JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/react-in-jsx-scope.md
    "react/react-in-jsx-scope": "error",
    
    //  Enforce a defaultProps definition for every prop that is not a required prop.
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/require-default-props.md
    "react/require-default-props": "error",
    
    //  Enforce React components to have a shouldComponentUpdate method
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/require-optimization.md
    "react/require-optimization": "off",
    
    //  Enforce ES5 or ES6 class for returning value in render function
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/require-render-return.md
    "react/require-render-return": "error",
    
    //  Prevent extra closing tags for components without children
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/self-closing-comp.md
    "react/self-closing-comp": ["error", { "component": true,  "html": true }],
    
    //  Enforce component methods order
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/sort-comp.md
    "react/sort-comp": ["error",{"order":["static-methods","instance-variables","lifecycle","/^on.+$/","getters","setters","/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/","instance-methods","everything-else","rendering"],"groups":{"lifecycle":["displayName","propTypes","contextTypes","childContextTypes","mixins","statics","defaultProps","constructor","getDefaultProps","getInitialState","state","getChildContext","getDerivedStateFromProps","componentWillMount","UNSAFE_componentWillMount","componentDidMount","componentWillReceiveProps","UNSAFE_componentWillReceiveProps","shouldComponentUpdate","componentWillUpdate","UNSAFE_componentWillUpdate","getSnapshotBeforeUpdate","componentDidUpdate","componentDidCatch","componentWillUnmount","componentDidCatch"],"rendering":["/^render.+$/","render"]}}],
    
    //  Enforce propTypes declarations alphabetical sorting
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/sort-prop-types.md
    "react/sort-prop-types": "off",
    
    //  State initialization in an ES6 class component should be in a constructor
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/state-in-constructor.md
    "react/state-in-constructor": ["error","always"],
    
    //  Defines where React component static properties should be positioned.
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/static-property-placement.md
    "react/static-property-placement": "off",
    
    //  Enforce style prop value is an object
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/style-prop-object.md
    "react/style-prop-object": "error",
    
    //  Prevent passing of children to void DOM elements (e.g. <br />).
    // https://github.com/yannickcr/eslint-plugin-react/blob/b517b9eb13ed1c0895d1343427986122465793b5/docs/rules/void-dom-elements-no-children.md
    "react/void-dom-elements-no-children": "error"
    
}}