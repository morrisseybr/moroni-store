import { Key, Locale } from "./locale";
import ptBr from "./pt-BR";

export default function getTranslation(key: Key) {
  return ptBr[key];
}
