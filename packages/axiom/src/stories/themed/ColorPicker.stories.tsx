import { ColorPicker, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ColorPicker> = {
  title: "Themed/ColorPicker",
  component: ColorPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Primary: Story = {
  args: {
    defaultValue: "#0f6eef",
  },
};

export const WithSwatches: Story = {
  render: () => (
    <ColorPicker
      defaultValue="#0f6eef"
      swatches={[
        "#0f6eef",
        "#dc000d",
        "#04b000",
        "#ffc700",
        "#735920",
        "#252525",
      ]}
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack>
      <ColorPicker size="sm" defaultValue="#0f6eef" />
      <ColorPicker size="lg" defaultValue="#0f6eef" />
    </Stack>
  ),
};
