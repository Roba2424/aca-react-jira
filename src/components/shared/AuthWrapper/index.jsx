import { Typography } from "antd";
import "./style.css";

const { Title } = Typography;

const AuthWrapper = ({ title, children, banner }) => {
  return (
    <div className="auth-wrapper">
      <div
        className="banner-container"
        style={{ backgroundImage: `url(${banner})` }}
      ></div>
      <div className="form-container">
        <Title level={3}>{title}</Title>
        {children}
      </div>  
    </div>
  );
};

export default AuthWrapper;
