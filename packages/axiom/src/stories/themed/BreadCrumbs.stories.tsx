import { Breadcrumbs } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Themed/Breadcrumbs",
  component: Breadcrumbs,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const items = [
  { title: "Axiom", href: "#" },
  { title: "Components", href: "#" },
  { title: "Breadcrumbs", href: "#" },
].map((item) => (
  <a
    href={item.href}
    key={item.href + item.title}
    style={{ color: "#228be6", textDecoration: "none" }}
  >
    {item.title}
  </a>
));

export const Primary: Story = {
  render: () => <Breadcrumbs>{items}</Breadcrumbs>,
};

export const CustomSeparator: Story = {
  render: () => <Breadcrumbs separator=">">{items}</Breadcrumbs>,
};
