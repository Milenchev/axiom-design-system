import { Group, Stack, Text, ThemeIcon } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconBell,
  IconCheck,
  IconDownload,
  IconHeart,
  IconHome,
  IconSettings,
  IconStar,
  IconUser,
} from "@tabler/icons-react";

const meta: Meta<typeof ThemeIcon> = {
  title: "Themed/Icon",
  component: ThemeIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "filled",
        "light",
        "outline",
        "transparent",
        "white",
        "default",
        "gradient",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    color: { control: "text" },
    radius: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeIcon>;

export const Primary: Story = {
  args: {
    children: <IconHome size={20} />,
  },
};

export const Variants: Story = {
  render: () => (
    <Group>
      <ThemeIcon variant="filled">
        <IconStar size={20} />
      </ThemeIcon>
      <ThemeIcon variant="light">
        <IconStar size={20} />
      </ThemeIcon>
      <ThemeIcon variant="outline">
        <IconStar size={20} />
      </ThemeIcon>
      <ThemeIcon variant="transparent">
        <IconStar size={20} />
      </ThemeIcon>
      <ThemeIcon variant="default">
        <IconStar size={20} />
      </ThemeIcon>
    </Group>
  ),
};

export const Colors: Story = {
  render: () => (
    <Group>
      <ThemeIcon color="axiom-blue">
        <IconHeart size={20} />
      </ThemeIcon>
      <ThemeIcon color="axiom-red">
        <IconHeart size={20} />
      </ThemeIcon>
      <ThemeIcon color="axiom-green">
        <IconCheck size={20} />
      </ThemeIcon>
      <ThemeIcon color="axiom-yellow">
        <IconStar size={20} />
      </ThemeIcon>
      <ThemeIcon color="axiom-violet">
        <IconBell size={20} />
      </ThemeIcon>
    </Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group align="center">
      <ThemeIcon size="xs">
        <IconUser size={12} />
      </ThemeIcon>
      <ThemeIcon size="sm">
        <IconUser size={14} />
      </ThemeIcon>
      <ThemeIcon size="md">
        <IconUser size={18} />
      </ThemeIcon>
      <ThemeIcon size="lg">
        <IconUser size={22} />
      </ThemeIcon>
      <ThemeIcon size="xl">
        <IconUser size={28} />
      </ThemeIcon>
    </Group>
  ),
};

export const CommonIcons: Story = {
  name: "Common Icons",
  render: () => (
    <Group>
      {[
        { icon: <IconHome size={20} />, label: "Home" },
        { icon: <IconUser size={20} />, label: "User" },
        { icon: <IconSettings size={20} />, label: "Settings" },
        { icon: <IconBell size={20} />, label: "Bell" },
        { icon: <IconDownload size={20} />, label: "Download" },
        { icon: <IconCheck size={20} />, label: "Check" },
      ].map(({ icon, label }) => (
        <Stack key={label} align="center" gap={4}>
          <ThemeIcon variant="light">{icon}</ThemeIcon>
          <Text size="xs" c="dimmed">
            {label}
          </Text>
        </Stack>
      ))}
    </Group>
  ),
};
