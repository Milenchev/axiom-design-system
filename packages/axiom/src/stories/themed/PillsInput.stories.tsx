import { Pill, PillsInput } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof PillsInput> = {
  title: "Themed/PillsInput",
  component: PillsInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PillsInput>;

export const Primary: Story = {
  render: () => (
    <PillsInput label="Tags" style={{ width: 350 }}>
      <Pill.Group>
        <Pill withRemoveButton>React</Pill>
        <Pill withRemoveButton>TypeScript</Pill>
        <Pill withRemoveButton>Mantine</Pill>
        <PillsInput.Field placeholder="Add tag..." />
      </Pill.Group>
    </PillsInput>
  ),
};
