import React, { useEffect, useState } from "react";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../form/CustomLink";
import { commonFormClasses } from "../../utils/theme";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const validateUser = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };
  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be at least 8 characters!" };
  return { ok: true };
};

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { updateNotification } = useNotification();
  const { authInfo, handleLogin } = useAuth();
  const { isPending, isLoggedIn } = authInfo;
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUser(userInfo);
    if (!ok) return updateNotification("error", error);
    await handleLogin(userInfo.email, userInfo.password);
    if (authInfo.error) return updateNotification("error", authInfo.error);
    if (authInfo.isLoggedIn) updateNotification("success", "Login success");
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClasses + " w-96"}>
          <Title>Login to your account</Title>
          <FormInput
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            name="email"
            placeholder="user@email.com"
          />
          <FormInput
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            name="password"
            type="password"
            placeholder="********"
          />
          <Submit
            busy={isPending}
            className="h-8 space-x-1 dark:bg-highlight-dark bg-highlight-deep dark:text-secondary text-zinc justify-center"
          >
            Login
          </Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password?</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
