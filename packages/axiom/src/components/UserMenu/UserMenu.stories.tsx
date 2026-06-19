import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconLogout,
  IconSettings,
  IconUser,
  IconUserCog,
} from "@tabler/icons-react";
import { UserMenu, type UserMenuItem } from "../..";

const items: UserMenuItem[] = [
  { label: "Profile", icon: <IconUser size={16} /> },
  { label: "Account settings", icon: <IconSettings size={16} /> },
  { label: "Admin", icon: <IconUserCog size={16} /> },
  {
    label: "Sign out",
    icon: <IconLogout size={16} />,
    danger: true,
    withDividerBefore: true,
  },
];

const meta: Meta<typeof UserMenu> = {
  title: "Components/UserMenu",
  component: UserMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {
  render: () => (
    <UserMenu name="Jane Doe" email="jane@axiom.dev" items={items} />
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <UserMenu
      name="Alex Smith"
      email="alex@axiom.dev"
      avatar="https://i.pravatar.cc/100?img=12"
      items={items}
    />
  ),
};

export const NameOnly: Story = {
  render: () => <UserMenu name="Sam Taylor" items={items} />,
};
