import { Form, Input, Button, Card, Typography, message } from "antd";
import { createStyles } from "antd-style";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const useStyle = createStyles(({ token }) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    backgroundColor: token.colorBgBase,
  },
  card: {
    maxWidth: "400px",
    width: "100%",
    padding: token.paddingLG,
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    borderRadius: token.borderRadiusLG,
  },
  title: {
    textAlign: "center",
    marginBottom: token.marginLG,
  },
  form: {
    width: "100%",
  },
  formItem: {
    marginBottom: token.marginMD,
  },
  submitButton: {
    width: "100%",
    marginTop: token.marginMD,
  },
}));

const SignUpPage = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Welcome you to Rentify, Please Login to continue");
        setTimeout(async () => {
          navigate("/");
        }, 1000);
        // You can also handle successful login actions, like storing the token or redirecting the user
      } else {
        message.error(data.message || "Sigup failed. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          Sign Up
        </Title>
        <Form
          name="signup"
          onFinish={handleSubmit}
          layout="vertical"
          className={styles.form}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            className={styles.formItem}>
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            className={styles.formItem}>
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
            className={styles.formItem}>
            <Input
              type="email"
              placeholder="Email"
              // eslint-disable-next-line react/jsx-no-duplicate-props
              placeholder="Provide an correct email to get welcome mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Minimum 6 characters" },
            ]}
            className={styles.formItem}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
              { min: 10, message: "Not Less than 10 numbers" },
              { max: 10, message: "Not More than 10 numbers" },
            ]}
            className={styles.formItem}>
            <Input addonBefore={"+91"} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item className={styles.formItem}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
