import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
} from "@mantine/core";
import clsx from "clsx";
import React from "react";
import classes from "./Button.module.css";

export type ButtonIntent = "primary" | "secondary" | "danger" | "success";

const intentMap: Record<
  ButtonIntent,
  { variant: MantineButtonProps["variant"]; color?: string }
> = {
  primary: { variant: "filled" },
  secondary: { variant: "outline" },
  danger: { variant: "filled", color: "axiom-red" },
  success: { variant: "filled", color: "axiom-green" },
};

export interface ButtonProps
  extends MantineButtonProps,
    Omit<React.ComponentPropsWithoutRef<"button">, keyof MantineButtonProps> {
  /** Semantic intent — maps to a predefined variant + color combination. */
  intent?: ButtonIntent;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, variant, color, ...props }, ref) => {
    const resolved = intent ? intentMap[intent] : undefined;

    return (
      <MantineButton
        ref={ref}
        className={clsx(classes.root, className)}
        variant={variant ?? resolved?.variant}
        color={color ?? resolved?.color}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
