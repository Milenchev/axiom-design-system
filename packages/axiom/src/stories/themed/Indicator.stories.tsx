import { ActionIcon, Avatar, Group, Indicator } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconBell } from "@tabler/icons-react";

const meta: Meta<typeof Indicator> = {
  title: "Themed/Indicator",
  component: Indicator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Indicator>;

export const Primary: Story = {
  render: () => (
    <Indicator>
      <Avatar radius="sm" />
    </Indicator>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Indicator label="7" size={18} color="axiom-red">
      <ActionIcon variant="default" size="lg">
        <IconBell size={18} />
      </ActionIcon>
    </Indicator>
  ),
};

export const Processing: Story = {
  render: () => (
    <Group>
      <Indicator processing color="axiom-green">
        <Avatar radius="sm" />
      </Indicator>
      <Indicator disabled>
        <Avatar radius="sm" />
      </Indicator>
    </Group>
  ),
};
