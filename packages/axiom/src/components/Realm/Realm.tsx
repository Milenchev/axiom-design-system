import {
  Box,
  Group,
  Text,
  UnstyledButton,
  type UnstyledButtonProps,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import classes from "./Realm.module.css";

export type RealmEnvironment = "production" | "staging" | "dev";

export interface RealmProps extends Omit<UnstyledButtonProps, "children"> {
  /** Region name (e.g. "AMER", "EMER", "APAC") */
  region: string;
  /** Environment name */
  environment: RealmEnvironment;
}

const environmentLabels: Record<RealmEnvironment, string> = {
  production: "Production",
  staging: "Staging",
  dev: "Dev",
};

export const Realm = React.forwardRef<HTMLButtonElement, RealmProps>(
  ({ region, environment, className, ...rest }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        className={`${classes.root}${className ? ` ${className}` : ""}`}
        {...rest}
      >
        <Group gap={0} wrap="nowrap" align="center">
          <Box className={classes.dot} data-environment={environment} />
          <Text className={classes.region}>{region}</Text>
          <Text className={classes.environment}>
            {environmentLabels[environment]}
          </Text>
          <IconChevronDown size={14} className={classes.chevron} />
        </Group>
      </UnstyledButton>
    );
  },
);

Realm.displayName = "Realm";
