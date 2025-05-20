const typescriptParser = require('@typescript-eslint/parser');
const n8nNodesBasePlugin = require('eslint-plugin-n8n-nodes-base');

module.exports = [
  // Global ignores
  {
    ignores: ['.eslintrc.js', '**/*.js', '**/node_modules/**', '**/dist/**']
  },

  // TypeScript files configuration
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        // Node.js globals
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },


  // Credentials configuration
  {
    files: ['./src/credentials/**/*.ts'],
    plugins: {
      'n8n-nodes-base': n8nNodesBasePlugin,
    },
    rules: {
      'n8n-nodes-base/cred-class-field-documentation-url-missing': 'off',
      'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
    },
  },

  // Nodes configuration
  {
    files: ['./src/nodes/**/*.ts'],
    plugins: {
      'n8n-nodes-base': n8nNodesBasePlugin,
    },
    rules: {
      'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'off',
      'n8n-nodes-base/node-resource-description-filename-against-convention': 'off',
      'n8n-nodes-base/node-param-fixed-collection-type-unsorted-items': 'off',
    },
  },
];
