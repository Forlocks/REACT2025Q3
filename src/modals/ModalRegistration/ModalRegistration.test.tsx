import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ModalRegistration } from './ModalRegistration';

describe('ModalRegistration', () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('does not render when isOpen=false', () => {
    render(
      <ModalRegistration isOpen={false} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );
    expect(screen.queryByText('Registration')).toBeNull();
    expect(screen.queryByText('Content')).toBeNull();
  });

  it('renders when isOpen=true', () => {
    render(
      <ModalRegistration isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );
    expect(screen.getByText('Registration')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when clicking the close button', () => {
    render(
      <ModalRegistration isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );

    const closeButton = screen.getByText('✖');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when pressing Escape', () => {
    render(
      <ModalRegistration isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when pressing a different key', () => {
    render(
      <ModalRegistration isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </ModalRegistration>
    );

    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('removes the event handler on unmount', () => {
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
