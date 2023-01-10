import React from "react";
import Container from "../Container";
import { ImWarning } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function NotVerified() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;
  
  const navigate = useNavigate();
  const navigateToVerify = () => {
    navigate('/auth/verify-email', {state: { user: authInfo.profile }});
  }

  if (isLoggedIn && !isVerified)
    return (
      <Container>
        <div className="flex space-x-3 text-md justify-center items-center bg-yellow-50 p-2 drop-shadow-lg">
          <ImWarning className="dark:text-white" size={20} />
          <h1 className="dark:text-white text-primary">
            It looks like you haven't verified your account.
          </h1>
          <button onClick={navigateToVerify} className="font-semibold text-blue-400 rounded">
            Verify Now
          </button>
        </div>
      </Container>
    );
}