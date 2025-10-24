import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Get saved dark mode preference from localStorage
        const saved = localStorage.getItem('dark-mode');
        if (saved !== null) {
            const parsed = JSON.parse(saved);
            console.log("🌙 Loaded from localStorage:", parsed);
            return parsed;
        }
        // Default to system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log("🌙 System prefers dark:", systemPrefersDark);
        return systemPrefersDark;
    });

    // Function to apply dark mode class reliably for Safari
    const applyDarkMode = (darkMode) => {
        const html = document.documentElement;

        if (darkMode) {
            html.classList.add('dark');
            html.style.setProperty('color-scheme', 'dark', 'important');
            html.style.setProperty('background-color', '#111827', 'important');
            html.style.setProperty('color', '#ffffff', 'important');
        } else {
            html.classList.remove('dark');
            html.style.setProperty('color-scheme', 'light', 'important');
            html.style.setProperty('background-color', '#ffffff', 'important');
            html.style.setProperty('color', '#111827', 'important');
        }

        // Force Safari to recognize changes
        html.offsetHeight;
    };

    // Initial effect to apply dark mode on mount
    useEffect(() => {
        applyDarkMode(isDarkMode);
    }, []); // Run only on mount

    useEffect(() => {
        // Save to localStorage when dark mode changes
        localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));

        // Apply dark mode class to document
        applyDarkMode(isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            return newValue;
        });
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
}
