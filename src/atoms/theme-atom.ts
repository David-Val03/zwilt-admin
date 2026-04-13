import { atom } from 'recoil';

export interface ThemeState {
    prefersDarkMode: boolean;
}

const themeAtom = atom<ThemeState>({
    key: 'themeAtom',
    default: {
        prefersDarkMode: false,
    },
});

export default themeAtom;
