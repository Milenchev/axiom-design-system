import { Spoiler, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Spoiler> = {
  title: "Themed/Spoiler",
  component: Spoiler,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spoiler>;

export const Primary: Story = {
  render: () => (
    <Spoiler maxHeight={60} showLabel="Show more" hideLabel="Show less" w={420}>
      <Text>
        A design system is a complete set of standards intended to manage design
        at scale using reusable components and patterns. Axiom provides design
        tokens, themed Mantine primitives, and original components built for
        enterprise interfaces. Each component is documented, tested, and
        accessible by default, so teams can ship consistent products faster.
      </Text>
    </Spoiler>
  ),
};
