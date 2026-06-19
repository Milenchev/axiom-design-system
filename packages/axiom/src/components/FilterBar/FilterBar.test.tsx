import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent } from "../../test/utils";
import { FilterBar } from "./FilterBar";

describe("FilterBar", () => {
  it("renders its filter children", () => {
    renderWithTheme(
      <FilterBar>
        <input aria-label="Status" />
      </FilterBar>,
    );
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });

  it("only shows the Apply action when onApply is provided", () => {
    renderWithTheme(
      <FilterBar onApply={() => {}}>
        <input aria-label="Status" />
      </FilterBar>,
    );
    expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Clear" }),
    ).not.toBeInTheDocument();
  });

  it("calls onApply and onClear when their buttons are pressed", async () => {
    const onApply = vi.fn();
    const onClear = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <FilterBar onApply={onApply} onClear={onClear}>
        <input aria-label="Status" />
      </FilterBar>,
    );

    await user.click(screen.getByRole("button", { name: "Clear" }));
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onApply).toHaveBeenCalledTimes(1);
  });
});
