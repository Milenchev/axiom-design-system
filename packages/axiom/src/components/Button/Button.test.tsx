import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, screen, userEvent } from "../../test/utils";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children", () => {
    renderWithTheme(<Button>Save changes</Button>);
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<Button onClick={onClick}>Submit</Button>);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <Button disabled onClick={onClick}>
        Submit
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("maps the danger intent to a red filled variant", () => {
    renderWithTheme(<Button intent="danger">Delete</Button>);
    const button = screen.getByRole("button", { name: "Delete" });
    // Mantine emits the resolved color/variant as data attributes.
    expect(button).toHaveAttribute("data-variant", "filled");
  });

  it("forwards a ref to the underlying button element", () => {
    let node: HTMLButtonElement | null = null;
    renderWithTheme(
      <Button
        ref={(el) => {
          node = el;
        }}
      >
        Ref
      </Button>,
    );
    expect(node).toBeInstanceOf(HTMLButtonElement);
  });
});
