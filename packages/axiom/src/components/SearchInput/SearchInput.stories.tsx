import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "../..";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    debounce: { control: { type: "number" } },
    shortcut: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Primary: Story = {
  args: {
    placeholder: "Search...",
  },
};

export const WithShortcut: Story = {
  args: {
    placeholder: "Search...",
    shortcut: "⌘K",
    enableShortcut: true,
  },
};

export const Debounced: Story = {
  args: {
    placeholder: "Type to search (300ms debounce)...",
    debounce: 300,
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "initial search",
  },
};
