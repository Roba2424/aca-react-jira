import { Button, Flex } from "antd";
import AuthProfileDropDown from "../../shared/AuthProfileDropDown";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import "./style.css";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <div className="main-header">
      <Flex justify="space-between" align="center">
        <p>Logo</p>

        <div>
          {isAuth ? (
            <AuthProfileDropDown />
          ) : (
            <Link to={ROUTE_CONSTANTS.LOGIN}>
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default Header;
