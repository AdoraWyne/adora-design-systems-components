# Button

<Button variant="primary" size="md" onClick={handleClick} isLoading disabled>
</Button>

## Props to pass in:

- children:
  - need to pass in children to show what does the button do and also for accessibility purpose
- isLoading:
  - to show if the button is busy -> accessibility
  - to show different styling
- Size:
  - sm
  - md
  - lg
- Variant:
  - primary
  - secondary
  - destructive
  - ghost
- we also pass in native button attributes

## Questions

- **Why do we need to show `Loading...` as button content?**
  This is for scenario for isolated actions like download an invoice in a table, less useful for form submissions. Whether to include it depends on the product context.

  I would understand the use case before decide to put this in the button.

- `{...props}` order matter too?
  - Yes! Everything before the props can be overrided by `...props` so they can serve as default value.
  - If user needs more specific configs, they can pass them in as props as long as the props are accepted by the component.

## Accessibility

- Use the right HTML element -> `<button>`
- Always have visbile label or `aria-label`
- Use the native `disabled` state, so we don't need to use `aria-disabled`.
- Focus state
  - Browser provides a default focus ring natively.
  - But if CSS resets or Tailwind preflight can remove it silently -> `outline: none;`
  - Safe to explicitly mention it `focus-visible:ring-2 focus-visible:ring-white`
  - focus-visible = shows ring for keyboard users, hides for mouse users
- Loading state
  - Use `aria-busy` to show.
  - In button content, use it to show the user the button is in loading state like "Loading...".
