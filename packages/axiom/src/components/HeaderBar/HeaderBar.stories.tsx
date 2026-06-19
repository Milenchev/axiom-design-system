import { ActionIcon, Indicator, Menu } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconBell,
  IconChartBar,
  IconCreditCard,
  IconDashboard,
  IconDatabase,
  IconExternalLink,
  IconHelpCircleFilled,
  IconHome,
  IconLayoutGrid,
  IconLogout,
  IconMessageCircle,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";
import type {
  NotificationItem,
  ProductMenuItem,
  RealmSelection,
  SearchModalApp,
  SearchModalItem,
} from "../..";
import { Button, HeaderBar, NotificationsMenu, ProductMenu, Text } from "../..";

const searchRecentItems: SearchModalItem[] = [
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

const searchAllItems: SearchModalItem[] = [
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
  { id: "6", label: "Home", icon: <IconHome size={28} /> },
];

const searchRecommendedApps: SearchModalApp[] = [
  { id: "home", label: "Home", icon: <IconHome size={36} /> },
  { id: "dashboard", label: "Dashboard", icon: <IconDashboard size={36} /> },
  { id: "data", label: "Data", icon: <IconDatabase size={36} /> },
  { id: "analytics", label: "Analytics", icon: <IconChartBar size={36} /> },
  { id: "settings", label: "Settings", icon: <IconSettings size={36} /> },
];

const meta = {
  title: "Components/HeaderBar",
  component: HeaderBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeaderBar>;

export default meta;
type Story = StoryObj<typeof HeaderBar>;

const headerBarDefaultAppSwitcherContent = (
  <div>
    <Text fw={700} mb="md">
      Applications
    </Text>
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
    >
      <Button variant="light" h={80} style={{ flexDirection: "column" }}>
        App 1
      </Button>
      <Button variant="light" h={80} style={{ flexDirection: "column" }}>
        App 2
      </Button>
      <Button variant="light" h={80} style={{ flexDirection: "column" }}>
        App 3
      </Button>
      <Button variant="light" h={80} style={{ flexDirection: "column" }}>
        App 4
      </Button>
    </div>
  </div>
);

const headerProducts: ProductMenuItem[] = [
  {
    id: "analytics",
    name: "Analytics",
    icon: <IconChartBar size={20} />,
    color: "#0f6eef",
  },
  {
    id: "crm",
    name: "CRM",
    icon: <IconUsers size={20} />,
    color: "#04b000",
  },
  {
    id: "billing",
    name: "Billing",
    icon: <IconCreditCard size={20} />,
    color: "#735920",
  },
  {
    id: "data",
    name: "Data",
    icon: <IconDatabase size={20} />,
    color: "#8a3ffc",
  },
  {
    id: "settings",
    name: "Settings",
    icon: <IconSettings size={20} />,
    color: "#525252",
  },
  {
    id: "home",
    name: "Home",
    icon: <IconHome size={20} />,
    color: "#0f6eef",
  },
];

const headerNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Deployment succeeded",
    description: "Production build #1287 is live.",
    time: "2m ago",
    icon: <IconDashboard size={16} />,
    color: "#04b000",
  },
  {
    id: "2",
    title: "New comment on your report",
    description: "Yuri mentioned you in Q3 Analytics.",
    time: "1h ago",
    icon: <IconMessageCircle size={16} />,
    color: "#0f6eef",
  },
  {
    id: "3",
    title: "Billing reminder",
    description: "Your invoice is due in 3 days.",
    time: "Yesterday",
    read: true,
    icon: <IconCreditCard size={16} />,
    color: "#735920",
  },
];

export const Primary: Story = {
  render: () => {
    const [realmSelection, setRealmSelection] = useState<RealmSelection>({
      region: "AMER",
      environment: "production",
    });
    const [searchQuery, setSearchQuery] = useState("");

    const searchResults = searchQuery
      ? searchAllItems.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

    const realmItems = [
      {
        region: "AMER",
        environments: ["production", "staging", "dev"] as const,
      },
      {
        region: "EMER",
        environments: ["production", "staging", "dev"] as const,
      },
      {
        region: "APAC",
        environments: ["production", "staging", "dev"] as const,
      },
    ];

    return (
      <HeaderBar>
        <HeaderBar.Logo />

        <HeaderBar.CustomContent>
          <HeaderBar.Search
            placeholder="Search..."
            shortcut="⌘K"
            enableShortcut
            recentItems={searchRecentItems}
            recommendedApps={searchRecommendedApps}
            results={searchResults}
            query={searchQuery}
            onQueryChange={setSearchQuery}
          />

          <HeaderBar.RealmMenu
            items={realmItems}
            value={realmSelection}
            onChange={setRealmSelection}
          >
            <HeaderBar.Realm
              region={realmSelection.region}
              environment={realmSelection.environment}
            />
          </HeaderBar.RealmMenu>

          <ProductMenu products={headerProducts} activeId="analytics">
            <ActionIcon
              variant="transparent"
              size="lg"
              color="white"
              aria-label="Switch product"
            >
              <IconLayoutGrid size={20} />
            </ActionIcon>
          </ProductMenu>

          <NotificationsMenu notifications={headerNotifications}>
            <Indicator
              label="3"
              size={14}
              color="red"
              offset={10}
              position="top-end"
            >
              <ActionIcon
                variant="transparent"
                size="lg"
                color="white"
                aria-label="Notifications"
              >
                <IconBell size={20} />
              </ActionIcon>
            </Indicator>
          </NotificationsMenu>

          <ActionIcon
            variant="transparent"
            size="lg"
            color="white"
            aria-label="Help"
          >
            <IconHelpCircleFilled size={20} />
          </ActionIcon>

          <HeaderBar.UserMenu name="Yuri Gagarin" description="Deep Space">
            <Menu.Sub openDelay={120} closeDelay={150}>
              <Menu.Sub.Target>
                <Menu.Sub.Item pl={34}>Links</Menu.Sub.Item>
              </Menu.Sub.Target>

              <Menu.Sub.Dropdown>
                <Menu.Item>Grid Page</Menu.Item>
                <Menu.Item>Chart Page</Menu.Item>
                <Menu.Item>Grid Layout Page</Menu.Item>
                <Menu.Item>Tab Page</Menu.Item>
                <Menu.Item>Notifications Page</Menu.Item>
              </Menu.Sub.Dropdown>
            </Menu.Sub>

            <Menu.Divider />

            <Menu.Item pl={34}>Open Simple Dialog</Menu.Item>

            <Menu.Divider />

            <Menu.Item pl={34} rightSection={<IconExternalLink size={14} />}>
              My Website
            </Menu.Item>

            <Menu.Item
              leftSection={<IconSearch size={14} />}
              rightSection={
                <Text size="sm" c="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Menu.Divider />

            <Menu.Sub>
              <Menu.Sub.Target>
                <Menu.Sub.Item pl={34}>Administration Tasks</Menu.Sub.Item>
              </Menu.Sub.Target>

              <Menu.Sub.Dropdown>
                <Menu.Label>Common Tasks</Menu.Label>
                <Menu.Item disabled>User</Menu.Item>
                <Menu.Item disabled>Roles</Menu.Item>
                <Menu.Item disabled>Privileges</Menu.Item>
                <Menu.Label>Other Tasks</Menu.Label>
                <Menu.Item disabled>Work Teams</Menu.Item>
                <Menu.Item disabled>System Parameters</Menu.Item>
              </Menu.Sub.Dropdown>
            </Menu.Sub>

            <Menu.Divider />

            <Menu.Item pl={34}>
              Trigger Authentication Error (Explicitly)
            </Menu.Item>
            <Menu.Item pl={34}>
              Trigger Authentication Error (networkFetch)
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item pl={34}>Trigger WAF Error (Explicitly)</Menu.Item>
            <Menu.Item pl={34}>Trigger WAF Error (networkFetch)</Menu.Item>

            <Menu.Divider />

            <Menu.Sub>
              <Menu.Sub.Target>
                <Menu.Sub.Item pl={34}>Select Workteam</Menu.Sub.Item>
              </Menu.Sub.Target>

              <Menu.Sub.Dropdown>
                <Menu.Item>Northeast</Menu.Item>
                <Menu.Item>West</Menu.Item>
                <Menu.Item>(Fail)</Menu.Item>
              </Menu.Sub.Dropdown>
            </Menu.Sub>

            <Menu.Divider />

            <Menu.Item pl={34}>
              Clear Google Analytics Local Storage Flag
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item pl={34}>Replace Me</Menu.Item>

            <Menu.Divider />

            <Menu.Item leftSection={<IconLogout size={14} />}>Logout</Menu.Item>
          </HeaderBar.UserMenu>
        </HeaderBar.CustomContent>
      </HeaderBar>
    );
  },
};

export const WithAppTabs: Story = {
  render: () => {
    const [realmSelection, setRealmSelection] = useState<RealmSelection>({
      region: "AMER",
      environment: "production",
    });
    const [searchQuery, setSearchQuery] = useState("");

    const searchResults = searchQuery
      ? searchAllItems.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

    const realmItems = [
      {
        region: "AMER",
        environments: ["production", "staging", "dev"] as const,
      },
      {
        region: "EMER",
        environments: ["production", "staging", "dev"] as const,
      },
      {
        region: "APAC",
        environments: ["production", "staging", "dev"] as const,
      },
    ];

    const [tabs, setTabs] = useState([
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <IconDashboard size={28} />,
      },
      { id: "data", label: "Data", icon: <IconDatabase size={28} /> },
      { id: "analytics", label: "Analytics", icon: <IconChartBar size={28} /> },
    ]);
    const [activeTab, setActiveTab] = useState("dashboard");

    const handleClose = (id: string) => {
      setTabs((prev) => {
        const next = prev.filter((t) => t.id !== id);
        if (activeTab === id) {
          setActiveTab(next[0]?.id ?? "");
        }
        return next;
      });
    };

    return (
      <HeaderBar appSwitcherContent={headerBarDefaultAppSwitcherContent}>
        <HeaderBar.Logo />

        {tabs.map((tab) => (
          <HeaderBar.AppTab
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            onClose={() => handleClose(tab.id)}
          />
        ))}

        <HeaderBar.CustomContent>
          <HeaderBar.Search
            placeholder="Search..."
            shortcut="⌘K"
            enableShortcut
            recentItems={searchRecentItems}
            recommendedApps={searchRecommendedApps}
            results={searchResults}
            query={searchQuery}
            onQueryChange={setSearchQuery}
          />

          <HeaderBar.RealmMenu
            items={realmItems}
            value={realmSelection}
            onChange={setRealmSelection}
          >
            <HeaderBar.Realm
              region={realmSelection.region}
              environment={realmSelection.environment}
            />
          </HeaderBar.RealmMenu>

          <Indicator
            label="3"
            size={14}
            color="red"
            offset={10}
            position="top-end"
          >
            <ActionIcon
              variant="transparent"
              size="lg"
              color="white"
              aria-label="Notifications"
            >
              <IconBell size={20} />
            </ActionIcon>
          </Indicator>

          <ActionIcon
            variant="transparent"
            size="lg"
            color="white"
            aria-label="Help"
          >
            <IconHelpCircleFilled size={20} />
          </ActionIcon>

          <HeaderBar.UserMenu name="John Adams">
            <Menu.Item leftSection={<IconLogout size={14} />}>Logout</Menu.Item>
          </HeaderBar.UserMenu>
        </HeaderBar.CustomContent>
      </HeaderBar>
    );
  },
};
