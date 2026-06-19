import { Rating, Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Rating> = {
  title: "Themed/Rating",
  component: Rating,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Primary: Story = {
  args: {
    defaultValue: 3,
  },
};

export const Fractions: Story = {
  render: () => (
    <Stack gap="sm">
      <Rating defaultValue={2.5} fractions={2} />
      <Rating defaultValue={3.3} fractions={3} />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="sm">
      <Rating defaultValue={3} size="sm" />
      <Rating defaultValue={3} size="md" />
      <Rating defaultValue={3} size="lg" />
    </Stack>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Stack gap={4} align="center">
      <Rating value={4} readOnly />
      <Text size="sm" c="dimmed">
        4.0 average · 128 reviews
      </Text>
    </Stack>
  ),
};
