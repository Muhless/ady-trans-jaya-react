import { useNavigate } from "react-router-dom";
import { useTransactionStore } from "../stores/transactionStore";

const useNavigationHooks = () => {
  const navigate = useNavigate();
  return {
    goBack: () => navigate(-1),
    goToHome: () => navigate("/"),
    goToLoginPage: () => navigate("/login"),
    goToDriverPages: () => navigate("/driver"),
    goToDriverDetails: (id: number) => () => {
      if (id) {
        navigate(`/driver/${id}`);
      } else {
        console.warn("ID tidak tersedia");
      }
    },
    // customer
    goToCustomerPages: () => navigate("/customer"),
    goToCustomerDetailPages: (id:number) => {
      if (id) {
        navigate(`/customer/${id}`);
      } else {
        console.warn("ID tidak ditemukan");
      }
    },
    // vehicle
    goToVehiclePages: () => navigate("/vehicle"),
    // transaction
    goToTransactionPages: () => navigate("/transaction"),
    goToAddTransaction: () => {
      useTransactionStore.getState();
      navigate("/transaction/add");
    },
    goToDetailTransaction: (id: number) => () => {
      if (id) {
        navigate(`/transaction/${id}`);
      } else {
        console.warn("ID tidak ditemukan");
      }
    },
    // delivery
    goToDeliveryPages: () => navigate("delivery"),
    goToAddDeliveryForm: () => navigate("/transaction/add/delivery"),
    goToAddDeliveryItemPages: () => navigate("/transaction/add/delivery/item"),
    goToDeliveryMapPages: (id: number) => navigate(`/delivery/map/${id}`),
    goToDetailDelivery: (id: number) => () => {
      if (id) {
        navigate(`/delivery/${id}`);
      } else {
        console.warn("ID tidak ditemukan");
      }
    },
  };
};

export default useNavigationHooks;
