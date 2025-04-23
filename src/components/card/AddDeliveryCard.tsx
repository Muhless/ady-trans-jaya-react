import React from "react";
import Card from ".";
import ButtonComponent from "../button/Index";
import useNavigationHooks from "../../hooks/useNavigation";

const AddDeliveryCard = () => {
  const { goToAddDeliveryForm } = useNavigationHooks();
  return (
    <Card className="bg-[#f1f4f9] w-96 space-y-1 hover:shadow-none">
      <div className="flex justify-between items-center p-2 transition rounded-md duration-300 hover:bg-biru cursor-pointer bg-gray-300 mb-3">
        <h1>Pengiriman 1</h1>
        <div className="flex space-x-1">
          <ButtonComponent variant="edit" className="hover:text-text" />
          <ButtonComponent variant="delete" />
        </div>
      </div>
      <ButtonComponent
        label="Tambah Pengiriman"
        variant="add"
        className="w-full p-2"
        onClick={goToAddDeliveryForm}
      />
    </Card>
  );
};

export default AddDeliveryCard;
