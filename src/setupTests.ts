// Registers jest-dom's custom matchers (toBeVisible, toHaveAttribute, ...) on
// Vitest's `expect`. The `/vitest` entrypoint also wires up the TS types.
import "@testing-library/jest-dom/vitest";

// RTL leaves rendered components in the DOM after each test. Unmount them so
// tests stay isolated and `screen` queries don't see leftovers from a prior test.
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
