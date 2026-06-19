import { Progress } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Progress> = {
  title: "Themed/Progress",
  component: Progress,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Primary: Story = {
  args: {
    value: 50,
  },
};

export const Colored: Story = {
  args: {
    value: 75,
    color: "green",
    size: "lg",
  },
};

export const Striped: Story = {
  args: {
    value: 65,
    striped: true,
    animated: true,
    size: "xl",
  },
};
