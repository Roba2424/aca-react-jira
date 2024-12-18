import { Form, Input, Button, Flex, notification } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase/index";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import AuthWrapper from "../../../components/shared/AuthWrapper";
import LoginBanner from "../../../core/images/auth-login.jpg";
import { useDispatch } from "react-redux";
import {
  fetchUserProfileInfo,
  setIsAuth,
} from "../../../state-managment/slices/userProfile";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      form.resetFields();
      dispatch(setIsAuth(true));
      dispatch(fetchUserProfileInfo());
    } catch (error) {
      notification.error({
        message: "Invalid Login Credentials",
      });
    } finally {
      setLoading(false);
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
          <Link to={ROUTE_CONSTANTS.REGISTER}>Create Account</Link>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign in
          </Button>
        </Flex>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
