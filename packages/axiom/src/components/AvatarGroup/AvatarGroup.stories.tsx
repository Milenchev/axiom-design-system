import { Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarGroup, type AvatarGroupItem } from "../..";

const people: AvatarGroupItem[] = [
  { name: "Jane Doe", src: "https://i.pravatar.cc/100?img=1" },
  { name: "Alex Smith", src: "https://i.pravatar.cc/100?img=12" },
  { name: "Sam Taylor", src: "https://i.pravatar.cc/100?img=5" },
  { name: "Riya Patel", src: "https://i.pravatar.cc/100?img=9" },
  { name: "Chris Lee", color: "axiom-blue" },
  { name: "Morgan Quinn", color: "axiom-green" },
];

const meta: Meta<typeof AvatarGroup> = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = {
  render: () => <AvatarGroup avatars={people} />,
};

export const WithOverflow: Story = {
  render: () => (
    <Stack align="center" gap="xs">
      <AvatarGroup avatars={people} max={3} />
      <Text size="sm" c="dimmed">
        6 collaborators
      </Text>
    </Stack>
  ),
};

export const Initials: Story = {
  render: () => (
    <AvatarGroup
      avatars={[
        { name: "Jane Doe", color: "axiom-blue" },
        { name: "Alex Smith", color: "axiom-green" },
        { name: "Sam Taylor", color: "axiom-red" },
      ]}
    />
  ),
};
