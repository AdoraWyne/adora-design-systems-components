import { useState, useRef } from "react";
import AccordionItem from "./AccordionItem";

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  type: "single" | "multiple";
};

const Accordion = ({ items, type }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const accordionItemRefs = useRef(new Map<number, HTMLButtonElement>());

  const register = (index: number, node: HTMLButtonElement | null) => {
    if (node) {
      accordionItemRefs.current.set(index, node);
    } else {
      accordionItemRefs.current.delete(index);
    }
  };

  const handleKeys = (index: number, e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        accordionItemRefs.current.get(index + 1)?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        accordionItemRefs.current.get(index - 1)?.focus();
        break;
      case "Home":
        accordionItemRefs.current.get(0)?.focus();
        break;
      case "End":
        accordionItemRefs.current
          .get(accordionItemRefs.current.size - 1)
          ?.focus();
        break;
    }
  };

  const handleSingleToggle = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
  };

  const handleMultipleToggle = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleToggle =
    type === "single" ? handleSingleToggle : handleMultipleToggle;

  return (
    <div>
      {items.map(({ id, title, content }, index) => (
        <AccordionItem
          id={id}
          isOpen={openItems.includes(id)}
          key={id}
          onKeyDown={(e) => handleKeys(index, e)}
          onToggle={handleToggle}
          ref={(node) => register(index, node)}
          title={title}
        >
          {content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
