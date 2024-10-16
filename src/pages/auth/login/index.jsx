import { Form, Input, Button, Flex } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase/index";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_CONTANTS } from "../../../core/utils/constants";
import AuthWrapper from "../../../components/shared/AuthWrapper";
import LoginBanner from "../../../core/images/auth-login.jpg";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response, ">>>>>>");
    } catch (error) {
      console.log(error);
    } finally {
      console.log(setLoading(false));
    }
  };

  return (
    <AuthWrapper title="Sing In" banner={LoginBanner}>
      <Form layout="vertical" form={form} onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
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
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>
        <Flex justify="end" align="center">
          <Link to={ROUTE_CONTANTS.REGISTER}>Create Account</Link>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign in
          </Button>
        </Flex>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
