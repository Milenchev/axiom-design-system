import { describe, it, expect, vi } from "vitest";
import { renderWithTheme, screen, userEvent } from "../../test/utils";
import { Datagrid } from "./Datagrid";

type Row = { id: number; name: string; role: string };

const data: Row[] = [
  { id: 1, name: "Sarah", role: "CTO" },
  { id: 2, name: "Nick", role: "Engineer" },
  { id: 3, name: "Maria", role: "Designer" },
];

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role" },
];

describe("Datagrid", () => {
  it("renders a row for each data item", () => {
    renderWithTheme(<Datagrid columns={columns} data={data} rowKey="id" />);
    expect(screen.getByText("Sarah")).toBeInTheDocument();
    expect(screen.getByText("Nick")).toBeInTheDocument();
    expect(screen.getByText("Maria")).toBeInTheDocument();
  });

  it("shows the empty message when there is no data", () => {
    renderWithTheme(
      <Datagrid
        columns={columns}
        data={[]}
        rowKey="id"
        emptyMessage="No records found"
      />,
    );
    expect(screen.getByText("No records found")).toBeInTheDocument();
  });

  it("sorts rows when a sortable column header is clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Datagrid columns={columns} data={data} rowKey="id" />);

    await user.click(screen.getByText("Name"));

    const names = screen
      .getAllByRole("cell")
      .map((c) => c.textContent)
      .filter((t) => ["Sarah", "Nick", "Maria"].includes(t ?? ""));
    // възходящо по име: Maria, Nick, Sarah
    expect(names[0]).toBe("Maria");
  });

  it("filters rows via the search box", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Datagrid
        columns={columns}
        data={data}
        rowKey="id"
        searchable
        searchPlaceholder="Search"
      />,
    );

    await user.type(screen.getByPlaceholderText("Search"), "Sarah");

    expect(screen.getByText("Sarah")).toBeInTheDocument();
    expect(screen.queryByText("Nick")).not.toBeInTheDocument();
  });

  it("limits visible rows to the page size", () => {
    const many: Row[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      role: "Member",
    }));
    renderWithTheme(
      <Datagrid
        columns={columns}
        data={many}
        rowKey="id"
        defaultPageSize={10}
      />,
    );
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.queryByText("User 11")).not.toBeInTheDocument();
  });

  it("fires onSelectionChange when a row is selected", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    renderWithTheme(
      <Datagrid
        columns={columns}
        data={data}
        rowKey="id"
        selectable
        onSelectionChange={onSelectionChange}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    // checkboxes[0] обикновено е "select all" — първият ред е index 1
    await user.click(checkboxes[1]);

    expect(onSelectionChange).toHaveBeenCalled();
  });
});
