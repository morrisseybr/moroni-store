export interface Sell {
  id: string;
  date: Date;
  bag: {
    productId: string;
    productName: string;
    priceId: string;
    price: number;
    quantity: number;
    discount: number;
  }[];
  financialTransactionId: string;
  strockTransactionId: string;
}
