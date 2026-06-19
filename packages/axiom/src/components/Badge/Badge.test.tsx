import { describe, expect, it } from "vitest";
import { renderWithTheme, screen } from "../../test/utils";
import { Badge } from "./Badge";

function badgeRoot(label: string): HTMLElement {
  const root = screen.getByText(label).closest("[data-variant]");
  if (!root) throw new Error(`No badge root found for "${label}"`);
  return root as HTMLElement;
}

describe("Badge", () => {
  it("renders its label", () => {
    renderWithTheme(<Badge type="success">Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("maps emphasis to the matching Mantine variant", () => {
    const { rerender } = renderWithTheme(
      <Badge type="success" emphasis="subtle">
        Subtle
      </Badge>,
    );
    expect(badgeRoot("Subtle")).toHaveAttribute("data-variant", "light");

    rerender(
      <Badge type="success" emphasis="minimal">
        Minimal
      </Badge>,
    );
    expect(badgeRoot("Minimal")).toHaveAttribute("data-variant", "outline");
  });

  it("defaults to a bold (filled) variant when only a type is given", () => {
    renderWithTheme(<Badge type="error">Error</Badge>);
    expect(badgeRoot("Error")).toHaveAttribute("data-variant", "filled");
  });

  it("respects a direct variant override when no type is set", () => {
    renderWithTheme(<Badge variant="dot">Dot</Badge>);
    expect(badgeRoot("Dot")).toHaveAttribute("data-variant", "dot");
  });
});
