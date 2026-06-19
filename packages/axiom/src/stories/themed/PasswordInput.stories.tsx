import { PasswordInput } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof PasswordInput> = {
  title: "Themed/PasswordInput",
  component: PasswordInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Primary: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    style: { width: 300 },
  },
};

export const WithDescription: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    description: "Must be at least 8 characters",
    style: { width: 300 },
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    error: "Password is too short",
    style: { width: 300 },
  },
};
