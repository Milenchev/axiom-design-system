import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { GridLayout } from "../..";

const meta: Meta<typeof GridLayout> = {
  title: "Components/GridLayout",
  component: GridLayout,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GridLayout>;

// A shared style for the boxes in the stories
const boxStyle: React.CSSProperties = {
  background: "#f4fce3",
  border: "1px solid #c0eb75",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  fontWeight: 500,
  color: "#5c940d",
};

export const Primary: Story = {
  render: () => {
    const layout = [
      { key: "a", col: 0, row: 0, colSpan: 1, rowSpan: 1 },
      { key: "b", col: 1, row: 0, colSpan: 1, rowSpan: 1 },
      { key: "c", col: 2, row: 0, colSpan: 1, rowSpan: 1 },
    ];

    return (
      <GridLayout layout={layout} columns={3} gap={16} rowHeight={100}>
        <div key="a" style={boxStyle}>
          Col 1
        </div>
        <div key="b" style={boxStyle}>
          Col 2
        </div>
        <div key="c" style={boxStyle}>
          Col 3
        </div>
      </GridLayout>
    );
  },
};

export const ComplexLayout: Story = {
  render: () => {
    const layout = [
      { key: "header", col: 0, row: 0, colSpan: 4, rowSpan: 1 },
      { key: "sidebar", col: 0, row: 1, colSpan: 1, rowSpan: 2 },
      { key: "main", col: 1, row: 1, colSpan: 3, rowSpan: 1 },
      { key: "footer1", col: 1, row: 2, colSpan: 1, rowSpan: 1 },
      { key: "footer2", col: 2, row: 2, colSpan: 2, rowSpan: 1 },
    ];

    return (
      <GridLayout layout={layout} columns={4} gap={16} rowHeight={150}>
        <div key="header" style={boxStyle}>
          Header
        </div>
        <div key="sidebar" style={boxStyle}>
          Sidebar
        </div>
        <div key="main" style={boxStyle}>
          Main Content
        </div>
        <div key="footer1" style={boxStyle}>
          Footer 1
        </div>
        <div key="footer2" style={boxStyle}>
          Footer 2
        </div>
      </GridLayout>
    );
  },
};

export const LeftAndRightSplit: Story = {
  render: () => {
    const layout = [
      { key: "left", col: 0, row: 0, colSpan: 1, rowSpan: 2 },
      { key: "right-top", col: 1, row: 0, colSpan: 1, rowSpan: 1 },
      { key: "right-bottom", col: 1, row: 1, colSpan: 1, rowSpan: 1 },
    ];

    return (
      <GridLayout layout={layout} columns={2} gap={16} rowHeight={150}>
        <div key="left" style={boxStyle}>
          Left Full Height
        </div>
        <div key="right-top" style={boxStyle}>
          Right Top
        </div>
        <div key="right-bottom" style={boxStyle}>
          Right Bottom
        </div>
      </GridLayout>
    );
  },
};
