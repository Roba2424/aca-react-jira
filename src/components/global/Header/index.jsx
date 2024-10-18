import { Button, Flex } from "antd";
import "./style.css";
import AuthProfileDropDown from "../../shared/AuthProfileDropDown";

const Header = () => {
  return (
    <div className="main-header">
      <Flex justify="space-between" align="center">
        <p>Logo</p>

        <div>
          <AuthProfileDropDown />
        </div>
      </Flex>
    </div>
  );
};

export default Header;
