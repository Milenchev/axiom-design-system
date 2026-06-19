import { Button, Drawer, Stack, Text } from "@mantine/core";
import { useDemoAppStore } from "@/demos/store/useDemoAppStore";

export const DrawerMock = () => {
  const { isDrawerOpen, closeDrawer, drawerContent } = useDemoAppStore();

  return (
    <Drawer
      opened={isDrawerOpen}
      onClose={closeDrawer}
      title="Quick actions"
      padding="md"
      size="lg"
      position="right"
    >
      {drawerContent ? (
        drawerContent
      ) : (
        <Stack gap="sm">
          <Text fw={600}>Contextual actions</Text>
          <Button variant="light">Create scenario</Button>
          <Button variant="light">Export view</Button>
          <Button variant="light">Share workspace</Button>
        </Stack>
      )}
    </Drawer>
  );
};
