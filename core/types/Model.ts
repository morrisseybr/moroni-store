export interface Model {
  [key: string]: string | number | boolean | null | Date | Model | Model[];
}
