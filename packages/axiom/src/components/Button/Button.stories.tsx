import { Group, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconDownload, IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "../..";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["primary", "secondary", "danger", "success"],
      description:
        "Semantic intent — maps to a predefined variant + color combination",
    },
    color: {
      control: "text",
      description: "Button color from Mantine theme or any valid CSS color",
    },
    variant: {
      control: "select",
      options: [
        "filled",
        "light",
        "outline",
        "transparent",
        "white",
        "subtle",
        "default",
        "gradient",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    radius: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    intent: "primary",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    intent: "secondary",
    children: "Secondary",
  },
};

export const Danger: Story = {
  args: {
    intent: "danger",
    children: "Delete",
  },
};

export const Success: Story = {
  args: {
    intent: "success",
    children: "Confirm",
  },
};

export const Intents: Story = {
  name: "All Intents",
  render: () => (
    <Group>
      <Button intent="primary">Primary</Button>
      <Button intent="secondary">Secondary</Button>
      <Button intent="danger">Danger</Button>
      <Button intent="success">Success</Button>
    </Group>
  ),
};

export const IntentsDisabled: Story = {
  name: "Intents (Disabled)",
  render: () => (
    <Group>
      <Button intent="primary" disabled>
        Primary
      </Button>
      <Button intent="secondary" disabled>
        Secondary
      </Button>
      <Button intent="danger" disabled>
        Danger
      </Button>
      <Button intent="success" disabled>
        Success
      </Button>
    </Group>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading",
  },
};

export const Variants: Story = {
  render: () => (
    <Group>
      <Button variant="filled">Filled</Button>
      <Button variant="light">Light</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="transparent">Transparent</Button>
      <Button variant="default">Default</Button>
      <Button variant="white">White</Button>
    </Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group align="center">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra large</Button>
    </Group>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Group>
      <Button intent="primary" leftSection={<IconPlus size={16} />}>
        Create
      </Button>
      <Button rightSection={<IconDownload size={16} />} variant="light">
        Download
      </Button>
      <Button intent="danger" leftSection={<IconTrash size={16} />}>
        Delete
      </Button>
    </Group>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Stack w={300}>
      <Button intent="primary" fullWidth>
        Full width button
      </Button>
      <Button intent="secondary" fullWidth>
        Full width outline
      </Button>
    </Stack>
  ),
};
