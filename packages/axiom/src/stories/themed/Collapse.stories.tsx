import { Box, Button, Collapse, Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta: Meta<typeof Collapse> = {
  title: "Themed/Collapse",
  component: Collapse,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Primary: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    return (
      <Stack w={360}>
        <Button onClick={() => setOpened((o) => !o)} w="fit-content">
          {opened ? "Hide details" : "Show details"}
        </Button>
        <Collapse in={opened}>
          <Box
            p="md"
            style={{
              border: "1px solid var(--axiom-border)",
              borderRadius: "var(--mantine-radius-sm)",
            }}
          >
            <Text size="sm">
              This content is revealed with a smooth height animation when the
              Collapse is opened.
            </Text>
          </Box>
        </Collapse>
      </Stack>
    );
  },
};
