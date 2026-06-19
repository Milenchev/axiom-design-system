import { Fieldset, Group, TextInput } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Fieldset> = {
  title: "Themed/Fieldset",
  component: Fieldset,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Primary: Story = {
  render: () => (
    <Fieldset legend="Personal information" w={360}>
      <TextInput label="First name" placeholder="Jane" />
      <TextInput label="Last name" placeholder="Doe" mt="sm" />
    </Fieldset>
  ),
};

export const Variants: Story = {
  render: () => (
    <Group align="flex-start">
      <Fieldset legend="Default" variant="default" w={220}>
        <TextInput label="Email" placeholder="jane@axiom.dev" />
      </Fieldset>
      <Fieldset legend="Filled" variant="filled" w={220}>
        <TextInput label="Email" placeholder="jane@axiom.dev" />
      </Fieldset>
    </Group>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Fieldset legend="Billing" disabled w={360}>
      <TextInput label="Card holder" placeholder="Jane Doe" />
      <TextInput
        label="Card number"
        placeholder="0000 0000 0000 0000"
        mt="sm"
      />
    </Fieldset>
  ),
};
