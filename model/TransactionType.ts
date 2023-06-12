const TRANSACTION_TYPES = {
  INCOME: "INCOME",
  OUTCOME: "OUTCOME",
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];
