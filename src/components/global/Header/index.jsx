import { Button, Flex } from "antd";
import AuthProfileDropDown from "../../shared/AuthProfileDropDown";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const {
    authUserInfo: { isAuth, userData },
  } = useSelector((store) => store.userProfile);

  return (
    <div className="main-header">
      <Flex justify="space-between" align="center">
        <p>Logo</p>

        <div>
          {isAuth ? (
            <AuthProfileDropDown userProfileInfo={userData} />
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
