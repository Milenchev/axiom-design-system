import { Group, Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Badge } from "../..";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "info",
        "success",
        "warning",
        "error",
        "critical",
        "dark",
        "pending",
        "active",
        "inactive",
        "accent1",
        "accent2",
        "accent3",
      ],
      description: "Semantic badge type — maps to Axiom categorical color",
    },
    emphasis: {
      control: "select",
      options: ["bold", "subtle", "minimal"],
      description: "Visual emphasis level",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: ["filled", "light", "outline", "dot", "transparent", "default"],
      description: "Direct Mantine variant (bypasses emphasis)",
    },
    color: {
      control: "text",
      description: "Direct Mantine color (bypasses type)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    type: "primary",
    children: "Primary",
  },
};

/* Semantic Types — Bold */
export const TypesBold: Story = {
  name: "Types — Bold",
  render: () => (
    <Group>
      <Badge type="primary">Primary</Badge>
      <Badge type="info">Info</Badge>
      <Badge type="success">Success</Badge>
      <Badge type="warning">Warning</Badge>
      <Badge type="error">Error</Badge>
      <Badge type="critical">Critical</Badge>
      <Badge type="pending">Pending</Badge>
      <Badge type="active">Active</Badge>
      <Badge type="inactive">Inactive</Badge>
      <Badge type="dark">Dark</Badge>
    </Group>
  ),
};

/* Semantic Types — Subtle */
export const TypesSubtle: Story = {
  name: "Types — Subtle",
  render: () => (
    <Group>
      <Badge type="primary" emphasis="subtle">
        Primary
      </Badge>
      <Badge type="info" emphasis="subtle">
        Info
      </Badge>
      <Badge type="success" emphasis="subtle">
        Success
      </Badge>
      <Badge type="warning" emphasis="subtle">
        Warning
      </Badge>
      <Badge type="error" emphasis="subtle">
        Error
      </Badge>
      <Badge type="critical" emphasis="subtle">
        Critical
      </Badge>
      <Badge type="pending" emphasis="subtle">
        Pending
      </Badge>
      <Badge type="active" emphasis="subtle">
        Active
      </Badge>
      <Badge type="inactive" emphasis="subtle">
        Inactive
      </Badge>
      <Badge type="dark" emphasis="subtle">
        Dark
      </Badge>
    </Group>
  ),
};

/* Semantic Types — Minimal */
export const TypesMinimal: Story = {
  name: "Types — Minimal",
  render: () => (
    <Group>
      <Badge type="primary" emphasis="minimal">
        Primary
      </Badge>
      <Badge type="info" emphasis="minimal">
        Info
      </Badge>
      <Badge type="success" emphasis="minimal">
        Success
      </Badge>
      <Badge type="warning" emphasis="minimal">
        Warning
      </Badge>
      <Badge type="error" emphasis="minimal">
        Error
      </Badge>
      <Badge type="critical" emphasis="minimal">
        Critical
      </Badge>
      <Badge type="pending" emphasis="minimal">
        Pending
      </Badge>
      <Badge type="active" emphasis="minimal">
        Active
      </Badge>
      <Badge type="inactive" emphasis="minimal">
        Inactive
      </Badge>
      <Badge type="dark" emphasis="minimal">
        Dark
      </Badge>
    </Group>
  ),
};

/* All Emphasis Levels Side-by-Side */
export const EmphasisComparison: Story = {
  name: "Emphasis Comparison",
  render: () => (
    <Stack gap="md">
      {(
        ["primary", "success", "warning", "error", "pending", "active"] as const
      ).map((type) => (
        <Group key={type} gap="sm">
          <Text size="sm" w={80} fw={500}>
            {type}
          </Text>
          <Badge type={type} emphasis="bold">
            Bold
          </Badge>
          <Badge type={type} emphasis="subtle">
            Subtle
          </Badge>
          <Badge type={type} emphasis="minimal">
            Minimal
          </Badge>
        </Group>
      ))}
    </Stack>
  ),
};

/* Accent Colors */
export const AccentColors: Story = {
  name: "Accent Colors",
  render: () => (
    <Stack gap="xs">
      <Group>
        <Badge type="accent1">Accent 1</Badge>
        <Badge type="accent2">Accent 2</Badge>
        <Badge type="accent3">Accent 3</Badge>
        <Badge type="secondary">Secondary</Badge>
        <Badge type="tertiary">Tertiary</Badge>
      </Group>
      <Group>
        <Badge type="accent1" emphasis="subtle">
          Accent 1
        </Badge>
        <Badge type="accent2" emphasis="subtle">
          Accent 2
        </Badge>
        <Badge type="accent3" emphasis="subtle">
          Accent 3
        </Badge>
      </Group>
    </Stack>
  ),
};

/* Legacy Types */
export const LegacyTypes: Story = {
  name: "Legacy Types",
  render: () => (
    <Group>
      <Badge type="approved">Approved</Badge>
      <Badge type="available">Available</Badge>
      <Badge type="escalated">Escalated</Badge>
      <Badge type="needreview">Needs Review</Badge>
      <Badge type="rejected">Rejected</Badge>
      <Badge type="disabled">Disabled</Badge>
      <Badge type="submitted">Submitted</Badge>
    </Group>
  ),
};

/* Sizes */
export const Sizes: Story = {
  render: () => (
    <Group align="center">
      <Badge type="primary" size="xs">
        XS
      </Badge>
      <Badge type="primary" size="sm">
        SM
      </Badge>
      <Badge type="primary" size="md">
        MD
      </Badge>
      <Badge type="primary" size="lg">
        LG
      </Badge>
      <Badge type="primary" size="xl">
        XL
      </Badge>
    </Group>
  ),
};

/* With Sections */
export const WithSections: Story = {
  render: () => (
    <Group>
      <Badge type="success" leftSection={<IconCheck size={12} />}>
        Approved
      </Badge>
      <Badge type="error" leftSection={<IconX size={12} />}>
        Rejected
      </Badge>
    </Group>
  ),
};

/* Direct Mantine Color (bypass type) */
export const DirectColor: Story = {
  name: "Direct Mantine Color",
  render: () => (
    <Group>
      <Badge color="axiom-blue" variant="filled">
        Blue
      </Badge>
      <Badge color="axiom-red" variant="light">
        Red Light
      </Badge>
      <Badge color="axiom-green" variant="outline">
        Green Outline
      </Badge>
    </Group>
  ),
};
