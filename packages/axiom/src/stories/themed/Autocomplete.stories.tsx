import { Autocomplete, Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Autocomplete> = {
  title: "Themed/Autocomplete",
  component: Autocomplete,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const data = ["React", "Angular", "Vue", "Svelte", "Solid", "Qwik"];

export const Primary: Story = {
  args: {
    label: "Framework",
    placeholder: "Start typing…",
    data,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Framework",
    description: "Pick the framework you use most often",
    placeholder: "Start typing…",
    data,
  },
};

export const States: Story = {
  render: () => (
    <Stack w={260}>
      <Autocomplete label="Default" placeholder="Start typing…" data={data} />
      <Autocomplete
        label="Disabled"
        placeholder="Start typing…"
        data={data}
        disabled
      />
      <Autocomplete
        label="Error"
        placeholder="Start typing…"
        data={data}
        error="This field is required"
      />
    </Stack>
  ),
};
