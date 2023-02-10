import { useEffect, useState } from "react";
import localStorageService from "../../services/localStorage.service";
const useTheme = () => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        if (theme != "dark") {
            localStorageService.setTheme("dark");
            setTheme("dark");
        } else {
            localStorageService.setTheme("light");
            setTheme("light");
        }
    };

    useEffect(() => {
        const localTheme = localStorageService.getTheme();
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);
    return {
        theme,
        toggleTheme
    };
};

export default useTheme;
