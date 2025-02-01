module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [ "error", 2 ],
        "strict": [ "error", "safe" ],
        "quotes": [ "error", "single" ],
        //"semi": [ "error", "never" ],

        "accessor-pairs": "error",
        "array-bracket-spacing": ["error", "always"],
        "arrow-body-style": "error",
        "arrow-parens": ["error", "as-needed"],
        "arrow-spacing": "error",
        "block-spacing": ["error", "always"],
        "comma-dangle": [
            "error",
            "only-multiline"
        ],
        "comma-spacing": "error",
        "computed-property-spacing": [
            "error",
            "never"
        ],
        "generator-star-spacing": "error",
        "id-blacklist": "error",
        "id-match": "error",
        "jsx-quotes": "error",
        "keyword-spacing": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-alert": "error",
        "no-caller": "error",
        "no-confusing-arrow": "error",
        "no-console": "off",
        "no-div-regex": "error",
        "no-duplicate-imports": "error",
        "no-extend-native": "error",
        "no-extra-label": "error",
        "no-fallthrough": "off",
        "no-floating-decimal": "error",
        "no-implicit-coercion": [
            "error",
            {
                "boolean": false,
                "number": false,
                "string": false
            }
        ],
        "no-inner-declarations": [
            "error",
            "functions"
        ],
        "no-iterator": "error",
        "no-label-var": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-multi-str": "error",
        "no-new-object": "error",
        "no-new-require": "error",
        "no-new-wrappers": "error",
        "no-restricted-globals": "error",
        "no-restricted-imports": "error",
        "no-restricted-modules": "error",
        "no-restricted-syntax": "error",
        "no-script-url": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-shadow-restricted-names": "error",
        "no-spaced-func": "error",
        "no-trailing-spaces": "error",
        "no-unmodified-loop-condition": "error",
        "no-useless-constructor": "error",
        "no-whitespace-before-property": "error",
        "no-with": "error",
        "object-curly-spacing": ["error", "always"],
        "prefer-const": "error",
        "require-yield": "error",
        "semi-spacing": ["error"],
        "sort-imports": "error",
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        "template-curly-spacing": "error",
        "wrap-iife": [
            "error",
            "any"
        ],
        "yield-star-spacing": "error",
    }
};
