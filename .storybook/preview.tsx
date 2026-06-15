import type { Preview } from "@storybook/react-vite";
// @ts-expect-error: That's a TypeScript error, not a runtime error — Storybook still works, but TypeScript doesn't know how to handle .css imports.
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
