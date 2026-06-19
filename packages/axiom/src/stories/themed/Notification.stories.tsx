import { Notification } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react";

const meta: Meta<typeof Notification> = {
  title: "Themed/Notification",
  component: Notification,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["blue", "red", "yellow", "green", "gray"],
    },
    withCloseButton: { control: "boolean" },
    withBorder: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Primary: Story = {
  args: {
    title: "New notification",
    children: "You have a new message in your inbox.",
  },
};

export const Success: Story = {
  args: {
    title: "Data saved",
    color: "green",
    icon: <IconCheck size={18} />,
    children: "Your changes have been saved successfully.",
  },
};

export const ErrorNotification: Story = {
  args: {
    title: "Upload failed",
    color: "red",
    icon: <IconX size={18} />,
    children: "The file could not be uploaded. Please try again.",
  },
};

export const Warning: Story = {
  args: {
    title: "Approaching limit",
    color: "yellow",
    icon: <IconAlertTriangle size={18} />,
    children: "You have used 90% of your storage quota.",
  },
};

export const Info: Story = {
  args: {
    title: "Scheduled maintenance",
    color: "blue",
    icon: <IconInfoCircle size={18} />,
    children: "The system will be down for maintenance on Sunday.",
  },
};

export const Loading: Story = {
  args: {
    title: "Processing",
    loading: true,
    children: "Your request is being processed...",
    withCloseButton: false,
  },
};

export const WithBorder: Story = {
  args: {
    title: "Bordered notification",
    withBorder: true,
    icon: <IconInfoCircle size={18} />,
    children: "This notification has a border for extra emphasis.",
  },
};

export const WithoutCloseButton: Story = {
  args: {
    title: "Persistent notice",
    withCloseButton: false,
    children: "This notification cannot be dismissed.",
  },
};
