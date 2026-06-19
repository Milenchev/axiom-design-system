import { Group, ThemeIcon } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconBell,
  IconCheck,
  IconHeart,
  IconSettings,
} from "@tabler/icons-react";

const meta: Meta<typeof ThemeIcon> = {
  title: "Themed/ThemeIcon",
  component: ThemeIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeIcon>;

export const Primary: Story = {
  render: () => (
    <ThemeIcon>
      <IconCheck size={18} />
    </ThemeIcon>
  ),
};

export const Variants: Story = {
  render: () => (
    <Group>
      <ThemeIcon variant="filled">
        <IconHeart size={18} />
      </ThemeIcon>
      <ThemeIcon variant="light">
        <IconBell size={18} />
      </ThemeIcon>
      <ThemeIcon variant="outline">
        <IconSettings size={18} />
      </ThemeIcon>
    </Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group>
      <ThemeIcon size="sm" radius="xl">
        <IconCheck size={14} />
      </ThemeIcon>
      <ThemeIcon size="md" radius="xl">
        <IconCheck size={18} />
      </ThemeIcon>
      <ThemeIcon size="lg" radius="xl">
        <IconCheck size={22} />
      </ThemeIcon>
    </Group>
  ),
};
