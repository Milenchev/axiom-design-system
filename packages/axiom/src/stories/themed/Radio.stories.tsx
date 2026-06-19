import { Radio, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Radio> = {
  title: "Themed/Radio",
  component: Radio,
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
type Story = StoryObj<typeof Radio>;

export const Primary: Story = {
  args: {
    label: "Option A",
    value: "a",
  },
};

export const Group: Story = {
  render: () => (
    <Radio.Group name="plan" label="Select a plan" defaultValue="standard">
      <Stack gap="xs" mt="xs">
        <Radio value="basic" label="Basic" />
        <Radio value="standard" label="Standard" />
        <Radio value="premium" label="Premium" />
      </Stack>
    </Radio.Group>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Radio.Group
      name="region"
      label="Deployment region"
      description="Choose where your data is stored."
      defaultValue="us-east"
    >
      <Stack gap="xs" mt="xs">
        <Radio value="us-east" label="US East" />
        <Radio value="us-west" label="US West" />
        <Radio value="eu-central" label="EU Central" />
      </Stack>
    </Radio.Group>
  ),
};

export const WithError: Story = {
  render: () => (
    <Radio.Group
      name="priority"
      label="Priority level"
      error="You must select a priority"
    >
      <Stack gap="xs" mt="xs">
        <Radio value="low" label="Low" />
        <Radio value="medium" label="Medium" />
        <Radio value="high" label="High" />
      </Stack>
    </Radio.Group>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    value: "disabled",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="md">
      <Radio size="xs" label="Extra small" value="xs" />
      <Radio size="sm" label="Small" value="sm" />
      <Radio size="md" label="Medium" value="md" />
      <Radio size="lg" label="Large" value="lg" />
      <Radio size="xl" label="Extra large" value="xl" />
    </Stack>
  ),
};
