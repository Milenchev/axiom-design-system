import {
  ActionIcon,
  Box,
  Popover,
  SimpleGrid,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconLayoutGrid } from "@tabler/icons-react";
import type React from "react";
import { useState } from "react";
import classes from "./ProductMenu.module.css";

export interface ProductMenuItem {
  /** Unique identifier for the product */
  id: string;
  /** Product name shown under the icon */
  name: string;
  /** Icon rendered inside the product tile */
  icon: React.ReactNode;
  /** Optional accent colour for the icon tile (any CSS colour) */
  color?: string;
  /** Navigation target — rendered as an anchor when provided */
  href?: string;
  /** Click handler — used when href is not provided */
  onClick?: () => void;
}

export interface ProductMenuProps {
  /** Products to display in the switcher grid */
  products: ProductMenuItem[];
  /** Id of the currently active product */
  activeId?: string;
  /** Header label shown above the grid */
  title?: string;
  /** Number of columns in the grid */
  columns?: number;
  /** Custom trigger element. Defaults to a grid icon button. */
  children?: React.ReactNode;
  /** Called with the product id when an item is selected */
  onSelect?: (id: string) => void;
}

export const ProductMenu = ({
  products,
  activeId,
  title = "Switch product",
  columns = 3,
  children,
  onSelect,
}: ProductMenuProps) => {
  const [opened, setOpened] = useState(false);

  const handleSelect = (item: ProductMenuItem) => {
    item.onClick?.();
    onSelect?.(item.id);
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      shadow="md"
      width={columns * 96 + 24}
    >
      <Popover.Target>
        <Box className={classes.trigger} onClick={() => setOpened((o) => !o)}>
          {children ?? (
            <ActionIcon
              variant="subtle"
              color="axiom-neutral"
              size="lg"
              aria-label={title}
            >
              <IconLayoutGrid size={20} />
            </ActionIcon>
          )}
        </Box>
      </Popover.Target>

      <Popover.Dropdown className={classes.dropdown} p={0}>
        <Text className={classes.header}>{title}</Text>

        <SimpleGrid cols={columns} spacing={4} p="xs" pt={4}>
          {products.map((item) => {
            const isActive = item.id === activeId;
            const anchorProps = item.href
              ? ({ component: "a", href: item.href } as const)
              : {};

            return (
              <UnstyledButton
                key={item.id}
                {...anchorProps}
                className={classes.item}
                data-active={isActive || undefined}
                onClick={() => handleSelect(item)}
              >
                <Box
                  className={classes.iconTile}
                  style={
                    item.color
                      ? { backgroundColor: item.color, color: "#fff" }
                      : undefined
                  }
                >
                  {item.icon}
                </Box>
                <Text className={classes.name}>{item.name}</Text>
              </UnstyledButton>
            );
          })}
        </SimpleGrid>
      </Popover.Dropdown>
    </Popover>
  );
};

ProductMenu.displayName = "ProductMenu";
