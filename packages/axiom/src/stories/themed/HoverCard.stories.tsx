import { Anchor, Avatar, Group, HoverCard, Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof HoverCard> = {
  title: "Themed/HoverCard",
  component: HoverCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Primary: Story = {
  render: () => (
    <HoverCard width={260} shadow="md" withArrow>
      <HoverCard.Target>
        <Anchor>Hover to see profile</Anchor>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Group>
          <Avatar radius="xl" />
          <Stack gap={0}>
            <Text fw={600} size="sm">
              Jane Doe
            </Text>
            <Text size="xs" c="dimmed">
              Product Designer
            </Text>
          </Stack>
        </Group>
      </HoverCard.Dropdown>
    </HoverCard>
  ),
};
