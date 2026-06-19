import { Button, Tooltip } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Tooltip> = {
  title: "Themed/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  render: () => (
    <Tooltip label="Tooltip content" position="top" withArrow>
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
};

export const Floating: Story = {
  render: () => (
    <Tooltip.Floating label="I track the cursor">
      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "#f8f9fa",
          border: "1px solid #ced4da",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Hover over me
      </div>
    </Tooltip.Floating>
  ),
};
