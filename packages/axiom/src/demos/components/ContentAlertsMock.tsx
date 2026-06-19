import { Alert } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

export const ContentAlertsMock = () => (
  <Alert
    icon={<IconCircleCheck size={18} />}
    color="yellow"
    title="Scheduled maintenance"
    withCloseButton
    closeButtonLabel="Dismiss"
    style={{
      border: "1px solid #0000001a",
    }}
  >
    A short maintenance window is planned for Sunday 02:00–03:00 UTC. Some
    reports may be temporarily unavailable during this time.
  </Alert>
);
