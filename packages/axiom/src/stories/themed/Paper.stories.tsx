import { Paper, Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Paper> = {
  title: "Themed/Paper",
  component: Paper,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Paper>;

export const Primary: Story = {
  args: {
    shadow: "xs",
    p: "md",
    withBorder: true,
    children:
      "Paper is the most basic UI component. It renders a div with a background, border, and shadow.",
    style: { width: 400 },
  },
};

export const Shadows: Story = {
  render: () => (
    <Stack>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((shadow) => (
        <Paper key={shadow} shadow={shadow} p="md" withBorder>
          <Text size="sm">Shadow: {shadow}</Text>
        </Paper>
      ))}
    </Stack>
  ),
};
