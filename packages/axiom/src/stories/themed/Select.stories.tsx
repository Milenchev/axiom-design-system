import { Select } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Select> = {
  title: "Themed/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: { control: "boolean" },
    error: { control: "text" },
    description: { control: "text" },
    searchable: { control: "boolean" },
    clearable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {
    label: "Framework",
    placeholder: "Pick a value",
    data: ["React", "Angular", "Vue", "Svelte"],
  },
};

export const Searchable: Story = {
  args: {
    label: "Country",
    placeholder: "Search countries",
    data: [
      "United States",
      "United Kingdom",
      "Canada",
      "Germany",
      "France",
      "Japan",
      "Australia",
      "Brazil",
    ],
    searchable: true,
  },
};

export const Clearable: Story = {
  args: {
    label: "Color",
    placeholder: "Pick a color",
    data: ["Red", "Green", "Blue", "Yellow", "Purple"],
    clearable: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Region",
    description: "Select the deployment region.",
    placeholder: "Pick a region",
    data: ["US East", "US West", "EU Central", "Asia Pacific"],
  },
};

export const WithError: Story = {
  args: {
    label: "Priority",
    placeholder: "Pick priority",
    data: ["Low", "Medium", "High", "Critical"],
    error: "Priority is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Status",
    placeholder: "Cannot change",
    data: ["Active", "Inactive"],
    disabled: true,
  },
};
