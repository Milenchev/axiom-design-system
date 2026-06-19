import { NumberFormatter, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof NumberFormatter> = {
  title: "Themed/NumberFormatter",
  component: NumberFormatter,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumberFormatter>;

export const Primary: Story = {
  args: {
    value: 1234567.89,
    thousandSeparator: true,
  },
};

export const Currency: Story = {
  render: () => (
    <Stack gap="xs">
      <NumberFormatter prefix="$ " value={1986.45} thousandSeparator />
      <NumberFormatter
        prefix="€ "
        value={2450}
        thousandSeparator
        decimalScale={2}
      />
      <NumberFormatter suffix=" %" value={68.4} />
    </Stack>
  ),
};
