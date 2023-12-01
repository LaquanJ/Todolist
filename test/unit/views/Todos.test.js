import React from 'react';
import '@testing-library/jest-dom';
import { render, act, screen, fireEvent } from '@testing-library/react';

import Todos from '@views/Todos';

describe('Todos View', () => {
  it('Should render Todos view', async () => {
    await act(async () => {
      render(<Todos />);
    });

    const header = screen.getByTestId('todos-header');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Todos');
  });

  // TODO: Should add todo
  it('should add todo', async () => {
    await act(async () => {
      render(<Todos />);
    });

    const btn = screen.getByTestId('add-todo-button');
    const nameInput = screen.getByTestId('todo-name-input');
    const descriptionInput = screen.getByTestId('todo-description-input');

    expect(btn).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    expect(nameInput.value).toBe('');
    expect(descriptionInput.value).toBe('');

    fireEvent.change(nameInput, { target: { value: 'Stupid ToDo Name' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Stupid ToDo Description' },
    });

    expect(nameInput.value).toBe('Stupid ToDo Name');
    expect(descriptionInput.value).toBe('Stupid ToDo Description');

    fireEvent.click(btn);
  });
});
