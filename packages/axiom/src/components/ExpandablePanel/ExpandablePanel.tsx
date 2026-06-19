import {
  Accordion as MantineAccordion,
  type AccordionProps as MantineAccordionProps,
} from "@mantine/core";
import React from "react";

export interface ExpandablePanelProps
  extends Omit<MantineAccordionProps, "children" | "title"> {
  /**
   * The title/header of the panel
   */
  title: React.ReactNode;

  /**
   * The content to display when the panel is expanded
   */
  children: React.ReactNode;

  /**
   * Determines if the panel is open by default (uncontrolled)
   */
  defaultExpanded?: boolean;
}

export const ExpandablePanel = React.forwardRef<
  HTMLDivElement,
  ExpandablePanelProps
>((props, ref) => {
  const {
    title,
    children,
    defaultExpanded = false,
    defaultValue,
    ...rest
  } = props;

  const ITEM_VALUE = "panel";

  return (
    <MantineAccordion
      ref={ref}
      defaultValue={defaultExpanded ? ITEM_VALUE : defaultValue}
      {...rest}
    >
      <MantineAccordion.Item value={ITEM_VALUE}>
        <MantineAccordion.Control>{title}</MantineAccordion.Control>
        <MantineAccordion.Panel>{children}</MantineAccordion.Panel>
      </MantineAccordion.Item>
    </MantineAccordion>
  );
});

ExpandablePanel.displayName = "ExpandablePanel";
