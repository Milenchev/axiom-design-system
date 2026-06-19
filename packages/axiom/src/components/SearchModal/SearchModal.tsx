import { Kbd, Modal, UnstyledButton } from "@mantine/core";
import type React from "react";
import { SearchInput } from "../SearchInput";
import classes from "./SearchModal.module.css";

export interface SearchModalItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SearchModalApp {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface SearchModalProps {
  opened: boolean;
  onClose: () => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  recentItems?: SearchModalItem[];
  results?: SearchModalItem[];
  recommendedApps?: SearchModalApp[];
  onSelectItem?: (item: SearchModalItem) => void;
  onSelectApp?: (app: SearchModalApp) => void;
  placeholder?: string;
}

export const SearchModal = ({
  opened,
  onClose,
  query = "",
  onQueryChange,
  recentItems = [],
  results = [],
  recommendedApps = [],
  onSelectItem,
  onSelectApp,
  placeholder = "Search...",
}: SearchModalProps) => {
  const showRecent = !query && recentItems.length > 0;
  const showResults = !!query && results.length > 0;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="lg"
      padding={0}
      classNames={{ content: classes.modalContent }}
    >
      <div className={classes.root}>
        <SearchInput
          placeholder={placeholder}
          value={query}
          onChange={(value) => onQueryChange?.(value)}
          variant="unstyled"
          classNames={{ input: classes.searchInput }}
          autoFocus
        />

        <div className={classes.body}>
          {showRecent && (
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Recent</div>
              <div className={classes.itemList}>
                {recentItems.map((item) => (
                  <UnstyledButton
                    key={item.id}
                    className={classes.item}
                    onClick={() => onSelectItem?.(item)}
                  >
                    {item.icon && (
                      <span className={classes.itemIcon}>{item.icon}</span>
                    )}
                    <span className={classes.itemLabel}>{item.label}</span>
                  </UnstyledButton>
                ))}
              </div>
            </div>
          )}

          {showResults && (
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Results</div>
              <div className={classes.itemList}>
                {results.map((item) => (
                  <UnstyledButton
                    key={item.id}
                    className={classes.item}
                    onClick={() => onSelectItem?.(item)}
                  >
                    {item.icon && (
                      <span className={classes.itemIcon}>{item.icon}</span>
                    )}
                    <span className={classes.itemLabel}>{item.label}</span>
                  </UnstyledButton>
                ))}
              </div>
            </div>
          )}

          {recommendedApps.length > 0 && (
            <div className={classes.section}>
              <div className={classes.sectionTitle}>Recommended Apps</div>
              <div className={classes.appsGrid}>
                {recommendedApps.map((app) => (
                  <UnstyledButton
                    key={app.id}
                    className={classes.appItem}
                    onClick={() => onSelectApp?.(app)}
                  >
                    <span className={classes.appIcon}>{app.icon}</span>
                    <span className={classes.appLabel}>{app.label}</span>
                  </UnstyledButton>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={classes.footer}>
          <div className={classes.shortcut}>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <span>Search</span>
          </div>
          <div className={classes.shortcut}>
            <Kbd>J</Kbd>
            <span>Ask AI</span>
          </div>
          <div className={classes.shortcut}>
            <Kbd>?</Kbd>
            <span>Help</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

SearchModal.displayName = "SearchModal";
