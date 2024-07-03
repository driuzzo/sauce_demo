import globals from 'globals';
import pluginJs from '@eslint/js';
import cypressPlugin from 'eslint-plugin-cypress';

export default [
  { 
    languageOptions: { 
      globals: globals.browser 
    }
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      cypress: cypressPlugin
    },
    env: {
      'cypress/globals': true
    },
    extends: [
      'plugin:cypress/recommended'
    ]
  }
];
