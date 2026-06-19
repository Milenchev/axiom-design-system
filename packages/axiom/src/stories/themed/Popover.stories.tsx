import { Button, Popover } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Popover> = {
  title: "Themed/Popover",
  component: Popover,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Primary: Story = {
  render: () => (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>This is a popover dropdown content</Popover.Dropdown>
    </Popover>
  ),
};
