import { MultiSelect, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof MultiSelect> = {
  title: "Themed/MultiSelect",
  component: MultiSelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const data = ["React", "Angular", "Vue", "Svelte", "Solid", "Qwik"];

export const Primary: Story = {
  args: {
    label: "Frameworks",
    placeholder: "Pick one or more",
    data,
    defaultValue: ["React", "Vue"],
  },
};

export const Searchable: Story = {
  args: {
    label: "Frameworks",
    placeholder: "Search and pick",
    data,
    searchable: true,
    clearable: true,
  },
};

export const States: Story = {
  render: () => (
    <Stack w={280}>
      <MultiSelect label="Default" placeholder="Pick one or more" data={data} />
      <MultiSelect
        label="Disabled"
        placeholder="Pick one or more"
        data={data}
        disabled
      />
      <MultiSelect
        label="Error"
        placeholder="Pick one or more"
        data={data}
        error="Select at least one option"
      />
    </Stack>
  ),
};
