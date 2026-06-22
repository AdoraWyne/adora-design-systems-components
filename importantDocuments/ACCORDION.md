_[Claude Chat](https://claude.ai/chat/7feb9bd6-4c3b-4e9a-8e6c-55dcb9394a77)_ ✅

- [Accordion Pattern in ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

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
      - aria-hidden="true" - the logo showing open/close accordion only for visual decoration
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
- aria-hidden="true" on the logo showing open or close

**On Panel**

- id={`panel-${id}`} - controlled by header
- aria-labelledby={`trigger-${id}`}
- role="region" - avoid using this when contains more than about 6 panels.

---

If pass in as an element:

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

---

# Navigate with keyboard: ArrowDown, ArrowUp

**useRef**

- Keyboard navigation needs `.focus()` on a specific DOM node, which is a browser behaviour not React.
- To call `.focus()`, you need a direct reference to that DOM node.
- When this specific DOM changes, we dont want to trigger rendering.

**Map()**

- using Map() here because it offers unique key-value pairs, better than using normal object and array.

**Default Behaviour**

- Arrow up and down default behaviour is scrolling.
- Normally disable the default behaviour if you are giving another definition for this action.

**Extra Note**

- Pass ref as props by annotate the type of `type Ref` from react, otherwise React will interfere because `ref` is reserved word and cannot just pass as normal props.

```ts
const accordionItemRefs = useRef(new Map<number, HTMLButtonElement>());

const register = (index: number, node: HTMLButtonElement | null) => {
  if (node) {
    accordionItemRefs.current.set(index, node);
  } else { // when unmount
    accordionItemRefs.current.delete(index); // clean up job
  }
};

const handleKeys = (index: number, e: React.KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    const next = accordionItemRefs.current.get(index + 1);
    next?.focus();
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    const prev = accordionItemRefs.current.get(index - 1);
    prev?.focus();
  }
};

  return (
    <div>
      {items.map(({ id, title, content }, index) => (
        <AccordionItem
          // other props...
          onKeyDown={(e) => handleKeys(index, e)}
          ref={(node) => register(index, node)}
        >
          {content}
        </AccordionItem>
      ))}
    </div>
```
