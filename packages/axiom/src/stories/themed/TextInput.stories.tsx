import { Stack, TextInput } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconSearch, IconUser } from "@tabler/icons-react";

const meta: Meta<typeof TextInput> = {
  title: "Themed/TextInput",
  component: TextInput,
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
type Story = StoryObj<typeof TextInput>;

export const Primary: Story = {
  args: {
    placeholder: "Enter text here...",
    label: "Label",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Email",
    description: "We will never share your email with anyone.",
    placeholder: "hello@example.com",
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    placeholder: "Disabled input",
    disabled: true,
    value: "Cannot edit this",
  },
};

export const WithIcons: Story = {
  render: () => (
    <Stack w={300} gap="md">
      <TextInput
        label="Search"
        placeholder="Search..."
        leftSection={<IconSearch size={16} />}
      />
      <TextInput
        label="Username"
        placeholder="Enter username"
        leftSection={<IconUser size={16} />}
      />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack w={300} gap="md">
      <TextInput label="Default" placeholder="Default state" />
      <TextInput label="Disabled" placeholder="Disabled" disabled />
      <TextInput label="Error" placeholder="Invalid" error="Required field" />
      <TextInput
        label="With description"
        placeholder="Type here"
        description="Helpful hint"
      />
    </Stack>
  ),
};
