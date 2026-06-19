import {
  Avatar,
  Box,
  Group,
  Menu,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import type React from "react";
import classes from "./UserMenu.module.css";

export interface UserMenuItem {
  /** Item label */
  label: string;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Render the item with the danger (destructive) style */
  danger?: boolean;
  /** Render a divider above this item */
  withDividerBefore?: boolean;
}

export interface UserMenuProps {
  /** Display name of the signed-in user */
  name: string;
  /** Secondary line, usually the email address */
  email?: string;
  /** Avatar image URL */
  avatar?: string;
  /** Menu items */
  items?: UserMenuItem[];
  /** Custom trigger element. Defaults to avatar + name + chevron. */
  children?: React.ReactNode;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const UserMenu = ({
  name,
  email,
  avatar,
  items = [],
  children,
}: UserMenuProps) => (
  <Menu position="bottom-end" shadow="md" width={240} withinPortal>
    <Menu.Target>
      {children ?? (
        <UnstyledButton className={classes.trigger}>
          <Group gap="xs" wrap="nowrap">
            <Avatar src={avatar} radius="xl" size={32}>
              {initials(name)}
            </Avatar>
            <Box className={classes.triggerText}>
              <Text className={classes.triggerName}>{name}</Text>
            </Box>
            <IconChevronDown size={16} className={classes.chevron} />
          </Group>
        </UnstyledButton>
      )}
    </Menu.Target>

    <Menu.Dropdown>
      <Group gap="xs" wrap="nowrap" className={classes.header}>
        <Avatar src={avatar} radius="xl" size={36}>
          {initials(name)}
        </Avatar>
        <Stack gap={0} className={classes.headerText}>
          <Text className={classes.name}>{name}</Text>
          {email && <Text className={classes.email}>{email}</Text>}
        </Stack>
      </Group>

      {items.map((item) => (
        <Box key={item.label}>
          {item.withDividerBefore && <Menu.Divider />}
          <Menu.Item
            leftSection={item.icon}
            color={item.danger ? "axiom-red" : undefined}
            onClick={item.onClick}
          >
            {item.label}
          </Menu.Item>
        </Box>
      ))}
    </Menu.Dropdown>
  </Menu>
);

UserMenu.displayName = "UserMenu";
