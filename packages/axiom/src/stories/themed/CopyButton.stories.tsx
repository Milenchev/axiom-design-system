import { Button, CopyButton, Group, Tooltip } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconCheck, IconCopy } from "@tabler/icons-react";

const meta: Meta<typeof CopyButton> = {
  title: "Themed/CopyButton",
  component: CopyButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Primary: Story = {
  render: () => (
    <CopyButton value="npm install axiom-ui">
      {({ copied, copy }) => (
        <Button
          color={copied ? "axiom-green" : "axiom-blue"}
          onClick={copy}
          leftSection={
            copied ? <IconCheck size={16} /> : <IconCopy size={16} />
          }
        >
          {copied ? "Copied" : "Copy command"}
        </Button>
      )}
    </CopyButton>
  ),
};

export const IconWithTooltip: Story = {
  render: () => (
    <Group>
      <CopyButton value="axiom-ui" timeout={1500}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? "Copied" : "Copy"} withArrow>
            <Button
              variant="subtle"
              color={copied ? "axiom-green" : "axiom-neutral"}
              onClick={copy}
            >
              {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
            </Button>
          </Tooltip>
        )}
      </CopyButton>
    </Group>
  ),
};
