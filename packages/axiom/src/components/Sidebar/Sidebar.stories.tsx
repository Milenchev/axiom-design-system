import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconChartPie,
  IconChecklist,
  IconFolder,
  IconHome2,
  IconLayoutDashboard,
  IconUsers,
} from "@tabler/icons-react";
import { Sidebar, type SidebarItem } from "../..";

const items: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <IconHome2 size={18} />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <IconLayoutDashboard size={18} />,
    defaultOpened: true,
    children: [
      { id: "overview", label: "Overview" },
      { id: "notifications", label: "Notifications" },
      { id: "analytics", label: "Analytics" },
      { id: "saved-reports", label: "Saved reports" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: <IconFolder size={18} />,
    children: [
      { id: "roadmap", label: "Roadmap" },
      { id: "delivery", label: "Delivery" },
    ],
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: <IconChecklist size={18} />,
    badge: 8,
    children: [
      { id: "assigned", label: "Assigned to me" },
      { id: "approvals", label: "Approvals" },
    ],
  },
  {
    id: "reporting",
    label: "Reporting",
    icon: <IconChartPie size={18} />,
    children: [
      { id: "revenue", label: "Revenue" },
      { id: "usage", label: "Usage trends" },
    ],
  },
  {
    id: "users",
    label: "Users",
    icon: <IconUsers size={18} />,
    children: [
      { id: "team", label: "Team members" },
      { id: "permissions", label: "Permissions" },
    ],
  },
];

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Primary: StoryObj<typeof Sidebar> = {
  render: () => (
    <Box
      style={{
        width: 320,
        height: "100vh",
        maxHeight: 940,
        borderRight: "1px solid var(--mantine-color-default-border)",
      }}
    >
      <Sidebar items={items} defaultActiveItemId="home" />
    </Box>
  ),
};

export const Collapsed: StoryObj<typeof Sidebar> = {
  render: () => (
    <Box
      style={{
        width: 80,
        height: "100vh",
        maxHeight: 940,
        borderRight: "1px solid var(--mantine-color-default-border)",
      }}
    >
      <Sidebar items={items} defaultActiveItemId="home" />
    </Box>
  ),
};
