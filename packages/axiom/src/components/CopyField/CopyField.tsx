import {
  ActionIcon,
  CopyButton,
  Group,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

export interface CopyFieldProps {
  /** The value shown in the field and copied to the clipboard */
  value: string;
  /** Optional field label */
  label?: string;
  /** Optional helper text below the field */
  description?: string;
  /** Mask the value (e.g. for API keys) with a reveal toggle */
  masked?: boolean;
  /** Field width */
  width?: number | string;
  /** Called after the value is copied */
  onCopy?: () => void;
}

export const CopyField = ({
  value,
  label,
  description,
  masked = false,
  width = 320,
  onCopy,
}: CopyFieldProps) => {
  const [revealed, setRevealed] = useState(false);
  const hidden = masked && !revealed;

  return (
    <TextInput
      label={label}
      description={description}
      value={value}
      readOnly
      w={width}
      type={hidden ? "password" : "text"}
      styles={{ input: { fontFamily: "var(--mantine-font-family-monospace)" } }}
      rightSectionWidth={masked ? 64 : 36}
      rightSection={
        <Group gap={2} wrap="nowrap">
          {masked && (
            <Tooltip label={revealed ? "Hide" : "Reveal"} withArrow>
              <ActionIcon
                variant="subtle"
                color="axiom-neutral"
                onClick={() => setRevealed((r) => !r)}
                aria-label={revealed ? "Hide value" : "Reveal value"}
              >
                {revealed ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </ActionIcon>
            </Tooltip>
          )}
          <CopyButton value={value} timeout={1500}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? "Copied" : "Copy"} withArrow>
                <ActionIcon
                  variant="subtle"
                  color={copied ? "axiom-green" : "axiom-neutral"}
                  onClick={() => {
                    copy();
                    onCopy?.();
                  }}
                  aria-label="Copy to clipboard"
                >
                  {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      }
    />
  );
};

CopyField.displayName = "CopyField";
