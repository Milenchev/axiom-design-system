import { ColorSwatch, Group } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ColorSwatch> = {
  title: "Themed/ColorSwatch",
  component: ColorSwatch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ColorSwatch>;

export const Primary: Story = {
  args: {
    color: "#0f6eef",
  },
};

export const Palette: Story = {
  render: () => (
    <Group gap="xs">
      <ColorSwatch color="#0f6eef" />
      <ColorSwatch color="#dc000d" />
      <ColorSwatch color="#04b000" />
      <ColorSwatch color="#ffc700" />
      <ColorSwatch color="#735920" />
      <ColorSwatch color="#252525" />
    </Group>
  ),
};
