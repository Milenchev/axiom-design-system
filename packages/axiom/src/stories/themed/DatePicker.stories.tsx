import { DatePickerInput } from "@mantine/dates";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof DatePickerInput> = {
  title: "Themed/DatePicker",
  component: DatePickerInput,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePickerInput>;

export const Primary: Story = {
  args: {
    placeholder: "Pick date",
    label: "Event date",
  },
};

export const WithMultipleDates: Story = {
  args: {
    type: "multiple",
    placeholder: "Pick dates",
    label: "Event dates",
  },
};

export const WithDateRange: Story = {
  args: {
    type: "range",
    placeholder: "Pick dates range",
    label: "Event date range",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Pick date",
    label: "Event date",
  },
};

export const WithError: Story = {
  args: {
    error: "Invalid date selected",
    placeholder: "Pick date",
    label: "Event date",
  },
};

export const Clearable: Story = {
  args: {
    clearable: true,
    placeholder: "Pick date",
    label: "Event date",
    defaultValue: new Date(),
  },
};
