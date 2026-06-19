import { Highlight, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Highlight> = {
  title: "Themed/Highlight",
  component: Highlight,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Highlight>;

export const Primary: Story = {
  args: {
    highlight: "accessible",
    w: 420,
    children: "Axiom ships accessible, themeable, production-ready components.",
  },
};

export const MultipleTerms: Story = {
  render: () => (
    <Stack w={420}>
      <Highlight highlight={["accessible", "themeable"]}>
        Axiom ships accessible, themeable, production-ready components.
      </Highlight>
    </Stack>
  ),
};
