import {
  Box,
  type BoxProps,
  Group,
  NavLink,
  rem,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconExternalLink, IconSearch } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode | number | string;
  rightSection?: React.ReactNode;
  children?: SidebarItem[];
  defaultOpened?: boolean;
  external?: boolean;
  onClick?: () => void;
}

export interface SidebarProps extends BoxProps {
  applicationName?: React.ReactNode;
  applicationIcon?: React.ReactNode;
  withSearch?: boolean;
  searchPlaceholder?: string;
  searchShortcut?: React.ReactNode;
  items?: SidebarItem[];
  footerItems?: SidebarItem[];
  activeItemId?: string | null;
  defaultActiveItemId?: string | null;
  onActiveItemChange?: (itemId: string) => void;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchChange?: (value: string) => void;
  children?: React.ReactNode;
}

const hasActiveDescendant = (
  items: SidebarItem[] | undefined,
  activeItemId: string | null,
): boolean => {
  if (!items || !activeItemId) {
    return false;
  }

  return items.some(
    (item) =>
      item.id === activeItemId ||
      hasActiveDescendant(item.children, activeItemId),
  );
};

const createInitialOpenedState = (
  items: SidebarItem[],
  activeItemId: string | null,
) => {
  return items.reduce<Record<string, boolean>>((acc, item) => {
    if (item.children && item.children.length > 0) {
      acc[item.id] =
        item.defaultOpened === true ||
        hasActiveDescendant(item.children, activeItemId);
      Object.assign(acc, createInitialOpenedState(item.children, activeItemId));
    }

    return acc;
  }, {});
};

const filterItems = (items: SidebarItem[], query: string): SidebarItem[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  return items.reduce<SidebarItem[]>((acc, item) => {
    const matchesSelf = item.label.toLowerCase().includes(normalizedQuery);
    const filteredChildren = item.children
      ? filterItems(item.children, normalizedQuery)
      : undefined;

    if (matchesSelf || (filteredChildren && filteredChildren.length > 0)) {
      acc.push({
        ...item,
        children: filteredChildren,
      });
    }

    return acc;
  }, []);
};

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      applicationName,
      applicationIcon,
      withSearch = false,
      searchPlaceholder = "Search",
      searchShortcut,
      items,
      footerItems,
      activeItemId,
      defaultActiveItemId = null,
      onActiveItemChange,
      searchValue,
      defaultSearchValue = "",
      onSearchChange,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const theme = useMantineTheme();
    const primaryPalette =
      theme.colors[theme.primaryColor] ?? theme.colors.blue;
    const _primaryColor =
      primaryPalette[6] ?? primaryPalette[primaryPalette.length - 1];
    const [uncontrolledActiveItemId, setUncontrolledActiveItemId] = useState<
      string | null
    >(defaultActiveItemId);
    const [uncontrolledSearchValue, setUncontrolledSearchValue] =
      useState(defaultSearchValue);
    const resolvedActiveItemId =
      activeItemId !== undefined ? activeItemId : uncontrolledActiveItemId;
    const resolvedSearchValue =
      searchValue !== undefined ? searchValue : uncontrolledSearchValue;
    const structuredItems = items ?? [];
    const hasStructuredContent =
      structuredItems.length > 0 ||
      applicationIcon !== undefined ||
      applicationName !== undefined;
    const initialOpenedState = useMemo(
      () => createInitialOpenedState(structuredItems, resolvedActiveItemId),
      [structuredItems, resolvedActiveItemId],
    );
    const [openedSections, setOpenedSections] =
      useState<Record<string, boolean>>(initialOpenedState);
    const visibleItems = useMemo(
      () => filterItems(structuredItems, resolvedSearchValue),
      [structuredItems, resolvedSearchValue],
    );
    const shouldRenderHeader =
      applicationIcon !== undefined || applicationName !== undefined;

    if (!hasStructuredContent && children) {
      return (
        <Box ref={ref} style={style} {...rest}>
          {children}
        </Box>
      );
    }

    const handleSearchChange = (value: string) => {
      if (searchValue === undefined) {
        setUncontrolledSearchValue(value);
      }

      onSearchChange?.(value);
    };

    const handleItemSelect = (item: SidebarItem) => {
      if (item.children && item.children.length > 0) {
        setOpenedSections((current) => ({
          ...current,
          [item.id]: !(
            current[item.id] ??
            initialOpenedState[item.id] ??
            false
          ),
        }));
      } else {
        if (activeItemId === undefined) {
          setUncontrolledActiveItemId(item.id);
        }

        onActiveItemChange?.(item.id);
      }

      item.onClick?.();
    };

    const renderAdornment = (item: SidebarItem) => {
      if (item.rightSection) {
        return item.rightSection;
      }

      if (item.badge !== undefined) {
        if (React.isValidElement(item.badge)) {
          return item.badge;
        }

        return (
          <Box
            style={{
              minWidth: rem(34),
              height: rem(34),
              borderRadius: rem(999),
              border: "1px solid var(--mantine-color-default-border)",
              backgroundColor: "var(--mantine-color-body)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingInline: rem(10),
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          >
            <Text size="xs" fw={500}>
              {item.badge}
            </Text>
          </Box>
        );
      }

      if (item.external) {
        return (
          <IconExternalLink
            size={16}
            stroke={1.8}
            color="var(--mantine-color-dimmed)"
          />
        );
      }

      return undefined;
    };

    const renderItems = (entries: SidebarItem[], level = 0) => {
      return entries.map((item) => {
        const hasChildren = !!item.children && item.children.length > 0;
        const isActive = resolvedActiveItemId === item.id;
        const isOpen = resolvedSearchValue.trim()
          ? hasChildren
          : (openedSections[item.id] ?? initialOpenedState[item.id] ?? false);
        const isPrimaryLevel = level === 0;
        const fontWeight = isActive ? 600 : isPrimaryLevel ? 600 : 400;

        return (
          <NavLink
            key={item.id}
            active={isActive}
            label={item.label}
            leftSection={item.icon ? item.icon : undefined}
            rightSection={renderAdornment(item)}
            opened={isOpen}
            onClick={(e) => {
              if (item.external) {
                // External links keep default browser navigation
              } else {
                e.preventDefault();
                handleItemSelect(item);
              }
            }}
            onChange={(opened) => {
              if (hasChildren) {
                setOpenedSections((current) => ({
                  ...current,
                  [item.id]: opened,
                }));
              }
            }}
            fw={fontWeight}
            variant="light"
            autoContrast
            childrenOffset="lg"
            noWrap={true}
          >
            {hasChildren ? renderItems(item.children ?? [], level + 1) : null}
          </NavLink>
        );
      });
    };

    return (
      <Box
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: rem(12),
          height: "100%",
          minHeight: 0,
          width: "100%",
          minWidth: 0,
          padding: 0,
          boxSizing: "border-box",
          backgroundColor: "transparent",
          ...style,
        }}
        {...rest}
      >
        {shouldRenderHeader ? (
          <Group gap="sm" wrap="nowrap">
            {applicationIcon}

            {applicationName !== undefined ? (
              <Text fw={600} size="sm" style={{ minWidth: 0, lineHeight: 1.2 }}>
                {applicationName}
              </Text>
            ) : null}
          </Group>
        ) : null}

        {withSearch ? (
          <TextInput
            value={resolvedSearchValue}
            onChange={(event) => handleSearchChange(event.currentTarget.value)}
            placeholder={searchPlaceholder}
            leftSection={<IconSearch size={16} stroke={1.8} />}
            rightSection={
              searchShortcut ? (
                <Box
                  style={{
                    height: rem(28),
                    minWidth: rem(38),
                    borderRadius: rem(8),
                    border: "1px solid var(--mantine-color-default-border)",
                    backgroundColor: "var(--mantine-color-body)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingInline: rem(8),
                    boxSizing: "border-box",
                  }}
                >
                  <Text size="xs" fw={500} c="dimmed">
                    {searchShortcut}
                  </Text>
                </Box>
              ) : null
            }
            styles={{
              input: {
                height: rem(40),
                borderRadius: rem(10),
                borderColor: "var(--mantine-color-default-border)",
                fontSize: theme.fontSizes.sm,
                paddingLeft: rem(38),
                paddingRight: rem(48),
              },
              section: {
                width: rem(38),
              },
            }}
          />
        ) : null}

        <Box style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
          {visibleItems.length > 0 ? (
            renderItems(visibleItems)
          ) : (
            <Text size="sm" c="dimmed">
              No results found.
            </Text>
          )}
          {children}
        </Box>
      </Box>
    );
  },
);

Sidebar.displayName = "Sidebar";
