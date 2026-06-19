import { Accordion } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Accordion> = {
  title: "Themed/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  render: () => (
    <Accordion defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Control>Item 1</Accordion.Control>
        <Accordion.Panel>Content for item 1</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Control>Item 2</Accordion.Control>
        <Accordion.Panel>Content for item 2</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Control>Item 3</Accordion.Control>
        <Accordion.Panel>Content for item 3</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
      <Accordion.Item value="item-1">
        <Accordion.Control>Item 1</Accordion.Control>
        <Accordion.Panel>Content for item 1</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Control>Item 2</Accordion.Control>
        <Accordion.Panel>Content for item 2</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Control>Item 3</Accordion.Control>
        <Accordion.Panel>Content for item 3</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Separated: Story = {
  render: () => (
    <Accordion variant="separated" defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Control>Item 1</Accordion.Control>
        <Accordion.Panel>Content for item 1</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Control>Item 2</Accordion.Control>
        <Accordion.Panel>Content for item 2</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Control>Item 3</Accordion.Control>
        <Accordion.Panel>Content for item 3</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
};
