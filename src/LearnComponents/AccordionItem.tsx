import type { Ref } from "react";

type AccordionItemProps = {
  children: React.ReactNode;
  id: string;
  isOpen: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onToggle: (id: string) => void;
  ref: Ref<HTMLButtonElement>;
  title: string;
};

const AccordionItem = ({
  children,
  id,
  isOpen,
  onKeyDown,
  onToggle,
  ref,
  title,
}: AccordionItemProps) => {
  const accordionPanelId = `panel-${id}`;
  const accordionHeaderId = `trigger-${id}`;

  return (
    <div className="border p-4">
      <h4>
        <button
          aria-controls={accordionPanelId}
          aria-expanded={isOpen}
          id={accordionHeaderId}
          onClick={() => onToggle(id)}
          onKeyDown={onKeyDown}
          ref={ref}
          className="flex justify-between w-full"
        >
          <span>{title}</span>
          <span aria-hidden="true">{isOpen ? "-" : "+"}</span>
        </button>
      </h4>
      <div
        id={accordionPanelId}
        aria-labelledby={accordionHeaderId}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;
