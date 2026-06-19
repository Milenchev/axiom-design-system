import {
  Box,
  Group,
  Popover,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import type React from "react";
import { useState } from "react";
import type { RealmEnvironment } from "@/components/Realm";
import classes from "./RealmMenu.module.css";

export interface RealmMenuItem {
  /** Region name (e.g. "AMER", "EMER", "APAC") */
  region: string;
  /** Available environments for this region */
  environments: readonly RealmEnvironment[];
}

export interface RealmSelection {
  region: string;
  environment: RealmEnvironment;
}

export interface RealmMenuProps {
  /** List of realms grouped by region */
  items: RealmMenuItem[];
  /** Currently selected realm */
  value?: RealmSelection;
  /** Called when a realm environment is selected */
  onChange?: (selection: RealmSelection) => void;
  /** The trigger element (e.g. <Realm />) */
  children: React.ReactNode;
  /** Max height for the scrollable area */
  maxHeight?: number;
}

const environmentLabels: Record<RealmEnvironment, string> = {
  production: "Production",
  staging: "Staging",
  dev: "Dev",
};

export const RealmMenu = ({
  items,
  value,
  onChange,
  children,
  maxHeight = 400,
}: RealmMenuProps) => {
  const [opened, setOpened] = useState(false);

  const handleSelect = (region: string, environment: RealmEnvironment) => {
    onChange?.({ region, environment });
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-start"
      shadow="md"
      width={240}
    >
      <Popover.Target>
        <Box onClick={() => setOpened((o) => !o)}>{children}</Box>
      </Popover.Target>

      <Popover.Dropdown className={classes.dropdown} p={0}>
        <Text className={classes.header}>Select Realm &amp; Environment</Text>

        <ScrollArea.Autosize mah={maxHeight}>
          <Box className={classes.content}>
            {items.map((item) => (
              <Box key={item.region} className={classes.regionGroup}>
                <Group gap="xs" className={classes.regionHeader} wrap="nowrap">
                  <IconWorld size={16} className={classes.regionIcon} />
                  <Text className={classes.regionName}>{item.region}</Text>
                </Group>

                {item.environments.map((env) => {
                  const isSelected =
                    value?.region === item.region && value?.environment === env;

                  return (
                    <UnstyledButton
                      key={env}
                      className={classes.envItem}
                      data-selected={isSelected || undefined}
                      onClick={() => handleSelect(item.region, env)}
                    >
                      <Box className={classes.envDot} data-environment={env} />
                      <Text className={classes.envLabel}>
                        {environmentLabels[env]}
                      </Text>
                    </UnstyledButton>
                  );
                })}
              </Box>
            ))}
          </Box>
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  );
};

RealmMenu.displayName = "RealmMenu";
