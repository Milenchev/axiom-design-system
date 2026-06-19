import { describe, expect, it } from "vitest";
import { renderWithTheme, screen } from "../../test/utils";
import { FormSection } from "./FormSection";

describe("FormSection", () => {
  it("renders the title inside a fieldset legend", () => {
    renderWithTheme(
      <FormSection title="Account">
        <input aria-label="Email" />
      </FormSection>,
    );

    // The accessible group is named by its legend.
    const group = screen.getByRole("group", { name: "Account" });
    expect(group.tagName).toBe("FIELDSET");
  });

  it("renders an optional description", () => {
    renderWithTheme(
      <FormSection title="Profile" description="Tell us about yourself">
        <input aria-label="Name" />
      </FormSection>,
    );
    expect(screen.getByText("Tell us about yourself")).toBeInTheDocument();
  });

  it("does not render a description paragraph when none is provided", () => {
    const { container } = renderWithTheme(
      <FormSection title="Profile">
        <input aria-label="Name" />
      </FormSection>,
    );
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders its children", () => {
    renderWithTheme(
      <FormSection title="Contact">
        <input aria-label="Phone" />
      </FormSection>,
    );
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
  });
});
