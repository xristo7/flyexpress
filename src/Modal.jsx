import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

const modalStack = [];

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function isTopModal(id) {
  return modalStack.at(-1) === id;
}

function removeFromStack(id) {
  const index = modalStack.lastIndexOf(id);
  if (index !== -1) modalStack.splice(index, 1);
}

function getFocusableElements(dialog) {
  return [...dialog.querySelectorAll(focusableSelector)].filter(
    (element) =>
      !element.hidden &&
      element.getAttribute('aria-hidden') !== 'true' &&
      !element.closest('[inert]'),
  );
}

export function Modal({ open, title, onClose, children, size = 'sheet' }) {
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const modalIdRef = useRef(Symbol('modal'));
  const onCloseRef = useRef(onClose);
  const titleId = `${useId()}-title`;

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    const modalId = modalIdRef.current;
    openerRef.current = document.activeElement;
    removeFromStack(modalId);
    modalStack.push(modalId);

    const focusFrame = window.requestAnimationFrame(() => {
      if (!isTopModal(modalId)) return;
      const dialog = dialogRef.current;
      const initialTarget =
        dialog?.querySelector('[data-modal-initial-focus]') ??
        (dialog ? getFocusableElements(dialog)[0] : null) ??
        dialog;
      initialTarget?.focus();
    });

    function handleEscape(event) {
      if (event.key !== 'Escape' || !isTopModal(modalId)) return;
      event.preventDefault();
      event.stopPropagation();
      onCloseRef.current?.();
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleEscape);
      removeFromStack(modalId);

      const opener = openerRef.current;
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, [open]);

  if (!open) return null;

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget && isTopModal(modalIdRef.current)) {
      onCloseRef.current?.();
    }
  }

  function handleDialogKeyDown(event) {
    if (event.key !== 'Tab' || !isTopModal(modalIdRef.current)) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableElements = getFocusableElements(dialog);
    if (focusableElements.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements.at(-1);
    const activeElement = document.activeElement;
    const focusIsOutside = !dialog.contains(activeElement);

    if (event.shiftKey && (activeElement === first || focusIsOutside)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (activeElement === last || focusIsOutside)) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      className="modal-backdrop"
      data-modal-size={size}
      onClick={handleBackdropClick}
    >
      <section
        ref={dialogRef}
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
      >
        <header className="modal__header">
          <h2 id={titleId}>{title}</h2>
          <button
            className="modal__close"
            type="button"
            aria-label="Close dialog"
            onClick={() => onCloseRef.current?.()}
          >
            <X aria-hidden="true" />
          </button>
        </header>
        <div className="modal__body">{children}</div>
      </section>
    </div>
  );
}
