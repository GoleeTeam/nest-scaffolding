import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        ignores: ['**/.eslint.config.mjs'],
    },
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },

            ecmaVersion: 12,
            sourceType: 'module',

            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: './',
            },
        },

        rules: {
            'dot-notation': 'off',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',

            'prettier/prettier': 'warn',
            eqeqeq: 'warn',
            'prefer-const': 'warn',
            'require-await': 'warn',
            camelcase: [
                'warn',
                {
                    ignoreDestructuring: true,
                    ignoreImports: true,
                    ignoreGlobals: true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',

            '@typescript-eslint/no-var-requires': 'error',
            'no-self-compare': 'error',
            'default-case': 'error',
            'no-console': 'error',
        },
    },
];
