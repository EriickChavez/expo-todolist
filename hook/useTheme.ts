import { themes } from "@/constants/Colors";
import { ThemeType } from "@/interfaces/theme";
import { useTheme as useNavigationTheme } from "@react-navigation/native";

const useTheme = (): ThemeType => {
  return {
    colors: themes.light.colors,
    dark: themes.light.dark,
  };
};

export default useTheme;
