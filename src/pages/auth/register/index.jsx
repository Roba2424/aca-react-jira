import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../services/firebase";
import { useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import {
  regexpValidation,
  ROUTE_CONSTANTS,
} from "../../../core/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import AuthWrapper from "../../../components/shared/AuthWrapper";
import RegisterBanner from "../../../core/images/auth-register.jpg";
import { doc, setDoc } from "@firebase/firestore";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    const { firstName, lastName, email, password } = values;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = response.user;
      const createdDoc = doc(db, "registeredUsers", uid);
      await setDoc(createdDoc, { uid, firstName, lastName, email });  
      navigate(ROUTE_CONSTANTS.LOGIN);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper title="Sign Up" banner={RegisterBanner}>
      <Form layout="vertical" onFinish={handleRegister} form={form}>
        <Form.Item label="First Name" name="firstName">
          <Input type="text" placeholder="First Name" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input type="text" placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
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
          <Input.Password placeholder="Password" />
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
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Flex justify="end" align="center">
          <Link to={ROUTE_CONSTANTS.LOGIN}>Sign in</Link>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Flex>
      </Form>
    </AuthWrapper>
  );
};

export default Register;
