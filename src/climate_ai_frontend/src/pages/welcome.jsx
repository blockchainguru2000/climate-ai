import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import AuthLoginOut from "../auth/login";

const WelcomePage = () => {
  const router = useNavigate();
  return (
    <div className="w-full mx-auto h-[100vh] flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-center">
          Consult ai for any climate changes question
        </h1>
        <AuthLoginOut />
      </div>
    </div>
  );
};

export default WelcomePage;
