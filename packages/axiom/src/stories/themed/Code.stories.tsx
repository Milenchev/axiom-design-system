import { Code, Group, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Code> = {
  title: "Themed/Code",
  component: Code,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Primary: Story = {
  args: {
    children: "npm install axiom-ui",
  },
};

export const Inline: Story = {
  render: () => (
    <Group gap={4}>
      Import with <Code>{"import { Button } from 'axiom-ui'"}</Code>
    </Group>
  ),
};

export const Block: Story = {
  render: () => (
    <Stack w={420}>
      <Code block>{`import { ThemeProvider } from "axiom-ui";

export default function App() {
  return <ThemeProvider>{/* ... */}</ThemeProvider>;
}`}</Code>
    </Stack>
  ),
};
