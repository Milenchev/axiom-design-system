import {
  ActionIcon,
  alpha,
  Box,
  Group,
  AppShell as MantineAppLayout,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconMenu2,
} from "@tabler/icons-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

// Types

export interface ToolItem {
  /** Unique identifier for this tool */
  id: string;
  /** Icon rendered in the tools strip */
  icon: React.ReactNode;
  /** Optional panel content that opens when this tool is clicked */
  panel?: React.ReactNode;
  /** Optional title displayed at the top of the panel */
  title?: React.ReactNode;
  /** Accessible label for the tool button */
  ariaLabel?: string;
  /** Callback fired when the icon is clicked (useful for items without a panel) */
  onClick?: () => void;
}

type ResizeArea = "sidebar" | "toolPanel" | "splitPanel";

export interface AppLayoutProps {
  /** Critical banner rendered at the very top of the page (e.g. maintenance warnings, outage alerts) */
  banner?: React.ReactNode;

  /** Height of the banner when present (default 40) */
  bannerHeight?: number;

  /** Content rendered in the main header bar */
  header?: React.ReactNode;

  /** Height of the header bar (default 48) */
  headerHeight?: number;

  /** Secondary navigation bar rendered below the header (e.g. contextual menus, page-level actions) */
  navigation?: React.ReactNode;

  /** Height of the navigation bar when present (default 36) */
  navigationHeight?: number;

  /** Content rendered in the left sidebar / menu */
  sidebar?: React.ReactNode;

  /** Width of the sidebar when expanded (default 220) */
  sidebarWidth?: number;

  /** Whether the sidebar can be collapsed (default true) */
  sidebarCollapsible?: boolean;

  /** Whether the sidebar width can be resized with the mouse (default false) */
  sidebarResizable?: boolean;

  /** Minimum width for the sidebar when resizing (default 180) */
  sidebarMinWidth?: number;

  /** Maximum width for the sidebar when resizing (default 420) */
  sidebarMaxWidth?: number;

  /** Whether the sidebar starts collapsed */
  defaultSidebarCollapsed?: boolean;

  /** Controlled sidebar collapsed state */
  sidebarCollapsed?: boolean;

  /** Callback when sidebar collapsed state changes */
  onSidebarToggle?: (collapsed: boolean) => void;

  /** Breadcrumbs rendered below the navigation bar (full width, inside the header stack). Contains a sidebar toggle when sidebar is provided. */
  breadcrumbs?: React.ReactNode;

  /** Height of the breadcrumbs bar when present (default 32) */
  breadcrumbsHeight?: number;

  /** Content header (page title, description, actions) */
  contentHeader?: React.ReactNode;

  /** Main content area */
  children?: React.ReactNode;

  /**
   * Array of tool items rendered in the right-side icon strip.
   * Each item can optionally open its own panel when clicked.
   */
  toolItems?: ToolItem[];

  /** Width of the tools icon strip (default 48) */
  toolsWidth?: number;

  /** Width of tool panels when open (default 280) */
  toolPanelWidth?: number;

  /** Whether the active tool panel can be collapsed/closed (default true) */
  toolPanelCollapsible?: boolean;

  /** Whether the active tool panel width can be resized with the mouse (default false) */
  toolPanelResizable?: boolean;

  /** Minimum width for the active tool panel when resizing (default 240) */
  toolPanelMinWidth?: number;

  /** Maximum width for the active tool panel when resizing (default 520) */
  toolPanelMaxWidth?: number;

  /**
   * Controls the tools strip visibility:
   * - `'visible'` (default): strip always shown when toolItems are provided, panels toggle on click
   * - `'hidden'`: entire aside is hidden — the consumer manages tool UI externally
   */
  toolsMode?: "visible" | "hidden";

  /** ID of the tool whose panel is initially open (uncontrolled) */
  defaultActiveToolId?: string | null;

  /** Controlled active tool ID — set to `null` to close all panels */
  activeToolId?: string | null;

  /** Callback when the active tool changes */
  onActiveToolChange?: (toolId: string | null) => void;

  /** Content rendered in the bottom split panel */
  splitPanel?: React.ReactNode;

  /** Title/header for the split panel */
  splitPanelTitle?: React.ReactNode;

  /** Height of the split panel when expanded (default 200) */
  splitPanelHeight?: number;

  /** Whether the split panel can be collapsed (default true) */
  splitPanelCollapsible?: boolean;

  /** Whether the split panel height can be resized with the mouse (default false) */
  splitPanelResizable?: boolean;

  /** Minimum height for the split panel when resizing (default 140) */
  splitPanelMinHeight?: number;

  /** Maximum height for the split panel when resizing (default 420) */
  splitPanelMaxHeight?: number;

  /** Whether the split panel starts collapsed */
  defaultSplitPanelCollapsed?: boolean;

  /** Controlled split panel collapsed state */
  splitPanelCollapsed?: boolean;

  /** Callback when split panel collapsed state changes */
  onSplitPanelToggle?: (collapsed: boolean) => void;
}

// Helpers

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// Context & Sub-components for declarative slots

interface SplitPanelSlotProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  height?: number;
  collapsible?: boolean;
  resizable?: boolean;
  minHeight?: number;
  maxHeight?: number;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

interface ToolItemsSlotProps {
  items: ToolItem[];
  toolsWidth?: number;
  panelWidth?: number;
  panelCollapsible?: boolean;
  panelResizable?: boolean;
  panelMinWidth?: number;
  panelMaxWidth?: number;
  mode?: "visible" | "hidden";
  defaultActiveId?: string | null;
  activeId?: string | null;
  onActiveChange?: (toolId: string | null) => void;
}

interface AppLayoutContextState {
  splitPanelSlot: SplitPanelSlotProps | null;
  toolItemsSlot: ToolItemsSlotProps | null;
  contentHeaderSlot: React.ReactNode | null;
  alertsSlot: React.ReactNode | null;
}

interface AppLayoutContextValue extends AppLayoutContextState {
  setSplitPanelSlot: (props: SplitPanelSlotProps | null) => void;
  setToolItemsSlot: (props: ToolItemsSlotProps | null) => void;
  setContentHeaderSlot: (content: React.ReactNode | null) => void;
  setAlertsSlot: (content: React.ReactNode | null) => void;
}

const AppLayoutContext = React.createContext<AppLayoutContextValue | null>(
  null,
);

function useAppLayoutContext() {
  const ctx = React.useContext(AppLayoutContext);
  if (!ctx) {
    throw new Error(
      "AppLayout sub-components must be used within an <AppLayout>",
    );
  }
  return ctx;
}

// Component

const AppLayoutInner = ({
  banner,
  bannerHeight = 32,
  header: headerContent,
  headerHeight = 56,
  navigation,
  navigationHeight = 40,
  sidebar,
  sidebarWidth = 300,
  sidebarCollapsible = true,
  sidebarResizable = false,
  sidebarMinWidth = 180,
  sidebarMaxWidth = 620,
  defaultSidebarCollapsed = false,
  sidebarCollapsed: sidebarCollapsedProp,
  onSidebarToggle,
  breadcrumbs,
  breadcrumbsHeight = 40,
  contentHeader,
  children,
  toolItems,
  toolsWidth = 40,
  toolPanelWidth = 300,
  toolPanelCollapsible = true,
  toolPanelResizable = false,
  toolPanelMinWidth = 240,
  toolPanelMaxWidth = 520,
  toolsMode = "visible",
  defaultActiveToolId = null,
  activeToolId: activeToolIdProp,
  onActiveToolChange,
  splitPanel,
  splitPanelTitle,
  splitPanelHeight = 200,
  splitPanelCollapsible = true,
  splitPanelResizable = false,
  splitPanelMinHeight = 140,
  splitPanelMaxHeight = 420,
  defaultSplitPanelCollapsed = true,
  splitPanelCollapsed: splitPanelCollapsedProp,
  onSplitPanelToggle,
}: AppLayoutProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const primaryPalette = theme.colors[theme.primaryColor] ?? theme.colors.blue;
  const primaryColor =
    primaryPalette[6] ?? primaryPalette[primaryPalette.length - 1];
  const { splitPanelSlot, toolItemsSlot, contentHeaderSlot, alertsSlot } =
    useAppLayoutContext();

  const activeSplitPanelProps = splitPanelSlot || {
    children: splitPanel,
    title: splitPanelTitle,
    height: splitPanelHeight,
    collapsible: splitPanelCollapsible,
    resizable: splitPanelResizable,
    minHeight: splitPanelMinHeight,
    maxHeight: splitPanelMaxHeight,
    defaultCollapsed: defaultSplitPanelCollapsed,
    collapsed: splitPanelCollapsedProp,
    onToggle: onSplitPanelToggle,
  };

  const activeToolItemsProps = toolItemsSlot || {
    items: toolItems || [],
    toolsWidth,
    panelWidth: toolPanelWidth,
    panelCollapsible: toolPanelCollapsible,
    panelResizable: toolPanelResizable,
    panelMinWidth: toolPanelMinWidth,
    panelMaxWidth: toolPanelMaxWidth,
    mode: toolsMode,
    defaultActiveId: defaultActiveToolId,
    activeId: activeToolIdProp,
    onActiveChange: onActiveToolChange,
  };

  const activeContentHeader = contentHeaderSlot || contentHeader;
  const activeAlerts = alertsSlot;

  const [sidebarSize, setSidebarSize] = useState(sidebarWidth);
  const [toolPanelSize, setToolPanelSize] = useState(
    activeToolItemsProps.panelWidth ?? 300,
  );
  const [splitPanelSize, setSplitPanelSize] = useState(
    activeSplitPanelProps.height ?? 200,
  );
  const [hoveredResizeArea, setHoveredResizeArea] = useState<ResizeArea | null>(
    null,
  );
  const [activeResizeArea, setActiveResizeArea] = useState<ResizeArea | null>(
    null,
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useUncontrolled({
    value: sidebarCollapsedProp,
    defaultValue: defaultSidebarCollapsed,
    finalValue: false,
    onChange: onSidebarToggle,
  });
  const toggleSidebar = useCallback(
    () => setSidebarCollapsed(!sidebarCollapsed),
    [sidebarCollapsed, setSidebarCollapsed],
  );

  const [splitPanelCollapsed, setSplitPanelCollapsed] = useUncontrolled({
    value: activeSplitPanelProps.collapsed,
    defaultValue: activeSplitPanelProps.defaultCollapsed ?? true,
    finalValue: true,
    onChange: activeSplitPanelProps.onToggle,
  });
  const toggleSplitPanel = useCallback(
    () => setSplitPanelCollapsed(!splitPanelCollapsed),
    [splitPanelCollapsed, setSplitPanelCollapsed],
  );

  // Active tool panel state (controlled / uncontrolled)
  const [internalActiveToolId, setInternalActiveToolId] = useState<
    string | null
  >(activeToolItemsProps.defaultActiveId ?? null);
  const activeToolId =
    activeToolItemsProps.activeId !== undefined
      ? activeToolItemsProps.activeId
      : internalActiveToolId;

  const resizeState = useRef<{
    area: ResizeArea;
    startX: number;
    startY: number;
    startSize: number;
  } | null>(null);

  useEffect(() => {
    setSidebarSize(sidebarWidth);
  }, [sidebarWidth]);

  useEffect(() => {
    setToolPanelSize(activeToolItemsProps.panelWidth ?? 300);
  }, [activeToolItemsProps.panelWidth]);

  useEffect(() => {
    setSplitPanelSize(activeSplitPanelProps.height ?? 200);
  }, [activeSplitPanelProps.height]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!resizeState.current) {
        return;
      }

      if (resizeState.current.area === "sidebar") {
        const deltaX = event.clientX - resizeState.current.startX;
        setSidebarSize(
          clamp(
            resizeState.current.startSize + deltaX,
            sidebarMinWidth,
            sidebarMaxWidth,
          ),
        );
      }

      if (resizeState.current.area === "toolPanel") {
        const deltaX = event.clientX - resizeState.current.startX;
        setToolPanelSize(
          clamp(
            resizeState.current.startSize - deltaX,
            activeToolItemsProps.panelMinWidth ?? 240,
            activeToolItemsProps.panelMaxWidth ?? 520,
          ),
        );
      }

      if (resizeState.current.area === "splitPanel") {
        const deltaY = event.clientY - resizeState.current.startY;
        setSplitPanelSize(
          clamp(
            resizeState.current.startSize - deltaY,
            activeSplitPanelProps.minHeight ?? 140,
            activeSplitPanelProps.maxHeight ?? 420,
          ),
        );
      }
    };

    const handleMouseUp = () => {
      resizeState.current = null;
      setActiveResizeArea(null);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    sidebarMaxWidth,
    sidebarMinWidth,
    activeToolItemsProps.panelMaxWidth,
    activeToolItemsProps.panelMinWidth,
    activeSplitPanelProps.maxHeight,
    activeSplitPanelProps.minHeight,
  ]);

  const startResize = useCallback(
    (area: ResizeArea) => (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setActiveResizeArea(area);
      resizeState.current = {
        area,
        startX: event.clientX,
        startY: event.clientY,
        startSize:
          area === "sidebar"
            ? sidebarSize
            : area === "toolPanel"
              ? toolPanelSize
              : splitPanelSize,
      };

      document.body.style.cursor =
        area === "splitPanel" ? "row-resize" : "col-resize";
      document.body.style.userSelect = "none";
    },
    [sidebarSize, toolPanelSize, splitPanelSize],
  );

  const getResizeHandleLineStyles = useCallback(
    (area: ResizeArea) => {
      const isHighlighted =
        hoveredResizeArea === area || activeResizeArea === area;
      const isHorizontal = area === "splitPanel";
      const isRightEdge = area === "sidebar";

      return {
        position: "absolute" as const,
        top: isHorizontal ? 0 : 0,
        left: isHorizontal ? 0 : isRightEdge ? "auto" : "50%",
        right: isHorizontal ? 0 : isRightEdge ? 0 : "auto",
        bottom: isHorizontal ? "auto" : 0,
        width: isHorizontal ? "100%" : isHighlighted ? 3 : 1,
        height: isHorizontal ? (isHighlighted ? 3 : 1) : "100%",
        transform: isHorizontal
          ? "none"
          : isRightEdge
            ? "none"
            : "translateX(-50%)",
        borderRadius: 999,
        backgroundColor: isHighlighted ? primaryColor : "transparent",
        boxShadow: isHighlighted
          ? `0 0 0 1px ${alpha(primaryColor, 0.18)}`
          : "none",
        transition:
          "background-color 160ms ease, width 160ms ease, height 160ms ease, box-shadow 160ms ease",
        pointerEvents: "none" as const,
      };
    },
    [activeResizeArea, hoveredResizeArea, primaryColor],
  );

  const handleSidebarToggle = useCallback(() => {
    if (!sidebarCollapsible) {
      return;
    }

    toggleSidebar();
  }, [sidebarCollapsible, toggleSidebar]);

  const handleToolClick = useCallback(
    (item: ToolItem) => {
      if (item.panel) {
        const nextId =
          activeToolId === item.id
            ? (activeToolItemsProps.panelCollapsible ?? true)
              ? null
              : item.id
            : item.id;
        setInternalActiveToolId(nextId);
        activeToolItemsProps.onActiveChange?.(nextId);
      }
      item.onClick?.();
    },
    [activeToolId, activeToolItemsProps],
  );

  const closeActivePanel = useCallback(() => {
    if (!(activeToolItemsProps.panelCollapsible ?? true)) {
      return;
    }

    setInternalActiveToolId(null);
    activeToolItemsProps.onActiveChange?.(null);
  }, [activeToolItemsProps]);

  const hasBanner = banner !== undefined;
  const hasSidebar = sidebar !== undefined;
  const hasNavigation = navigation !== undefined;
  const showSidebarToggle = hasSidebar && sidebarCollapsible;
  const hasBreadcrumbs = breadcrumbs !== undefined; // || showSidebarToggle;
  const hasToolItems =
    activeToolItemsProps.items !== undefined &&
    activeToolItemsProps.items.length > 0;
  const hasSplitPanel = activeSplitPanelProps.children !== undefined;

  const showAside =
    hasToolItems && (activeToolItemsProps.mode ?? "visible") === "visible";
  const activeTool = hasToolItems
    ? activeToolItemsProps.items.find((t) => t.id === activeToolId && t.panel)
    : undefined;

  const totalHeaderHeight =
    (hasBanner ? bannerHeight : 0) +
    headerHeight +
    (hasNavigation ? navigationHeight : 0) +
    (hasBreadcrumbs ? breadcrumbsHeight : 0);

  return (
    <MantineAppLayout
      header={{ height: totalHeaderHeight }}
      padding={0}
      styles={{
        root: { height: "100vh", backgroundColor: "var(--mantine-color-body)" },
        header: { backgroundColor: "var(--mantine-color-body)" },
        main: {
          backgroundColor: "var(--mantine-color-body)",
          boxSizing: "border-box",
        },
      }}
    >
      {/* Header stack (banner + header + navigation + breadcrumbs) */}
      <MantineAppLayout.Header>
        {/* Banner – critical / system-wide alerts */}
        {hasBanner && <Box h={bannerHeight}>{banner}</Box>}

        {/* Header */}
        <Box h={headerHeight}>{headerContent}</Box>

        {/* Navigation – contextual / specialised actions */}
        {hasNavigation && <Box h={navigationHeight}>{navigation}</Box>}

        {/* Breadcrumbs (full width, with sidebar toggle) */}
        {hasBreadcrumbs && (
          <Group
            h={breadcrumbsHeight}
            style={
              !hasNavigation
                ? {
                    backgroundColor: "var(--mantine-color-body)",
                    borderBottom:
                      "1px solid var(--mantine-color-default-border)",
                  }
                : {}
            }
            px="sm"
            gap="xs"
            align="center"
          >
            {showSidebarToggle && (
              <ActionIcon
                variant={sidebarCollapsed ? "transparent" : "filled"}
                radius="xl"
                size="sm"
                onClick={handleSidebarToggle}
                aria-label={sidebarCollapsed ? "Open sidebar" : "Close sidebar"}
              >
                {sidebarCollapsed ? (
                  <IconMenu2 size={16} />
                ) : (
                  <IconMenu2 size={16} />
                )}
              </ActionIcon>
            )}
            {breadcrumbs}
          </Group>
        )}
      </MantineAppLayout.Header>

      {/* Main content area */}
      <MantineAppLayout.Main
        style={
          colorScheme === "dark"
            ? { backgroundColor: "var(--mantine-color-dark-8)" }
            : { backgroundColor: "#f6f7fd" }
        }
      >
        <Box
          style={{
            display: "flex",
            minHeight: `calc(100vh - ${totalHeaderHeight}px)`,
            height: `calc(100vh - ${totalHeaderHeight}px)`,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          {hasSidebar && (
            <Box
              style={{
                width: sidebarCollapsed ? 0 : sidebarSize,
                transition: "width 220ms ease",
                overflow: "hidden",
                position: "relative",
                flexShrink: 0,
                borderRight:
                  sidebarCollapsed || sidebarResizable
                    ? "none"
                    : "1px solid var(--mantine-color-default-border)",
                backgroundColor: "var(--mantine-color-body)",
              }}
            >
              {sidebarResizable && !sidebarCollapsed && (
                <Box
                  onMouseDown={startResize("sidebar")}
                  onMouseEnter={() => setHoveredResizeArea("sidebar")}
                  onMouseLeave={() =>
                    setHoveredResizeArea((current) =>
                      current === "sidebar" ? null : current,
                    )
                  }
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: 8,
                    cursor: "col-resize",
                    zIndex: 2,
                  }}
                >
                  <Box style={getResizeHandleLineStyles("sidebar")} />
                </Box>
              )}
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: sidebarSize,
                  opacity: sidebarCollapsed ? 0 : 1,
                  transition: "opacity 160ms ease",
                  pointerEvents: sidebarCollapsed ? "none" : "auto",
                  borderRight: sidebarResizable
                    ? "1px solid var(--mantine-color-default-border)"
                    : undefined,
                }}
              >
                <Box style={{ flex: 1, overflow: "auto" }}>{sidebar}</Box>
                {sidebarCollapsible && (
                  <Group justify="flex-end" px="xs" py="xs">
                    <ActionIcon
                      variant="subtle"
                      color="black"
                      size="md"
                      onClick={handleSidebarToggle}
                      aria-label="Close sidebar"
                    >
                      <IconChevronLeft size={18} />
                    </ActionIcon>
                  </Group>
                )}
              </Box>
            </Box>
          )}

          <Box
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Alerts banner */}
            {activeAlerts && (
              <Box
                px="md"
                pt="md"
                style={{
                  maxWidth: 1600,
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                {activeAlerts}
              </Box>
            )}

            {/* Content header */}
            {activeContentHeader && (
              <Box
                px="md"
                pt="md"
                style={{
                  maxWidth: 1600,
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                {activeContentHeader}
              </Box>
            )}

            {/* Content */}
            <Box
              p="md"
              style={{
                flex: 1,
                overflow: "auto",
                minHeight: 0,
                minWidth: 0,
                maxWidth: 1600,
                margin: "0 auto",
                width: "100%",
              }}
            >
              {children}
            </Box>

            {/* Split panel (bottom) */}
            {hasSplitPanel && (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexShrink: 0,
                }}
              >
                {(activeSplitPanelProps.resizable ?? false) &&
                  !splitPanelCollapsed && (
                    <Box
                      onMouseDown={startResize("splitPanel")}
                      onMouseEnter={() => setHoveredResizeArea("splitPanel")}
                      onMouseLeave={() =>
                        setHoveredResizeArea((current) =>
                          current === "splitPanel" ? null : current,
                        )
                      }
                      style={{
                        height: 6,
                        cursor: "row-resize",
                        position: "relative",
                        top: 4,
                      }}
                    >
                      <Box style={getResizeHandleLineStyles("splitPanel")} />
                    </Box>
                  )}
                {/* Split panel header */}
                <Group
                  justify="space-between"
                  px="md"
                  py="xs"
                  style={{
                    cursor:
                      (activeSplitPanelProps.collapsible ?? true)
                        ? "pointer"
                        : "default",
                    userSelect: "none",
                    height: 40,
                    borderTop: "1px solid var(--mantine-color-default-border)",
                    backgroundColor: "var(--mantine-color-body)",
                  }}
                  onClick={
                    (activeSplitPanelProps.collapsible ?? true)
                      ? toggleSplitPanel
                      : undefined
                  }
                >
                  <Text fw={500} size="sm">
                    {activeSplitPanelProps.title ?? "Panel"}
                  </Text>
                  <Group gap="xs">
                    {(activeSplitPanelProps.collapsible ?? true) && (
                      <ActionIcon
                        variant="subtle"
                        color="black"
                        size="sm"
                        aria-label="Toggle panel"
                      >
                        {splitPanelCollapsed ? (
                          <IconChevronUp size={18} />
                        ) : (
                          <IconChevronDown size={18} />
                        )}
                      </ActionIcon>
                    )}
                  </Group>
                </Group>

                {/* Split panel content */}
                {!splitPanelCollapsed && (
                  <Box
                    px="md"
                    pb="md"
                    pt="xs"
                    style={{
                      height: splitPanelSize,
                      overflow: "auto",
                      backgroundColor: "var(--mantine-color-body)",
                    }}
                  >
                    {activeSplitPanelProps.children}
                  </Box>
                )}
              </Box>
            )}
          </Box>

          {showAside && (
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
                flexShrink: 0,
                backgroundColor: "var(--mantine-color-body)",
              }}
            >
              <Box
                style={{
                  width: activeTool ? toolPanelSize : 0,
                  transition: "width 220ms ease",
                  borderLeft:
                    activeTool &&
                    !(activeToolItemsProps.panelResizable ?? false)
                      ? "1px solid var(--mantine-color-default-border)"
                      : "none",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {activeTool && (
                  <Box
                    style={{
                      width: toolPanelSize,
                      height: "100%",
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      opacity: activeTool ? 1 : 0,
                      transition: "opacity 160ms ease",
                      borderLeft:
                        (activeToolItemsProps.panelResizable ?? false)
                          ? "1px solid var(--mantine-color-default-border)"
                          : undefined,
                    }}
                    p="md"
                  >
                    {(activeToolItemsProps.panelResizable ?? false) && (
                      <Box
                        onMouseDown={startResize("toolPanel")}
                        onMouseEnter={() => setHoveredResizeArea("toolPanel")}
                        onMouseLeave={() =>
                          setHoveredResizeArea((current) =>
                            current === "toolPanel" ? null : current,
                          )
                        }
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bottom: 0,
                          width: 8,
                          cursor: "col-resize",
                          transform: "translateX(-50%)",
                          zIndex: 2,
                        }}
                      >
                        <Box style={getResizeHandleLineStyles("toolPanel")} />
                      </Box>
                    )}
                    {activeTool.title && (
                      <Group justify="space-between" mb="md">
                        <Text fw={600} size="lg">
                          {activeTool.title}
                        </Text>
                        {(activeToolItemsProps.panelCollapsible ?? true) && (
                          <ActionIcon
                            variant="transparent"
                            color="black"
                            size="md"
                            onClick={closeActivePanel}
                            aria-label="Close panel"
                          >
                            <IconChevronRight size={18} />
                          </ActionIcon>
                        )}
                      </Group>
                    )}
                    <Box style={{ flex: 1, overflow: "auto" }}>
                      {activeTool.panel}
                    </Box>
                  </Box>
                )}
              </Box>

              <Stack
                gap={4}
                align="center"
                p={4}
                style={{
                  width: activeToolItemsProps.toolsWidth ?? 40,
                  borderLeft: "1px solid var(--mantine-color-default-border)",
                  overflow: "auto",
                }}
              >
                {activeToolItemsProps.items.map((item) => (
                  <ActionIcon
                    key={item.id}
                    color="black"
                    variant={activeToolId === item.id ? "filled" : "subtle"}
                    size="lg"
                    onClick={() => handleToolClick(item)}
                    aria-label={item.ariaLabel ?? item.id}
                  >
                    {item.icon}
                  </ActionIcon>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </MantineAppLayout.Main>
    </MantineAppLayout>
  );
};

export const AppLayout = (props: AppLayoutProps) => {
  const [splitPanelSlot, setSplitPanelSlot] =
    useState<SplitPanelSlotProps | null>(null);
  const [toolItemsSlot, setToolItemsSlot] = useState<ToolItemsSlotProps | null>(
    null,
  );
  const [contentHeaderSlot, setContentHeaderSlot] =
    useState<React.ReactNode | null>(null);
  const [alertsSlot, setAlertsSlot] = useState<React.ReactNode | null>(null);

  const contextValue = React.useMemo(
    () => ({
      splitPanelSlot,
      setSplitPanelSlot,
      toolItemsSlot,
      setToolItemsSlot,
      contentHeaderSlot,
      setContentHeaderSlot,
      alertsSlot,
      setAlertsSlot,
    }),
    [splitPanelSlot, toolItemsSlot, contentHeaderSlot, alertsSlot],
  );

  return (
    <AppLayoutContext.Provider value={contextValue}>
      <AppLayoutInner {...props} />
    </AppLayoutContext.Provider>
  );
};

AppLayout.displayName = "AppLayout";

// Sub-components

AppLayout.SplitPanel = function AppLayoutSplitPanel(
  props: SplitPanelSlotProps,
) {
  const { setSplitPanelSlot } = useAppLayoutContext();
  useEffect(() => {
    setSplitPanelSlot(props);
    return () => setSplitPanelSlot(null);
  }, [setSplitPanelSlot, props]);
  return null;
};

AppLayout.ToolItems = function AppLayoutToolItems(props: ToolItemsSlotProps) {
  const { setToolItemsSlot } = useAppLayoutContext();
  useEffect(() => {
    setToolItemsSlot(props);
    return () => setToolItemsSlot(null);
  }, [setToolItemsSlot, props]);
  return null;
};

AppLayout.ContentHeader = function AppLayoutContentHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setContentHeaderSlot } = useAppLayoutContext();
  useEffect(() => {
    setContentHeaderSlot(children);
    return () => setContentHeaderSlot(null);
  }, [setContentHeaderSlot, children]);
  return null;
};

AppLayout.Alerts = function AppLayoutAlerts({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAlertsSlot } = useAppLayoutContext();
  useEffect(() => {
    setAlertsSlot(children);
    return () => setAlertsSlot(null);
  }, [setAlertsSlot, children]);
  return null;
};

// Generic Main wrapper for layout composition
AppLayout.Main = function AppLayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
};
