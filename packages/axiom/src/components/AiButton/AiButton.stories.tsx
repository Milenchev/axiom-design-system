import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconBrain, IconSparkles, IconWand } from "@tabler/icons-react";
import { AiButton } from "../..";

const meta: Meta<typeof AiButton> = {
  title: "Components/AiButton",
  component: AiButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AiButton>;

export const Primary: Story = {
  args: {},
};

export const CustomLabel: Story = {
  args: {
    children: "Generate",
  },
};

export const CustomIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px" }}>
      <AiButton leftSection={<IconSparkles size={14} />}>Ask AI</AiButton>
      <AiButton leftSection={<IconWand size={14} />}>Auto-fill</AiButton>
      <AiButton leftSection={<IconBrain size={14} />}>Suggest</AiButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
