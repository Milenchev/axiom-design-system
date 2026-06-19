import React from "react";
import { Button } from "../Button";
import classes from "./FilterBar.module.css";

export interface FilterBarProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  onApply?: () => void;
  onClear?: () => void;
}

export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  ({ children, onApply, onClear, ...rest }, ref) => {
    return (
      <div ref={ref} className={classes.root} {...rest}>
        <div className={classes.filters}>{children}</div>
        <div className={classes.actions}>
          {onClear && (
            <Button variant="subtle" onClick={onClear}>
              Clear
            </Button>
          )}
          {onApply && <Button onClick={onApply}>Apply</Button>}
        </div>
      </div>
    );
  },
);

FilterBar.displayName = "FilterBar";
