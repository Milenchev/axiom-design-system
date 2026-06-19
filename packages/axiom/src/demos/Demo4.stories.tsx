import {
  Avatar,
  Divider,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconArrowUpRight,
  IconChartBar,
  IconCurrencyDollar,
  IconEye,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";
import { Badge } from "@/components/Badge";
import { Banner } from "@/components/Banner";
import { Button } from "@/components/Button";
import { Card, CardSection } from "@/components/Card";
import { GridLayout } from "@/components/GridLayout/GridLayout";
import { MetricCard } from "@/components/MetricCard";
import { PageHeading } from "@/components/PageHeading";
import { SearchInput } from "@/components/SearchInput";

const meta: Meta = {
  title: "Demos/Demo 4 – Analytics Dashboard",
  parameters: {
    layout: "padded",
  },
  tags: ["showcase"],
};

export default meta;

// Metric Cards

const MetricsRow = () => (
  <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
    <MetricCard
      label="Total Revenue"
      value="$48,290"
      icon={<IconCurrencyDollar size={20} />}
      trend={12.5}
      trendLabel="vs last month"
    />
    <MetricCard
      label="Active Users"
      value="2,847"
      icon={<IconUsers size={20} />}
      trend={8.2}
      trendLabel="vs last month"
    />
    <MetricCard
      label="Page Views"
      value="184,392"
      icon={<IconEye size={20} />}
      trend={-3.1}
      trendLabel="vs last month"
    />
    <MetricCard
      label="Conversions"
      value="1,249"
      icon={<IconShoppingCart size={20} />}
      trend={23.7}
      trendLabel="vs last month"
      trendInline
    />
  </SimpleGrid>
);

// Recent Orders Table

const orders = [
  {
    id: "ORD-7291",
    customer: "Maria Ivanova",
    product: "Enterprise Plan",
    amount: "$2,400",
    status: "approved" as const,
    date: "2024-12-01",
  },
  {
    id: "ORD-7290",
    customer: "Georgi Dimitrov",
    product: "Pro License",
    amount: "$890",
    status: "pending" as const,
    date: "2024-11-30",
  },
  {
    id: "ORD-7289",
    customer: "Elena Petrova",
    product: "Team Bundle",
    amount: "$4,200",
    status: "approved" as const,
    date: "2024-11-29",
  },
  {
    id: "ORD-7288",
    customer: "Ivan Stoychev",
    product: "Starter Plan",
    amount: "$49",
    status: "rejected" as const,
    date: "2024-11-28",
  },
  {
    id: "ORD-7287",
    customer: "Anna Koleva",
    product: "Pro License",
    amount: "$890",
    status: "needreview" as const,
    date: "2024-11-27",
  },
  {
    id: "ORD-7286",
    customer: "Stefan Georgiev",
    product: "Enterprise Plan",
    amount: "$2,400",
    status: "approved" as const,
    date: "2024-11-26",
  },
];

const OrdersTable = () => (
  <Card padding={0} withBorder>
    <CardSection inheritPadding py="md" px="lg">
      <Group justify="space-between">
        <div>
          <Text fw={600}>Recent Orders</Text>
          <Text size="sm" c="dimmed">
            Last 30 days
          </Text>
        </div>
        <SearchInput placeholder="Search orders..." style={{ width: 240 }} />
      </Group>
    </CardSection>
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Order ID</Table.Th>
          <Table.Th>Customer</Table.Th>
          <Table.Th>Product</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {orders.map((order) => (
          <Table.Tr key={order.id}>
            <Table.Td>
              <Text size="sm" fw={500}>
                {order.id}
              </Text>
            </Table.Td>
            <Table.Td>
              <Group gap="sm">
                <Avatar size="sm" radius="xl" color="blue">
                  {order.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <Text size="sm">{order.customer}</Text>
              </Group>
            </Table.Td>
            <Table.Td>
              <Text size="sm">{order.product}</Text>
            </Table.Td>
            <Table.Td>
              <Text size="sm" fw={500}>
                {order.amount}
              </Text>
            </Table.Td>
            <Table.Td>
              <Badge type={order.status} emphasis="subtle">
                {order.status}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Text size="sm" c="dimmed">
                {order.date}
              </Text>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  </Card>
);

// Traffic Sources

const trafficSources = [
  { source: "Organic Search", visits: 45200, percentage: 38, color: "blue" },
  { source: "Direct", visits: 28100, percentage: 24, color: "green" },
  { source: "Social Media", visits: 18900, percentage: 16, color: "violet" },
  { source: "Referral", visits: 14200, percentage: 12, color: "orange" },
  { source: "Email", visits: 11600, percentage: 10, color: "cyan" },
];

const TrafficCard = () => (
  <Card padding="lg" withBorder style={{ height: "100%" }}>
    <Text fw={600} mb="md">
      Traffic Sources
    </Text>
    <Stack gap="md">
      {trafficSources.map((item) => (
        <div key={item.source}>
          <Group justify="space-between" mb={4}>
            <Text size="sm">{item.source}</Text>
            <Text size="sm" fw={500}>
              {item.visits.toLocaleString()}
            </Text>
          </Group>
          <Progress value={item.percentage} color={item.color} size="sm" />
        </div>
      ))}
    </Stack>
  </Card>
);

// Top Products

const topProducts = [
  { name: "Enterprise Plan", revenue: "$48,200", growth: 24 },
  { name: "Pro License", revenue: "$32,100", growth: 12 },
  { name: "Team Bundle", revenue: "$21,800", growth: -5 },
  { name: "Starter Plan", revenue: "$8,400", growth: 45 },
];

const TopProductsCard = () => (
  <Card padding="lg" withBorder style={{ height: "100%" }}>
    <Group justify="space-between" mb="md">
      <Text fw={600}>Top Products</Text>
      <Badge type="info" emphasis="minimal">
        This month
      </Badge>
    </Group>
    <Stack gap="sm">
      {topProducts.map((product, index) => (
        <Group key={product.name} justify="space-between">
          <Group gap="sm">
            <Text size="sm" c="dimmed" fw={500} w={20}>
              {index + 1}.
            </Text>
            <Text size="sm" fw={500}>
              {product.name}
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" fw={600}>
              {product.revenue}
            </Text>
            <Text size="xs" c={product.growth >= 0 ? "teal" : "red"} fw={500}>
              {product.growth >= 0 ? "+" : ""}
              {product.growth}%
            </Text>
          </Group>
        </Group>
      ))}
    </Stack>
    <Divider my="md" />
    <Button
      variant="subtle"
      fullWidth
      size="sm"
      rightSection={<IconArrowUpRight size={14} />}
    >
      View all products
    </Button>
  </Card>
);

// Main Story

export const Default: StoryObj = {
  name: "Analytics Dashboard",
  render: () => (
    <Stack gap="xl" p="xl">
      <Group justify="space-between" align="flex-start">
        <PageHeading
          title="Analytics"
          subtitle="Overview of your business performance and key metrics."
        />
        <Group>
          <Button variant="light" leftSection={<IconChartBar size={16} />}>
            Export Report
          </Button>
          <Button>Add Widget</Button>
        </Group>
      </Group>

      <Banner color="green" title="Monthly goal achieved!" withCloseButton>
        Congratulations! You&apos;ve reached 125% of your monthly revenue
        target.
      </Banner>

      <MetricsRow />

      <GridLayout
        layout={[
          { key: "traffic", col: 0, row: 0, colSpan: 1, rowSpan: 1 },
          { key: "products", col: 1, row: 0, colSpan: 1, rowSpan: 1 },
        ]}
        columns={2}
        gap={16}
        rowHeight="auto"
      >
        <div key="traffic">
          <TrafficCard />
        </div>
        <div key="products">
          <TopProductsCard />
        </div>
      </GridLayout>

      <OrdersTable />
    </Stack>
  ),
};
