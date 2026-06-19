import { Stack, Textarea } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Textarea> = {
  title: "Themed/Textarea",
  component: Textarea,
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
type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {
  args: {
    placeholder: "Enter text here...",
    label: "Label",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Comments",
    description: "Please provide detailed feedback.",
    placeholder: "Type your comments...",
  },
};

export const WithError: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description",
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Notes",
    placeholder: "Disabled textarea",
    disabled: true,
    value: "Cannot edit this",
  },
};

export const States: Story = {
  render: () => (
    <Stack w={300} gap="md">
      <Textarea label="Default" placeholder="Default state" />
      <Textarea label="Disabled" placeholder="Disabled" disabled />
      <Textarea label="Error" placeholder="Invalid" error="Required field" />
      <Textarea
        label="With description"
        placeholder="Type here"
        description="Helpful hint"
      />
    </Stack>
  ),
};
