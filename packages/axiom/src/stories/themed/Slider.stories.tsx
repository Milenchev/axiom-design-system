import { Slider } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Slider> = {
  title: "Themed/Slider",
  component: Slider,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    color: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Primary: Story = {
  args: {
    defaultValue: 40,
    style: { width: "300px" },
  },
};

export const CustomMarks: Story = {
  args: {
    defaultValue: 50,
    marks: [
      { value: 20, label: "20%" },
      { value: 50, label: "50%" },
      { value: 80, label: "80%" },
    ],
    style: { width: "300px", marginBottom: "20px" },
  },
};

export const Step: Story = {
  args: {
    defaultValue: 25,
    step: 25,
    marks: [
      { value: 0, label: "xs" },
      { value: 25, label: "sm" },
      { value: 50, label: "md" },
      { value: 75, label: "lg" },
      { value: 100, label: "xl" },
    ],
    style: { width: "300px", marginBottom: "20px" },
  },
};
