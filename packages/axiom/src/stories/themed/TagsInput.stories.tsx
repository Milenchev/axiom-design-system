import { TagsInput } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TagsInput> = {
  title: "Themed/TagsInput",
  component: TagsInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagsInput>;

export const Primary: Story = {
  args: {
    label: "Technologies",
    placeholder: "Add a tag",
    defaultValue: ["React", "TypeScript"],
    style: { width: 350 },
  },
};

export const WithSuggestions: Story = {
  args: {
    label: "Frameworks",
    placeholder: "Pick or type",
    data: ["React", "Angular", "Vue", "Svelte", "Next.js", "Remix"],
    defaultValue: ["React"],
    style: { width: 350 },
  },
};

export const MaxTags: Story = {
  args: {
    label: "Skills (max 3)",
    placeholder: "Add skill",
    maxTags: 3,
    defaultValue: ["Design", "Code"],
    style: { width: 350 },
  },
};
