import {
  Card as MantineCard,
  type CardProps as MantineCardProps,
} from "@mantine/core";
import clsx from "clsx";
import React from "react";
import classes from "./Card.module.css";

export interface CardProps extends MantineCardProps {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <MantineCard
        ref={ref}
        className={clsx(classes.root, className)}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export const CardSection = MantineCard.Section;
