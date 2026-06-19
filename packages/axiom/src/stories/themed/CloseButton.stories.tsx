import { CloseButton, Group } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CloseButton> = {
  title: "Themed/CloseButton",
  component: CloseButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const Primary: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <Group>
      <CloseButton size="sm" />
      <CloseButton size="md" />
      <CloseButton size="lg" />
      <CloseButton size="xl" />
    </Group>
  ),
};
