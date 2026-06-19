import { Box, SimpleGrid } from "@mantine/core";
import type React from "react";
import classes from "./KeyValueList.module.css";

export interface KeyValueItem {
  /** Field label */
  label: React.ReactNode;
  /** Field value */
  value: React.ReactNode;
}

export interface KeyValueListProps {
  /** Label–value pairs to display */
  items: KeyValueItem[];
  /**
   * Layout of each pair.
   * - `horizontal`: label and value on the same row.
   * - `vertical`: label above the value.
   */
  layout?: "horizontal" | "vertical";
  /** Number of columns */
  columns?: number;
}

export const KeyValueList = ({
  items,
  layout = "horizontal",
  columns = 1,
}: KeyValueListProps) => (
  <SimpleGrid
    cols={columns}
    spacing="sm"
    verticalSpacing="xs"
    component="dl"
    className={classes.list}
  >
    {items.map((item, index) => (
      <Box
        // biome-ignore lint/suspicious/noArrayIndexKey: labels may repeat, index keeps order stable
        key={index}
        className={classes.row}
        data-layout={layout}
      >
        <Box component="dt" className={classes.label}>
          {item.label}
        </Box>
        <Box component="dd" className={classes.value}>
          {item.value}
        </Box>
      </Box>
    ))}
  </SimpleGrid>
);

KeyValueList.displayName = "KeyValueList";
