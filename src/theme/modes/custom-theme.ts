import { Breakpoints, Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import breakpoints from '../shared/breakpoints';
import customSpacing, { ICustomSpacing } from '../shared/custom-spacing';
import font from '../shared/font';
import type { IThemeFont } from '../shared/font';
import type { IThemeBreakpoints } from '../shared/breakpoints';

export interface IThemeCustoms {
    drawer: {
        widthOpen: string;
        widthClose: string;
    };
    header: {
        height: string;
    };
    font: IThemeFont;
    spacing: ICustomSpacing;
}

export interface ICustomBreakpoints extends Breakpoints {
    values: IThemeBreakpoints;
}

export interface ICustomTheme extends Theme {
    breakpoints: ICustomBreakpoints;
    customs: IThemeCustoms;
    typography: Theme['typography'];
}

const defaultTheme = createTheme();

const customTheme: ICustomTheme = {
    ...defaultTheme,
    breakpoints: {
        ...defaultTheme.breakpoints,
        values: breakpoints,
    },
    typography: {
        ...defaultTheme.typography,
        fontFamily: [
            'Switzer-Variable',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        body1: {
            ...defaultTheme.typography.body1,
            fontFamily: 'Switzer-Variable',
        },
        body2: {
            ...defaultTheme.typography.body2,
            fontFamily: 'Switzer-Variable',
        },
        h5: {
            ...defaultTheme.typography.h5,
            fontFamily: 'Switzer-Variable',
        },
        h6: {
            ...defaultTheme.typography.h6,
            fontFamily: 'Switzer-Variable',
        },
    },
    components: {
        ...defaultTheme.components,
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    overflow: 'auto',
                },
            },
        },
    },
    customs: {
        drawer: {
            widthOpen: customSpacing.rem(27),
            widthClose: customSpacing.rem(8.1),
        },
        header: {
            height: customSpacing.rem(8),
        },
        spacing: customSpacing,
        font,
    },
};

export default customTheme;
