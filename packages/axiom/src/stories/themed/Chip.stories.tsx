import { Chip, Group } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Chip> = {
  title: "Themed/Chip",
  component: Chip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
  args: {
    children: "Chip",
    defaultChecked: true,
  },
};

export const Variants: Story = {
  render: () => (
    <Group>
      <Chip defaultChecked variant="outline">
        Outline
      </Chip>
      <Chip defaultChecked variant="filled">
        Filled
      </Chip>
      <Chip defaultChecked variant="light">
        Light
      </Chip>
    </Group>
  ),
};

export const ChipGroup: Story = {
  render: () => (
    <Chip.Group multiple defaultValue={["react", "ts"]}>
      <Group>
        <Chip value="react">React</Chip>
        <Chip value="ts">TypeScript</Chip>
        <Chip value="vue">Vue</Chip>
        <Chip value="svelte">Svelte</Chip>
      </Group>
    </Chip.Group>
  ),
};
