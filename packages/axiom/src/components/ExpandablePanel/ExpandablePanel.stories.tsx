import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExpandablePanel, Text } from "../..";

const meta: Meta<typeof ExpandablePanel> = {
  title: "Components/ExpandablePanel",
  component: ExpandablePanel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ExpandablePanel>;

export const Primary: Story = {
  args: {
    title: "Advanced Settings",
    children: (
      <Text>
        Here are some advanced settings that are hidden by default to keep the
        interface clean. You can adjust the network timeout, maximum retries,
        and background synchronization intervals here.
      </Text>
    ),
  },
};

export const PrimaryExpanded: Story = {
  args: {
    title: "Profile Information",
    defaultExpanded: true,
    children: (
      <Text>
        Name: John Doe
        <br />
        Email: john.doe@example.com
        <br />
        Role: Administrator
      </Text>
    ),
  },
};
