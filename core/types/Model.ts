export interface Model {
  [key: string]: string | number | boolean | Date | Model | Model[];
}
