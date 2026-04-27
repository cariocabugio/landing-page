import type { Config } from 'jest';
import nextJest from 'next/jest.js';

// Fornece o caminho para o seu app Next.js carregar os arquivos next.config.mjs e .env.local nos testes
const createJestConfig = nextJest({
  dir: './',
});

// Adicione qualquer configuração customizada do Jest aqui
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Executa esse arquivo antes de cada teste para carregar extensões do Testing Library
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Garante que os atalhos de importação (como @/components) funcionem nos testes
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

// Exporta a configuração dessa forma para que o Next.js possa carregar as variáveis de ambiente assíncronas
export default createJestConfig(config);