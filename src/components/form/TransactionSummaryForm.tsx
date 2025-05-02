import React from "react";
import { InputComponent } from "../input/Input";
import ButtonComponent from "../button/Index";
import useNavigationHooks from "../../hooks/useNavigation";

const TransactionSummaryForm = () => {
  const { goToAddDeliveryForm } = useNavigationHooks();

  const handleAddDelivery = () => {
    goToAddDeliveryForm();
  };
  return (
    <form action="">
      <div className="flex justify-between gap-5">
        <h1>Pengiriman</h1>
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-2 transition rounded-md duration-300 hover:bg-biru cursor-pointer bg-background border w-96">
            <h1>Pengiriman</h1>
            <div className="flex space-x-1">
              <ButtonComponent variant="edit" className="hover:text-text" />
              <ButtonComponent variant="delete" />
            </div>
          </div>
          <ButtonComponent
            label="Tambah Pengiriman"
            variant="add"
            className="w-96 mt-3"
            // onClick={handleSubmit}
            type="button"
          />
        </div>
      </div>
      <hr />
      <InputComponent
        label="Jumlah Pengiriman"
        className="w-96"
        name="total_delivery"
        // value={formData.total_delivery}
        disabled
      />
      <hr />
      <InputComponent
        label="Batas Pembayaran"
        type="date"
        name="payment_deadline"
        className="w-96"
        // value={formData.payment_deadline}
        // onChange={handleChange}
      />
      <hr />

      <InputComponent
        label="Total"
        disabled
        className="w-96"
        name="cost"
        // value={formData.cost}
      />
      <div className="flex py-5 gap-4">
        <ButtonComponent
          label="Batal"
          variant="back"
          className="w-full"
          type="button"
        />
        <ButtonComponent
          label="Simpan"
          variant="next"
          className="w-full"
          type="submit"
        />
      </div>
    </form>
  );
};

export default TransactionSummaryForm;
