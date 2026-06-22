import {
  ActionIcon,
  Checkbox,
  Group,
  Menu,
  Pagination,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconColumns3,
  IconFilter,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconSearch,
  IconSortAscending,
  IconX,
} from "@tabler/icons-react";
import clsx from "clsx";
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./Datagrid.module.css";

/** Must match --axiom-sizing-lg used for .selectionCell width in CSS */
const SELECTION_COL_WIDTH = 36;

/* Types */

export type SortDirection = "asc" | "desc" | null;

export interface DatagridColumn<T> {
  /** Unique key matching a property on the row data */
  key: string;
  /** Column header label */
  header: string;
  /** Minimum width in px */
  minWidth?: number;
  /** Default width in px */
  width?: number;
  /** Whether this column is sortable (default: true) */
  sortable?: boolean;
  /** Whether this column is filterable (default: true) */
  filterable?: boolean;
  /** Whether this column can be hidden (default: true) */
  hideable?: boolean;
  /** Custom cell renderer */
  render?: (value: unknown, row: T, rowIndex: number) => ReactNode;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Allow content to wrap (disables truncation — use for pills, chips, etc.) */
  wrap?: boolean;
}

type RowKeyOf<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

export interface DatagridProps<T> {
  /** Column definitions */
  columns: DatagridColumn<T>[];
  /** Row data array */
  data: T[];
  /** Unique key for each row (property name on T) */
  rowKey: RowKeyOf<T>;
  /** Enable row selection checkboxes (default: false) */
  selectable?: boolean;
  /** Callback when selection changes */
  onSelectionChange?: (selectedKeys: Set<string | number>) => void;
  /** Rows per page options (default: [10, 25, 50]) */
  pageSizeOptions?: number[];
  /** Default rows per page (default: 10) */
  defaultPageSize?: number;
  /** Show the global search bar (default: true) */
  searchable?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Whether columns are resizable (default: true) */
  resizable?: boolean;
  /** Striped rows (default: false) */
  striped?: boolean;
  /** Highlight row on hover (default: true) */
  highlightOnHover?: boolean;
  /** Additional class for wrapper */
  className?: string;
}

/* Helper: get nested value */
function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc: unknown, part) => {
    if (
      acc &&
      typeof acc === "object" &&
      part in (acc as Record<string, unknown>)
    ) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

/* Component */

export function Datagrid<T extends object>({
  columns: initialColumns,
  data,
  rowKey,
  selectable = false,
  onSelectionChange,
  pageSizeOptions = [10, 25, 50],
  defaultPageSize = 10,
  searchable = true,
  searchPlaceholder = "Search...",
  emptyMessage = "No data found",
  resizable = true,
  striped = false,
  highlightOnHover = true,
  className,
}: DatagridProps<T>) {
  // State
  const [globalFilter, setGlobalFilter] = useState("");
  const [debouncedFilter] = useDebouncedValue(globalFilter, 300);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {},
  );
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(
    new Set(),
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [pinnedLeft, setPinnedLeft] = useState<string[]>([]);
  const [pinnedRight, setPinnedRight] = useState<string[]>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    initialColumns.map((c) => c.key),
  );
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    () => {
      const widths: Record<string, number> = {};
      for (const col of initialColumns) {
        widths[col.key] = col.width || 150;
      }
      return widths;
    },
  );

  // Ordered visible columns
  const visibleColumns = useMemo(() => {
    return columnOrder
      .filter((key) => !hiddenColumns.has(key))
      .flatMap((key) => {
        const col = initialColumns.find((c) => c.key === key);
        return col ? [col] : [];
      });
  }, [columnOrder, hiddenColumns, initialColumns]);

  // Helpers that reset page
  const resetPage = useCallback(() => setPage(1), []);

  const setPageSizeAndReset = useCallback((val: number) => {
    setPageSize(val);
    setPage(1);
  }, []);

  // Resize handling
  const resizingCol = useRef<string | null>(null);
  const resizeStartX = useRef(0);
  const resizeStartWidth = useRef(0);

  const handleResizeStart = useCallback(
    (colKey: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      resizingCol.current = colKey;
      resizeStartX.current = e.clientX;
      resizeStartWidth.current = columnWidths[colKey] || 150;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const activeKey = resizingCol.current;
        if (!activeKey) return;
        const diff = moveEvent.clientX - resizeStartX.current;
        const col = initialColumns.find((c) => c.key === activeKey);
        const minW = col?.minWidth || 60;
        const newWidth = Math.max(minW, resizeStartWidth.current + diff);
        setColumnWidths((prev) => ({
          ...prev,
          [activeKey]: newWidth,
        }));
      };

      const handleMouseUp = () => {
        resizingCol.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [columnWidths, initialColumns],
  );

  // Filtering
  const filteredData = useMemo(() => {
    let result = data;

    if (debouncedFilter.trim()) {
      const query = debouncedFilter.toLowerCase();
      result = result.filter((row) =>
        initialColumns.some((col) => {
          const val = getNestedValue(row, col.key);
          return val != null && String(val).toLowerCase().includes(query);
        }),
      );
    }

    for (const [colKey, filterVal] of Object.entries(columnFilters)) {
      if (!filterVal.trim()) continue;
      const query = filterVal.toLowerCase();
      result = result.filter((row) => {
        const val = getNestedValue(row, colKey);
        return val != null && String(val).toLowerCase().includes(query);
      });
    }

    return result;
  }, [data, debouncedFilter, columnFilters, initialColumns]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = getNestedValue(a, sortKey);
      const bVal = getNestedValue(b, sortKey);

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const aStr = String(aVal);
      const bStr = String(bVal);

      const aNum = Number(aStr);
      const bNum = Number(bStr);
      if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
        return sortDir === "asc" ? aNum - bNum : bNum - aNum;
      }

      const cmp = aStr.localeCompare(bStr);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredData, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  // Selection
  const allPageKeys = paginatedData.map((row) => String(row[rowKey]));
  const allPageSelected =
    allPageKeys.length > 0 && allPageKeys.every((k) => selectedKeys.has(k));
  const somePageSelected = allPageKeys.some((k) => selectedKeys.has(k));

  const toggleRow = useCallback(
    (key: string | number) => {
      setSelectedKeys((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        onSelectionChange?.(next);
        return next;
      });
    },
    [onSelectionChange],
  );

  const toggleAllPage = useCallback(() => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        for (const k of allPageKeys) next.delete(k);
      } else {
        for (const k of allPageKeys) next.add(k);
      }
      onSelectionChange?.(next);
      return next;
    });
  }, [allPageSelected, allPageKeys, onSelectionChange]);

  // Sort handler
  const handleSort = useCallback(
    (colKey: string, direction?: "asc" | "desc") => {
      if (direction) {
        setSortKey(colKey);
        setSortDir(direction);
        return;
      }
      if (sortKey === colKey) {
        if (sortDir === "asc") setSortDir("desc");
        else {
          setSortKey(null);
          setSortDir(null);
        }
      } else {
        setSortKey(colKey);
        setSortDir("asc");
      }
    },
    [sortKey, sortDir],
  );

  // Column order manipulation
  const moveColumn = useCallback(
    (colKey: string, direction: "left" | "right") => {
      setColumnOrder((prev) => {
        const idx = prev.indexOf(colKey);
        if (idx === -1) return prev;
        const next = [...prev];
        const targetIdx = direction === "left" ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= next.length) return prev;
        [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
        return next;
      });
    },
    [],
  );

  const pinColumn = useCallback(
    (colKey: string, side: "left" | "right" | "none") => {
      setPinnedLeft((prev) => prev.filter((k) => k !== colKey));
      setPinnedRight((prev) => prev.filter((k) => k !== colKey));
      if (side === "left") setPinnedLeft((prev) => [...prev, colKey]);
      if (side === "right") setPinnedRight((prev) => [...prev, colKey]);
    },
    [],
  );

  const toggleColumnVisibility = useCallback((colKey: string) => {
    setHiddenColumns((prev) => {
      const next = new Set(prev);
      if (next.has(colKey)) next.delete(colKey);
      else next.add(colKey);
      return next;
    });
  }, []);

  // Column filter handler
  const handleColumnFilter = useCallback(
    (colKey: string, value: string) => {
      setColumnFilters((prev) => ({ ...prev, [colKey]: value }));
      resetPage();
    },
    [resetPage],
  );

  // Clear all filters
  const hasActiveFilters =
    debouncedFilter.trim() !== "" ||
    Object.values(columnFilters).some((v) => v.trim() !== "");

  const clearAllFilters = useCallback(() => {
    setGlobalFilter("");
    setColumnFilters({});
    resetPage();
  }, [resetPage]);

  // Pin style helper
  const getPinStyle = (colKey: string): CSSProperties | undefined => {
    if (pinnedLeft.includes(colKey)) {
      const idx = pinnedLeft.indexOf(colKey);
      const offset = pinnedLeft
        .slice(0, idx)
        .reduce((sum, k) => sum + (columnWidths[k] || 150), 0);
      return {
        position: "sticky",
        left: offset + (selectable ? SELECTION_COL_WIDTH : 0),
        zIndex: 2,
      };
    }
    if (pinnedRight.includes(colKey)) {
      const idx = pinnedRight.indexOf(colKey);
      const offset = pinnedRight
        .slice(idx + 1)
        .reduce((sum, k) => sum + (columnWidths[k] || 150), 0);
      return { position: "sticky", right: offset, zIndex: 2 };
    }
    return undefined;
  };

  // Render
  return (
    <Stack gap="sm" className={clsx(classes.wrapper, className)}>
      {/* Toolbar */}
      <Group justify="space-between" align="center" className={classes.toolbar}>
        <Group gap="sm">
          {searchable && (
            <TextInput
              className={classes.searchInput}
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => {
                setGlobalFilter(e.currentTarget.value);
                resetPage();
              }}
              leftSection={<IconSearch size={16} />}
              rightSection={
                globalFilter ? (
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    onClick={() => {
                      setGlobalFilter("");
                      resetPage();
                    }}
                  >
                    <IconX size={14} />
                  </ActionIcon>
                ) : undefined
              }
              size="sm"
              radius="sm"
            />
          )}
          <ActionIcon
            variant={showColumnFilters ? "filled" : "subtle"}
            size="md"
            radius="sm"
            onClick={() => setShowColumnFilters((v) => !v)}
            aria-label="Toggle column filters"
          >
            <IconFilter size={16} />
          </ActionIcon>
          {hasActiveFilters && (
            <ActionIcon
              variant="subtle"
              color="red"
              size="md"
              radius="sm"
              onClick={clearAllFilters}
              aria-label="Clear all filters"
            >
              <IconX size={16} />
            </ActionIcon>
          )}
        </Group>

        <Group gap="sm">
          {selectable && selectedKeys.size > 0 && (
            <Text size="sm" fw={500} c="var(--axiom-primary)">
              {selectedKeys.size} selected
            </Text>
          )}
          <Text size="xs" c="dimmed">
            {sortedData.length} row{sortedData.length !== 1 ? "s" : ""}
          </Text>
        </Group>
      </Group>

      {/* Table */}
      <div className={classes.tableContainer}>
        <Table
          striped={striped}
          highlightOnHover={highlightOnHover}
          withColumnBorders
          className={classes.table}
          style={{
            minWidth:
              visibleColumns.reduce(
                (sum, col) => sum + (columnWidths[col.key] || 150),
                0,
              ) + (selectable ? SELECTION_COL_WIDTH : 0),
          }}
        >
          <Table.Thead className={classes.thead}>
            <Table.Tr>
              {selectable && (
                <Table.Th className={classes.selectionCell}>
                  <Checkbox
                    checked={allPageSelected}
                    indeterminate={somePageSelected && !allPageSelected}
                    onChange={toggleAllPage}
                    aria-label="Select all rows on this page"
                    size="xs"
                  />
                </Table.Th>
              )}
              {visibleColumns.map((col) => {
                const isSorted = sortKey === col.key;
                const sortable = col.sortable !== false;
                const pinStyle = getPinStyle(col.key);

                return (
                  <Table.Th
                    key={col.key}
                    className={clsx(classes.th, {
                      [classes.pinned]: pinStyle,
                    })}
                    style={{
                      width: columnWidths[col.key],
                      minWidth: col.minWidth || 60,
                      textAlign: col.align || "left",
                      ...pinStyle,
                    }}
                  >
                    <Menu shadow="md" position="bottom-start" withinPortal>
                      <Menu.Target>
                        <Group
                          gap={4}
                          wrap="nowrap"
                          className={classes.headerContent}
                          justify={
                            col.align === "right"
                              ? "flex-end"
                              : col.align === "center"
                                ? "center"
                                : "flex-start"
                          }
                        >
                          <Text
                            size="xs"
                            fw={600}
                            className={classes.headerLabel}
                          >
                            {col.header}
                          </Text>
                          {sortable && (
                            <span className={classes.sortIcon}>
                              {isSorted && sortDir === "asc" && (
                                <IconArrowUp size={14} />
                              )}
                              {isSorted && sortDir === "desc" && (
                                <IconArrowDown size={14} />
                              )}
                              {!isSorted && (
                                <IconSortAscending size={14} opacity={0.3} />
                              )}
                            </span>
                          )}
                        </Group>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {sortable && (
                          <>
                            <Menu.Item
                              leftSection={<IconArrowUp size={14} />}
                              onClick={() => handleSort(col.key, "asc")}
                            >
                              Asc
                            </Menu.Item>
                            <Menu.Item
                              leftSection={<IconArrowDown size={14} />}
                              onClick={() => handleSort(col.key, "desc")}
                            >
                              Desc
                            </Menu.Item>
                            <Menu.Divider />
                          </>
                        )}
                        <Menu.Item
                          leftSection={
                            <IconLayoutSidebarLeftCollapse size={14} />
                          }
                          onClick={() => pinColumn(col.key, "left")}
                        >
                          Pin to left
                        </Menu.Item>
                        <Menu.Item
                          leftSection={
                            <IconLayoutSidebarRightCollapse size={14} />
                          }
                          onClick={() => pinColumn(col.key, "right")}
                        >
                          Pin to right
                        </Menu.Item>
                        {(pinnedLeft.includes(col.key) ||
                          pinnedRight.includes(col.key)) && (
                          <Menu.Item
                            leftSection={<IconX size={14} />}
                            onClick={() => pinColumn(col.key, "none")}
                          >
                            Unpin
                          </Menu.Item>
                        )}
                        <Menu.Divider />
                        <Menu.Item
                          leftSection={<IconArrowLeft size={14} />}
                          onClick={() => moveColumn(col.key, "left")}
                          disabled={columnOrder.indexOf(col.key) === 0}
                        >
                          Move to Left
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<IconArrowRight size={14} />}
                          onClick={() => moveColumn(col.key, "right")}
                          disabled={
                            columnOrder.indexOf(col.key) ===
                            columnOrder.length - 1
                          }
                        >
                          Move to Right
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          leftSection={<IconColumns3 size={14} />}
                          closeMenuOnClick={false}
                        >
                          <Menu
                            trigger="hover"
                            position="right-start"
                            shadow="md"
                          >
                            <Menu.Target>
                              <Text size="sm">Columns</Text>
                            </Menu.Target>
                            <Menu.Dropdown>
                              {initialColumns
                                .filter((c) => c.hideable !== false)
                                .map((c) => (
                                  <Menu.Item
                                    key={c.key}
                                    onClick={() =>
                                      toggleColumnVisibility(c.key)
                                    }
                                    leftSection={
                                      <Checkbox
                                        checked={!hiddenColumns.has(c.key)}
                                        onChange={() => {}}
                                        size="xs"
                                        tabIndex={-1}
                                        style={{ pointerEvents: "none" }}
                                      />
                                    }
                                  >
                                    {c.header}
                                  </Menu.Item>
                                ))}
                            </Menu.Dropdown>
                          </Menu>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                    {resizable && (
                      <button
                        type="button"
                        aria-label={`Resize ${col.header} column`}
                        className={classes.resizeHandle}
                        onMouseDown={(e) => handleResizeStart(col.key, e)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                            e.preventDefault();
                            const delta = e.key === "ArrowLeft" ? -16 : 16;
                            const colDef = initialColumns.find(
                              (c) => c.key === col.key,
                            );
                            const minW = colDef?.minWidth || 60;
                            setColumnWidths((prev) => ({
                              ...prev,
                              [col.key]: Math.max(
                                minW,
                                (prev[col.key] || 150) + delta,
                              ),
                            }));
                          }
                        }}
                      />
                    )}
                  </Table.Th>
                );
              })}
            </Table.Tr>

            {showColumnFilters && (
              <Table.Tr className={classes.filterRow}>
                {selectable && <Table.Th className={classes.selectionCell} />}
                {visibleColumns.map((col) => (
                  <Table.Th
                    key={`filter-${col.key}`}
                    className={classes.filterCell}
                    style={getPinStyle(col.key)}
                  >
                    {col.filterable !== false ? (
                      <TextInput
                        size="xs"
                        radius="sm"
                        placeholder="Filter..."
                        value={columnFilters[col.key] || ""}
                        onChange={(e) =>
                          handleColumnFilter(col.key, e.currentTarget.value)
                        }
                        rightSection={
                          columnFilters[col.key] ? (
                            <ActionIcon
                              size="xs"
                              variant="subtle"
                              onClick={() => handleColumnFilter(col.key, "")}
                            >
                              <IconX size={12} />
                            </ActionIcon>
                          ) : undefined
                        }
                      />
                    ) : null}
                  </Table.Th>
                ))}
              </Table.Tr>
            )}
          </Table.Thead>

          <Table.Tbody>
            {paginatedData.length === 0 ? (
              <Table.Tr>
                <Table.Td
                  colSpan={visibleColumns.length + (selectable ? 1 : 0)}
                  className={classes.emptyState}
                >
                  <Text c="dimmed">{emptyMessage}</Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const key = String(row[rowKey]);
                const isSelected = selectedKeys.has(key);

                return (
                  <Table.Tr
                    key={key}
                    className={clsx({ [classes.selectedRow]: isSelected })}
                  >
                    {selectable && (
                      <Table.Td className={classes.selectionCell}>
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleRow(key)}
                          aria-label={`Select row ${key}`}
                          size="xs"
                        />
                      </Table.Td>
                    )}
                    {visibleColumns.map((col) => {
                      const value = getNestedValue(row, col.key);
                      const pinStyle = getPinStyle(col.key);
                      return (
                        <Table.Td
                          key={col.key}
                          className={clsx(classes.td, {
                            [classes.pinned]: pinStyle,
                            [classes.tdWrap]: col.wrap,
                          })}
                          style={{
                            textAlign: col.align || "left",
                            maxWidth: columnWidths[col.key],
                            ...pinStyle,
                          }}
                        >
                          {col.render ? (
                            col.render(value, row, rowIndex)
                          ) : (
                            <Text size="sm" truncate>
                              {value != null ? String(value) : ""}
                            </Text>
                          )}
                        </Table.Td>
                      );
                    })}
                  </Table.Tr>
                );
              })
            )}
          </Table.Tbody>
        </Table>
      </div>

      {/* Pagination footer */}
      <Group justify="space-between" align="center" className={classes.footer}>
        <Group gap="sm">
          <Text size="xs" c="dimmed">
            Rows per page:
          </Text>
          <Select
            value={String(pageSize)}
            onChange={(val) => val && setPageSizeAndReset(Number(val))}
            data={pageSizeOptions.map((n) => ({
              value: String(n),
              label: String(n),
            }))}
            size="xs"
            radius="sm"
            style={{ width: 70 }}
          />
        </Group>

        <Group gap="sm">
          <Text size="xs" c="dimmed">
            {sortedData.length === 0
              ? "0 of 0"
              : `${(page - 1) * pageSize + 1}\u2013${Math.min(page * pageSize, sortedData.length)} of ${sortedData.length}`}
          </Text>
          <Pagination
            total={totalPages}
            value={page}
            onChange={setPage}
            size="sm"
          />
        </Group>
      </Group>
    </Stack>
  );
}

Datagrid.displayName = "Datagrid";
