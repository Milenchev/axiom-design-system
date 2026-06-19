import { Button } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Button.Group> = {
  title: "Themed/ButtonGroup",
  component: Button.Group,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button.Group>;

export const Primary: Story = {
  render: () => (
    <Button.Group>
      <Button variant="default">First</Button>
      <Button variant="default">Second</Button>
      <Button variant="default">Third</Button>
    </Button.Group>
  ),
};

export const Filled: Story = {
  render: () => (
    <Button.Group>
      <Button variant="filled">Save</Button>
      <Button variant="filled">Save &amp; Close</Button>
    </Button.Group>
  ),
};

export const Outline: Story = {
  render: () => (
    <Button.Group>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </Button.Group>
  ),
};
