import { Button, Dialog, TextInput } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
  title: "Themed/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Button onClick={() => setOpened(!opened)}>Toggle Dialog</Button>
        <Dialog
          opened={opened}
          withCloseButton
          onClose={() => setOpened(false)}
          size="lg"
          radius="md"
          position={{ bottom: 20, right: 20 }}
        >
          <h3 style={{ marginTop: 0 }}>Subscribe to our newsletter</h3>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <TextInput placeholder="hello@axiom.dev" style={{ flex: 1 }} />
            <Button onClick={() => setOpened(false)}>Subscribe</Button>
          </div>
        </Dialog>
      </>
    );
  },
};
