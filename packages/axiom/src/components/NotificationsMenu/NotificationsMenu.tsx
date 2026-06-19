import {
  ActionIcon,
  Box,
  Group,
  Indicator,
  Popover,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import type React from "react";
import { useState } from "react";
import classes from "./NotificationsMenu.module.css";

export interface NotificationItem {
  /** Unique identifier for the notification */
  id: string;
  /** Notification title */
  title: string;
  /** Supporting description text */
  description?: string;
  /** Relative time label (e.g. "2m ago") */
  time?: string;
  /** Whether the notification has been read */
  read?: boolean;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Optional accent colour for the icon tile (any CSS colour) */
  color?: string;
}

export interface NotificationsMenuProps {
  /** Notifications to display, newest first */
  notifications: NotificationItem[];
  /** Header label */
  title?: string;
  /** Message shown when there are no notifications */
  emptyLabel?: string;
  /** Max height of the scrollable list */
  maxHeight?: number;
  /** Custom trigger element. Defaults to a bell button with an unread badge. */
  children?: React.ReactNode;
  /** Called when "Mark all as read" is clicked */
  onMarkAllRead?: () => void;
  /** Called with the notification id when an item is selected */
  onSelect?: (id: string) => void;
}

export const NotificationsMenu = ({
  notifications,
  title = "Notifications",
  emptyLabel = "You're all caught up",
  maxHeight = 360,
  children,
  onMarkAllRead,
  onSelect,
}: NotificationsMenuProps) => {
  const [opened, setOpened] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSelect = (id: string) => {
    onSelect?.(id);
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      shadow="md"
      width={340}
    >
      <Popover.Target>
        <Box className={classes.trigger} onClick={() => setOpened((o) => !o)}>
          {children ?? (
            <Indicator
              label={unreadCount > 0 ? unreadCount : undefined}
              size={16}
              color="axiom-red"
              disabled={unreadCount === 0}
              offset={6}
            >
              <ActionIcon
                variant="subtle"
                color="axiom-neutral"
                size="lg"
                aria-label={`${title}, ${unreadCount} unread`}
              >
                <IconBell size={20} />
              </ActionIcon>
            </Indicator>
          )}
        </Box>
      </Popover.Target>

      <Popover.Dropdown className={classes.dropdown} p={0}>
        <Group justify="space-between" className={classes.header} wrap="nowrap">
          <Text className={classes.title}>{title}</Text>
          {unreadCount > 0 && (
            <UnstyledButton
              className={classes.markAll}
              onClick={() => onMarkAllRead?.()}
            >
              Mark all as read
            </UnstyledButton>
          )}
        </Group>

        {notifications.length === 0 ? (
          <Text className={classes.empty}>{emptyLabel}</Text>
        ) : (
          <ScrollArea.Autosize mah={maxHeight}>
            <Box className={classes.list}>
              {notifications.map((item) => (
                <UnstyledButton
                  key={item.id}
                  className={classes.item}
                  data-unread={!item.read || undefined}
                  onClick={() => handleSelect(item.id)}
                >
                  {item.icon && (
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
                  )}
                  <Box className={classes.body}>
                    <Text className={classes.itemTitle}>{item.title}</Text>
                    {item.description && (
                      <Text className={classes.description}>
                        {item.description}
                      </Text>
                    )}
                    {item.time && (
                      <Text className={classes.time}>{item.time}</Text>
                    )}
                  </Box>
                  {!item.read && <Box className={classes.unreadDot} />}
                </UnstyledButton>
              ))}
            </Box>
          </ScrollArea.Autosize>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};

NotificationsMenu.displayName = "NotificationsMenu";
