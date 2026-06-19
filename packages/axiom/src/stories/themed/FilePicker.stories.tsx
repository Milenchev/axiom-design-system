import { FileInput } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof FileInput> = {
  title: "Themed/FilePicker",
  component: FileInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Primary: Story = {
  args: {
    placeholder: "Select file",
    label: "Upload document",
    style: { width: "300px" },
  },
};

export const Multiple: Story = {
  args: {
    placeholder: "Select multiple files",
    label: "Upload images",
    multiple: true,
    style: { width: "300px" },
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Select file",
    label: "Upload document",
    error: "File is required",
    style: { width: "300px" },
  },
};
