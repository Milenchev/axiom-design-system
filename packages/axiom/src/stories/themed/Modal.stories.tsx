import { Button, Modal } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "Themed/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Authentication"
        >
          <p>Please enter your credentials to continue.</p>
        </Modal>
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </>
    );
  },
};

export const Centered: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Centered Modal"
          centered
        >
          <p>This modal is vertically centered.</p>
        </Modal>
        <Button onClick={() => setOpened(true)}>Open Centered Modal</Button>
      </>
    );
  },
};

export const FullScreen: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Full Screen"
          fullScreen
        >
          <p>This modal takes the full screen.</p>
        </Modal>
        <Button onClick={() => setOpened(true)}>Open Full Screen</Button>
      </>
    );
  },
};
