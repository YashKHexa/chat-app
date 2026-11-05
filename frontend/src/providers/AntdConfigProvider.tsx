import React, { useSyncExternalStore } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

type ColorScheme = "light" | "dark";

const systemThemeQuery = "(prefers-color-scheme: dark)";

function getColorScheme(): ColorScheme {
  const colorScheme = document.documentElement.dataset.colorScheme;
  if (colorScheme === "dark" || colorScheme === "light") return colorScheme;

  return window.matchMedia(systemThemeQuery).matches ? "dark" : "light";
}

function subscribeToColorScheme(onChange: () => void) {
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

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#0f7d34",
          borderRadius: 14,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        },
        components: {
          Divider: {
            marginLG: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;

