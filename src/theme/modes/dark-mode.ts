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

const darkMode = (theme: ICustomTheme) => ({
    ...theme,
    palette: {
        ...theme.palette,
        mode: 'dark',
        background: {
            ...theme.palette.background,
            default: '#1A1A1A',
            paper: '#2B2A2F',
            secondary: '#343434',
        },
        text: {
            ...theme.palette.text,
            primary: '#FFFFFF',
            secondary: '#B0B0B0',
            light: '#909090',
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
            dark: '#E8E8E8',
            text: '#FFFFFF',
        },
    },
});

export default darkMode;
