import { Stack } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyField } from "../..";

const meta: Meta<typeof CopyField> = {
  title: "Components/CopyField",
  component: CopyField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyField>;

export const Default: Story = {
  render: () => <CopyField label="Project ID" value="prj_8f2a91c4e7d0" />,
};

export const MaskedSecret: Story = {
  render: () => (
    <CopyField
      label="API key"
      description="Keep this secret. Rotate it if it leaks."
    />
  ),
};

export const Multiple: Story = {
  render: () => (
    <Stack>
      <CopyField label="Endpoint" value="https://api.axiom.dev/v1" />
      <CopyField label="Webhook secret" value="whsec_3kLp9mQ2" masked />
    </Stack>
  ),
};
