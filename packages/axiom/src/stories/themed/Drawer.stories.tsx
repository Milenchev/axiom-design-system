import { Button, Drawer } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta: Meta<typeof Drawer> = {
  title: "Themed/Drawer",
  component: Drawer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Primary: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Axiom Drawer"
        >
          This is the content of the drawer.
        </Drawer>
        <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      </>
    );
  },
};

export const RightPosition: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Right Drawer"
          position="right"
        >
          Drawer content on the right side.
        </Drawer>
        <Button onClick={() => setOpened(true)}>Open Right Drawer</Button>
      </>
    );
  },
};
