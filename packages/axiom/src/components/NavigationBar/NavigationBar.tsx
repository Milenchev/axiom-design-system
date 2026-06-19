import { px, Tabs, type TabsProps } from "@mantine/core";
import type React from "react";
import { useState } from "react";
import classes from "./NavigationBar.module.css";

export interface NavItem {
  value: string;
  label: React.ReactNode;
  type?: "action" | "link" | (string & {});
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  disabled?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

export interface NavigationBarProps extends Omit<TabsProps, "children"> {
  items: NavItem[];
  height?: number;
}

export const NavigationBar = ({
  items,
  height = 40,
  value,
  defaultValue,
  onChange,
  ...tabsProps
}: NavigationBarProps) => {
  const [internalValue, setInternalValue] = useState<string | null>(
    defaultValue !== undefined ? defaultValue : null,
  );

  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;

  const handleChange = (val: string | null) => {
    const targetItem = items.find((item) => item.value === val);

    // Actions and links only trigger onChange and do not update internal state
    if (
      targetItem &&
      (targetItem.type === "action" || targetItem.type === "link")
    ) {
      if (onChange) {
        onChange(val);
      }
      return;
    }

    if (!isControlled) {
      setInternalValue(val);
    }

    if (onChange) {
      onChange(val);
    }
  };

  return (
    <Tabs
      variant="none"
      value={activeValue}
      onChange={handleChange}
      {...tabsProps}
      classNames={{
        tab: classes.tab,
      }}
      style={{
        height,
        width: "100%",
        borderBottom: "1px solid var(--mantine-color-default-border)",
        backgroundColor: "var(--mantine-color-body)",
      }}
      styles={{
        tab: {
          height,
          paddingLeft: px(12),
          paddingRight: px(12),
          textTransform: "uppercase",
          fontSize: 13,
        },
        list: {
          gap: 0,
        },
      }}
    >
      <Tabs.List style={{ height }}>
        {items.map(
          ({
            label,
            value: itemValue,
            type,
            href,
            target,
            disabled,
            leftSection,
            rightSection,
          }) => {
            const isLink = type === "link" && href;
            return (
              <Tabs.Tab
                key={itemValue}
                value={itemValue}
                disabled={disabled}
                leftSection={leftSection}
                rightSection={rightSection}
                renderRoot={
                  isLink
                    ? (props) => (
                        <a
                          {...props}
                          href={href}
                          target={target || "_blank"}
                          rel={
                            target === "_blank" || !target
                              ? "noopener noreferrer"
                              : undefined
                          }
                        />
                      )
                    : undefined
                }
              >
                {label}
              </Tabs.Tab>
            );
          },
        )}
      </Tabs.List>
    </Tabs>
  );
};
