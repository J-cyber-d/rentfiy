import { useContext } from "react";
import { Menu, Button, Row, Col, Typography, Dropdown } from "antd";
import { useMediaQuery } from "react-responsive";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import LoginPage from "../pages/Login";
import { UserContext } from "../hooks/Context";
import LogoutModal from "./Logout";

const { Title, Text } = Typography;

export default function CustomHeader() {
  const { authState } = useContext(UserContext);
  console.log(authState);
  const isSmallScreen = useMediaQuery({ maxWidth: 576 });
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e) => {
    navigate(`/${e.key}`);
  };

  const selectedKey =
    location.pathname === "/" ? "" : location.pathname.substring(1);

  const items = [
    {
      key: "1",
      label: <Text onClick={() => navigate("/sell")}>My Properties</Text>,
    },
    {
      key: "2",
      danger: true,
      label: <LogoutModal />,
    },
  ];

  return (
    <Row
      align="middle"
      style={{ backgroundColor: "#001529", padding: "0 24px" }}>
      <Col flex="none" style={{ display: "flex", alignItems: "center" }}>
        {!isSmallScreen && (
          <>
            <Title level={3} style={{ margin: 0, color: "white" }}>
              Welcome To Rentify
            </Title>
          </>
        )}
      </Col>

      <Col
        flex="auto"
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Menu
          selectedKeys={[selectedKey]}
          theme="dark"
          mode="horizontal"
          onClick={handleMenuClick}
          style={{
            backgroundColor: "transparent",
            borderBottom: "none",
            flex: 1,
            justifyContent: "center",
            display: "flex",
          }}>
          <Menu.Item key="">Buy</Menu.Item>
          <Menu.Item key="sell">Sell</Menu.Item>
          <Menu.Item key="help">Help</Menu.Item>
        </Menu>
      </Col>
      <Col
        flex="none"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}>
        {authState.isAuthenticated ? (
          <Dropdown menu={{ items }}>
            <Button
              shape="round"
              style={{ marginRight: 16 }}
              icon={<UserOutlined />}
              size={"large"}>
              {`${authState.userData.firstName} ${authState.userData.lastName}`}{" "}
            </Button>
          </Dropdown>
        ) : (
          <>
            <LoginPage />
            <Button
              type="primary"
              style={{ marginLeft: 16 }}
              onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
}
