import { useNavigate } from "react-router-dom";

const useNavigationHooks = () => {
  const navigate = useNavigate();
  return {
    goBack: () => navigate(-1),
    goToHome: () => navigate("/"),
    goToDriverPages: () => navigate("/driver"),
    goToCustomerPages: () => navigate("/customer"),
    goToCarPages: () => navigate("/car"),
    // transaction
    goToTransactionPages: () => navigate("/transaction"),
    goToAddTransaction: () => navigate("/transaction/add"),
    goToTransactionSummary: () => navigate("/transaction/add/summary"),
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
    goToDriverDetails: (id: string | number) => () => {
      if (id) {
        navigate(`/driver/${id}`);
      } else {
        console.warn("ID tidak tersedia");
      }
    },
  };
};

export default useNavigationHooks;
