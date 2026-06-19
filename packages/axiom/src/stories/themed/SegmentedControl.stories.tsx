import { SegmentedControl } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof SegmentedControl> = {
  title: "Themed/SegmentedControl",
  component: SegmentedControl,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Primary: Story = {
  args: {
    data: ["React", "Angular", "Vue", "Svelte"],
  },
};

export const WithDefaultValue: Story = {
  args: {
    data: ["Daily", "Weekly", "Monthly", "Yearly"],
    defaultValue: "Weekly",
  },
};

export const FullWidth: Story = {
  args: {
    data: ["Overview", "Details", "Settings"],
    fullWidth: true,
    style: { width: 400 },
  },
};
