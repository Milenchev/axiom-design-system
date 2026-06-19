import { Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterBar } from "../..";

const meta = {
  title: "Components/FilterBar",
  component: FilterBar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const Primary: Story = {
  args: {
    children: "Filter controls go here",
    onApply: () => {},
    onClear: () => {},
  },
};

export const WithFilters: Story = {
  render: () => (
    <FilterBar onApply={() => {}} onClear={() => {}}>
      <TextInput label="Origin" placeholder="JFK" style={{ width: 120 }} />
      <TextInput label="Destination" placeholder="FRA" style={{ width: 120 }} />
      <Select
        label="POS Country"
        placeholder="Select"
        data={["US", "UK", "DE", "FR"]}
        style={{ width: 140 }}
      />
      <DateInput
        label="Start Date"
        placeholder="Select date"
        style={{ width: 160 }}
      />
      <DateInput
        label="End Date"
        placeholder="Select date"
        style={{ width: 160 }}
      />
    </FilterBar>
  ),
};
