import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
} from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import React from "react";
import classes from "./AiButton.module.css";

export interface AiButtonProps
  extends Omit<MantineButtonProps, "variant" | "size">,
    Omit<React.ComponentPropsWithoutRef<"button">, keyof MantineButtonProps> {
  /** Button label. Defaults to "Ask AI" */
  children?: React.ReactNode;
}

export const AiButton = React.forwardRef<HTMLButtonElement, AiButtonProps>(
  ({ children = "Ask AI", leftSection, className, ...props }, ref) => {
    return (
      <MantineButton
        ref={ref}
        size="xs"
        variant="outline"
        leftSection={leftSection ?? <IconSparkles size={14} />}
        className={`${classes.root} ${className ?? ""}`}
        {...props}
      >
        {children}
      </MantineButton>
    );
  },
);

AiButton.displayName = "AiButton";
