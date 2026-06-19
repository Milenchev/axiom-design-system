import { Badge, Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { KeyValueList } from "../..";

const meta: Meta<typeof KeyValueList> = {
  title: "Components/KeyValueList",
  component: KeyValueList,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KeyValueList>;

export const Horizontal: Story = {
  render: () => (
    <Box w={360}>
      <KeyValueList
        items={[
          { label: "Plan", value: "Enterprise" },
          { label: "Seats", value: "120" },
          { label: "Renews", value: "Jan 1, 2027" },
          {
            label: "Status",
            value: <Badge color="axiom-green">Active</Badge>,
          },
        ]}
      />
    </Box>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box w={360}>
      <KeyValueList
        layout="vertical"
        columns={2}
        items={[
          { label: "First name", value: "Jane" },
          { label: "Last name", value: "Doe" },
          { label: "Email", value: "jane@axiom.dev" },
          { label: "Role", value: "Administrator" },
        ]}
      />
    </Box>
  ),
};
