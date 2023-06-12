import { TransactionType } from "./TransactionType";

export interface StockTransaction {
  id: string;
  date: string;
  type: TransactionType;
  productId: string;
  quantity: number;
}
