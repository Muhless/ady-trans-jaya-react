import React from "react";
import Card from ".";
import ButtonComponent from "../button/Index";
import useNavigationHooks from "../../hooks/useNavigation";

const AddDeliveryCard = () => {
  const { goToAddDeliveryForm } = useNavigationHooks();
  return (
    <Card className="hover:shadow-none w-96 p-0 rounded-md">
      <div className="flex justify-between items-center p-2 transition rounded-md duration-300 hover:bg-biru cursor-pointer bg-background border ">
        <h1>Pengiriman 1</h1>
        <div className="flex space-x-1">
          <ButtonComponent variant="edit" className="hover:text-text" />
          <ButtonComponent variant="delete" />
        </div>
      </div>
      <div className="flex justify-between items-center p-2 transition rounded-md duration-300 hover:bg-biru cursor-pointer bg-background border ">
        <h1>Pengiriman 1</h1>
        <div className="flex space-x-1">
          <ButtonComponent variant="edit" className="hover:text-text" />
          <ButtonComponent variant="delete" />
        </div>
      </div>
      <ButtonComponent
        label="Tambah Pengiriman"
        variant="add"
        className="w-full mt-3"
        onClick={goToAddDeliveryForm}
      />
    </Card>
  );
};

export default AddDeliveryCard;
