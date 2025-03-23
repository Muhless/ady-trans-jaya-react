import { useNavigate } from "react-router-dom";

const useNavigationHooks = () => {
  const navigate = useNavigate();
  return {
    goToHome: () => navigate("/"),
    goToUserProfile: () => navigate("/profile"),
    goToDeliveryGroup: () => navigate("/delivery/add/group"),
  };
};

export default useNavigationHooks;
