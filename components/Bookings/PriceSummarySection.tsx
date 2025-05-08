import { useEffect } from "react";

export const PriceSummarySection = ({
  baseRate,
  pickupDateTime,
  returnDateTime,
  setTotalPrice,
}: {
  baseRate: number;
  pickupDateTime: any;
  returnDateTime: any;
  setTotalPrice: (totalprice: any) => void;
}) => {
  const pickupDate = new Date(pickupDateTime);
  const returnDate = new Date(returnDateTime);
  const totalDays = Math.ceil(
    (returnDate.getTime() - pickupDate.getTime()) / (1000 * 3600 * 24)
  );
  const totalPrice = baseRate * totalDays;

  useEffect(() => {
    setTotalPrice(totalPrice);
  }, [totalPrice, setTotalPrice]);

  return (
    <div className="flex flex-col gap-4 bg-[#003A45] text-white p-6 rounded-lg shadow-md w-full md:w-1/3">
      <h2 className="text-2xl font-bold">Total</h2>
      <h2 className="text-4xl font-bold">{totalPrice} XPF</h2>
      <span className="text-lg font-semibold">
        {baseRate} x {totalDays} jours
      </span>
    </div>
  );
};
