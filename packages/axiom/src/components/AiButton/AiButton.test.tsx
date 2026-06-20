import { describe, it, expect, vi } from "vitest";
import { createRef } from "react";
import { renderWithTheme, screen, userEvent } from "../../test/utils";
import { AiButton } from "./AiButton";

describe("AiButton", () => {
  it("renders the default 'Ask AI' label", () => {
    renderWithTheme(<AiButton />);
    expect(
      screen.getByRole("button", { name: /Ask AI/i }),
    ).toBeInTheDocument();
  });

  it("renders custom children", () => {
    renderWithTheme(<AiButton>Generate summary</AiButton>);
    expect(
      screen.getByRole("button", { name: /Generate summary/i }),
    ).toBeInTheDocument();
  });

  it("renders the default sparkles icon", () => {
    renderWithTheme(<AiButton />);
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  it("renders a custom leftSection when provided", () => {
    renderWithTheme(
      <AiButton leftSection={<span data-testid="custom-icon" />} />,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<AiButton onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: /Ask AI/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<AiButton disabled onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: /Ask AI/i }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards ref to the underlying button element", () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(<AiButton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
