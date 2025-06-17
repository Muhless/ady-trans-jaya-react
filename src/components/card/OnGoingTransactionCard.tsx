import React from "react";
import Card from ".";
import SubTitle from "../SubTitle";
import useNavigationHooks from "../../hooks/useNavigation";
import TableComponent from "../table";
import TransactionTable from "../table/TransactionTable";

type OnGoingTransactionCardProps = {
  icon?: React.ReactNode;
};

const columns = [
  { key: "customer", label: "Pelanggan" },
  { key: "totalDelivery", label: "Total Pengiriman" },
  { key: "total", label: "Total Biaya" },
  { key: "status", label: "Status" },
];

const OnGoingTransactionCard: React.FC<OnGoingTransactionCardProps> = ({}) => {
  const { goToTransactionPages } = useNavigationHooks();
  return (
    <Card className="rounded-md h-[25rem]">
      <div className="flex justify-between items-center p-2">
        <SubTitle subTitle="Transaksi Berlangsung" />
        <p
          className="underline text-blue-600 text-sm cursor-pointer hover:text-blue-800"
          onClick={goToTransactionPages}
        >
          Lihat selengkapnya
        </p>
      </div>
      <TransactionTable
        classNameTH="text-sm border-t p-3 bg-gray-100"
        classNameTD="p-3 border-none"
        limit={5}
        columns={[
          { key: "customerName", label: "Pelanggan" },
          { key: "total_delivery", label: "Jumlah Pengiriman" },
          { key: "formattedCost", label: "Total" },
          { key: "transaction_status", label: "Status Transaksi" },
        ]}
        showActions={false}
      />
    </Card>
  );
};

export default OnGoingTransactionCard;
