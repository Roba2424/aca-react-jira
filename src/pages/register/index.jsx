import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import "./style.css";
import { regexpValidation, ROUTE_CONTANTS } from "../../core/utils/constants";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="auth-container">
      <Form layout="vertical" onFinish={() => handleRegister(user)} form={form}>
        <h2 className="auth-title">Register</h2>
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
        <div className="auth-btn-container">
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
          <Link to={ROUTE_CONTANTS.LOGIN}>Sign in</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
