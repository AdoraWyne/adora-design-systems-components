_[Claude Chat](https://claude.ai/chat/7feb9bd6-4c3b-4e9a-8e6c-55dcb9394a77)_

- Only use one accordion to handle single and multiple open.

Components:

- **Accordion**
  - attributes: N/A
  - props:
    - items / data in array
    - type: "single" | "multiple"
- **AccordionItem**
  - <h4><button>...</button></h4>
  - attributes:
    - header:
      - onClick= toggle the open items
      - aria-expanded=boolean
      - aria-controls={`panel-${id}`} - links to the panel
      - id={`trigger-${id}`} - labelled by the panel
    - panel:
      - id={`panel-${id}`} - controlled by header
      - aria-labelledby={`trigger-${id}`}
      - hidden={!isOpen}
  - props:
    - id: string;
    - title: string;
    - children: React.ReactNode;
    - isOpen: boolean;
    - onToggle: (id: string) => void;

Accessibility:
**On header**

- aria-expanded=boolean
- aria-controls={`panel-${id}`} - links to the panel
- id={`trigger-${id}`} - labelled by the panel

**On Panel**

- id={`panel-${id}`} - controlled by header
- aria-labelledby={`trigger-${id}`}

---

If pass in a element:

```js
  const Content = ({ content }: { content: string }) => <div>{content}</div>;

  return (
    <div>
      {items.map(({ id, title, content }) => {
        return (
          <AccordionItem
            key={id}
            id={id}
            title={title}
            isOpen={openItems.includes(id)}
            onToggle={handleToggle}
          >
            <Content content={content} />
          </AccordionItem>
        );
      })}
    </div>
  );
```
