import { Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormSection } from "../..";

const meta = {
  title: "Components/FormSection",
  component: FormSection,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof FormSection>;

export default meta;
type Story = StoryObj<typeof FormSection>;

export const Primary: Story = {
  args: {
    title: "Personal Information",
    description: "Enter your basic details below.",
    children: "Form fields go here",
  },
};

export const WithFormFields: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <FormSection
        title="Passenger Details"
        description="Primary traveler information for the booking."
      >
        <TextInput label="First Name" placeholder="John" />
        <TextInput label="Last Name" placeholder="Doe" />
        <TextInput label="Email" placeholder="john.doe@example.com" />
        <DateInput label="Date of Birth" placeholder="Select date" />
      </FormSection>

      <FormSection
        title="Travel Preferences"
        description="Optional preferences for your trip."
      >
        <Select
          label="Seat Preference"
          placeholder="Choose one"
          data={["Window", "Middle", "Aisle"]}
        />
        <Select
          label="Meal Preference"
          placeholder="Choose one"
          data={["Standard", "Vegetarian", "Vegan", "Halal", "Kosher"]}
        />
      </FormSection>
    </div>
  ),
};
