import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconChartBar,
  IconCreditCard,
  IconFolder,
  IconMail,
  IconMessage,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";
import { ProductMenu, type ProductMenuItem } from "../..";

const products: ProductMenuItem[] = [
  {
    id: "analytics",
    name: "Analytics",
    icon: <IconChartBar size={20} />,
    color: "#0f6eef",
  },
  { id: "crm", name: "CRM", icon: <IconUsers size={20} />, color: "#04b000" },
  {
    id: "billing",
    name: "Billing",
    icon: <IconCreditCard size={20} />,
    color: "#735920",
  },
  {
    id: "inbox",
    name: "Inbox",
    icon: <IconMail size={20} />,
    color: "#dc000d",
  },
  {
    id: "files",
    name: "Files",
    icon: <IconFolder size={20} />,
    color: "#ffc700",
  },
  {
    id: "chat",
    name: "Chat",
    icon: <IconMessage size={20} />,
    color: "#252525",
  },
];

const meta: Meta<typeof ProductMenu> = {
  title: "Components/ProductMenu",
  component: ProductMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductMenu>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("analytics");
    return (
      <ProductMenu products={products} activeId={active} onSelect={setActive} />
    );
  },
};

export const Monochrome: Story = {
  render: () => {
    const [active, setActive] = useState("crm");
    const mono = products.map(({ color, ...p }) => p);
    return (
      <ProductMenu products={mono} activeId={active} onSelect={setActive} />
    );
  },
};

export const FourColumns: Story = {
  render: () => {
    const [active, setActive] = useState("files");
    return (
      <ProductMenu
        products={products}
        columns={4}
        activeId={active}
        onSelect={setActive}
        title="Your apps"
      />
    );
  },
};
