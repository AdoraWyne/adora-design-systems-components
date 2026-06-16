_Claude chat: https://claude.ai/chat/268523d7-2ea8-49ca-964e-6fa06ad74d87_

# How to start

> "Before I write anything, let me think about what an Input component actually needs to support..."

# What states it could have:

- Default - ready to use
- Focused - when useer typing
- Disabled - can't interact
- Error - validation failed, show error msg
- Loading - async validation happening (optional la)
- Successful - validation passed (optional)

# This is only text-like inputs only

This input field only takes:

```
type TextInputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url"
  | "number";
```

# Accessibility

- Must have `htmlFor` for label and `id` for input.
- `aria-describedby` and `id` for error msg and helper text. only takes id (kebab-case).

- `aria-hidden="true"` - hide the element that only helps with visual.
  - since I have `required` set to the input so screenreader should know.

- `aria-invalid`on input and `role="alert"` on the error msg - these 2 work together

```js
<input
  aria-invalid={!!errorMsg}
  // some code...
/>;
{
  errorMsg && (
    <p id={errorId} role="alert" className="text-red-600">
      {errorMsg}
    </p>
  );
}
```
