import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "./Accordion";

// Shared fixture: three items is enough to prove "render all of them" and,
// later, to test focus moving between neighbours.
const items = [
  { id: "a", title: "Section A", content: "Content A" },
  { id: "b", title: "Section B", content: "Content B" },
  { id: "c", title: "Section C", content: "Content C" },
];

// Renders with the shared fixture and returns a user-event instance for driving
// interactions. `type` defaults to "single" since most tests use it; the
// multiple-mode test overrides it.
function renderAccordion(type: "single" | "multiple" = "single") {
  const user = userEvent.setup();
  render(<Accordion items={items} type={type} />);
  return { user };
}

// Look up a header by its visible title — what nearly every test does.
const getTrigger = (title: string) =>
  screen.getByRole("button", { name: title });

describe("Accordion", () => {
  it("renders a trigger for every item and starts with all panels closed", () => {
    renderAccordion();

    // Each header renders as a button whose accessible name is the item title.
    // (getByRole's `name` ignores the aria-hidden "+"/"-" icon, so we get just
    // the title — this is what a screen reader would announce.)
    expect(getTrigger("Section A")).toBeInTheDocument();
    expect(getTrigger("Section B")).toBeInTheDocument();
    expect(getTrigger("Section C")).toBeInTheDocument();

    // On mount nothing is open, so every trigger reports collapsed...
    for (const trigger of screen.getAllByRole("button")) {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    }

    // ...and each panel's content is hidden (the panel div has `hidden`).
    expect(screen.getByText("Content A")).not.toBeVisible();
    expect(screen.getByText("Content B")).not.toBeVisible();
    expect(screen.getByText("Content C")).not.toBeVisible();
  });

  it("opens a panel when its header is clicked", async () => {
    const { user } = renderAccordion();

    const triggerA = getTrigger("Section A");

    // Precondition: A is closed before we touch it.
    expect(triggerA).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Content A")).not.toBeVisible();

    await user.click(triggerA);

    // After clicking, A reports expanded and its content is visible.
    expect(triggerA).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content A")).toBeVisible();
  });

  it("closes an open panel when its header is clicked again", async () => {
    const { user } = renderAccordion();

    const triggerA = getTrigger("Section A");

    await user.click(triggerA);

    expect(triggerA).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content A")).toBeVisible();

    await user.click(triggerA);
    expect(triggerA).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Content A")).not.toBeVisible();
  });

  it("in single mode, opening one panel closes the others", async () => {
    const { user } = renderAccordion();

    const triggerA = getTrigger("Section A");
    const triggerB = getTrigger("Section B");

    await user.click(triggerA);

    expect(triggerA).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content A")).toBeVisible();

    await user.click(triggerB);
    expect(triggerB).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content B")).toBeVisible();

    expect(triggerA).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Content A")).not.toBeVisible();
  });

  it("in multiple mode, able to open multiple panel", async () => {
    const { user } = renderAccordion("multiple");

    const triggerA = getTrigger("Section A");
    const triggerB = getTrigger("Section B");

    expect(triggerA).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Content A")).not.toBeVisible();
    expect(triggerB).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Content B")).not.toBeVisible();

    await user.click(triggerA);
    await user.click(triggerB);

    expect(triggerB).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content B")).toBeVisible();
    expect(triggerA).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content A")).toBeVisible();
  });

  it("moves focus to the next header on ArrowDown and the previous on ArrowUp", async () => {
    const { user } = renderAccordion();

    const triggerA = getTrigger("Section A");
    const triggerB = getTrigger("Section B");

    // Put keyboard focus on A first. `user.keyboard` dispatches keys to whatever
    // is currently focused, so the starting header has to be focused. We focus it
    // directly rather than clicking, because a click would also toggle it open.
    triggerA.focus();
    expect(triggerA).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(triggerB).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(triggerA).toHaveFocus();
  });

  it("moves focus to the first header on Home and the last on End", async () => {
    const { user } = renderAccordion();

    const triggerA = getTrigger("Section A");
    const triggerC = getTrigger("Section C");

    triggerA.focus();
    expect(triggerA).toHaveFocus();

    await user.keyboard("{End}");
    expect(triggerC).toHaveFocus();

    await user.keyboard("{Home}");
    expect(triggerA).toHaveFocus();
  });

  it("keeps focus in place at the boundaries: ArrowUp on the first header, ArrowDown on the last", async () => {
    const { user } = renderAccordion();

    const triggerA = getTrigger("Section A");
    const triggerC = getTrigger("Section C");

    await user.click(triggerA);
    await user.keyboard("{ArrowUp}");
    expect(triggerA).toHaveFocus();

    await user.click(triggerC);
    await user.keyboard("{ArrowDown}");
    expect(triggerC).toHaveFocus();
  });
});
