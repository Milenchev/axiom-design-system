import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Card } from "../..";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    shadow: "sm",
    padding: "lg",
    radius: "md",
    withBorder: true,
    children: (
      <>
        <h3>Card Title</h3>
        <p>This is a basic card component.</p>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Action
        </Button>
      </>
    ),
  },
};

export const WithShadow: Story = {
  args: {
    shadow: "md",
    padding: "xl",
    radius: "md",
    children: (
      <>
        <h3>Elevated Card</h3>
        <p>This card uses a shadow instead of a border.</p>
      </>
    ),
  },
};

export const Minimal: Story = {
  args: {
    padding: "lg",
    radius: "md",
    withBorder: true,
    children: <p>A simple content-only card without actions.</p>,
  },
};
