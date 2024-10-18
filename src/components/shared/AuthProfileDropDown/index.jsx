import { Avatar, Dropdown, Flex, theme, Typography } from "antd";
import "./style.css";

const { useToken } = theme;
const { Text } = Typography;

const AuthProfileDropDown = () => {
  const { token } = useToken();

  const items = [
    {
      label: "Profile",
      key: 0,
    },
    {
      label: "Cabinet",
      key: 1,
    },
    {
      label: "Logout",
      key: 2,
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
