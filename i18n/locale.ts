const LOCALE = ["pt-BR"] as const;

const KEY = [
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

export type Key = (typeof KEY)[number];

export type Locale = (typeof LOCALE)[number];

export type Dictionary = Record<Key, string>;
