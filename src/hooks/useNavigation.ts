import { useNavigate } from "react-router-dom";

const useNavigationHooks = () => {
  const navigate = useNavigate();
  return {
    goToHome: () => navigate("/"),
    goToUserProfile: () => navigate("/profile"),
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
