import { ColorInput, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ColorInput> = {
  title: "Themed/ColorInput",
  component: ColorInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ColorInput>;

export const Primary: Story = {
  args: {
    label: "Brand color",
    placeholder: "Pick a color",
    defaultValue: "#0f6eef",
  },
};

export const Formats: Story = {
  render: () => (
    <Stack w={260}>
      <ColorInput label="HEX" format="hex" defaultValue="#0f6eef" />
      <ColorInput
        label="RGBA"
        format="rgba"
        defaultValue="rgba(15,110,239,1)"
      />
      <ColorInput label="HSL" format="hsl" defaultValue="hsl(214,87%,50%)" />
    </Stack>
  ),
};

export const WithSwatches: Story = {
  args: {
    label: "Theme color",
    defaultValue: "#0f6eef",
    swatches: ["#0f6eef", "#dc000d", "#04b000", "#ffc700", "#735920"],
  },
};
