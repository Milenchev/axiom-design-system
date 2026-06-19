import { NativeSelect, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof NativeSelect> = {
  title: "Themed/NativeSelect",
  component: NativeSelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

const data = ["React", "Angular", "Vue", "Svelte"];

export const Primary: Story = {
  args: {
    label: "Framework",
    data,
  },
};

export const States: Story = {
  render: () => (
    <Stack w={240}>
      <NativeSelect label="Default" data={data} />
      <NativeSelect label="Disabled" data={data} disabled />
      <NativeSelect label="Error" data={data} error="Selection is required" />
    </Stack>
  ),
};
