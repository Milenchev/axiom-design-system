import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconInfoCircle } from "@tabler/icons-react";
import { Banner } from "../..";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Primary: Story = {
  args: {
    title: "Information",
    icon: <IconInfoCircle />,
    children: "This is an important message for the user.",
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    color: "yellow",
    icon: <IconInfoCircle />,
    children: "Please check your configuration before proceeding.",
  },
};
