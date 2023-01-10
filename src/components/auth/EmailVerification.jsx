import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmailVerification, verifyEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { commonFormClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_LEN = 6;
let currOptIdx;

const validateOtp = (otp) => {
  for (let val of otp) {
    if (isNaN(parseInt(val))) return false;
  }
  return true;
};

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LEN).fill(""));
  const [activeOtpIdx, setActiveOtpIdx] = useState(0);
  const { authInfo, isAuth } = useAuth();
  const { profile, isLoggedIn } = authInfo;
  const isVerified = profile?.isVerified;
  const inputRef = useRef();
  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  // check if the user came from sign-up
  const { state } = useLocation();
  const user = state?.user;

  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currOptIdx] = value.substring(value.length - 1);
    if (!value) setActiveOtpIdx(currOptIdx === 0 ? 0 : currOptIdx - 1);
    else setActiveOtpIdx(currOptIdx + 1);
    setOtp([...newOtp]);
  };

  const handleKeyDown = ({ key }, index) => {
    currOptIdx = index;
    if (key === "Backspace")
      setActiveOtpIdx(currOptIdx === 0 ? 0 : currOptIdx - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateOtp(otp)) return updateNotification("error", "Invalid OTP!");
    const {
      error,
      message,
      user: userRes,
    } = await verifyEmail({ userId: user.id, OTP: otp.join("") });
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    localStorage.setItem("auth-token", userRes.token);
    isAuth();
  };

  const handleResend = async () => {
    const { error, message} = await resendEmailVerification(user.id);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
  };  

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIdx]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, isLoggedIn, isVerified, navigate]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClasses}>
          <div>
            <Title>Please enter OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              A 6-digit code has been sent to your email.
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIdx === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 border-light-subtle dark:border-dark-subtle focus:border-secondary dark:focus:border-white transition rounded bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>
          <div className="content-center">
            <Submit className="h-8 space-x-1 dark:bg-highlight-dark bg-highlight-deep dark:text-secondary text-zinc justify-center">Verify</Submit>
            <button type="button" onClick={handleResend} className="w-full text-md items-center text-light-subtle dark:text-dark-subtle hover:text-secondary dark:hover:text-white mt-3 transition">
              Didn't receive the code? Click here to resend
            </button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
