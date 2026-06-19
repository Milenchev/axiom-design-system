import { Group, Skeleton, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Skeleton> = {
  title: "Themed/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {
  args: {
    height: 50,
    width: 300,
  },
};

export const ContentPlaceholder: Story = {
  render: () => (
    <Stack style={{ width: 400 }}>
      <Group>
        <Skeleton height={50} circle />
        <Stack style={{ flex: 1 }} gap="xs">
          <Skeleton height={12} width="60%" />
          <Skeleton height={12} width="40%" />
        </Stack>
      </Group>
      <Skeleton height={8} />
      <Skeleton height={8} />
      <Skeleton height={8} width="70%" />
    </Stack>
  ),
};
