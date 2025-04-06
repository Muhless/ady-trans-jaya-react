import { useNavigate } from "react-router-dom";

const useNavigationHooks = () => {
  const navigate = useNavigate();
  return {
    goToHome: () => navigate("/"),
    goToUserProfile: () => navigate("/profile"),
    goToDetailDelivery: (id: string | number) => () => {
      if (id) {
        navigate(`/delivery/${id}`);
      } else {
        console.warn("ID tidak ditemukan");
      }
    },
    goToAddDelivery: () => navigate("/delivery/add"),
    goToDeliveryGroup: () => navigate("/delivery/add/group"),
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
