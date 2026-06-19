import { ActionIcon, TextInput, type TextInputProps } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./SearchInput.module.css";

export interface SearchInputProps
  extends Omit<
    TextInputProps,
    "onChange" | "onSubmit" | "rightSection" | "leftSection"
  > {
  /** Controlled value */
  value?: string;

  /** Default value for uncontrolled usage */
  defaultValue?: string;

  /** Fired on every change (or debounced if `debounce` is set) */
  onChange?: (value: string) => void;

  /** Debounce delay in ms for the onChange callback (default: 0 = no debounce) */
  debounce?: number;

  /** Show a keyboard shortcut badge in the right section (e.g. "⌘K") */
  shortcut?: string;

  /** Register a global keyboard listener that focuses the input when the shortcut is pressed */
  enableShortcut?: boolean;

  /** Called when the clear button is clicked */
  onClear?: () => void;

  /** Called when the user presses Enter */
  onSubmit?: (value: string) => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      onClear,
      onSubmit,
      debounce = 0,
      shortcut,
      enableShortcut = false,
      placeholder = "Search...",
      "aria-label": ariaLabel,
      onFocus,
      onBlur,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [draftValue, setDraftValue] = useState(
      controlledValue ?? defaultValue,
    );
    const [focused, setFocused] = useState(false);
    const currentValue = isControlled
      ? debounce > 0
        ? draftValue
        : controlledValue
      : internalValue;
    const innerRef = useRef<HTMLInputElement>(null);

    // Merge forwarded ref with inner ref
    const mergedRef = useCallback(
      (node: HTMLInputElement | null) => {
        (innerRef as React.MutableRefObject<HTMLInputElement | null>).current =
          node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
        }
      },
      [ref],
    );

    const debouncedOnChange = useDebouncedCallback((val: string) => {
      onChange?.(val);
    }, debounce);

    // Keep draft value in sync when parent updates controlled value.
    useEffect(() => {
      if (!isControlled || debounce <= 0) return;
      setDraftValue(controlledValue ?? "");
    }, [isControlled, debounce, controlledValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.currentTarget.value;
      if (!isControlled) {
        setInternalValue(val);
      } else if (debounce > 0) {
        setDraftValue(val);
      }
      if (debounce > 0) {
        debouncedOnChange(val);
      } else {
        onChange?.(val);
      }
    };

    const handleClear = () => {
      debouncedOnChange.cancel();
      if (!isControlled) {
        setInternalValue("");
      } else if (debounce > 0) {
        setDraftValue("");
      }
      onChange?.("");
      onClear?.();
      innerRef.current?.focus();
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        innerRef.current?.blur();
      }
      if (e.key === "Enter") {
        onSubmit?.(currentValue);
      }
      onKeyDown?.(e);
    };

    // Global keyboard shortcut
    useEffect(() => {
      if (!enableShortcut || !shortcut) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (
          target === innerRef.current ||
          target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA"
        ) {
          return;
        }
        const isMod = e.metaKey || e.ctrlKey;
        const key = e.key.toLowerCase();
        // Parse shortcut like "⌘K" or "ctrl+k"
        const shortcutKey = shortcut
          .replace(/[⌘⌃⇧⌥]/g, "")
          .replace(/\b(ctrl|cmd|meta|shift|alt|option)\b/gi, "")
          .replace(/[+-]/g, "")
          .trim()
          .toLowerCase();
        if (isMod && key === shortcutKey) {
          e.preventDefault();
          innerRef.current?.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [enableShortcut, shortcut]);

    const rightSection = currentValue ? (
      <ActionIcon
        variant="transparent"
        size="sm"
        onClick={handleClear}
        aria-label="Clear search"
        className={classes.clearButton}
      >
        <IconX size={14} />
      </ActionIcon>
    ) : shortcut && !focused ? (
      <span className={classes.shortcut}>{shortcut}</span>
    ) : undefined;

    return (
      <TextInput
        ref={mergedRef}
        value={currentValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        leftSection={<IconSearch size={16} className={classes.searchIcon} />}
        leftSectionPointerEvents="none"
        rightSection={rightSection}
        rightSectionPointerEvents={currentValue ? "all" : "none"}
        aria-label={ariaLabel ?? "Search"}
        {...rest}
        className={clsx(classes.root, rest.className)}
      />
    );
  },
);

SearchInput.displayName = "SearchInput";
