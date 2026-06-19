import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconAlertTriangle,
  IconMessageCircle,
  IconUserPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { type NotificationItem, NotificationsMenu } from "../..";

const initial: NotificationItem[] = [
  {
    id: "1",
    title: "New comment on your post",
    description: "Jane Doe replied to “Design tokens in practice”.",
    time: "2m ago",
    icon: <IconMessageCircle size={18} />,
    color: "#0f6eef",
  },
  {
    id: "2",
    title: "New team member",
    description: "Alex Smith joined the Design team.",
    time: "1h ago",
    icon: <IconUserPlus size={18} />,
    color: "#04b000",
  },
  {
    id: "3",
    title: "Deployment warning",
    description: "Build #482 finished with 2 warnings.",
    time: "3h ago",
    read: true,
    icon: <IconAlertTriangle size={18} />,
    color: "#ffc700",
  },
];

const meta: Meta<typeof NotificationsMenu> = {
  title: "Components/NotificationsMenu",
  component: NotificationsMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationsMenu>;

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState(initial);
    return (
      <NotificationsMenu
        notifications={items}
        onMarkAllRead={() =>
          setItems((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        onSelect={(id) =>
          setItems((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
          )
        }
      />
    );
  },
};

export const Empty: Story = {
  render: () => <NotificationsMenu notifications={[]} />,
};

export const WithoutIcons: Story = {
  render: () => {
    const plain = initial.map(({ icon, color, ...n }) => n);
    return <NotificationsMenu notifications={plain} />;
  },
};
