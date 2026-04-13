import React, { useMemo } from 'react';
import {
    createTheme,
    ThemeProvider,
    responsiveFontSizes,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import customTheme from './modes/custom-theme';
import lightMode from './modes/light-mode';
import type { ICustomTheme } from './modes/custom-theme';

const AppTheme: React.FC<React.PropsWithChildren> = ({ children }) => {
    const theme = useMemo(() => {
        const baseTheme = createTheme(customTheme) as unknown as ICustomTheme;
        return createTheme(baseTheme, lightMode(baseTheme));
    }, []);

    return (
        <ThemeProvider theme={responsiveFontSizes(theme)}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default AppTheme;
