import { describe, it, expect, vi } from "vitest";
import { renderWithTheme, screen, userEvent } from "../../test/utils";
import { SearchModal } from "./SearchModal";

const recentItems = [
  { id: "r1", label: "Dashboard > Overview" },
  { id: "r2", label: "Settings > General" },
];

const results = [
  { id: "1", label: "Sarah Chen" },
  { id: "2", label: "Nick Johnson" },
];

describe("SearchModal", () => {
  it("shows recent items when the query is empty", () => {
    renderWithTheme(
      <SearchModal opened onClose={() => {}} query="" recentItems={recentItems} />,
    );
    expect(screen.getByText("Dashboard > Overview")).toBeInTheDocument();
  });

  it("shows results when there is a query", () => {
    renderWithTheme(
      <SearchModal opened onClose={() => {}} query="sa" results={results} />,
    );
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Nick Johnson")).toBeInTheDocument();
  });

  it("does not render content when closed", () => {
    renderWithTheme(
      <SearchModal
        opened={false}
        onClose={() => {}}
        query=""
        recentItems={recentItems}
      />,
    );
    expect(screen.queryByText("Dashboard > Overview")).not.toBeInTheDocument();
  });

  it("calls onQueryChange while typing", async () => {
    const user = userEvent.setup();
    const onQueryChange = vi.fn();
    renderWithTheme(
      <SearchModal
        opened
        onClose={() => {}}
        query=""
        onQueryChange={onQueryChange}
        placeholder="Search..."
      />,
    );

    await user.type(screen.getByPlaceholderText("Search..."), "a");

    expect(onQueryChange).toHaveBeenCalled();
  });

  it("calls onSelectItem when a result is clicked", async () => {
    const user = userEvent.setup();
    const onSelectItem = vi.fn();
    renderWithTheme(
      <SearchModal
        opened
        onClose={() => {}}
        query="sa"
        results={results}
        onSelectItem={onSelectItem}
      />,
    );

    await user.click(screen.getByText("Sarah Chen"));

    expect(onSelectItem).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1" }),
    );
  });

  it("selects a result via keyboard navigation (Arrow + Enter)", async () => {
    const user = userEvent.setup();
    const onSelectItem = vi.fn();
    renderWithTheme(
      <SearchModal
        opened
        onClose={() => {}}
        query="sa"
        results={results}
        onSelectItem={onSelectItem}
        placeholder="Search..."
      />,
    );

    screen.getByPlaceholderText("Search...").focus();
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onSelectItem).toHaveBeenCalled();
  });

  it("calls onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithTheme(
      <SearchModal opened onClose={onClose} query="" recentItems={recentItems} />,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalled();
  });
});
