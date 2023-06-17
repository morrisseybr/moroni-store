const LOCALES = ["pt-BR"] as const;

const LOCALE_KEYS = [
  "shirt",
  "pants",
  "shoes",
  "hat",
  "socks",
  "underwear",
  "accessories",
  "other",
  "male",
  "female",
  "unisex",
  "number",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
  "unique",
] as const;

export type LocaleKeys = (typeof LOCALE_KEYS)[number];

export type Locales = (typeof LOCALES)[number];

export type Locale = Record<LocaleKeys, string>;
