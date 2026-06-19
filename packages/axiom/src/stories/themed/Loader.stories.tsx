import { Group, Loader, Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Loader> = {
  title: "Themed/Loader",
  component: Loader,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
  args: {},
};

export const Types: Story = {
  render: () => (
    <Group>
      <Loader type="oval" />
      <Loader type="bars" />
      <Loader type="dots" />
    </Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack align="center">
      <Group align="center">
        <Loader size="xs" />
        <Loader size="sm" />
        <Loader size="md" />
        <Loader size="lg" />
      </Group>
      <Text size="sm" c="dimmed">
        Loading…
      </Text>
    </Stack>
  ),
};
