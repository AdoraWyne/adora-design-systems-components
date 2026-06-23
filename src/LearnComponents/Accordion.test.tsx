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

describe("Accordion", () => {
  it("renders a trigger for every item and starts with all panels closed", () => {
    render(<Accordion items={items} type="single" />);

    // Each header renders as a button whose accessible name is the item title.
    // (getByRole's `name` ignores the aria-hidden "+"/"-" icon, so we get just
    // the title — this is what a screen reader would announce.)
    expect(
      screen.getByRole("button", { name: "Section A" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Section B" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Section C" }),
    ).toBeInTheDocument();

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
    // user-event is async: every interaction returns a promise, so we set up an
    // instance and `await` each action. This flushes React's state updates for us.
    const user = userEvent.setup();
    render(<Accordion items={items} type="single" />);

    const triggerA = screen.getByRole("button", { name: "Section A" });

    // Precondition: A is closed before we touch it.
    expect(triggerA).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Content A")).not.toBeVisible();

    await user.click(triggerA);

    // After clicking, A reports expanded and its content is visible.
    expect(triggerA).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content A")).toBeVisible();
  });

  it("closes an open panel when its header is clicked again", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} type="single" />);

    const triggerA = screen.getByRole("button", { name: "Section A" });

    await user.click(triggerA);

    expect(triggerA).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content A")).toBeVisible();

    await user.click(triggerA);
    expect(triggerA).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Content A")).not.toBeVisible();
  });

  it("in single mode, opening one panel closes the others", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} type="single" />);

    const triggerA = screen.getByRole("button", { name: "Section A" });
    const triggerB = screen.getByRole("button", { name: "Section B" });

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
    const user = userEvent.setup();
    render(<Accordion items={items} type="multiple" />);

    const triggerA = screen.getByRole("button", { name: "Section A" });
    const triggerB = screen.getByRole("button", { name: "Section B" });

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
    const user = userEvent.setup();
    render(<Accordion items={items} type="single" />);

    const triggerA = screen.getByRole("button", { name: "Section A" });
    const triggerB = screen.getByRole("button", { name: "Section B" });

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
    const user = userEvent.setup();
    render(<Accordion items={items} type="single" />);

    const triggerA = screen.getByRole("button", { name: "Section A" });
    const triggerC = screen.getByRole("button", { name: "Section C" });

    triggerA.focus();
    expect(triggerA).toHaveFocus();

    await user.keyboard("{End}");
    expect(triggerC).toHaveFocus();

    await user.keyboard("{Home}");
    expect(triggerA).toHaveFocus();
  });
});
