import { Badge, Group, Pill } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Datagrid, type DatagridColumn } from "../..";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  joined: string;
  status: "Active" | "Inactive" | "Pending";
}

const sampleData: User[] = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@openai.com",
    role: "CTO",
    department: "Engineering",
    joined: "Mar 2023",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah@tata.in",
    role: "Sales Manager",
    department: "Sales",
    joined: "Oct 2024",
    status: "Active",
  },
  {
    id: 3,
    name: "Nick Johnson",
    email: "nick@lvmh.fr",
    role: "Data Scientist",
    department: "Engineering",
    joined: "Apr 2022",
    status: "Pending",
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    email: "michael@meta.com",
    role: "Designer",
    department: "Design",
    joined: "Jun 2022",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Maria Garcia",
    email: "maria@sony.jp",
    role: "Marketing Lead",
    department: "Marketing",
    joined: "Dec 2023",
    status: "Active",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james@stripe.com",
    role: "Engineer",
    department: "Engineering",
    joined: "Jan 2024",
    status: "Active",
  },
  {
    id: 7,
    name: "Emily Davis",
    email: "emily@figma.com",
    role: "Product Manager",
    department: "Product",
    joined: "Aug 2023",
    status: "Active",
  },
  {
    id: 8,
    name: "Robert Kim",
    email: "robert@tesla.com",
    role: "Analyst",
    department: "Finance",
    joined: "May 2022",
    status: "Inactive",
  },
  {
    id: 9,
    name: "Lisa Thompson",
    email: "lisa@netflix.com",
    role: "HR Manager",
    department: "HR",
    joined: "Sep 2023",
    status: "Pending",
  },
  {
    id: 10,
    name: "David Brown",
    email: "david@apple.com",
    role: "Architect",
    department: "Engineering",
    joined: "Feb 2021",
    status: "Active",
  },
  {
    id: 11,
    name: "Anna White",
    email: "anna@google.com",
    role: "Designer",
    department: "Design",
    joined: "Nov 2023",
    status: "Active",
  },
  {
    id: 12,
    name: "Tom Harris",
    email: "tom@amazon.com",
    role: "DevOps",
    department: "Engineering",
    joined: "Jul 2022",
    status: "Active",
  },
];

const statusColors: Record<string, string> = {
  Active: "green",
  Inactive: "red",
  Pending: "yellow",
};

const columns: DatagridColumn<User>[] = [
  { key: "name", header: "User", width: 200 },
  { key: "email", header: "Email", width: 220 },
  { key: "role", header: "Role", width: 160 },
  { key: "department", header: "Department", width: 140 },
  { key: "joined", header: "Joined", width: 120, align: "right" },
  {
    key: "status",
    header: "Status",
    width: 120,
    align: "center",
    render: (value) => (
      <Badge
        variant="light"
        color={statusColors[value as string] ?? "gray"}
        size="sm"
      >
        {value as string}
      </Badge>
    ),
  },
];

const meta: Meta<typeof Datagrid> = {
  title: "Components/Datagrid",
  component: Datagrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Datagrid>;

export const Primary: Story = {
  render: () => (
    <Datagrid<User>
      columns={columns}
      data={sampleData}
      rowKey="id"
      selectable
    />
  ),
};

export const WithColumnFilters: Story = {
  name: "With Column Filters",
  render: () => (
    <Datagrid<User>
      columns={columns}
      data={sampleData}
      rowKey="id"
      selectable
      searchPlaceholder="Search users..."
    />
  ),
};

export const Striped: Story = {
  render: () => (
    <Datagrid<User> columns={columns} data={sampleData} rowKey="id" striped />
  ),
};

export const Empty: Story = {
  render: () => (
    <Datagrid<User>
      columns={columns}
      data={[]}
      rowKey="id"
      emptyMessage="No users found"
    />
  ),
};

interface Project {
  id: number;
  name: string;
  owner: string;
  tags: string[];
  status: "Active" | "Inactive" | "Pending";
}

const projectData: Project[] = [
  {
    id: 1,
    name: "Axiom Design System",
    owner: "Sarah Chen",
    tags: ["React", "TypeScript", "Mantine"],
    status: "Active",
  },
  {
    id: 2,
    name: "Revenue Analytics",
    owner: "Nick Johnson",
    tags: ["Python", "ML", "BigQuery"],
    status: "Active",
  },
  {
    id: 3,
    name: "Customer Portal",
    owner: "Emily Davis",
    tags: ["Next.js", "GraphQL"],
    status: "Pending",
  },
  {
    id: 4,
    name: "Data Pipeline",
    owner: "David Brown",
    tags: ["Spark", "Kafka", "Airflow", "Docker"],
    status: "Active",
  },
  {
    id: 5,
    name: "Mobile App",
    owner: "Maria Garcia",
    tags: ["React Native", "iOS", "Android"],
    status: "Inactive",
  },
];

const projectColumns: DatagridColumn<Project>[] = [
  { key: "name", header: "Project", width: 200 },
  { key: "owner", header: "Owner", width: 150 },
  {
    key: "tags",
    header: "Tags",
    width: 280,
    wrap: true,
    sortable: false,
    render: (value) => (
      <Group gap="4">
        {(value as string[]).map((tag) => (
          <Pill key={tag} size="sm">
            {tag}
          </Pill>
        ))}
      </Group>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: 120,
    align: "center",
    render: (value) => (
      <Badge
        variant="light"
        color={statusColors[value as string] ?? "gray"}
        size="sm"
      >
        {value as string}
      </Badge>
    ),
  },
];

export const WithPills: Story = {
  name: "With Pills / Chips",
  render: () => (
    <Datagrid<Project>
      columns={projectColumns}
      data={projectData}
      rowKey="id"
      selectable
    />
  ),
};
