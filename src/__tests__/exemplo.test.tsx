// src/__tests__/exemplo.test.tsx
import '@testing-library/jest-dom';

describe('Ambiente de Testes (Jest)', () => {
  it('deve somar 1 + 1 e retornar 2 (Teste de Sanidade)', () => {
    expect(1 + 1).toBe(2);
  });
});