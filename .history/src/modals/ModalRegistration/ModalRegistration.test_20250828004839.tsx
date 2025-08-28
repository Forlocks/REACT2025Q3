import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { ModalRegistration } from './ModalRegistration';

describe('ModalRegistration', () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('не рендерится, если isOpen=false', () => {
    render(
      <ModalRegistration isOpen={false} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );
    expect(screen.queryByText('Registration')).toBeNull();
    expect(screen.queryByText('Content')).toBeNull();
  });

  it('рендерится, если isOpen=true', () => {
    render(
      <ModalRegistration isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );
    expect(screen.getByText('Registration')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('вызывает onClose при клике на кнопку закрытия', () => {
    render(
      <ModalRegistration isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );

    const closeButton = screen.getByText('✖');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('вызывает onClose при нажатии Escape', () => {
    render(
      <ModalRegistration isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClose при нажатии другой клавиши', () => {
    render(
      <ModalRegistration isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );

    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('удаляет обработчик события при размонтировании', () => {
    const { unmount } = render(
      <ModalRegistration isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );

    unmount();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
