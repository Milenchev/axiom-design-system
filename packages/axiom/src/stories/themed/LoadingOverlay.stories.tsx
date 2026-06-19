import { Box, Button, Group, LoadingOverlay } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof LoadingOverlay> = {
  title: "Themed/LoadingOverlay",
  component: LoadingOverlay,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

export const Primary: Story = {
  render: () => (
    <Box pos="relative" style={{ width: 400, height: 200 }}>
      <LoadingOverlay visible />
      <Group p="md">
        <Button>Hidden button</Button>
        <span>Content behind overlay</span>
      </Group>
    </Box>
  ),
};
