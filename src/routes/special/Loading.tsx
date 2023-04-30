import { useHandleSignInCallback } from "@logto/react";
import { useNavigate } from "react-router-dom";


const Loading = () => {
  const navigate = useNavigate();
  const { isLoading } = useHandleSignInCallback(() => {
    navigate("/");
  });
  
  if (isLoading) {
    return (
      <div className="loading" >
        <h1 >Loading...</h1 >
      </div >
    );
  }
  
  return <></>;
};

export default Loading;
