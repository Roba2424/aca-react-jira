import { Avatar, Dropdown, Flex, theme, Typography } from "antd";
import { signOut } from "firebase/auth";
import "./style.css";
import { auth, db } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import {
  FIRESTORE_PATH_NAMES,
  ROUTE_CONSTANTS,
} from "../../../core/utils/constants";

const { useToken } = theme;
const { Text } = Typography;

const getFullNameLetters = ({ firstName, lastName }) => {
  if (firstName && lastName) {
    return `${firstName[0]}  ${lastName[0]}`;
  }
};

const AuthProfileDropDown = ({ userProfileInfo }) => {
  const { token } = useToken();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  const items = [
    {
      label: "Profile",
      key: 0,
      onClick: () => navigate(ROUTE_CONSTANTS.PROFILE),
    },
    {
      label: "Cabinet",
      key: 1,
      onClick: () => navigate(ROUTE_CONSTANTS.CABINET),
    },
    {
      label: "Logout",
      key: 2,
      onClick: handleSignOut,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      dropdownRender={(menu) => {
        return (
          <div
            className="profile-dropdown-container"
            style={{
              borderRadius: token.borderRadiusLG,
              backgroundColor: token.colorBgElevated,
              boxShadow: token.boxShadowSecondary,
            }}
          >
            <Flex vertical align="center" style={{ padding: token.sizeXS }}>
              <Avatar
                className="user-profile-avatar"
                size="large"
                src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
              />
              <Text>
                {userProfileInfo.firstName} {userProfileInfo.lastName}
              </Text>
              <Text>{userProfileInfo.email}</Text>
            </Flex>
            {menu}
          </div>
        );
      }}
    >
      <Avatar size="large" className="user-profile-avatar">
        {getFullNameLetters(userProfileInfo)}
      </Avatar>
    </Dropdown>
  );
};

export default AuthProfileDropDown;
