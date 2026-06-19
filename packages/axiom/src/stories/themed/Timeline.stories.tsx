import { Text, Timeline } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconCheck,
  IconCircleDashed,
  IconMessageDots,
  IconSettings,
} from "@tabler/icons-react";

const meta: Meta<typeof Timeline> = {
  title: "Themed/Timeline",
  component: Timeline,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Primary: Story = {
  render: () => (
    <Timeline active={1} bulletSize={28} lineWidth={2}>
      <Timeline.Item bullet={<IconCheck size={14} />} title="Account created">
        <Text c="dimmed" size="sm">
          You created an account
        </Text>
      </Timeline.Item>
      <Timeline.Item
        bullet={<IconMessageDots size={14} />}
        title="Email verified"
      >
        <Text c="dimmed" size="sm">
          Your email was verified
        </Text>
      </Timeline.Item>
      <Timeline.Item
        bullet={<IconSettings size={14} />}
        title="Profile setup"
        lineVariant="dashed"
      >
        <Text c="dimmed" size="sm">
          Set up your profile
        </Text>
      </Timeline.Item>
      <Timeline.Item
        bullet={<IconCircleDashed size={14} />}
        title="Complete onboarding"
      >
        <Text c="dimmed" size="sm">
          Final step
        </Text>
      </Timeline.Item>
    </Timeline>
  ),
};
