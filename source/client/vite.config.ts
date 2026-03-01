//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import fs from 'fs';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  'build': {
    'outDir': 'dist',
    'sourcemap': true
  },
  'plugins': [
    react({
      'babel': {
        'plugins': [
          '@emotion'
        ]
      },
      'jsxImportSource': '@emotion/react'
    })
  ],
  'server': {
    'https': {
      'cert': fs.readFileSync('./cert/localhost.crt'),
      'key': fs.readFileSync('./cert/localhost.key')
    },
    'proxy': {
      '/api': {
        'changeOrigin': true,
        'secure': false,
        'target': 'http://localhost:3978'
      }
    }
  }
});
