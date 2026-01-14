import { useLanguage } from "./LanguageContext";

/**
 * Hook for accessing translations
 * @returns Translation object with all translated strings
 */
export const useTranslation = () => {
    const { t } = useLanguage();
    return t;
};

/**
 * Hook for accessing language and language controls
 * @returns Language state and controls
 */
export const useLanguageControls = () => {
    const { language, setLanguage, dir } = useLanguage();
    return { language, setLanguage, dir };
};

