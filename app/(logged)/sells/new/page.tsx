import { BackButton } from "@/components/ui/back-button";
import { Sell } from "@/model/Sell";
import NewSellForm from "./form";
import getProductsSummary from "@/actions/get-products-summary";

export default async function Sell() {
  const productsSummary = await getProductsSummary();
  return (
    <div className="flex flex-col gap-4">
      <header className="py-2 mb-2 flex justify-between items-center">
        <div className="flex gap-2 items-center justify-start">
          <BackButton />
          <h3>Nova venda</h3>
        </div>
      </header>
      <NewSellForm productsSummary={productsSummary} />
    </div>
  );
}
