import clsx from "clsx";
import React, { useMemo } from "react";

export interface GridLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The data to configure grid layout sections
   * 'layout' is an array of the following objects:
   *   'key' maps the grid layout section to a div KEY
   *   'row' is the y coordinate (FROM TOP) to the grid layout section (0-indexed)
   *   'col' is the x coordinate (FROM LEFT) to the grid layout section (0-indexed)
   *   'colSpan' is the width (IN UNITS) of the grid layout section (default: 1)
   *   'rowSpan' is the height (IN UNITS) of the grid layout section (default: 1)
   */
  layout: {
    key: string;
    row: number;
    col: number;
    rowSpan?: number;
    colSpan?: number;
  }[];

  /**
   * The minimum row height in pixels before the vertical bar appears (used when rowHeight is 'auto')
   * (default: 250)
   */
  minRowHeight?: number;

  /**
   * Row height of each row in the grid.
   *    - 'auto' (default): rows fit the height but not shorter than 'minRowHeight'.
   *    - number in pixels: constant height.
   */
  rowHeight?: number | "auto";

  /**
   * One or more React components enclosed in a <div> with a 'key' property corresponding to the layout config.
   */
  children: React.ReactNode;

  /**
   * margin in pixels between all widgets in the grid lattice (default: 10)
   */
  gap?: number;

  /**
   * total number of columns in the grid. (default: 1)
   */
  columns?: number;

  /**
   * total number of rows in the grid. (default: 1)
   */
  rows?: number;
}

export const GridLayout = React.forwardRef<HTMLDivElement, GridLayoutProps>(
  (
    {
      layout,
      minRowHeight = 250,
      rowHeight = "auto",
      children,
      gap = 10,
      className,
      columns = 1,
      rows = 1,
      style,
      ...rest
    },
    ref,
  ) => {
    // Calculate total columns and rows based on the layout and props
    const { totalColumns, totalRows } = useMemo(() => {
      let maxCol = columns;
      let maxRow = rows;

      layout.forEach((item) => {
        const itemMaxCol = item.col + (item.colSpan || 1);
        const itemMaxRow = item.row + (item.rowSpan || 1);
        if (itemMaxCol > maxCol) maxCol = itemMaxCol;
        if (itemMaxRow > maxRow) maxRow = itemMaxRow;
      });

      return { totalColumns: maxCol, totalRows: maxRow };
    }, [layout, columns, rows]);

    // Create a map of layout items by key for quick lookup
    const layoutMap = useMemo(() => {
      const map = new Map<string, (typeof layout)[0]>();
      layout.forEach((item) => {
        map.set(item.key, item);
      });
      return map;
    }, [layout]);

    // Define CSS Grid styles
    const gridStyle: React.CSSProperties = {
      display: "grid",
      gridTemplateColumns: `repeat(${totalColumns}, 1fr)`,
      gridTemplateRows:
        rowHeight === "auto"
          ? `repeat(${totalRows}, minmax(${minRowHeight}px, 1fr))`
          : `repeat(${totalRows}, ${rowHeight}px)`,
      gap: `${gap}px`,
      width: "100%",
      height: rowHeight === "auto" ? "100%" : "auto",
      ...style,
    };

    // Render children with grid positioning styles
    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        // Safely extract the original key (React sometimes prefixes keys with ".$")
        const childKey =
          child.key != null ? String(child.key).replace(/^\.\$/, "") : "";
        const layoutItem =
          layoutMap.get(childKey) || layoutMap.get(child.key as string);

        if (layoutItem) {
          const existingStyle = (child.props as Record<string, unknown>)
            .style as React.CSSProperties | undefined;
          const childStyle: React.CSSProperties = {
            ...(existingStyle || {}),
            // CSS Grid is 1-indexed, while the layout prop is 0-indexed
            gridColumn: `${layoutItem.col + 1} / span ${layoutItem.colSpan || 1}`,
            gridRow: `${layoutItem.row + 1} / span ${layoutItem.rowSpan || 1}`,
            minWidth: 0, // Prevent grid items from blowing out the grid
            minHeight: 0,
          };

          const typedChild = child as React.ReactElement<
            Record<string, unknown>
          >;
          return React.cloneElement(typedChild, {
            ...typedChild.props,
            style: childStyle,
          });
        }

        return child;
      });
    };

    return (
      <div
        ref={ref}
        className={clsx("pillar-gridlayout", className)}
        style={gridStyle}
        {...rest}
      >
        {renderChildren()}
      </div>
    );
  },
);

GridLayout.displayName = "GridLayout";
