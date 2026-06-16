type AccordionItemProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
};

const AccordionItem = ({
  id,
  isOpen,
  children,
  title,
  onToggle,
}: AccordionItemProps) => {
  const accordionPanelId = `panel-${id}`;
  const accordionHeaderId = `trigger-${id}`;

  return (
    <div className="border p-4">
      <h4>
        <button
          onClick={() => onToggle(id)}
          aria-expanded={isOpen}
          aria-controls={accordionPanelId}
          id={accordionHeaderId}
          className="flex justify-between w-full"
        >
          <span>{title}</span>
          <span aria-label="toggle-accordion">{isOpen ? "-" : "+"}</span>
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
