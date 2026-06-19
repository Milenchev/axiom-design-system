import {
  Anchor,
  Breadcrumbs,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { composeStory, type Meta, type StoryObj } from "@storybook/react-vite";
import {
  IconCategory,
  IconChartCircles,
  IconHelp,
  IconHome2,
  IconPalette,
  IconSettings,
  IconSettings2,
  IconTargetArrow,
} from "@tabler/icons-react";
import datagridMeta, {
  Primary as DatagridDefault,
} from "@/components/Datagrid/Datagrid.stories";
import headerBarMeta, {
  Primary as HeaderBarDefault,
} from "@/components/HeaderBar/HeaderBar.stories";
import { ContentAlertsMock } from "@/demos/components/ContentAlertsMock";
import { AppLayout, Sidebar, type SidebarItem, type ToolItem } from "..";

const meta: Meta<typeof AppLayout> = {
  title: "Demos/Demo 2",
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
    id: "modules",
    label: "Modules",
    icon: <IconCategory size={18} stroke={1.8} />,
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: <IconTargetArrow size={18} stroke={1.8} />,
  },
  {
    id: "design",
    label: "Design Themes",
    icon: <IconPalette size={18} stroke={1.8} />,
  },
  {
    id: "placements_rules",
    label: "Placements Rules",
    icon: <IconChartCircles size={18} stroke={1.8} />,
  },
  {
    id: "advanced",
    label: "Advanced",
    icon: <IconSettings2 size={18} stroke={1.8} />,
    defaultOpened: false,
    children: [
      { id: "assets", label: "Tracking / Custom Assets" },
      { id: "routes_search_tool", label: "Routes Search Tool" },
    ],
  },
];

// Breadcrumbs

const BreadcrumbsContent = () => (
  <Breadcrumbs>
    <Anchor size="sm">Menu</Anchor>
    <Text size="sm">Campaigns</Text>
  </Breadcrumbs>
);

const SidebarContent = () => (
  <Sidebar items={sidebarItems} activeItemId="campaigns" />
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

// Header

const HeaderContent = composeStory(HeaderBarDefault, headerBarMeta);
const DatagridContent = composeStory(DatagridDefault, datagridMeta);

// Content header

const ContentHeader = () => (
  <Group justify="space-between" align="flex-start">
    <div>
      <Title order={3} mt={-5}>
        Campaigns
      </Title>
      <Text size="sm" c="dimmed">
        Manage your advertising campaigns
      </Text>
    </div>
    <Button variant="fill">New campaign</Button>
  </Group>
);

// Tool items (right-side icon strip with optional panels)

const HelpPanel = () => (
  <Stack gap="lg">
    <div>
      <Title order={4} mb={4}>
        About campaigns
      </Title>
      <Text size="sm" c="dimmed">
        Campaigns group your placements, rules and creative assets so you can
        launch and measure them together.
      </Text>
    </div>

    <div>
      <Text fw={600} size="sm" mb={8}>
        Quick steps
      </Text>
      <Stack gap={6}>
        <Text size="sm" c="dimmed">
          1. Create a campaign and set its schedule.
        </Text>
        <Text size="sm" c="dimmed">
          2. Attach placement rules and design themes.
        </Text>
        <Text size="sm" c="dimmed">
          3. Review and activate when you're ready.
        </Text>
      </Stack>
    </div>

    <Divider />

    <div>
      <Text fw={600} size="sm" mb={8}>
        Learn more
      </Text>
      <Stack gap={6}>
        <Anchor size="sm">Campaign best practices</Anchor>
        <Anchor size="sm">Placement rules guide</Anchor>
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

const _SplitPanelContent = () => (
  <Paper withBorder radius="md" p="lg" style={{ height: "100%" }}>
    <Text size="sm" c="dimmed">
      Split panel content
    </Text>
  </Paper>
);

// Stories

export const Default: StoryObj<typeof AppLayout> = {
  name: "Demo 2",
  render: () => (
    <AppLayout
      header={<HeaderContent />}
      sidebar={<SidebarContent />}
      breadcrumbs={<BreadcrumbsContent />}
      sidebarResizable
      sidebarMinWidth={220}
      sidebarMaxWidth={360}
    >
      <AppLayout.Alerts>
        <ContentAlertsMock />
      </AppLayout.Alerts>
      <AppLayout.ContentHeader>
        <ContentHeader />
      </AppLayout.ContentHeader>
      <AppLayout.ToolItems
        items={sampleToolItems}
        panelResizable
        panelMinWidth={260}
        panelMaxWidth={420}
      />
      <DatagridContent />
    </AppLayout>
  ),
};
