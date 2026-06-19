import { Alert } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconCircleX,
  IconInfoCircle,
} from "@tabler/icons-react";

const meta: Meta<typeof Alert> = {
  title: "Themed/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "filled",
        "light",
        "outline",
        "transparent",
        "white",
        "default",
      ],
    },
    color: {
      control: "select",
      options: ["blue", "red", "yellow", "green", "gray"],
    },
    withCloseButton: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
  args: {
    title: "Information",
    icon: <IconInfoCircle />,
    children: "This is a general informational alert for the user.",
  },
};

export const Success: Story = {
  args: {
    title: "Success",
    color: "green",
    icon: <IconCircleCheck />,
    children: "Your changes have been saved successfully.",
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    color: "yellow",
    icon: <IconAlertTriangle />,
    children: "Please review the configuration before proceeding.",
  },
};

export const ErrorAlert: Story = {
  args: {
    title: "Error",
    color: "red",
    icon: <IconCircleX />,
    children: "Something went wrong. Please try again later.",
  },
};

export const WithCloseButton: Story = {
  args: {
    title: "Dismissible",
    icon: <IconInfoCircle />,
    withCloseButton: true,
    children: "This alert can be dismissed by the user.",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Alert
        variant="filled"
        color="blue"
        title="Filled"
        icon={<IconInfoCircle />}
      >
        Filled variant alert.
      </Alert>
      <Alert
        variant="light"
        color="blue"
        title="Light"
        icon={<IconInfoCircle />}
      >
        Light variant alert.
      </Alert>
      <Alert
        variant="outline"
        color="blue"
        title="Outline"
        icon={<IconInfoCircle />}
      >
        Outline variant alert.
      </Alert>
    </div>
  ),
};
