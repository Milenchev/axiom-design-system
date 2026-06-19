import { Divider, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Divider> = {
  title: "Themed/Divider",
  component: Divider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Primary: Story = {
  render: () => (
    <Stack w={320}>
      <Divider />
    </Stack>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Stack w={320} gap="lg">
      <Divider label="Or continue with" labelPosition="center" />
      <Divider label="Left aligned" labelPosition="left" />
      <Divider label="Right aligned" labelPosition="right" />
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack w={320} gap="lg">
      <Divider variant="solid" label="Solid" labelPosition="center" />
      <Divider variant="dashed" label="Dashed" labelPosition="center" />
      <Divider variant="dotted" label="Dotted" labelPosition="center" />
    </Stack>
  ),
};
