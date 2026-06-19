import {
  Text as MantineText,
  type TextProps as MantineTextProps,
} from "@mantine/core";
import clsx from "clsx";
import React from "react";
import classes from "./Text.module.css";

export interface TextProps
  extends MantineTextProps,
    Omit<React.ComponentPropsWithoutRef<"p">, keyof MantineTextProps> {}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, ...props }, ref) => {
    return (
      <MantineText
        ref={ref}
        className={clsx(classes.root, className)}
        {...props}
      />
    );
  },
);

Text.displayName = "Text";
