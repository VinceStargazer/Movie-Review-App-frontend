import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { VscError } from "react-icons/vsc";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword, verifyPassResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonFormClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validatePass = (pass1, pass2) => {
  if (!pass1 || !pass1.trim())
    return { ok: false, error: "New password is missing!" };
  if (!pass2 || !pass2.trim())
    return { ok: false, error: "Please re-enter your password!" };
  if (pass1.length < 8)
    return { ok: false, error: "Password must be at least 8 characters!" };
  if (pass1 !== pass2) return { ok: false, error: "Passwords don't match!" };
  return { ok: true };
};

export default function ResetPassword() {
  const [passwords, setPasswords] = useState({
    pass1: "",
    pass2: "",
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  useEffect(() => {
    isValidToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { pass1, pass2 } = passwords;
    const { ok, error } = validatePass(pass1, pass2);
    if (!ok) return updateNotification("error", error);
    const { error: err, message } = await resetPassword(pass1, id);
    if (err) return updateNotification("error", err);
    updateNotification("success", message);
    navigate("/auth/login", { replace: true });
  };

  const isValidToken = async () => {
    const { error, valid } = await verifyPassResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }
    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }
    setIsValid(true);
  };

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-4">
            <ImSpinner3 className="animate-spin dark:text-white" size={30} />
            <h1 className="text-xl font-semibold dark:text-white text-primary">
              Please wait as we are verifying your identity.
            </h1>
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-4">
            <VscError className="dark:text-white" size={30} />
            <h1 className="text-xl font-semibold dark:text-white text-primary">
              Sorry, we could not verify your identity.
            </h1>
          </div>
        </Container>
      </FormContainer>
    );

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClasses + " w-96"}>
          <Title>Please enter your new password</Title>
          <FormInput
            label="New password"
            value={passwords.pass1}
            onChange={handleChange}
            name="pass1"
            type="password"
            placeholder="********"
          />
          <FormInput
            label="Re-enter password"
            value={passwords.pass2}
            onChange={handleChange}
            name="pass2"
            type="password"
            placeholder="********"
          />
          <Submit value="Submit" />
        </form>
      </Container>
    </FormContainer>
  );
}
