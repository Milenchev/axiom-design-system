import { Burger, Group } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta: Meta<typeof Burger> = {
  title: "Themed/Burger",
  component: Burger,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Burger>;

export const Primary: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    return (
      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        aria-label="Toggle navigation"
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <Group>
      <Burger opened={false} size="sm" aria-label="Toggle navigation" />
      <Burger opened={false} size="md" aria-label="Toggle navigation" />
      <Burger opened={false} size="lg" aria-label="Toggle navigation" />
    </Group>
  ),
};
