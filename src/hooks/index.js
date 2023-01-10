import { useContext } from "react";
import { AuthContext } from "../components/context/AuthProvider";
import { NotificationContext } from "../components/context/NotificationProvider";
import { SearchContext } from "../components/context/SearchProvider";
import { ThemeContext } from "../components/context/ThemeProvider";

export const useTheme = () => useContext(ThemeContext);
export const useNotification = () => useContext(NotificationContext);
export const useAuth = () => useContext(AuthContext);
export const useSearch = () => useContext(SearchContext);
