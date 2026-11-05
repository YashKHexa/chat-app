// src/providers/AntdConfigProvider.tsx
import React, { useSyncExternalStore } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

type ColorScheme = "light" | "dark";

const systemThemeQuery = "(prefers-color-scheme: dark)";

function getThemeColor(variable: string): string {
  if (typeof document === "undefined") return "";
  const probe = document.createElement("span");
  probe.style.color = `var(${variable})`;
  document.documentElement.append(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
}

function getColorScheme(): ColorScheme {
  if (typeof document === "undefined") return "light";
  const colorScheme = document.documentElement.dataset.colorScheme;
  if (colorScheme === "dark" || colorScheme === "light") return colorScheme;

  return window.matchMedia(systemThemeQuery).matches ? "dark" : "light";
}

function subscribeToColorScheme(onChange: () => void) {
  if (typeof document === "undefined") return () => {};

  const rootObserver = new MutationObserver(onChange);
  rootObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-color-scheme"],
  });

  const systemTheme = window.matchMedia(systemThemeQuery);
  systemTheme.addEventListener("change", onChange);

  return () => {
    rootObserver.disconnect();
    systemTheme.removeEventListener("change", onChange);
  };
}

interface AntdConfigProviderProps {
  children: React.ReactNode;
}

export const AntdConfigProvider: React.FC<AntdConfigProviderProps> = ({
  children,
}) => {
  const colorScheme = useSyncExternalStore(
    subscribeToColorScheme,
    getColorScheme,
    () => "light",
  );
  const isDark = colorScheme === "dark";
  const themeRadius =
    typeof document !== "undefined"
      ? Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--theme-radius",
          ),
        ) || 16
      : 16;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: getThemeColor("--theme-color-primary"),
          colorSuccess: getThemeColor("--theme-color-success"),
          colorWarning: getThemeColor("--theme-color-warning"),
          colorError: getThemeColor("--theme-color-error"),
          colorTextBase: getThemeColor("--theme-color-font"),
          colorText: getThemeColor("--theme-color-font"),
          colorTextSecondary: getThemeColor("--theme-color-font-secondary"),
          colorTextTertiary: getThemeColor("--theme-color-font-tertiary"),
          colorBgBase: getThemeColor("--theme-color-background"),
          colorBgLayout: getThemeColor("--theme-color-background-secondary"),
          colorBgContainer: getThemeColor("--theme-color-background"),
          colorBgElevated: getThemeColor("--theme-color-modal-bg"),
          colorBorder: getThemeColor("--theme-color-border"),
          colorBorderSecondary: getThemeColor("--theme-color-border-secondary"),
          borderRadius: themeRadius,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        },
        components: {
          Modal: {
            contentBg: getThemeColor("--theme-color-modal-bg"),
            headerBg: getThemeColor("--theme-color-modal-bg"),
            borderRadiusLG: 20,
          },
          Input: {
            colorBgContainer: getThemeColor("--theme-color-modal-input"),
            activeBorderColor: getThemeColor("--theme-color-modal-input-border"),
            hoverBorderColor: getThemeColor("--theme-color-modal-input-border"),
            activeShadow: "none",
          },
          Segmented: {
            itemSelectedBg: getThemeColor("--theme-color-primary"),
            itemSelectedColor: getThemeColor("--theme-color-on-brand"),
          },
          Divider: {
            marginLG: 0,
            colorSplit: getThemeColor("--theme-color-border"),
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
