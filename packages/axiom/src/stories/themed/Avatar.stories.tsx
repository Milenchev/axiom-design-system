import { Avatar, Group } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Avatar> = {
  title: "Themed/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {
    src: null,
    alt: "User",
    children: "JD",
    radius: "xl",
  },
};

export const Sizes: Story = {
  render: () => (
    <Group>
      <Avatar size="sm" radius="xl">
        SM
      </Avatar>
      <Avatar size="md" radius="xl">
        MD
      </Avatar>
      <Avatar size="lg" radius="xl">
        LG
      </Avatar>
      <Avatar size="xl" radius="xl">
        XL
      </Avatar>
    </Group>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <Avatar.Group>
      <Avatar radius="xl">A</Avatar>
      <Avatar radius="xl">B</Avatar>
      <Avatar radius="xl">C</Avatar>
      <Avatar radius="xl">+3</Avatar>
    </Avatar.Group>
  ),
};
