import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Realm, RealmMenu, type RealmSelection } from "../..";

const sampleItems = [
  { region: "AMER", environments: ["production", "staging", "dev"] as const },
  { region: "EMER", environments: ["production", "staging", "dev"] as const },
  { region: "APAC", environments: ["production", "staging", "dev"] as const },
];

const meta: Meta<typeof RealmMenu> = {
  title: "Components/RealmMenu",
  component: RealmMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#1a2a4a",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RealmMenu>;

const RealmMenuDemo = () => {
  const [selection, setSelection] = useState<RealmSelection>({
    region: "AMER",
    environment: "production",
  });

  return (
    <RealmMenu items={sampleItems} value={selection} onChange={setSelection}>
      <Realm region={selection.region} environment={selection.environment} />
    </RealmMenu>
  );
};

export const Primary: Story = {
  render: () => <RealmMenuDemo />,
};
