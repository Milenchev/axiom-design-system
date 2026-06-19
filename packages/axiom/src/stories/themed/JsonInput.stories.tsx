import { JsonInput } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof JsonInput> = {
  title: "Themed/JsonInput",
  component: JsonInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof JsonInput>;

export const Primary: Story = {
  args: {
    label: "Configuration",
    placeholder: "Paste JSON here",
    formatOnBlur: true,
    autosize: true,
    minRows: 4,
    w: 360,
    defaultValue: '{"theme":"axiom","mode":"light"}',
  },
};

export const WithValidation: Story = {
  args: {
    label: "Configuration",
    placeholder: "Paste JSON here",
    validationError: "Invalid JSON",
    formatOnBlur: true,
    autosize: true,
    minRows: 4,
    w: 360,
  },
};
