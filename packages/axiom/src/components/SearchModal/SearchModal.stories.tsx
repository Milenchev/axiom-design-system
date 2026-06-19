import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import { useState } from "react";
import type { SearchModalApp, SearchModalItem } from "../..";
import { SearchModal } from "../..";

const recentItems: SearchModalItem[] = [
  {
    id: "1",
    label: "Dashboard > Overview",
    icon: <IconDashboard size={28} />,
  },
  {
    id: "2",
    label: "Dashboard > Analytics",
    icon: <IconChartBar size={28} />,
  },
  {
    id: "3",
    label: "Settings > General",
    icon: <IconSettings size={28} />,
  },
  {
    id: "4",
    label: "Data > Sources",
    icon: <IconDatabase size={28} />,
  },
  {
    id: "5",
    label: "Data > Reports",
    icon: <IconDatabase size={28} />,
  },
];

const allItems: SearchModalItem[] = [
  {
    id: "1",
    label: "Dashboard > Overview",
    icon: <IconDashboard size={28} />,
  },
  {
    id: "2",
    label: "Dashboard > Analytics",
    icon: <IconChartBar size={28} />,
  },
  {
    id: "3",
    label: "Settings > General",
    icon: <IconSettings size={28} />,
  },
  {
    id: "4",
    label: "Data > Sources",
    icon: <IconDatabase size={28} />,
  },
  {
    id: "5",
    label: "Data > Reports",
    icon: <IconDatabase size={28} />,
  },
];

const recommendedApps: SearchModalApp[] = [
  { id: "home", label: "Home", icon: <IconHome size={36} /> },
  { id: "dashboard", label: "Dashboard", icon: <IconDashboard size={36} /> },
  { id: "data", label: "Data", icon: <IconDatabase size={36} /> },
  { id: "analytics", label: "Analytics", icon: <IconChartBar size={36} /> },
  { id: "settings", label: "Settings", icon: <IconSettings size={36} /> },
];

const meta = {
  title: "Components/SearchModal",
  component: SearchModal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchModal>;

export default meta;
type Story = StoryObj<typeof SearchModal>;

function SearchModalDemo() {
  const [opened, setOpened] = useState(true);
  const [query, setQuery] = useState("");

  const filtered = query
    ? allItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <SearchModal
      opened={opened}
      onClose={() => setOpened(false)}
      query={query}
      onQueryChange={setQuery}
      recentItems={recentItems}
      results={filtered}
      recommendedApps={recommendedApps}
      onSelectItem={(item) => console.log("Selected:", item.label)}
      onSelectApp={(app) => console.log("App:", app.label)}
    />
  );
}

export const Primary: Story = {
  render: () => <SearchModalDemo />,
};
