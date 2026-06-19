import { Group, Kbd, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Kbd> = {
  title: "Themed/Kbd",
  component: Kbd,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Primary: Story = {
  args: {
    children: "Ctrl",
  },
};

export const Shortcut: Story = {
  render: () => (
    <Group gap={4} align="center">
      <Kbd>⌘</Kbd>
      <Text span>+</Text>
      <Kbd>K</Kbd>
      <Text span ml="sm" c="dimmed" size="sm">
        Open command palette
      </Text>
    </Group>
  ),
};
