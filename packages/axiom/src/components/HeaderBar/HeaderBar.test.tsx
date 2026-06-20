import { describe, it, expect } from "vitest";
import { renderWithTheme, screen, userEvent } from "../../test/utils";
import { HeaderBar } from "./HeaderBar";

describe("HeaderBar", () => {
  it("renders the logo content", () => {
    renderWithTheme(
      <HeaderBar>
        <HeaderBar.Logo applicationName="My App" />
      </HeaderBar>,
    );
    expect(screen.getByText("My App")).toBeInTheDocument();
  });

  it("renders both regular children and CustomContent", () => {
    renderWithTheme(
      <HeaderBar>
        <HeaderBar.Logo applicationName="My App" />
        <HeaderBar.CustomContent>
          <span>Right side</span>
        </HeaderBar.CustomContent>
      </HeaderBar>,
    );
    expect(screen.getByText("My App")).toBeInTheDocument();
    expect(screen.getByText("Right side")).toBeInTheDocument();
  });

  it("does not render the app switcher toggle without appSwitcherContent", () => {
    renderWithTheme(
      <HeaderBar>
        <HeaderBar.Logo applicationName="My App" />
      </HeaderBar>,
    );
    expect(
      screen.queryByRole("button", { name: /Toggle navigation/i }),
    ).not.toBeInTheDocument();
  });

  it("opens the app switcher drawer when the toggle is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <HeaderBar appSwitcherContent={<div>App list</div>}>
        <HeaderBar.Logo applicationName="My App" />
      </HeaderBar>,
    );

    expect(screen.queryByText("App list")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Toggle navigation/i }),
    );

    expect(await screen.findByText("App list")).toBeInTheDocument();
  });

  it("renders the user's initials in the user menu", () => {
    renderWithTheme(
      <HeaderBar>
        <HeaderBar.CustomContent>
          <HeaderBar.UserMenu name="Georgi Milenchev">
            <div>Logout</div>
          </HeaderBar.UserMenu>
        </HeaderBar.CustomContent>
      </HeaderBar>,
    );
    // "Georgi Milenchev" -> "GM"
    expect(screen.getByText("GM")).toBeInTheDocument();
  });
});
