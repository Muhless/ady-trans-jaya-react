import { useNavigate } from "react-router-dom";

const useNavigationHooks = () => {
  const navigate = useNavigate();
  return {
    goToHome: () => navigate("/"),
    goToCarPages: () => navigate("/car"),
    goToDriverPages: () => navigate("/driver"),
    goToCustomerPages: () => navigate("/customer"),
    goToDetailDelivery: (id: string | number) => () => {
      if (id) {
        navigate(`/delivery/${id}`);
      } else {
        console.warn("ID tidak ditemukan");
      }
    },
    goToDeliveryPages: () => navigate("/delivery"),
    goToAddDelivery: () => navigate("/delivery/add"),
    goToAddDeliveryForm: () => navigate("/delivery/add/form"),
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
