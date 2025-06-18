import Card from ".";
import ChartComponent from "../Chart";
import SubTitle from "../SubTitle";

const TransactionGraphic = () => {
  return (
    <Card className="h-[25rem] rounded-md">
      <div className="flex justify-between items-center p-2 ">
        <SubTitle subTitle="Grafik Transaksi" />
      </div>
      <hr />
      <div className="px-2 h-[calc(100%-64px)]">
        <ChartComponent />
      </div>
    </Card>
  );
};

export default TransactionGraphic;
