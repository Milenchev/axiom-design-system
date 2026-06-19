import {
  Alert,
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Divider,
  Drawer,
  Group,
  Paper,
  px,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { composeStory, type Meta, type StoryObj } from "@storybook/react-vite";
import {
  IconAlertTriangle,
  IconChartPie,
  IconChecklist,
  IconCircleCheck,
  IconFolder,
  IconHelp,
  IconHome2,
  IconLayoutDashboard,
  IconLifebuoy,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";
import headerBarMeta, {
  Primary as HeaderBarDefault,
} from "@/components/HeaderBar/HeaderBar.stories";
import { AppLayout, Sidebar, type SidebarItem, type ToolItem } from "../..";

const meta: Meta<typeof AppLayout> = {
  title: "Components/AppLayout",
  component: AppLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 1000,
      },
    },
  },
  tags: ["autodocs"],
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

const SidebarContent = () => (
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

// Banner (critical system-wide alerts)

const BannerContent = () => (
  <Center h="100%" bg="yellow.1">
    <Group gap="xs">
      <IconAlertTriangle size={16} color="orange" />
      <Text size="sm" fw={500}>
        Scheduled maintenance on May 1st — some services may be unavailable.
      </Text>
    </Group>
  </Center>
);

const ContentSurface = ({ label }: { label: string }) => (
  <Paper
    withBorder
    radius="md"
    p="xl"
    style={{
      minHeight: 320,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text c="dimmed">{label}</Text>
  </Paper>
);

// Header

const HeaderContent = composeStory(HeaderBarDefault, headerBarMeta);

// Navigation (contextual bar below the header)

const NavigationContent = () => {
  const [opened, setOpened] = React.useState(false);

  return (
    <>
      <Group
        w="100%"
        h="100%"
        justify="space-between"
        style={{
          borderBottom: "1px solid var(--mantine-color-default-border)",
        }}
      >
        <Group gap="0">
          <Button
            color="black"
            variant="transparent"
            size="compact-xs"
            style={{
              height: 36,
              paddingLeft: px(12),
              paddingRight: px(12),
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Dashboard
          </Button>
          <Button
            color="#212121"
            variant="transparent"
            size="compact-xs"
            style={{
              height: 36,
              paddingLeft: px(12),
              paddingRight: px(12),
              textTransform: "uppercase",
              fontWeight: 400,
              fontSize: 13,
            }}
          >
            Datagrid
          </Button>
          <Button
            color="#212121"
            variant="transparent"
            size="compact-xs"
            style={{
              height: 36,
              paddingLeft: px(12),
              paddingRight: px(12),
              textTransform: "uppercase",
              fontWeight: 400,
              fontSize: 13,
            }}
          >
            Forms
          </Button>
          <Button
            color="#212121"
            variant="transparent"
            size="compact-xs"
            style={{
              height: 36,
              paddingLeft: px(12),
              paddingRight: px(12),
              textTransform: "uppercase",
              fontWeight: 400,
              fontSize: 13,
            }}
          >
            Charts
          </Button>
          <Button
            color="#212121"
            variant="transparent"
            size="compact-xs"
            style={{
              height: 36,
              paddingLeft: px(12),
              paddingRight: px(12),
              textTransform: "uppercase",
              fontWeight: 400,
              fontSize: 13,
            }}
          >
            Tabs
          </Button>
          <Button
            color="#212121"
            variant="transparent"
            size="compact-xs"
            style={{
              height: 36,
              paddingLeft: px(12),
              paddingRight: px(12),
              textTransform: "uppercase",
              fontWeight: 400,
              fontSize: 13,
            }}
          >
            Notifications
          </Button>
        </Group>

        <Button
          color="#212121"
          variant="transparent"
          size="compact-xs"
          style={{
            height: 36,
            paddingLeft: px(12),
            paddingRight: px(12),
            textTransform: "uppercase",
            fontWeight: 400,
            fontSize: 13,
          }}
          onClick={() => setOpened(true)}
        >
          Open drawer
        </Button>
      </Group>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Quick actions"
        padding="md"
        size="md"
      >
        <Stack gap="sm">
          <Text fw={600}>Contextual actions</Text>
          <Button variant="light">Create scenario</Button>
          <Button variant="light">Export view</Button>
          <Button variant="light">Share workspace</Button>
        </Stack>
      </Drawer>
    </>
  );
};

// Notifications

const Notifications = () => (
  <Alert
    icon={<IconCircleCheck size={18} />}
    color="yellow"
    withCloseButton
    closeButtonLabel="Dismiss"
  >
    Demo alert for the main content
  </Alert>
);

// Breadcrumbs

const BreadcrumbsContent = () => (
  <Breadcrumbs>
    <Anchor size="sm">Parent</Anchor>
    <Text size="sm">Current_page</Text>
  </Breadcrumbs>
);

// Content header

const ContentHeader = () => (
  <Group justify="space-between" align="flex-start">
    <div>
      <Title order={2} mt={-5}>
        Page title
      </Title>
      <Text size="sm" c="dimmed">
        Description
      </Text>
    </div>
    <Button>Button</Button>
  </Group>
);

// Tool items (right-side icon strip with optional panels)

const HelpPanel = () => (
  <Stack gap="md">
    <Text size="sm">
      This is a paragraph with some <b>bold</b> text.
    </Text>

    <Title order={3}>Section header (h3)</Title>
    <Text size="sm">
      This is a paragraph with some <b>bold</b> text.
    </Text>

    <Title order={4}>Section header (h4)</Title>
    <Text size="sm">
      This is a paragraph with some <b>bold</b> text.
    </Text>

    <Title order={5}>Section header (h5)</Title>
    <Text size="sm">
      This is a paragraph with some <b>bold</b> text.
    </Text>

    <Title order={4}>Section header (h4)</Title>
    <Stack gap={4}>
      <Anchor size="sm">Secondary link</Anchor>
      <Anchor size="sm">Secondary link</Anchor>
      <Anchor size="sm">Secondary link</Anchor>
      <Anchor size="sm">Secondary link</Anchor>
      <Anchor size="sm">Secondary link</Anchor>
    </Stack>
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
    <Text size="sm" c="dimmed">
      Split panel content
    </Text>
  </Paper>
);

// Stories

export const Primary: StoryObj<typeof AppLayout> = {
  render: () => (
    <AppLayout
      banner={<BannerContent />}
      header={<HeaderContent />}
      navigation={<NavigationContent />}
      sidebar={<SidebarContent />}
      sidebarResizable
      sidebarMinWidth={220}
      sidebarMaxWidth={360}
    >
      <AppLayout.Alerts>
        <Notifications />
      </AppLayout.Alerts>
      <AppLayout.ContentHeader>
        <ContentHeader />
      </AppLayout.ContentHeader>
      <AppLayout.ToolItems
        items={sampleToolItems}
        defaultActiveId="help"
        panelResizable
        panelMinWidth={260}
        panelMaxWidth={420}
      />
      <AppLayout.SplitPanel
        title="Split panel header"
        minHeight={140}
        maxHeight={320}
        resizable
        defaultCollapsed={false}
      >
        <SplitPanelContent />
      </AppLayout.SplitPanel>
      <ContentSurface label="Content" />
    </AppLayout>
  ),
};

export const NavigationOnly: StoryObj<typeof AppLayout> = {
  render: () => (
    <AppLayout header={<HeaderContent />} navigation={<NavigationContent />}>
      <AppLayout.ContentHeader>
        <ContentHeader />
      </AppLayout.ContentHeader>
      <Box p="md">
        <Text>
          This layout has no sidebar and no breadcrumbs. Navigation is handled
          only by the bar below the header.
        </Text>
      </Box>
    </AppLayout>
  ),
};

export const HeaderNavigationAndTools: StoryObj<typeof AppLayout> = {
  render: () => (
    <AppLayout header={<HeaderContent />} navigation={<NavigationContent />}>
      <AppLayout.ContentHeader>
        <ContentHeader />
      </AppLayout.ContentHeader>
      <AppLayout.ToolItems
        items={sampleToolItems}
        defaultActiveId="notifications"
        panelResizable
      />
      <ContentSurface label="Content area with tools but without sidebar" />
    </AppLayout>
  ),
};

export const LockedPanels: StoryObj<typeof AppLayout> = {
  render: () => (
    <AppLayout
      header={<HeaderContent />}
      navigation={<NavigationContent />}
      sidebar={<SidebarContent />}
      breadcrumbs={<BreadcrumbsContent />}
      sidebarCollapsible={false}
    >
      <AppLayout.ContentHeader>
        <ContentHeader />
      </AppLayout.ContentHeader>
      <AppLayout.ToolItems
        items={sampleToolItems}
        defaultActiveId="settings"
        panelCollapsible={false}
      />
      <AppLayout.SplitPanel
        title="Fixed panel"
        collapsible={false}
        resizable
        defaultCollapsed={false}
      >
        <SplitPanelContent />
      </AppLayout.SplitPanel>
      <ContentSurface label="Layout with fixed sidebar/tool panel and resizable bottom area" />
    </AppLayout>
  ),
};

export const MinimalLayout: StoryObj<typeof AppLayout> = {
  render: () => (
    <AppLayout header={<HeaderContent />}>
      <Box p="md">
        <Text>Simple content with only the header bar.</Text>
      </Box>
    </AppLayout>
  ),
};

export const WithSidebarOnly: StoryObj<typeof AppLayout> = {
  render: () => (
    <AppLayout
      header={<HeaderContent />}
      sidebar={<SidebarContent />}
      breadcrumbs={<BreadcrumbsContent />}
      sidebarResizable
    >
      <AppLayout.ContentHeader>
        <ContentHeader />
      </AppLayout.ContentHeader>
      <ContentSurface label="Content area" />
    </AppLayout>
  ),
};

export const ToolsHidden: StoryObj<typeof AppLayout> = {
  render: () => (
    <AppLayout
      header={<HeaderContent />}
      sidebar={<SidebarContent />}
      breadcrumbs={<BreadcrumbsContent />}
    >
      <AppLayout.ContentHeader>
        <ContentHeader />
      </AppLayout.ContentHeader>
      <AppLayout.ToolItems items={sampleToolItems} mode="hidden" />
      <Box p="md">
        <Text>
          The tools strip is completely hidden. The consumer manages tool UI
          externally.
        </Text>
      </Box>
    </AppLayout>
  ),
};
