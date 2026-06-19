import {
  Anchor,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { composeStory, type Meta, type StoryObj } from "@storybook/react-vite";
import {
  IconChartPie,
  IconChecklist,
  IconFolder,
  IconHelp,
  IconHome2,
  IconKeyboard,
  IconLayoutDashboard,
  IconLifebuoy,
  IconPlus,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import datagridMeta, {
  Primary as DatagridDefault,
} from "@/components/Datagrid/Datagrid.stories";
import { GridLayout } from "@/components/GridLayout/GridLayout";
import headerBarMeta, {
  Primary as HeaderBarDefault,
} from "@/components/HeaderBar/HeaderBar.stories";
import navigationBarMeta, {
  Primary as NavigationBarDefault,
} from "@/components/NavigationBar/NavigationBar.stories";
import { ContentAlertsMock } from "@/demos/components/ContentAlertsMock";

import { StatsGrid } from "@/demos/components/StatsGridMock";
import { AppLayout, Sidebar, type SidebarItem, type ToolItem } from "..";

const meta: Meta<typeof AppLayout> = {
  title: "Demos/Demo 1",
  component: AppLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["showcase"],
};

export default meta;

// Sidebar content

const sidebarItems: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <IconHome2 size={18} stroke={1.8} />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <IconLayoutDashboard size={18} stroke={1.8} />,
    defaultOpened: true,
    children: [
      { id: "overview", label: "Overview" },
      { id: "notifications-center", label: "Notifications" },
      { id: "analytics", label: "Analytics" },
      { id: "saved-reports", label: "Saved reports" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: <IconFolder size={18} stroke={1.8} />,
    children: [
      { id: "roadmap", label: "Roadmap" },
      { id: "delivery", label: "Delivery" },
    ],
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: <IconChecklist size={18} stroke={1.8} />,
    children: [
      { id: "assigned", label: "Assigned to me" },
      { id: "approvals", label: "Approvals" },
    ],
  },
  {
    id: "reporting",
    label: "Reporting",
    icon: <IconChartPie size={18} stroke={1.8} />,
    children: [
      { id: "revenue", label: "Revenue" },
      { id: "usage", label: "Usage trends" },
    ],
  },
  {
    id: "users",
    label: "Users",
    icon: <IconUsers size={18} stroke={1.8} />,
    children: [
      { id: "team", label: "Team members" },
      { id: "permissions", label: "Permissions" },
    ],
  },
];

const sidebarFooterItems: SidebarItem[] = [
  {
    id: "settings",
    label: "Settings",
    icon: <IconSettings size={18} stroke={1.8} />,
  },
  {
    id: "support",
    label: "Support",
    icon: <IconLifebuoy size={18} stroke={1.8} />,
    rightSection: (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          borderRadius: 12,
          border: "1px solid var(--mantine-color-default-border)",
          backgroundColor: "white",
        }}
      >
        <Box
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            backgroundColor: "var(--mantine-color-green-6)",
          }}
        />
        <Text size="sm" fw={500}>
          Online
        </Text>
      </Box>
    ),
  },
  {
    id: "open-in-browser",
    label: "Open in browser",
    icon: <IconHome2 size={18} stroke={1.8} />,
    external: true,
  },
];

const _SidebarContent = () => (
  <Sidebar
    items={sidebarItems}
    footerItems={sidebarFooterItems}
    defaultActiveItemId="home"
  />
);

const SettingsPanel = () => (
  <Stack gap="md">
    <Text fw={600}>Workspace settings</Text>
    <Divider />
    <Button variant="light" justify="space-between">
      Theme
    </Button>
    <Button variant="light" justify="space-between">
      Notifications
    </Button>
    <Button variant="light" justify="space-between">
      Data refresh cadence
    </Button>
    <Button variant="light" color="red" justify="space-between">
      Danger zone
    </Button>
  </Stack>
);

const ContentSurface = ({
  label,
  description = "This panel is wired into the live demo layout — switch views from the top navigation to explore.",
  h = 320,
}: {
  label: string;
  description?: string;
  h?: number | string;
}) => (
  <Paper
    withBorder
    radius="md"
    p="xl"
    style={{
      flex: "1",
      height: h,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}
  >
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 14,
        background: "var(--mantine-color-default-hover)",
        color: "var(--mantine-color-dimmed)",
      }}
    >
      <IconLayoutDashboard size={24} stroke={1.6} />
    </Box>
    <Text fw={600}>{label}</Text>
    <Text size="sm" c="dimmed" maw={380}>
      {description}
    </Text>
  </Paper>
);

// Lightweight bar chart (no charting dependency)

const MiniBarChart = ({
  title,
  subtitle,
  data,
  color = "var(--mantine-color-blue-6)",
  h = 320,
}: {
  title: string;
  subtitle?: string;
  data: { label: string; value: number }[];
  color?: string;
  h?: number | string;
}) => {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <Paper
      withBorder
      radius="md"
      p="lg"
      style={{ height: h, display: "flex", flexDirection: "column" }}
    >
      <div>
        <Text fw={600}>{title}</Text>
        {subtitle && (
          <Text size="sm" c="dimmed">
            {subtitle}
          </Text>
        )}
      </div>
      <Box
        mt="md"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          minHeight: 80,
        }}
      >
        {data.map((d) => (
          <Box
            key={d.label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 8,
              height: "100%",
            }}
          >
            <Box
              style={{
                width: "100%",
                height: `${Math.max(6, (d.value / max) * 100)}%`,
                borderRadius: 8,
                background: `linear-gradient(180deg, ${color}, color-mix(in srgb, ${color} 45%, transparent))`,
              }}
            />
            <Text size="xs" c="dimmed">
              {d.label}
            </Text>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

// Recent activity feed

const recentActivity = [
  {
    user: "Maria Ivanova",
    action: "approved invoice",
    target: "#INV-7291",
    time: "2m ago",
  },
  {
    user: "Georgi Dimitrov",
    action: "created campaign",
    target: "Q3 Launch",
    time: "18m ago",
  },
  {
    user: "Elena Petrova",
    action: "closed task",
    target: "#TASK-204",
    time: "1h ago",
  },
  {
    user: "Ivan Stoychev",
    action: "updated report",
    target: "Revenue YTD",
    time: "3h ago",
  },
  {
    user: "Anna Koleva",
    action: "invited member",
    target: "design-team",
    time: "5h ago",
  },
];

const RecentActivityCard = ({ h = 320 }: { h?: number | string }) => (
  <Paper withBorder radius="md" p="lg" style={{ height: h }}>
    <Text fw={600} mb="md">
      Recent activity
    </Text>
    <Stack gap="sm">
      {recentActivity.map((item) => (
        <Group key={item.target} justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Box
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                flexShrink: 0,
                backgroundColor: "var(--mantine-color-blue-6)",
              }}
            />
            <Text size="sm">
              <b>{item.user}</b> {item.action}{" "}
              <Text span c="dimmed">
                {item.target}
              </Text>
            </Text>
          </Group>
          <Text size="xs" c="dimmed" style={{ whiteSpace: "nowrap" }}>
            {item.time}
          </Text>
        </Group>
      ))}
    </Stack>
  </Paper>
);

const revenueWeek = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 41 },
  { label: "Wed", value: 38 },
  { label: "Thu", value: 52 },
  { label: "Fri", value: 61 },
  { label: "Sat", value: 47 },
  { label: "Sun", value: 55 },
];

const revenueYear = [
  { label: "Jan", value: 18 },
  { label: "Feb", value: 24 },
  { label: "Mar", value: 31 },
  { label: "Apr", value: 28 },
  { label: "May", value: 40 },
  { label: "Jun", value: 47 },
  { label: "Jul", value: 52 },
  { label: "Aug", value: 49 },
  { label: "Sep", value: 58 },
  { label: "Oct", value: 63 },
  { label: "Nov", value: 71 },
  { label: "Dec", value: 80 },
];

const trafficSplit = [
  { label: "Search", value: 38 },
  { label: "Direct", value: 24 },
  { label: "Social", value: 16 },
  { label: "Email", value: 12 },
  { label: "Other", value: 10 },
];

const conversionTrend = [
  { label: "W1", value: 2.1 },
  { label: "W2", value: 2.6 },
  { label: "W3", value: 2.4 },
  { label: "W4", value: 3.1 },
  { label: "W5", value: 3.5 },
  { label: "W6", value: 3.9 },
];

// Header

const HeaderContent = composeStory(HeaderBarDefault, headerBarMeta);
const DatagridContent = composeStory(DatagridDefault, datagridMeta);
const NavigationContentStory = composeStory(
  NavigationBarDefault,
  navigationBarMeta,
);

import { DrawerMock } from "@/demos/components/DrawerMock";
import { useDemoAppStore } from "@/demos/store/useDemoAppStore";

const NavigationContentWrapper = () => {
  const { activeView, setActiveView } = useDemoAppStore();
  return (
    <NavigationContentStory
      value={activeView}
      onChange={(val) => {
        if (val && val !== "action" && val !== "link") {
          setActiveView(val);
        }
      }}
    />
  );
};

const stats = [
  { title: "Revenue", icon: "receipt" as const, value: "13,456", diff: 34 },
  { title: "Profit", icon: "coin" as const, value: "4,145", diff: -13 },
  { title: "Coupons usage", icon: "discount" as const, value: "745", diff: 18 },
  { title: "New customers", icon: "user" as const, value: "188", diff: -30 },
];

const MainContentWrapper = () => {
  const activeView = useDemoAppStore((state) => state.activeView);

  switch (activeView) {
    case "dashboard":
      return (
        <Flex direction="column" gap="md" h="100%">
          <StatsGrid data={stats} />
          <Flex gap="md" wrap="wrap">
            <Box style={{ flex: "2 1 360px" }}>
              <MiniBarChart
                title="Revenue"
                subtitle="Last 7 days"
                data={revenueWeek}
              />
            </Box>
            <Box style={{ flex: "1 1 280px" }}>
              <RecentActivityCard />
            </Box>
          </Flex>
        </Flex>
      );
    case "datagrid":
      return (
        <>
          <AppLayout.Alerts>
            <ContentAlertsMock />
          </AppLayout.Alerts>
          <DatagridContent />
          <AppLayout.ToolItems
            items={sampleToolItems}
            panelResizable
            panelMinWidth={260}
            panelMaxWidth={420}
          />
        </>
      );
    case "forms":
      return (
        <>
          <AppLayout.Alerts>
            <ContentAlertsMock />
          </AppLayout.Alerts>
          <AppLayout.ContentHeader>
            <ContentHeader />
          </AppLayout.ContentHeader>
          <ContentSurface label="Forms View" h="100%" />
          <AppLayout.ToolItems
            items={sampleToolItems}
            panelResizable
            panelMinWidth={260}
            panelMaxWidth={420}
          />
        </>
      );
    case "charts":
      return (
        <>
          <AppLayout.SplitPanel
            title="Split Pane"
            height={200}
            minHeight={200}
            maxHeight={400}
            resizable
            defaultCollapsed={false}
          >
            <SplitPanelContent />
          </AppLayout.SplitPanel>
          <GridLayout
            layout={[
              { key: "left", col: 0, row: 0, colSpan: 1, rowSpan: 2 },
              { key: "right-top", col: 1, row: 0, colSpan: 1, rowSpan: 1 },
              { key: "right-bottom", col: 1, row: 1, colSpan: 1, rowSpan: 1 },
            ]}
            columns={2}
            gap={16}
            rowHeight="auto"
          >
            <Box key="left" style={{ height: "100%" }}>
              <MiniBarChart
                title="Revenue"
                subtitle="Monthly, this year"
                data={revenueYear}
                h={420}
              />
            </Box>
            <Box key="right-top" style={{ height: "100%" }}>
              <MiniBarChart
                title="Traffic sources"
                subtitle="Share of sessions"
                data={trafficSplit}
                color="var(--mantine-color-grape-6)"
                h={202}
              />
            </Box>
            <Box key="right-bottom" style={{ height: "100%" }}>
              <MiniBarChart
                title="Conversion rate"
                subtitle="Weekly %"
                data={conversionTrend}
                color="var(--mantine-color-teal-6)"
                h={202}
              />
            </Box>
          </GridLayout>
          {/* <Grid gap="md">
          <Grid.Col span={6} bg="var(--mantine-color-body)"><StackedAreaContent /></Grid.Col>
          <Grid.Col span={6} bg="var(--mantine-color-body)"><StackedAreaContent /></Grid.Col>
          <Grid.Col span={12} bg="var(--mantine-color-body)"><StackedAreaContent /></Grid.Col>
        </Grid> */}
        </>
      );
    case "tabs":
      return <ContentSurface label="Tabs View" h="100%" />;
    case "notifications":
      return <ContentSurface label="Notifications View" h="100%" />;
    default:
      return <ContentSurface label="Select a view" />;
  }
};

// Content header

const ContentHeader = () => (
  <Group justify="space-between" align="flex-start">
    <div>
      <Title order={3} mt={-5}>
        Overview
      </Title>
      <Text size="sm" c="dimmed">
        Your workspace at a glance — metrics, activity and reports.
      </Text>
    </div>
    <Button leftSection={<IconPlus size={16} />}>New report</Button>
  </Group>
);

// Tool items (right-side icon strip with optional panels)

const HelpPanel = () => (
  <Stack gap="lg">
    <div>
      <Title order={4} mb={4}>
        Getting around
      </Title>
      <Text size="sm" c="dimmed">
        Use the top navigation to switch views and the sidebar to move between
        sections. Everything you see here is composed from Axiom components.
      </Text>
    </div>

    <div>
      <Group gap={8} mb={8}>
        <IconKeyboard size={18} />
        <Text fw={600} size="sm">
          Keyboard shortcuts
        </Text>
      </Group>
      <Stack gap={6}>
        {[
          { keys: "⌘ K", label: "Open global search" },
          { keys: "G D", label: "Go to dashboard" },
          { keys: "G T", label: "Go to tasks" },
          { keys: "?", label: "Show this help panel" },
        ].map((row) => (
          <Group key={row.label} justify="space-between">
            <Text size="sm" c="dimmed">
              {row.label}
            </Text>
            <Box
              style={{
                padding: "2px 8px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: "1px solid var(--mantine-color-default-border)",
                background: "var(--mantine-color-default-hover)",
              }}
            >
              {row.keys}
            </Box>
          </Group>
        ))}
      </Stack>
    </div>

    <Divider />

    <div>
      <Text fw={600} size="sm" mb={8}>
        Resources
      </Text>
      <Stack gap={6}>
        <Anchor size="sm">Documentation</Anchor>
        <Anchor size="sm">Component reference</Anchor>
        <Anchor size="sm">Release notes</Anchor>
        <Anchor size="sm">Contact support</Anchor>
      </Stack>
    </div>
  </Stack>
);

const sampleToolItems: ToolItem[] = [
  {
    id: "help",
    icon: <IconHelp size={20} />,
    panel: <HelpPanel />,
    title: "Help panel",
    ariaLabel: "Help",
  },
  {
    id: "settings",
    icon: <IconSettings size={20} />,
    panel: <SettingsPanel />,
    title: "Settings",
    ariaLabel: "Settings",
  },
];

// Split panel

const SplitPanelContent = () => (
  <Paper withBorder radius="md" p="lg" style={{ height: "100%" }}>
    <Center h="100%">
      <Text size="sm" c="dimmed">
        Content
      </Text>
    </Center>
  </Paper>
);

// Stories

export const Default: StoryObj<typeof AppLayout> = {
  name: "Demo 1",
  render: () => (
    <>
      <AppLayout
        header={<HeaderContent />}
        navigation={<NavigationContentWrapper />}
      >
        <MainContentWrapper />
      </AppLayout>
      <DrawerMock />
    </>
  ),
};
