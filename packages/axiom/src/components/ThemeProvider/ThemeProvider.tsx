import { MantineProvider, type MantineProviderProps } from "@mantine/core";
import { cssVariablesResolver, theme } from "@/themes";

export interface ThemeProviderProps extends MantineProviderProps {}

export function ThemeProvider({
  children,
  theme: customTheme,
  cssVariablesResolver: customCssVariablesResolver,
  ...props
}: ThemeProviderProps) {
  const finalTheme = customTheme ? customTheme : theme;

  return (
    <MantineProvider
      theme={finalTheme}
      cssVariablesResolver={customCssVariablesResolver ?? cssVariablesResolver}
      {...props}
    >
      {children}
    </MantineProvider>
  );
}
