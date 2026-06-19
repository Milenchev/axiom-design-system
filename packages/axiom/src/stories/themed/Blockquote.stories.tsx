import { Blockquote } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconInfoCircle } from "@tabler/icons-react";

const meta: Meta<typeof Blockquote> = {
  title: "Themed/Blockquote",
  component: Blockquote,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Primary: Story = {
  args: {
    cite: "– Axiom Design Principles",
    w: 420,
    children:
      "A design system is a shared language. Consistency is not a constraint — it is what makes scale possible.",
  },
};

export const WithIcon: Story = {
  args: {
    color: "axiom-blue",
    icon: <IconInfoCircle />,
    cite: "– Documentation",
    w: 420,
    children:
      "Wrap your application root with ThemeProvider so every component inherits the Axiom tokens.",
  },
};
