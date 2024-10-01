import { Button, Flex } from "antd";
import "./style.css";

const Header = () => {
  return (
    <div className="main-header">
      <Flex justify="space-between" align="center">
        <p>Logo</p>
        <div>
          <Button>Sign in</Button>
        </div>
      </Flex>
    </div>
  );
};

export default Header;
