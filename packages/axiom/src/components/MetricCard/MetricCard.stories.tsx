import { ActionIcon, Group, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCash, IconDots, IconUsers } from "@tabler/icons-react";
import { MetricCard } from "../..";

const meta: Meta<typeof MetricCard> = {
  title: "Components/MetricCard",
  component: MetricCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    trend: { control: "number" },
    trendDirection: {
      control: "select",
      options: ["up", "down"],
    },
    trendInline: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Primary: Story = {
  args: {
    label: "Revenue",
    value: "101",
    icon: <IconCash size={20} />,
    action: (
      <ActionIcon variant="subtle" color="gray">
        <IconDots size={18} />
      </ActionIcon>
    ),
    trend: 11,
    trendLabel: "Since last day",
  },
};

export const NegativeTrend: Story = {
  name: "Negative Trend",
  args: {
    label: "Gross Revenue",
    value: "101",
    icon: <IconCash size={20} />,
    action: (
      <ActionIcon variant="subtle" color="gray">
        <IconDots size={18} />
      </ActionIcon>
    ),
    trend: -11,
    trendLabel: "Since last day",
  },
};

export const InlineTrend: Story = {
  name: "Inline Trend Badge",
  args: {
    label: "Total Users",
    value: "$1,00,01",
    trendInline: true,
    trend: 70.5,
    description: "You made an extra $300 this year",
    action: (
      <ActionIcon variant="subtle" color="gray">
        <IconDots size={18} />
      </ActionIcon>
    ),
  },
};

export const NoTrend: Story = {
  name: "No Trend",
  args: {
    label: "Active Users",
    value: "8,421",
    icon: <IconUsers size={20} />,
  },
};

export const Examples: Story = {
  render: () => (
    <Stack>
      <Group>
        <MetricCard
          label="Revenue"
          value="101"
          icon={<IconCash size={20} />}
          action={
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={18} />
            </ActionIcon>
          }
          trend={11}
          trendLabel="Since last day"
        />
        <MetricCard
          label="Gross Revenue"
          value="101"
          icon={<IconCash size={20} />}
          action={
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={18} />
            </ActionIcon>
          }
          trend={-11}
          trendLabel="Since last day"
        />
      </Group>
      <Group>
        <MetricCard
          label="Total Users"
          value="$1,00,01"
          trendInline
          trend={70.5}
          description="You made an extra $300 this year"
          action={
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={18} />
            </ActionIcon>
          }
        />
        <MetricCard
          label="Total Orders"
          value="$1,00,01"
          trendInline
          trend={-20.5}
          description="You made an extra $300 this year"
          action={
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={18} />
            </ActionIcon>
          }
        />
      </Group>
    </Stack>
  ),
};
