import { Palette, TypeText, PaletteColor } from '@mui/material';
import type { ICustomTheme } from './custom-theme';

interface IThemeText extends TypeText {
    secondary: string;
    light: string;
}

interface IThemePaletteColor extends PaletteColor {
    text: string;
}

export interface IThemePalette extends Palette {
    background: {
        default: string;
        paper: string;
        secondary: string;
    };
    text: IThemeText;
    primary: IThemePaletteColor;
    secondary: IThemePaletteColor;
    tertiary: {
        main: string;
        dark: string;
        text: string;
    };
}

const lightMode = (theme: ICustomTheme) => ({
    ...theme,
    palette: {
        ...theme.palette,
        mode: 'light',
        background: {
            ...theme.palette.background,
            default: '#F8F9FA',
            paper: '#fff',
            secondary: '#F5F5F5',
        },
        text: {
            ...theme.palette.text,
            primary: '#2B2A2F',
            secondary: '#6B7280',
            light: '#7A7F8F',
        },
        primary: {
            ...theme.palette.primary,
            main: '#50589F',
            light: '#92A7E9',
            text: '#fff',
        },
        secondary: {
            ...theme.palette.secondary,
            main: '#FFBE2E',
            light: '#F9D77A',
            text: '#2B2A2F',
        },
        tertiary: {
            main: '#DEE1EB',
            dark: '#292B34',
            text: '#2B2A2F',
        },
    },
});

export default lightMode;
