import "server-only";
import { Locale, LocaleKeys, Locales } from "./locale";

export const getLocale = async (locale: Locales): Promise<Locale> => {
  const localeModule = await import(`./${locale}`);
  return localeModule.default as Locale;
};

export const useTranslation = () => {
  const locale: Locales = "pt-BR";
  const t = async (key: LocaleKeys) => {
    const localeModule = await getLocale(locale);
    return localeModule[key];
  };
  return { t };
};
