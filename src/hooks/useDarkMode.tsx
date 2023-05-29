import { ReactNode, createContext, useContext, useState } from 'react';

const Mode = {
    system: 'system',
    dark: 'dark',
    light: 'light',
} as const;

type DarkMode = (typeof Mode)[keyof typeof Mode];

const DarkModeContext = createContext<{ mode: DarkMode; toggleMode: () => void }>({
    mode: Mode.system,
    toggleMode: () => {
        /* do nothing */
    },
});

export function DarkModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState(() => {
        if (typeof localStorage !== 'undefined' && typeof document !== 'undefined') {
            if (
                localStorage.theme === 'dark' ||
                (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
                document.documentElement.classList.add('dark');

                return Mode.dark;
            }

            if (localStorage.theme === 'light') {
                document.documentElement.classList.remove('dark');
            }

            return Mode.light;
        }

        return Mode.system;
    });

    const toggleMode = () => {
        const next = mode === Mode.dark ? Mode.light : Mode.dark;

        if (typeof localStorage !== 'undefined' && typeof document !== 'undefined') {
            if (next === 'dark') {
                document.documentElement.classList.add('dark');
                localStorage.theme = Mode.dark;
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.theme = Mode.light;
            }
        }

        setMode(next);
    };

    return <DarkModeContext.Provider value={{ mode, toggleMode }}>{children}</DarkModeContext.Provider>;
}

export default function useDarkMode() {
    const mode = useContext(DarkModeContext);

    if (typeof mode === 'undefined') {
        throw new Error('Must wrap component in provider');
    }

    return mode;
}
