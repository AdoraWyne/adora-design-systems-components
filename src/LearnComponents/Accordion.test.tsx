import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Accordion from "./Accordion";

// Shared fixture: three items is enough to prove "render all of them" and,
// later, to test focus moving between neighbours.
const items = [
  { id: "a", title: "Section A", content: "Content A" },
  { id: "b", title: "Section B", content: "Content B" },
  { id: "c", title: "Section C", content: "Content C" },
];

describe("Accordion", () => {
  it("renders a trigger for every item and starts with all panels closed", () => {
    render(<Accordion items={items} type="single" />);

    // Each header renders as a button whose accessible name is the item title.
    // (getByRole's `name` ignores the aria-hidden "+"/"-" icon, so we get just
    // the title — this is what a screen reader would announce.)
    expect(screen.getByRole("button", { name: "Section A" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Section B" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Section C" })).toBeInTheDocument();

    // On mount nothing is open, so every trigger reports collapsed...
    for (const trigger of screen.getAllByRole("button")) {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    }

    // ...and each panel's content is hidden (the panel div has `hidden`).
    expect(screen.getByText("Content A")).not.toBeVisible();
    expect(screen.getByText("Content B")).not.toBeVisible();
    expect(screen.getByText("Content C")).not.toBeVisible();
  });
});
