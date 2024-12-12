import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { FaUserTie } from "react-icons/fa"; // Importing the worker-like icon

// Validation schema
const SignupSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    console.log("Signup Data", data);
  };

  return (
    <Container>
      <LeftPanel>
        <FormContainer>
          <Title>Welcome!</Title>
          <Subtitle>Please Sign Up</Subtitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputField>
              <label>First Name</label>
              <input type="text" {...register("firstName")} />
              {errors.firstName && <Error>{errors.firstName.message}</Error>}
            </InputField>

            <InputField>
              <label>Last Name</label>
              <input type="text" {...register("lastName")} />
              {errors.lastName && <Error>{errors.lastName.message}</Error>}
            </InputField>

            <InputField>
              <label>Email</label>
              <input type="email" {...register("email")} />
              {errors.email && <Error>{errors.email.message}</Error>}
            </InputField>

            <InputField>
              <label>Password</label>
              <input type="password" {...register("password")} />
              {errors.password && <Error>{errors.password.message}</Error>}
            </InputField>

            <InputField>
              <label>Confirm Password</label>
              <input type="password" {...register("confirmPassword")} />
              {errors.confirmPassword && (
                <Error>{errors.confirmPassword.message}</Error>
              )}
            </InputField>

            <Button type="submit">Sign Up</Button>
          </Form>
        </FormContainer>
      </LeftPanel>
      <RightPanel>
        <IconContainer>
          <FaUserTie size={120} style={{ height: "500px" }} color="#007bff" />
        </IconContainer>
      </RightPanel>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

const FormContainer = styled.div`
  width: 500px; /* Increased width */
  height: 500px; /* Reduced height */
  padding: 50px;
  border: 1px solid #ced4da; /* Border around the form */
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: #ffffff; /* White background */
  overflow-y: auto; /* Make scrollable if content exceeds height */
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none;  /* For Internet Explorer and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ced4da;
    border-radius: 4px;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const RightPanel = styled.div`
  flex: 2;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
   height: 600px;
    width: 300px;
  
  border: 1px solid #ced4da; /* Border around the form */
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: #ffffff;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SignupPage;