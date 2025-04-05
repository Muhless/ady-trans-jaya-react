import React from "react";
import ButtonComponent from "../../components/button/Index";
import FormGroupDeliveryComponent from "../../components/maps/FormGroupDelivery";
import Card from "../../components/card";

function GroupDeliveryPages() {
  return (
    <>
      <div className="flex justify-center">
        <Card
          className="flex flex-col items-center justify-center w-1/2 border bg-secondary"
          title="cihuy"
        >
          <div className="flex flex-col space-y-4">
            <FormGroupDeliveryComponent />
            <div className="flex gap-4">
              <ButtonComponent
                label="kembali"
                variant="back"
                className="w-full"
              />
              <ButtonComponent
                label="simpan"
                variant="save"
                className="w-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default GroupDeliveryPages;
