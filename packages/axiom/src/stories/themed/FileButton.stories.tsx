import { Button, FileButton, Group, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";

const meta: Meta<typeof FileButton> = {
  title: "Themed/FileButton",
  component: FileButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileButton>;

export const Primary: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);
    return (
      <Group>
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => (
            <Button {...props} leftSection={<IconUpload size={16} />}>
              Upload image
            </Button>
          )}
        </FileButton>
        {file && (
          <Text size="sm" c="dimmed">
            {file.name}
          </Text>
        )}
      </Group>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <Group>
        <FileButton onChange={setFiles} accept="image/*" multiple>
          {(props) => <Button {...props}>Upload files</Button>}
        </FileButton>
        {files.length > 0 && (
          <Text size="sm" c="dimmed">
            {files.length} file(s) selected
          </Text>
        )}
      </Group>
    );
  },
};
