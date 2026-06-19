import { Title } from "@mantine/core";
import clsx from "clsx";
import React from "react";
import { Text } from "@/components/Text";
import classes from "./PageHeading.module.css";

export interface PageHeadingProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  /** Page title */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
}

export const PageHeading = React.forwardRef<HTMLDivElement, PageHeadingProps>(
  ({ title, subtitle, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx(classes.root, className)} {...props}>
        <Title order={1} className={classes.title}>
          {title}
        </Title>
        {subtitle && <Text className={classes.subtitle}>{subtitle}</Text>}
      </div>
    );
  },
);

PageHeading.displayName = "PageHeading";
