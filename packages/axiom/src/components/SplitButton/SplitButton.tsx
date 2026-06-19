import { Button, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import type React from "react";
import classes from "./SplitButton.module.css";

export interface SplitButtonAction {
  /** Action label */
  label: string;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Render the action with the danger (destructive) style */
  danger?: boolean;
}

export interface SplitButtonProps {
  /** Label of the primary action */
  children: React.ReactNode;
  /** Primary action handler */
  onClick?: () => void;
  /** Secondary actions shown in the dropdown */
  actions: SplitButtonAction[];
  /** Mantine colour key */
  color?: string;
  /** Mantine variant */
  variant?: string;
  /** Button size */
  size?: string;
  /** Optional leading icon for the primary action */
  leftSection?: React.ReactNode;
  /** Disable the whole control */
  disabled?: boolean;
  /** Show a loading state on the primary action */
  loading?: boolean;
}

export const SplitButton = ({
  children,
  onClick,
  actions,
  color = "axiom-blue",
  variant = "filled",
  size = "sm",
  leftSection,
  disabled,
  loading,
}: SplitButtonProps) => (
  <Button.Group>
    <Button
      color={color}
      variant={variant}
      size={size}
      leftSection={leftSection}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {children}
    </Button>

    <Menu position="bottom-end" shadow="md" width={200} withinPortal>
      <Menu.Target>
        <Button
          color={color}
          variant={variant}
          size={size}
          disabled={disabled}
          className={classes.toggle}
          aria-label="More actions"
        >
          <IconChevronDown size={16} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {actions.map((action) => (
          <Menu.Item
            key={action.label}
            leftSection={action.icon}
            color={action.danger ? "axiom-red" : undefined}
            onClick={action.onClick}
          >
            {action.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  </Button.Group>
);

SplitButton.displayName = "SplitButton";
