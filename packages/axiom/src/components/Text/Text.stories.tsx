import { Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../..";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "text",
      description: "Text color from Mantine theme or any valid CSS color",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    fw: {
      control: "select",
      options: [400, 500, 600, 700],
      description: "Font weight",
    },
    td: {
      control: "select",
      options: ["underline", "line-through", "none"],
      description: "Text decoration",
    },
    ta: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment",
    },
    truncate: { control: "boolean" },
    lineClamp: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    children: "This is a standard text component.",
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="xs">
      <Text size="xs">Extra small text (xs)</Text>
      <Text size="sm">Small text (sm)</Text>
      <Text size="md">Medium text (md)</Text>
      <Text size="lg">Large text (lg)</Text>
      <Text size="xl">Extra large text (xl)</Text>
    </Stack>
  ),
};

export const Weights: Story = {
  render: () => (
    <Stack gap="xs">
      <Text fw={400}>Regular (400)</Text>
      <Text fw={500}>Medium (500)</Text>
      <Text fw={600}>Semi-bold (600)</Text>
      <Text fw={700}>Bold (700)</Text>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack gap="xs">
      <Text>Default (--axiom-text)</Text>
      <Text c="dimmed">Dimmed (--axiom-text-secondary)</Text>
      <Text c="var(--axiom-text-link)">Link color (--axiom-text-link)</Text>
      <Text c="var(--axiom-feedback-error)">
        Error (--axiom-feedback-error)
      </Text>
      <Text c="var(--axiom-feedback-success)">
        Success (--axiom-feedback-success)
      </Text>
      <Text c="var(--axiom-text-disabled)">
        Disabled (--axiom-text-disabled)
      </Text>
    </Stack>
  ),
};

export const Truncated: Story = {
  args: {
    truncate: true,
    children:
      "This is a very long text that should be truncated when it exceeds the maximum width of its container. Resize the container to see the effect.",
    style: { maxWidth: "200px" },
  },
};

export const LineClamp: Story = {
  args: {
    lineClamp: 2,
    children:
      "This is a long paragraph of text that will be clamped to only two lines. Any additional content beyond the second line will be hidden and replaced with an ellipsis to indicate truncation. This is useful for card descriptions and preview text.",
    style: { maxWidth: "300px" },
  },
};

export const AsLink: Story = {
  args: {
    component: "a",
    td: "underline",
    c: "var(--axiom-text-link)",
    children: "Text rendered as a link",
  },
};
