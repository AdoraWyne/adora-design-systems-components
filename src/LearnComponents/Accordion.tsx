import { useState } from "react";
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
      {items.map(({ id, title, content }) => (
        <AccordionItem
          key={id}
          id={id}
          title={title}
          isOpen={openItems.includes(id)}
          onToggle={handleToggle}
        >
          {content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
