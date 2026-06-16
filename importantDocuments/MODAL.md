# Modal

**Close on ESC keydown**

```js
  useEffect(() => {
    if(!openModal) return;

    const handleESCKeyDown = (e: KeyboardEvent) => {
      if(e.key === "Escape"){
        onClose()
      }
    }

    document.addEventListeners("keydown", handleESCKeyDown)

    return () => {
      document.removeEventListeners("keydown",handleESCKeyDown)
    }
  }, [openModal, onClose])
```

**Use correct ARIA roles**

```js
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby={titleId}
  aria-describedby={descId}
>
  <h2 id="modal-title">Confirm your order</h2>
  <div id={descId}>Modal description</div>
</div>
```

- `role="dialog"` — tells screen readers "this is a modal"
- `aria-modal="true"` — tells them to ignore content behind it. Everything outside this element is inert.
- `aria-labelledby` — gives the modal a readable name
- `aria-describedby` — gives the modal a readable description of its content

6. Don't rely on colour or position alone

```js
// Bad — screen reader reads "times" or nothing
<button>×</button>

// Good
<button aria-label="Close modal">×</button>
```

7. Background content should be **inert**.

   When `inert === true`, the modal will not be reachable by assistive tools at all.

   ```js
   // Modern approach
   <div inert={isModalOpen}>...page content...</div>
   ```

---

- `(e) => e.stopPropagation()`

**Style**

- fixed inset-0
- `transition-colors ${open ? "visible bg-black/80" : "invisible"}`
- `shadow`
- `transition-all duration-500 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`
- `w-1/2`

---

# What can be improved?

- focus trap
  - `createPortal`?
- Animation could use `prefers-reduced-motion`
- flexible `className` prop for flexible sizing
- tabIndex: is allowing a non-focusable element to become focusable programmatically
  - normally <div> is not focusabled, but if we add tabIndex="-1" to it, it will able to be focused.

  ```js
  const modalRef = useRef <HTMLDivElement> null;

    useEffect(() => {

        if(openModal){
            modalRef.current?.focus()
        }

    }, [openModal])

    // Modal
    const Modal = (...) => (
        <div ref={modalRef} tabIndex="-1">...</div>
    )
  ```

## Focus trap

- Need to use `useRef`

```js
import { useEffect, useId, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onModalClose: () => void;
  modalTitle?: string;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onModalClose, children, modalTitle }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const titleId = `${autoId}-title`;
  const descriptionId = `${autoId}-description`;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onModalClose();
      }

      // -- Focus trap
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          "button, input, select, textarea, a[href], [tabIndex=0]",
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const first = focusableElements[0] as HTMLElement;
        const last = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      // ----
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onModalClose]);

  return (
    <div
      onClick={onModalClose}
      className={`fixed inset-0 flex justify-center items-center ${isOpen ? "visible bg-gray-700/50" : "invisible"}`}
    >
      {/* Modal itself */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        ref={modalRef}
        inert={!isOpen}
        onClick={(e) => e.stopPropagation()}
        className={`w-100 h-auto border p-8 bg-black transition-all duration-400 ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        {/* Modal header */}
        <div className="flex justify-between items-center">
          <div>BRAND LOGO</div>
          <button
            onClick={onModalClose}
            aria-label="close modal"
            className="hover:bg-gray-700/50 p-2"
          >
            &times;
          </button>
        </div>
        {/* Modal content */}
        <div>
          {modalTitle && <h2 id={titleId}>{modalTitle}</h2>}
          <div id={descriptionId}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

```
