import { Stack, Switch } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Switch> = {
  title: "Themed/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: { control: "boolean" },
    error: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  args: {
    label: "Enable notifications",
  },
};

export const Checked: Story = {
  args: {
    label: "Feature enabled",
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Dark mode",
    description: "Toggle between light and dark themes.",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept to continue",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled switch",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled & on",
    disabled: true,
    defaultChecked: true,
  },
};

export const States: Story = {
  render: () => (
    <Stack gap="md">
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
      <Switch label="With error" error="Required" />
      <Switch label="With description" description="Some helpful text" />
    </Stack>
  ),
};
