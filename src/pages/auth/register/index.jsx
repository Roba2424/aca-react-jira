import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import {
  regexpValidation,
  ROUTE_CONTANTS,
} from "../../../core/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import AuthWrapper from "../../../components/shared/AuthWrapper";
import RegisterBanner from "../../../core/images/auth-register.jpg";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleRegister = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate(ROUTE_CONTANTS.LOGIN);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <AuthWrapper title="Sign Up" banner={RegisterBanner}>
      <Form layout="vertical" onFinish={() => handleRegister(user)} form={form}>
        <Form.Item label="First Name">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChangeInput}
          />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChangeInput}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChangeInput}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          tooltip="minimum 6 symbol max 8"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
            {
              pattern: regexpValidation,
              message: "Wrong password",
            },
          ]}
        >
          <Input.Password
            name="password"
            placeholder="Password"
            onChange={handleChangeInput}
          />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                }
              },
            }),
          ]}
        >
          <Input.Password
            name="password"
            placeholder="Password"
            onChange={handleChangeInput}
          />
        </Form.Item>
        <Flex justify="end" align="center">
          <Link to={ROUTE_CONTANTS.LOGIN}>Sign in</Link>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Flex>
      </Form>
    </AuthWrapper>
  );
};

export default Register;
