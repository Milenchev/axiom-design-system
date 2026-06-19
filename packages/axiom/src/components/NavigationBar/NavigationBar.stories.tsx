import type { Meta, StoryObj } from "@storybook/react-vite";
import { DrawerMock } from "@/demos/components/DrawerMock";
import { useDemoAppStore } from "@/demos/store/useDemoAppStore";
import { NavigationBar } from "../..";

const meta: Meta<typeof NavigationBar> = {
  title: "Components/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Primary: Story = {
  render: () => {
    const openDrawer = useDemoAppStore((state) => state.openDrawer);

    const items = [
      { value: "dashboard", label: "Dashboard" },
      { value: "datagrid", label: "Datagrid" },
      { value: "forms", label: "Forms" },
      { value: "charts", label: "Charts" },
      { value: "tabs", label: "Tabs" },
      { value: "notifications", label: "Notifications" },
      {
        value: "action",
        label: "Action",
        type: "action",
        ml: "auto",
        onClick: () => openDrawer(),
      },
      {
        value: "link",
        label: "Open Link",
        type: "link",
        href: "https://mantine.dev/",
      },
    ];

    return (
      <>
        <NavigationBar items={items} defaultValue="datagrid" />
        <DrawerMock />
      </>
    );
  },
};
