import React from "react";
import Card from "../../components/card";
import SubTitle from "../../components/SubTitle";
import FormDelivery from "../../components/form/FormDelivery";

function AddDeliveryPages() {
  return (
    <div className="flex justify-center">
      <Card className="flex flex-col w-1/2 border bg-secondary">
        <SubTitle subTitle="Pengajuan Pengiriman" className="flex justify-center py-5 text-3xl"/>
        <div className="flex flex-col space-y-4 px-6">
          <FormDelivery />
        </div>
      </Card>
    </div>
  );
}

export default AddDeliveryPages;
