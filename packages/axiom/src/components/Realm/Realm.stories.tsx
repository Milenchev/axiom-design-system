import type { Meta, StoryObj } from "@storybook/react-vite";
import { Realm } from "../..";

const meta: Meta<typeof Realm> = {
  title: "Components/Realm",
  component: Realm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    environment: {
      control: { type: "select" },
      options: ["production", "staging", "dev"],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#1a2a4a",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Realm>;

export const Primary: Story = {
  args: {
    region: "AMER",
    environment: "production",
  },
};

export const Staging: Story = {
  args: {
    region: "AMER",
    environment: "staging",
  },
};

export const Dev: Story = {
  args: {
    region: "AMER",
    environment: "dev",
  },
};
