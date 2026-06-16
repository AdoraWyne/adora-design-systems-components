# Badge

Badge is more playing with style.

## Props

- Visual style / appearance <string>
  - solid → filled background (high emphasis)
  - outline → border only (medium emphasis)
  - subtle → light tinted background (low emphasis)

- Variant <string>
  - default → neutral info
  - success → positive state (e.g. "Verified")
  - warning → caution (e.g. "Age Restricted")
  - danger → negative (e.g. "Banned")
  - info → informational (e.g. "Beta")

- Size <string>
  - "sm"
  - "md"
  - "lg"

- Include Icon or Dot <boolean>
  - dot

## Accessibility

- `aria-label` if there is no text context.
- When rendering dot, remember this is only for visual.
  - `aria-hidden="true"`

dot as example:

```js
<span aria-label="Live" className="...">
  <span aria-hidden="true" className="dot" />
</span>
```
