import React, { useState } from "react";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../form/CustomLink";
import { commonFormClasses } from "../../utils/theme";
import { useNotification } from "../../hooks";
import { forgetPasswd } from "../../api/auth";
import { isValidEmail } from "../../utils/helper";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    setEmail(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return updateNotification("error", "Email is missing!");
    if (!isValidEmail(email))
      return updateNotification("error", "Invalid email!");
    const { error, message } = await forgetPasswd(email);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClasses + " w-96"}>
          <Title>Please enter your email</Title>
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            name="email"
            placeholder="user@email.com"
          />
          <Submit value="Send link" />
          <div className="flex justify-between">
            <CustomLink to="/auth/login">Login</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
