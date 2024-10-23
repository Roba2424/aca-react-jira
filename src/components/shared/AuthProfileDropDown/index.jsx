import { Avatar, Dropdown, Flex, theme, Typography } from "antd";
import { signOut } from "firebase/auth";
import "./style.css";
import { auth, db } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";

const { useToken } = theme;
const { Text } = Typography;

const AuthProfileDropDown = () => {
  const [user, setUser] = useState([]);
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = getDocs(collection(db, "registeredUsers"));
    };
  });

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error, "signOut error");
    }
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
              <Text>John Smith</Text>
              <Text>johnsmith@gmail.com</Text>
            </Flex>
            {menu}
          </div>
        );
      }}
    >
      <Avatar size="large" className="user-profile-avatar">
        J S
      </Avatar>
    </Dropdown>
  );
};

export default AuthProfileDropDown;
