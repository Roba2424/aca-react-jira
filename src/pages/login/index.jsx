import { Form, Input, Button } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ROUTE_CONTANTS } from "../../core/utils/constants";

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
    <div className="login-container">
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
          tooltip=""
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign in
        </Button>
        <Link to={ROUTE_CONTANTS.REGISTER}>Sign Up</Link>
      </Form>
    </div>
  );
};

export default Login;
