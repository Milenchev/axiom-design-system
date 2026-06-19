import { NavLink, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconGauge,
  IconHome,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

const meta: Meta<typeof NavLink> = {
  title: "Themed/NavLink",
  component: NavLink,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Primary: Story = {
  render: () => (
    <Stack w={240} gap={2}>
      <NavLink label="Dashboard" leftSection={<IconHome size={18} />} active />
      <NavLink label="Analytics" leftSection={<IconGauge size={18} />} />
      <NavLink label="Team" leftSection={<IconUsers size={18} />} />
      <NavLink label="Settings" leftSection={<IconSettings size={18} />} />
    </Stack>
  ),
};

export const Nested: Story = {
  render: () => (
    <Stack w={240} gap={2}>
      <NavLink
        label="Settings"
        leftSection={<IconSettings size={18} />}
        defaultOpened
      >
        <NavLink label="Profile" />
        <NavLink label="Notifications" />
        <NavLink label="Security" />
      </NavLink>
    </Stack>
  ),
};
