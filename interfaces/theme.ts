import { ThemeTitle } from "@/enums/Themes";

export interface ThemeType {
  dark: boolean;
  colors: {
    text: string;
    subtext: string;
    background: string;
    danger: string;
    light_error: string;
    success: string;
    input: string;
    info: string;
    card: string;
    primary: string;
    border: string;
    placeholder: string;
    icon: string;
    warning: string;
  };
}

export type Theme = {
  [key in ThemeTitle]: ThemeType;
};
