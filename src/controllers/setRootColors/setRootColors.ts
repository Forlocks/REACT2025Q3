export const setRootColors = (colorTheme: string) => {
  const THEME_COLORS = {
    light: {
      '--aqua-focus': '#032879',
      '--gray': '#0b596d',
      '--gray-focus': '#06313b',
    },
    dark: {
      '--aqua-focus': '#004747',
      '--gray': '#414040',
      '--gray-focus': '#272727',
    },
  };

  const root = document.documentElement;
  const themeColors = THEME_COLORS[colorTheme as keyof typeof THEME_COLORS];

  if (themeColors) {
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
};
