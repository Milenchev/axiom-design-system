import {
  ActionIcon,
  Avatar,
  Box,
  Drawer,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconGridDots, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { AiIcon, AxiomMark } from "@/components/Icons";
import { Realm as RealmComponent, type RealmProps } from "@/components/Realm";
import { RealmMenu as RealmMenuComponent } from "@/components/RealmMenu";
import { SearchInput, type SearchInputProps } from "@/components/SearchInput";
import {
  SearchModal,
  type SearchModalApp,
  type SearchModalItem,
} from "@/components/SearchModal";
import classes from "./HeaderBar.module.css";

export interface HeaderBarProps {
  /** Main content of the header */
  children?: React.ReactNode;

  /** Content to display inside the App Switcher drawer */
  appSwitcherContent?: React.ReactNode;

  /** Title of the App Switcher drawer */
  appSwitcherTitle?: React.ReactNode;

  /** Height of the header (default: 56) */
  height?: number;

  /** Override the internal background or borders if needed */
  className?: string;
  style?: React.CSSProperties;
}

export const HeaderBar = ({
  children,
  appSwitcherContent,
  appSwitcherTitle = "Applications",
  height = 56,
  className,
  style,
  ...rest
}: HeaderBarProps) => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const hasAppSwitcher = !!appSwitcherContent;

  return (
    <>
      <Box
        component="header"
        h={height}
        className={`${classes.root}${className ? ` ${className}` : ""}`}
        style={style}
        {...rest}
      >
        <Box className={classes.inner}>
          <Group className={classes.left} wrap="nowrap" gap="xs">
            {hasAppSwitcher && (
              <ActionIcon
                variant="transparent"
                color="white"
                onClick={() => setDrawerOpened((o) => !o)}
                size="lg"
                aria-label="Toggle navigation"
                className={classes.appSwitcherButton}
              >
                <IconGridDots size={26} stroke={2} />
              </ActionIcon>
            )}
            {React.Children.map(children, (child) => {
              if (
                React.isValidElement(child) &&
                typeof child.type !== "string" &&
                // biome-ignore lint/suspicious/noExplicitAny: React component displayName not accessible via ComponentType
                (child.type as any).displayName === "HeaderBar.CustomContent"
              ) {
                return null;
              }
              return child;
            })}
          </Group>

          {/* Right-aligned elements */}
          <div className={classes.right}>
            {React.Children.map(children, (child) => {
              if (
                React.isValidElement(child) &&
                typeof child.type !== "string" &&
                // biome-ignore lint/suspicious/noExplicitAny: React component displayName not accessible via ComponentType
                (child.type as any).displayName === "HeaderBar.CustomContent"
              ) {
                return child;
              }
              return null;
            })}
          </div>
        </Box>
      </Box>

      {hasAppSwitcher && (
        <Drawer
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          title={appSwitcherTitle}
          padding="md"
          size="sm"
        >
          {appSwitcherContent}
        </Drawer>
      )}
    </>
  );
};

// Sub-components for composability

const Logo = ({
  applicationName,
  applicationSubtitle,
}: {
  applicationName?: string;
  applicationSubtitle?: string;
}) => (
  <Group gap={0} align="center">
    <AxiomMark size={26} tone="light" />
    {(applicationName || applicationSubtitle) && (
      <div className={classes.applicationInfo}>
        {applicationName && (
          <Text fw={400} size="lg" className={classes.logoName}>
            {applicationName}
          </Text>
        )}
        {applicationSubtitle && (
          <Text size="xs" className={classes.logoSubtitle}>
            {applicationSubtitle}
          </Text>
        )}
      </div>
    )}
  </Group>
);
Logo.displayName = "HeaderBar.Logo";
HeaderBar.Logo = Logo;

const CustomContent = ({ children }: { children: React.ReactNode }) => (
  <Group align="center" gap={0} wrap="nowrap">
    {children}
  </Group>
);
CustomContent.displayName = "HeaderBar.CustomContent";
HeaderBar.CustomContent = CustomContent;

const HeaderBarAiIcon = (props: React.ComponentProps<typeof AiIcon>) => (
  <span className={classes.aiIcon}>
    <AiIcon {...props} />
  </span>
);
HeaderBarAiIcon.displayName = "HeaderBar.AiIcon";
HeaderBar.AiIcon = HeaderBarAiIcon;

const AppTab = ({
  label,
  icon,
  onClose,
  active,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  active?: boolean;
  onClick: () => void;
}) => {
  return (
    <UnstyledButton
      className={classes.appTab}
      onClick={onClick}
      data-active={active || undefined}
    >
      {icon && <span className={classes.appTabIcon}>{icon}</span>}
      <Text size="sm" truncate className={classes.appTabLabel}>
        {label}
      </Text>
      {onClose && (
        <ActionIcon
          variant="transparent"
          size="xs"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={classes.appTabClose}
          aria-label={`Close ${label} tab`}
        >
          <IconX size={12} />
        </ActionIcon>
      )}
    </UnstyledButton>
  );
};
AppTab.displayName = "HeaderBar.AppTab";
HeaderBar.AppTab = AppTab;

const UserMenu = ({
  name,
  description: _description,
  src,
  children,
}: {
  name: string;
  description?: string;
  /** URL for the user's avatar image */
  src?: string;
  children: React.ReactNode;
}) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <UnstyledButton className={classes.userMenuButton}>
          <Avatar src={src} alt={name} size="sm" className={classes.userAvatar}>
            {initials}
          </Avatar>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{children}</Menu.Dropdown>
    </Menu>
  );
};
UserMenu.displayName = "HeaderBar.UserMenu";
HeaderBar.UserMenu = UserMenu;

const Search = React.forwardRef<
  HTMLInputElement,
  Omit<SearchInputProps, "results"> & {
    /** Custom click handler. If provided, you control the modal yourself. */
    onSearchClick?: () => void;
    /** Recent items shown in the modal (when no query is entered). */
    recentItems?: SearchModalItem[];
    /** Search results shown when there is a query. */
    results?: SearchModalItem[];
    /** Recommended apps shown in the modal. */
    recommendedApps?: SearchModalApp[];
    /** Called when an item is selected in the modal. */
    onSelectItem?: (item: SearchModalItem) => void;
    /** Called when an app is selected in the modal. */
    onSelectApp?: (app: SearchModalApp) => void;
    /** Current search query. If provided with onQueryChange, modal becomes controlled. */
    query?: string;
    /** Called when the search query changes. */
    onQueryChange?: (query: string) => void;
  }
>(
  (
    {
      onSearchClick,
      recentItems,
      results,
      recommendedApps,
      onSelectItem,
      onSelectApp,
      query: controlledQuery,
      onQueryChange,
      ...props
    },
    ref,
  ) => {
    const [opened, setOpened] = useState(false);
    const [internalQuery, setInternalQuery] = useState("");
    const isControlled = controlledQuery !== undefined;
    const query = isControlled ? controlledQuery : internalQuery;

    // When `onSearchClick` is provided the consumer owns the modal; otherwise it is rendered internally.
    const hasInternalModal =
      !onSearchClick &&
      (recentItems !== undefined ||
        results !== undefined ||
        recommendedApps !== undefined);

    const handleClick = () => {
      if (onSearchClick) {
        onSearchClick();
      } else if (hasInternalModal) {
        setOpened(true);
      }
    };

    const handleQueryChange = (value: string) => {
      if (!isControlled) setInternalQuery(value);
      onQueryChange?.(value);
    };

    return (
      <>
        <SearchInput
          ref={ref}
          variant="filled"
          size="xs"
          className={classes.search}
          styles={{
            input: {
              backgroundColor: "var(--axiom-header-input-bg)",
              color: "var(--axiom-text-on-dark)",
              cursor: onSearchClick || hasInternalModal ? "pointer" : undefined,
            },
            section: {
              color: "var(--axiom-header-input-placeholder)",
            },
          }}
          readOnly={!!(onSearchClick || hasInternalModal)}
          onClick={onSearchClick || hasInternalModal ? handleClick : undefined}
          onFocus={
            onSearchClick || hasInternalModal
              ? (e) => {
                  handleClick();
                  e.currentTarget.blur();
                }
              : undefined
          }
          onSubmit={
            onSearchClick || hasInternalModal ? () => handleClick() : undefined
          }
          {...props}
        />
        {hasInternalModal && (
          <SearchModal
            opened={opened}
            onClose={() => {
              setOpened(false);
              if (!isControlled) setInternalQuery("");
            }}
            query={query}
            onQueryChange={handleQueryChange}
            recentItems={recentItems}
            results={results}
            recommendedApps={recommendedApps}
            onSelectItem={onSelectItem}
            onSelectApp={onSelectApp}
            placeholder={props.placeholder}
          />
        )}
      </>
    );
  },
);
Search.displayName = "HeaderBar.Search";
HeaderBar.Search = Search;

const HeaderBarRealm = React.forwardRef<HTMLButtonElement, RealmProps>(
  (props, ref) => (
    <RealmComponent ref={ref} className={classes.headerRealm} {...props} />
  ),
);
HeaderBarRealm.displayName = "HeaderBar.Realm";
HeaderBar.Realm = HeaderBarRealm;

HeaderBar.RealmMenu = RealmMenuComponent;
