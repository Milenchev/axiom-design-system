import {
  Alert as MantineAlert,
  type AlertProps as MantineAlertProps,
} from "@mantine/core";
import React from "react";

export interface BannerProps extends MantineAlertProps {
  children: React.ReactNode;
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (props, ref) => {
    return <MantineAlert ref={ref} {...props} />;
  },
);

Banner.displayName = "Banner";
