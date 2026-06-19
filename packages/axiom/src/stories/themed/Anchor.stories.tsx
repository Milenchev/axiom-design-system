import { Anchor, Group } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Anchor> = {
  title: "Themed/Anchor",
  component: Anchor,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const Primary: Story = {
  args: {
    href: "#",
    children: "Anchor link",
  },
};

export const Underline: Story = {
  render: () => (
    <Group>
      <Anchor href="#" underline="always">
        Always underlined
      </Anchor>
      <Anchor href="#" underline="hover">
        Underline on hover
      </Anchor>
      <Anchor href="#" underline="never">
        Never underlined
      </Anchor>
    </Group>
  ),
};
