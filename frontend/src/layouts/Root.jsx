import { Layout, theme } from "antd";
import CustomHeader from "../components/Header";
import { useContext } from "react";
import { UserContext } from "../hooks/Context";
const { Header, Content, Footer } = Layout;

// eslint-disable-next-line react/prop-types
const RootLayout = ({ children }) => {
  const { authState } = useContext(UserContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <CustomHeader />
      </Header>
      <Content
        style={{
          marginTop: "20px",
          padding: "0 40px",
        }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}>
        Presidio Hiring Challenge ©{new Date().getFullYear()} Created by
        Deenadhayalan J
      </Footer>
    </Layout>
  );
};
export default RootLayout;
