import React, { useEffect, useState } from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../form/CustomLink";
import { commonFormClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { createUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";

const validateUser = ({ name, email, password }, passwdConfirm) => {
  const nameRegex = /^[a-z A-Z]+$/;
  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!nameRegex.test(name)) return { ok: false, error: "Invalid name!" };
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };
  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be at least 8 characters!" };
  if (password !== passwdConfirm)
    return { ok: false, error: "Passwords don't match!" };
  return { ok: true };
};

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwdConfirm, setPasswdConfirm] = useState("");

  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUser(userInfo, passwdConfirm);
    if (!ok) return updateNotification("error", error);
    const { err, user } = await createUser(userInfo);
    if (err) return updateNotification("error", err);
    navigate("/auth/verify-email", { state: { user }, replace: true });
  };

  const { name, email, password } = userInfo;

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClasses + " w-96"}>
          <Title>Create your account</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            label="Your name"
            name="name"
            placeholder="John Doe"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            name="email"
            placeholder="user@email.com"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            label="Password"
            name="password"
            type="password"
            placeholder="********"
          />
          <FormInput
            value={passwdConfirm}
            onChange={(e) => setPasswdConfirm(e.target.value)}
            label="Confirm Your Password"
            name="passwdConfirm"
            type="password"
            placeholder="********"
          />
          <Submit className="h-8 space-x-1 dark:bg-highlight-dark bg-highlight-deep dark:text-secondary text-zinc justify-center">
            Sign up
          </Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password?</CustomLink>
            <CustomLink to="/auth/login">Login</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
