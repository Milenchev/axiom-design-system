import { Mark, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Mark> = {
  title: "Themed/Mark",
  component: Mark,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Mark>;

export const Primary: Story = {
  render: () => (
    <Text w={420}>
      Axiom is a <Mark>design system</Mark> built on Mantine with{" "}
      <Mark color="axiom-yellow">accessible</Mark> components.
    </Text>
  ),
};

export const Colors: Story = {
  render: () => (
    <Text w={420}>
      <Mark color="axiom-blue">Primary</Mark>,{" "}
      <Mark color="axiom-green">success</Mark>, and{" "}
      <Mark color="axiom-red">danger</Mark> highlights.
    </Text>
  ),
};
