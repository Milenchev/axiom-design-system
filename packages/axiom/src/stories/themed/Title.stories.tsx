import { Stack, Title } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Title> = {
  title: "Themed/Title",
  component: Title,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Primary: Story = {
  args: {
    order: 1,
    children: "The quick brown fox",
  },
};

export const Orders: Story = {
  render: () => (
    <Stack gap="xs">
      <Title order={1}>Heading level 1</Title>
      <Title order={2}>Heading level 2</Title>
      <Title order={3}>Heading level 3</Title>
      <Title order={4}>Heading level 4</Title>
    </Stack>
  ),
};
