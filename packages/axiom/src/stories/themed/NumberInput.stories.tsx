import { NumberInput, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof NumberInput> = {
  title: "Themed/NumberInput",
  component: NumberInput,
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
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Primary: Story = {
  args: {
    label: "Quantity",
    placeholder: "Enter a number",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Price",
    description: "Enter the unit price in USD.",
    placeholder: "0.00",
    prefix: "$",
  },
};

export const WithError: Story = {
  args: {
    label: "Age",
    placeholder: "Enter age",
    error: "Must be between 18 and 99",
  },
};

export const Disabled: Story = {
  args: {
    label: "Fixed value",
    disabled: true,
    value: 42,
  },
};

export const MinMax: Story = {
  args: {
    label: "Rating (1–10)",
    placeholder: "1–10",
    min: 1,
    max: 10,
    step: 1,
  },
};

export const Decimal: Story = {
  args: {
    label: "Temperature",
    placeholder: "0.0",
    decimalScale: 1,
    step: 0.1,
    suffix: " °C",
  },
};

export const States: Story = {
  render: () => (
    <Stack w={300} gap="md">
      <NumberInput label="Default" placeholder="Default state" />
      <NumberInput label="With value" value={100} onChange={() => {}} />
      <NumberInput label="Disabled" placeholder="Disabled" disabled />
      <NumberInput
        label="Error"
        placeholder="Invalid"
        error="Value out of range"
      />
      <NumberInput
        label="With description"
        placeholder="Enter value"
        description="Helpful hint text"
      />
    </Stack>
  ),
};
