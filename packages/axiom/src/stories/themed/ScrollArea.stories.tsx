import { ScrollArea, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ScrollArea> = {
  title: "Themed/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const loremIds = Array.from({ length: 15 }, (_, i) => `lorem-paragraph-${i}`);
const content = loremIds.map((id) => (
  <Text key={id} mb="sm">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat.
  </Text>
));

export const Primary: Story = {
  args: {
    h: 200,
    children: content,
    type: "hover",
    offsetScrollbars: true,
  },
};

export const Autosize: Story = {
  render: () => (
    <ScrollArea.Autosize mah={300} maw={400} mx="auto">
      {content}
    </ScrollArea.Autosize>
  ),
};
