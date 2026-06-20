import { describe, it, expect } from "vitest";
import { createRef } from "react";
import { renderWithTheme, screen, userEvent } from "../../test/utils";
import { ExpandablePanel } from "./ExpandablePanel";

describe("ExpandablePanel", () => {
  it("renders the title in a control button", () => {
    renderWithTheme(
      <ExpandablePanel title="Advanced settings">Content</ExpandablePanel>,
    );
    expect(
      screen.getByRole("button", { name: /Advanced settings/i }),
    ).toBeInTheDocument();
  });

  it("is collapsed by default", () => {
    renderWithTheme(
      <ExpandablePanel title="Advanced settings">Content</ExpandablePanel>,
    );
    expect(
      screen.getByRole("button", { name: /Advanced settings/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("is expanded when defaultExpanded is set", () => {
    renderWithTheme(
      <ExpandablePanel title="Advanced settings" defaultExpanded>
        Panel body
      </ExpandablePanel>,
    );
    expect(
      screen.getByRole("button", { name: /Advanced settings/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Panel body")).toBeInTheDocument();
  });

  it("expands when the title control is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ExpandablePanel title="Advanced settings">Panel body</ExpandablePanel>,
    );
    const control = screen.getByRole("button", { name: /Advanced settings/i });
    expect(control).toHaveAttribute("aria-expanded", "false");

    await user.click(control);

    expect(control).toHaveAttribute("aria-expanded", "true");
  });

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(
      <ExpandablePanel ref={ref} title="Advanced settings">
        Content
      </ExpandablePanel>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
