import { Checkbox, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Checkbox> = {
  title: "Themed/Checkbox",
  component: Checkbox,
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
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    label: "I agree to the terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "Always active",
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Subscribe to newsletter",
    description: "You will receive weekly updates via email.",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept the terms to continue",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled & checked",
    disabled: true,
    defaultChecked: true,
  },
};

export const States: Story = {
  render: () => (
    <Stack gap="md">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="With error" error="Required" />
      <Checkbox label="With description" description="Some helpful text" />
    </Stack>
  ),
};
