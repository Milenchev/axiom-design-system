import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageHeading } from "../..";

const meta: Meta<typeof PageHeading> = {
  title: "Components/PageHeading",
  component: PageHeading,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageHeading>;

export const Primary: Story = {
  args: {
    title: "Heading",
    subtitle: "Sub message option available",
  },
};

export const TitleOnly: Story = {
  name: "Title Only",
  args: {
    title: "Dashboard",
  },
};
