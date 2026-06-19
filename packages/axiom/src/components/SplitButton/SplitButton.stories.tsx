import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCopy, IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { SplitButton, type SplitButtonAction } from "../..";

const actions: SplitButtonAction[] = [
  { label: "Save and continue", icon: <IconDeviceFloppy size={16} /> },
  { label: "Duplicate", icon: <IconCopy size={16} /> },
  { label: "Delete", icon: <IconTrash size={16} />, danger: true },
];

const meta: Meta<typeof SplitButton> = {
  title: "Components/SplitButton",
  component: SplitButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SplitButton>;

export const Default: Story = {
  render: () => <SplitButton actions={actions}>Save</SplitButton>,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <SplitButton actions={actions} variant="filled">
        Filled
      </SplitButton>
      <SplitButton actions={actions} variant="light">
        Light
      </SplitButton>
      <SplitButton actions={actions} variant="default">
        Default
      </SplitButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <SplitButton actions={actions} disabled>
      Save
    </SplitButton>
  ),
};
