import { TransactionType } from "./TransactionType";

export interface FinancialTransaction {
  id: string;
  name: string;
  date: Date;
  amount: number;
  type: TransactionType;
}
