import { Pagination } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Pagination> = {
  title: "Themed/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  args: {
    total: 10,
    value: 3,
  },
};

export const WithSiblings: Story = {
  args: {
    total: 20,
    value: 10,
    siblings: 2,
  },
};

export const WithBoundaries: Story = {
  args: {
    total: 20,
    value: 10,
    boundaries: 2,
  },
};
