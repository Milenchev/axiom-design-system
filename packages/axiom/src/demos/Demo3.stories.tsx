import {
  Checkbox,
  Divider,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Slider,
  Stack,
  Switch,
  Tabs,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconBell, IconLock, IconPalette, IconUser } from "@tabler/icons-react";
import { Badge } from "@/components/Badge";
import { Banner } from "@/components/Banner";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ExpandablePanel } from "@/components/ExpandablePanel";
import { FormSection } from "@/components/FormSection";
import { PageHeading } from "@/components/PageHeading";

const meta: Meta = {
  title: "Demos/Demo 3 – Settings & Forms",
  parameters: {
    layout: "padded",
  },
  tags: ["showcase"],
};

export default meta;

// Profile Form

const ProfileForm = () => (
  <FormSection
    title="Profile Information"
    description="Update your personal details and public profile."
  >
    <Stack gap="md">
      <SimpleGrid cols={2}>
        <TextInput label="First name" placeholder="John" defaultValue="Alex" />
        <TextInput label="Last name" placeholder="Doe" defaultValue="Petrov" />
      </SimpleGrid>
      <TextInput
        label="Email"
        placeholder="john@example.com"
        defaultValue="alex.petrov@company.io"
      />
      <Textarea
        label="Bio"
        placeholder="Tell us about yourself..."
        defaultValue="Senior frontend engineer with 5+ years of experience building enterprise applications."
        rows={3}
        autosize
        maxRows={5}
      />
      <Select
        label="Role"
        data={["Admin", "Editor", "Viewer", "Developer"]}
        defaultValue="Developer"
      />
      <Select
        label="Timezone"
        data={[
          "UTC",
          "Europe/Sofia",
          "Europe/London",
          "America/New_York",
          "Asia/Tokyo",
        ]}
        defaultValue="Europe/Sofia"
      />
    </Stack>
  </FormSection>
);

// Notification Preferences

const NotificationPreferences = () => (
  <FormSection
    title="Notifications"
    description="Choose what notifications you receive."
  >
    <Stack gap="md">
      <Switch
        label="Email notifications"
        description="Receive email for important updates"
        defaultChecked
      />
      <Switch
        label="Push notifications"
        description="Browser push notifications for real-time alerts"
        defaultChecked
      />
      <Switch
        label="Weekly digest"
        description="Get a summary of activity every Monday"
      />
      <Divider my="xs" />
      <Text fw={500} size="sm">
        Notify me about:
      </Text>
      <Checkbox.Group defaultValue={["comments", "mentions"]}>
        <Stack gap="xs">
          <Checkbox value="comments" label="New comments on my items" />
          <Checkbox value="mentions" label="Direct mentions" />
          <Checkbox value="assignments" label="Task assignments" />
          <Checkbox value="releases" label="New releases and updates" />
          <Checkbox value="security" label="Security alerts" />
        </Stack>
      </Checkbox.Group>
    </Stack>
  </FormSection>
);

// Appearance Settings

const AppearanceSettings = () => (
  <FormSection
    title="Appearance"
    description="Customize the look and feel of the application."
  >
    <Stack gap="md">
      <Select
        label="Theme"
        data={["Light", "Dark", "System default"]}
        defaultValue="System default"
      />
      <Select
        label="Accent color"
        data={["Blue", "Purple", "Green", "Orange", "Red"]}
        defaultValue="Blue"
      />
      <div>
        <Text size="sm" fw={500} mb={8}>
          Font size
        </Text>
        <Slider
          defaultValue={14}
          min={12}
          max={20}
          step={1}
          marks={[
            { value: 12, label: "12" },
            { value: 14, label: "14" },
            { value: 16, label: "16" },
            { value: 18, label: "18" },
            { value: 20, label: "20" },
          ]}
        />
      </div>
      <NumberInput
        label="Sidebar width (px)"
        defaultValue={260}
        min={200}
        max={400}
        step={10}
      />
      <Switch
        label="Compact mode"
        description="Reduce spacing for denser layouts"
      />
      <Switch
        label="Animations"
        description="Enable transition animations"
        defaultChecked
      />
    </Stack>
  </FormSection>
);

// Security Settings

const SecuritySettings = () => (
  <FormSection
    title="Security"
    description="Manage your account security settings."
  >
    <Stack gap="md">
      <TextInput
        label="Current password"
        type="password"
        placeholder="••••••••"
      />
      <SimpleGrid cols={2}>
        <TextInput
          label="New password"
          type="password"
          placeholder="••••••••"
        />
        <TextInput
          label="Confirm password"
          type="password"
          placeholder="••••••••"
        />
      </SimpleGrid>
      <ExpandablePanel title="Two-factor authentication" defaultExpanded>
        <Stack gap="sm">
          <Group>
            <Text size="sm">Status:</Text>
            <Badge type="success" emphasis="bold">
              Enabled
            </Badge>
          </Group>
          <Text size="sm" c="dimmed">
            Two-factor authentication adds an extra layer of security to your
            account. You will need to enter a verification code from your
            authenticator app when signing in.
          </Text>
          <Button
            variant="light"
            color="red"
            size="sm"
            style={{ width: "fit-content" }}
          >
            Disable 2FA
          </Button>
        </Stack>
      </ExpandablePanel>
      <ExpandablePanel title="Active sessions">
        <Stack gap="xs">
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Chrome on macOS
              </Text>
              <Text size="xs" c="dimmed">
                Sofia, Bulgaria · Last active 2 min ago
              </Text>
            </div>
            <Badge type="active" emphasis="subtle">
              Current
            </Badge>
          </Group>
          <Divider />
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Firefox on Windows
              </Text>
              <Text size="xs" c="dimmed">
                London, UK · Last active 3 days ago
              </Text>
            </div>
            <Button variant="subtle" size="xs" color="red">
              Revoke
            </Button>
          </Group>
        </Stack>
      </ExpandablePanel>
    </Stack>
  </FormSection>
);

// Main Story

export const Default: StoryObj = {
  name: "Settings & Forms",
  render: () => (
    <Stack gap="xl" maw={900} mx="auto" p="xl">
      <PageHeading
        title="Account Settings"
        subtitle="Manage your account preferences, notifications, and security settings."
      />

      <Banner color="blue" title="Profile complete">
        Your profile is 100% complete. All settings are synced across devices.
      </Banner>

      <Tabs defaultValue="profile">
        <Tabs.List>
          <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>
            Profile
          </Tabs.Tab>
          <Tabs.Tab value="notifications" leftSection={<IconBell size={16} />}>
            Notifications
          </Tabs.Tab>
          <Tabs.Tab value="appearance" leftSection={<IconPalette size={16} />}>
            Appearance
          </Tabs.Tab>
          <Tabs.Tab value="security" leftSection={<IconLock size={16} />}>
            Security
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile" pt="xl">
          <Stack gap="xl">
            <ProfileForm />
            <Group justify="flex-end">
              <Button variant="subtle">Cancel</Button>
              <Button>Save changes</Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="notifications" pt="xl">
          <Stack gap="xl">
            <NotificationPreferences />
            <Group justify="flex-end">
              <Button variant="subtle">Reset to defaults</Button>
              <Button>Save preferences</Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="appearance" pt="xl">
          <Stack gap="xl">
            <AppearanceSettings />
            <Card padding="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text fw={500} size="sm">
                    Preview changes
                  </Text>
                  <Text size="xs" c="dimmed">
                    Changes are applied in real-time
                  </Text>
                </div>
                <Badge type="info" emphasis="subtle">
                  Live preview
                </Badge>
              </Group>
            </Card>
            <Group justify="flex-end">
              <Button variant="subtle">Reset</Button>
              <Button>Apply theme</Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="security" pt="xl">
          <Stack gap="xl">
            <SecuritySettings />
            <Group justify="flex-end">
              <Button>Update security</Button>
            </Group>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  ),
};
