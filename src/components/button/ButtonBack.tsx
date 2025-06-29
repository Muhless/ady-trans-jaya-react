import useNavigationHooks from "@/hooks/useNavigation";
import { ArrowLeft } from "lucide-react";

const ButtonBack = () => {
  const { goBack } = useNavigationHooks();
  return (
    <div>
      <button
        onClick={() => goBack()}
        className="mr-4 rounded-full hover:bg-gray-200 transition-colors p-3"
      >
        <ArrowLeft size={30} />
      </button>
    </div>
  );
};

export default ButtonBack;
