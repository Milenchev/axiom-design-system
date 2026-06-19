import { Group, Pill } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Pill> = {
  title: "Themed/Pill",
  component: Pill,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Primary: Story = {
  args: {
    children: "React",
  },
};

export const Removable: Story = {
  render: () => (
    <Pill.Group>
      <Pill withRemoveButton>React</Pill>
      <Pill withRemoveButton>TypeScript</Pill>
      <Pill withRemoveButton>Mantine</Pill>
    </Pill.Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group>
      <Pill size="xs">Extra small</Pill>
      <Pill size="sm">Small</Pill>
      <Pill size="md">Medium</Pill>
      <Pill size="lg">Large</Pill>
    </Group>
  ),
};
