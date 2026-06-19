import { ActionIcon } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconAdjustments,
  IconHeart,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";

const meta: Meta<typeof ActionIcon> = {
  title: "Themed/ActionIcon",
  component: ActionIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "filled",
        "light",
        "outline",
        "transparent",
        "subtle",
        "default",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    color: {
      control: "select",
      options: ["blue", "red", "green", "gray", "dark"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ActionIcon>;

export const Primary: Story = {
  args: {
    variant: "filled",
    "aria-label": "Settings",
    children: <IconSettings size={18} />,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <ActionIcon variant="filled" aria-label="Filled">
        <IconSettings size={18} />
      </ActionIcon>
      <ActionIcon variant="light" aria-label="Light">
        <IconSettings size={18} />
      </ActionIcon>
      <ActionIcon variant="outline" aria-label="Outline">
        <IconSettings size={18} />
      </ActionIcon>
      <ActionIcon variant="subtle" aria-label="Subtle">
        <IconSettings size={18} />
      </ActionIcon>
      <ActionIcon variant="transparent" aria-label="Transparent">
        <IconSettings size={18} />
      </ActionIcon>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <ActionIcon size="xs" variant="filled" aria-label="Extra small">
        <IconHeart size={12} />
      </ActionIcon>
      <ActionIcon size="sm" variant="filled" aria-label="Small">
        <IconHeart size={14} />
      </ActionIcon>
      <ActionIcon size="md" variant="filled" aria-label="Medium">
        <IconHeart size={18} />
      </ActionIcon>
      <ActionIcon size="lg" variant="filled" aria-label="Large">
        <IconHeart size={22} />
      </ActionIcon>
      <ActionIcon size="xl" variant="filled" aria-label="Extra large">
        <IconHeart size={26} />
      </ActionIcon>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <ActionIcon color="blue" variant="filled" aria-label="Search">
        <IconSearch size={18} />
      </ActionIcon>
      <ActionIcon color="red" variant="filled" aria-label="Delete">
        <IconTrash size={18} />
      </ActionIcon>
      <ActionIcon color="green" variant="filled" aria-label="Adjust">
        <IconAdjustments size={18} />
      </ActionIcon>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: "filled",
    disabled: true,
    "aria-label": "Disabled",
    children: <IconSettings size={18} />,
  },
};
