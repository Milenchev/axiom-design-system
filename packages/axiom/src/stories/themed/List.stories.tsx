import { List, ThemeIcon } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCircleCheck } from "@tabler/icons-react";

const meta: Meta<typeof List> = {
  title: "Themed/List",
  component: List,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Primary: Story = {
  render: () => (
    <List>
      <List.Item>Install axiom-ui</List.Item>
      <List.Item>Wrap your app with ThemeProvider</List.Item>
      <List.Item>Start composing components</List.Item>
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List type="ordered">
      <List.Item>Clone the repository</List.Item>
      <List.Item>Install dependencies</List.Item>
      <List.Item>Run the dev server</List.Item>
    </List>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <List
      spacing="xs"
      center
      icon={
        <ThemeIcon color="axiom-green" size={20} radius="xl">
          <IconCircleCheck size={14} />
        </ThemeIcon>
      }
    >
      <List.Item>Accessible by default</List.Item>
      <List.Item>Fully typed with TypeScript</List.Item>
      <List.Item>Themeable design tokens</List.Item>
    </List>
  ),
};
