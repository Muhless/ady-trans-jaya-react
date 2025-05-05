import { useNavigate } from "react-router-dom";
import { useTransactionStore } from "../stores/transactionStore";

const useNavigationHooks = () => {
  const navigate = useNavigate();
  return {
    goBack: () => navigate(-1),
    goToHome: () => navigate("/"),
    goToDriverPages: () => navigate("/driver"),
    goToDriverDetails: (id: string | number) => () => {
      if (id) {
        navigate(`/driver/${id}`);
      } else {
        console.warn("ID tidak tersedia");
      }
    },
    goToCustomerPages: () => navigate("/customer"),
    goToVehiclePages: () => navigate("/vehicle"),
    // transaction
    goToTransactionPages: () => navigate("/transaction"),
    goToAddTransaction: () => {
      useTransactionStore.getState().resetTransaction();
      navigate("/transaction/add");
    },
    goToDetailTransaction: (id: string | number) => () => {
      if (id) {
        navigate(`/transaction/${id}`);
      } else {
        console.warn("ID tidak ditemukan");
      }
    },
    // delivery
    goToDeliveryPages: () => navigate("delivery"),
    goToDetailDelivery: (id: string | number) => () => {
      if (id) {
        navigate(`/delivery/${id}`);
      } else {
        console.warn("ID tidak ditemukan");
      }
    },
    goToAddDeliveryForm: () => navigate("/transaction/add/delivery"),
  };
};

export default useNavigationHooks;
