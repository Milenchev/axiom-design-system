import { Group, RingProgress, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCheck } from "@tabler/icons-react";

const meta: Meta<typeof RingProgress> = {
  title: "Themed/RingProgress",
  component: RingProgress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RingProgress>;

export const Primary: Story = {
  render: () => (
    <RingProgress
      sections={[{ value: 68, color: "axiom-blue" }]}
      label={
        <Text ta="center" fw={700} size="lg">
          68%
        </Text>
      }
    />
  ),
};

export const MultipleSections: Story = {
  render: () => (
    <RingProgress
      sections={[
        { value: 40, color: "axiom-blue" },
        { value: 25, color: "axiom-green" },
        { value: 15, color: "axiom-yellow" },
      ]}
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Group>
      <RingProgress
        size={90}
        thickness={8}
        roundCaps
        sections={[{ value: 100, color: "axiom-green" }]}
        label={
          <Group justify="center">
            <IconCheck size={22} color="var(--axiom-feedback-success)" />
          </Group>
        }
      />
    </Group>
  ),
};
