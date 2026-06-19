import { Group, Stack, Text, Title } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Button, ThemeProvider } from "../..";

const meta: Meta<typeof ThemeProvider> = {
  title: "Components/ThemeProvider",
  component: ThemeProvider,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

export const Primary: Story = {
  render: () => (
    <ThemeProvider>
      <Stack gap="lg">
        <Title order={3}>Axiom Theme Preview</Title>
        <Text>
          The ThemeProvider wraps your application with the Axiom design system
          theme, providing consistent colors, typography, spacing, and component
          styles.
        </Text>
        <Group>
          <Button variant="filled">Primary</Button>
          <Button variant="outline">Secondary</Button>
          <Button variant="light">Tertiary</Button>
        </Group>
        <Group>
          <Badge color="axiom-blue">Info</Badge>
          <Badge color="axiom-green">Success</Badge>
          <Badge color="axiom-red">Error</Badge>
          <Badge color="axiom-yellow">Warning</Badge>
        </Group>
      </Stack>
    </ThemeProvider>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider forceColorScheme="dark">
      <Stack
        gap="lg"
        p="lg"
        style={{
          backgroundColor: "var(--mantine-color-body)",
          borderRadius: 8,
        }}
      >
        <Title order={3}>Dark Mode</Title>
        <Text>
          ThemeProvider supports dark mode via the forceColorScheme prop.
        </Text>
        <Group>
          <Button variant="filled">Primary</Button>
          <Button variant="outline">Secondary</Button>
          <Button variant="light">Tertiary</Button>
        </Group>
      </Stack>
    </ThemeProvider>
  ),
};
