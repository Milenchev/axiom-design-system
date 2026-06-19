import {
  IconArrowDown,
  IconArrowUp,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import clsx from "clsx";
import React from "react";
import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import classes from "./MetricCard.module.css";

export type MetricCardTrendDirection = "up" | "down";

export interface MetricCardProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  /** Descriptive label (e.g. "Total Revenue") */
  label: string;
  /** Formatted metric value (e.g. "$1.2M") */
  value: string;
  /** Optional icon element displayed in the header */
  icon?: React.ReactNode;
  /** Optional action element displayed top-right (e.g. menu button) */
  action?: React.ReactNode;
  /** Trend percentage (e.g. 12 for +12%) */
  trend?: number;
  /** Override automatic trend direction derived from sign of `trend` */
  trendDirection?: MetricCardTrendDirection;
  /** Comparison context (e.g. "Since last day") */
  trendLabel?: string;
  /** Optional description text below the value */
  description?: string;
  /** Show trend as an inline badge next to value instead of below */
  trendInline?: boolean;
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      label,
      value,
      icon,
      action,
      trend,
      trendDirection,
      trendLabel,
      description,
      trendInline = false,
      className,
      ...props
    },
    ref,
  ) => {
    const direction =
      trendDirection ?? (trend !== undefined && trend >= 0 ? "up" : "down");

    const trendContent =
      trend !== undefined &&
      (trendInline ? (
        <div className={classes.trendBadge} data-direction={direction}>
          {direction === "up" ? (
            <IconTrendingUp size={14} stroke={2} />
          ) : (
            <IconTrendingDown size={14} stroke={2} />
          )}
          <span>{Math.abs(trend)}%</span>
        </div>
      ) : (
        <div className={classes.trendText} data-direction={direction}>
          {direction === "up" ? (
            <IconArrowUp size={16} stroke={2.5} />
          ) : (
            <IconArrowDown size={16} stroke={2.5} />
          )}
          <span className={classes.trendValue}>{Math.abs(trend)}%</span>
          {trendLabel && (
            <span className={classes.trendLabel}>{trendLabel}</span>
          )}
        </div>
      ));

    return (
      <Card
        ref={ref}
        padding={8}
        radius="lg"
        shadow="sm"
        className={clsx(classes.root, className)}
        {...props}
      >
        <div className={classes.layout}>
          {icon && (
            <div className={classes.iconColumn}>
              <div className={classes.iconCircle}>{icon}</div>
            </div>
          )}
          <div className={classes.content}>
            <div className={classes.header}>
              <Text className={classes.label}>{label}</Text>
              {action && <div className={classes.action}>{action}</div>}
            </div>

            {trendInline ? (
              <div className={classes.valueRow}>
                <Text className={classes.value}>{value}</Text>
                {trendContent}
              </div>
            ) : (
              <Text className={classes.value}>{value}</Text>
            )}

            {!trendInline && trendContent}

            {description && (
              <Text className={classes.description}>{description}</Text>
            )}
          </div>
        </div>
      </Card>
    );
  },
);

MetricCard.displayName = "MetricCard";
