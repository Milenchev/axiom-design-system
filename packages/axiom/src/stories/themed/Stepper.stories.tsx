import { Button, Group, Stepper } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconExclamationCircle, IconX } from "@tabler/icons-react";
import { useState } from "react";

const meta: Meta<typeof Stepper> = {
  title: "Themed/Stepper",
  component: Stepper,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Primary: Story = {
  render: () => {
    const [active, setActive] = useState(1);
    return (
      <Stepper
        active={active}
        onStepClick={setActive}
        style={{ minWidth: 600 }}
      >
        <Stepper.Step label="Account" description="Create an account">
          Step 1: Create an account
        </Stepper.Step>
        <Stepper.Step label="Verify" description="Verify email">
          Step 2: Verify email
        </Stepper.Step>
        <Stepper.Step label="Profile" description="Set up profile">
          Step 3: Set up profile
        </Stepper.Step>
        <Stepper.Completed>All steps completed</Stepper.Completed>
      </Stepper>
    );
  },
};

export const AllCompleted: Story = {
  render: () => (
    <Stepper active={3} style={{ minWidth: 600 }}>
      <Stepper.Step label="Account" description="Create an account" />
      <Stepper.Step label="Verify" description="Verify email" />
      <Stepper.Step label="Profile" description="Set up profile" />
    </Stepper>
  ),
};

export const Vertical: Story = {
  render: () => {
    const [active, setActive] = useState(1);
    return (
      <Stepper
        active={active}
        onStepClick={setActive}
        orientation="vertical"
        style={{ minHeight: 300 }}
      >
        <Stepper.Step label="Account" description="Create an account">
          Step 1: Create an account
        </Stepper.Step>
        <Stepper.Step label="Verify" description="Verify email">
          Step 2: Verify email
        </Stepper.Step>
        <Stepper.Step label="Profile" description="Set up profile">
          Step 3: Set up profile
        </Stepper.Step>
        <Stepper.Completed>All steps completed</Stepper.Completed>
      </Stepper>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <Stepper active={2} style={{ minWidth: 600 }}>
      <Stepper.Step label="Account" description="Created" />
      <Stepper.Step
        label="Verify"
        description="Verification failed"
        color="red"
        completedIcon={<IconX size={18} />}
      />
      <Stepper.Step label="Profile" description="Set up profile" />
    </Stepper>
  ),
};

export const WithWarning: Story = {
  render: () => (
    <Stepper active={2} style={{ minWidth: 600 }}>
      <Stepper.Step label="Account" description="Created" />
      <Stepper.Step
        label="Verify"
        description="Needs attention"
        color="yellow"
        completedIcon={<IconExclamationCircle size={18} />}
      />
      <Stepper.Step label="Profile" description="Set up profile" />
    </Stepper>
  ),
};

export const Loading: Story = {
  render: () => (
    <Stepper active={1} style={{ minWidth: 600 }}>
      <Stepper.Step label="Account" description="Created" />
      <Stepper.Step label="Verify" description="Sending email…" loading />
      <Stepper.Step label="Profile" description="Set up profile" />
    </Stepper>
  ),
};

export const MixedStates: Story = {
  render: () => (
    <Stepper active={3} style={{ minWidth: 720 }}>
      <Stepper.Step label="Account" description="Completed" />
      <Stepper.Step
        label="Verify"
        description="Failed"
        color="red"
        completedIcon={<IconX size={18} />}
      />
      <Stepper.Step
        label="Profile"
        description="Warning"
        color="yellow"
        completedIcon={<IconExclamationCircle size={18} />}
      />
      <Stepper.Step label="Review" description="In progress" loading />
      <Stepper.Step label="Done" description="Pending" />
    </Stepper>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    const [errored, setErrored] = useState<number | null>(null);

    const next = () => setActive((c) => Math.min(c + 1, 3));
    const prev = () => setActive((c) => Math.max(c - 1, 0));
    const fail = () => setErrored(active);
    const reset = () => {
      setActive(0);
      setErrored(null);
    };

    const stepColor = (index: number) =>
      errored === index ? "red" : undefined;
    const stepIcon = (index: number) =>
      errored === index ? <IconX size={18} /> : undefined;

    return (
      <div style={{ minWidth: 600 }}>
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step
            label="Account"
            description="Create an account"
            color={stepColor(0)}
            completedIcon={stepIcon(0)}
          />
          <Stepper.Step
            label="Verify"
            description="Verify email"
            color={stepColor(1)}
            completedIcon={stepIcon(1)}
          />
          <Stepper.Step
            label="Profile"
            description="Set up profile"
            color={stepColor(2)}
            completedIcon={stepIcon(2)}
          />
          <Stepper.Completed>All steps completed</Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prev}>
            Back
          </Button>
          <Button color="red" variant="light" onClick={fail}>
            Mark as failed
          </Button>
          <Button variant="default" onClick={reset}>
            Reset
          </Button>
          <Button onClick={next}>Next</Button>
        </Group>
      </div>
    );
  },
};
