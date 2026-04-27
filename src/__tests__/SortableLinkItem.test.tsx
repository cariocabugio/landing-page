// src/__tests__/SortableLinkItem.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortableLinkItem } from '@/components/SortableLinkItem';

// 1. MOCK (Falsificação): Enganamos o Jest para ele não processar o drag and drop real
jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: undefined,
    isDragging: false,
  }),
}));

// Mock da entidade LinkData para preencher as props
const mockLinkData = {
  id: 'link_123',
  title: 'Página de Vendas',
  url: 'https://meu-saas.com/oferta',
  clicks: 150,
  icon: '🔥',
  order: 0,
  isActive: true,
  userId: 'user_123',
  createdAt: new Date(),
  updatedAt: new Date(),
  type: 'link', // Correção TypeScript: Propriedade obrigatória da interface LinkData
};

describe('Componente SortableLinkItem', () => {
  // Criamos "espiões" (Spies) para saber se as funções foram chamadas
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    // Limpamos o histórico dos espiões antes de cada teste
    jest.clearAllMocks();
  });

  it('deve renderizar os dados do link corretamente no estado Normal', () => {
    render(
      <SortableLinkItem
        link={mockLinkData as any} // Type assertion seguro para testes
        index={0}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        editingIndex={null} // null significa que não está sendo editado
      />
    );

    // Assertivas de interface
    expect(screen.getByText('Página de Vendas')).toBeInTheDocument();
    expect(screen.getByText('https://meu-saas.com/oferta')).toBeInTheDocument();
    expect(screen.getByText('150 cliques')).toBeInTheDocument();
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('deve renderizar apenas o esqueleto visual no estado de Edição', () => {
    render(
      <SortableLinkItem
        link={mockLinkData as any}
        index={0}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        editingIndex={0} // editingIndex igual ao index (0) liga o modo de edição
      />
    );

    // Verifica se o aviso de edição apareceu
    expect(screen.getByText('Editando')).toBeInTheDocument();
    
    // Verifica se o título original sumiu (já que o container é substituído)
    expect(screen.queryByText('Página de Vendas')).not.toBeInTheDocument();
  });

  it('deve disparar os eventos onEdit e onDelete ao interagir com os botões', () => {
    render(
      <SortableLinkItem
        link={mockLinkData as any}
        index={0}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        editingIndex={null}
      />
    );

    // Capturamos os botões na DOM
    const editButton = screen.getByRole('button', { name: /editar/i });
    const deleteButton = screen.getByRole('button', { name: /excluir/i });

    // Simulamos o clique humano
    fireEvent.click(editButton);
    fireEvent.click(deleteButton);

    // Validamos se o componente pai recebeu o "aviso" do clique
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});