import { useContext, useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { createStyles } from "antd-style";
import { LoadingContext } from "../hooks/Context";

const useStyle = createStyles(({ token }) => ({
  "my-modal-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-modal-header": {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
  "my-modal-body": {
    padding: "30px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "my-modal-content": {
    width: "100%",
    maxWidth: "350px",
  },
}));

const LoginPage = () => {
  const { setRefresh } = useContext(LoadingContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { styles } = useStyle();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setRefresh((s) => s + 1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("api/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Login successful!");
        handleOk();

        // You can also handle successful login actions, like storing the token or redirecting the user
      } else {
        message.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    body: styles["my-modal-body"],
    content: styles["my-modal-content"],
  };

  const modalStyles = {
    mask: {
      backdropFilter: "blur(10px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      boxShadow: "0 0 30px #999",
      borderRadius: "8px",
      width: "100%",
      maxWidth: "400px",
    },
  };

  return (
    <>
      <Button onClick={showModal}>Log In</Button>
      <Modal
        title={<div className={classNames.header}>Log In</div>}
        open={isModalOpen}
        onCancel={handleCancel}
        classNames={classNames}
        styles={modalStyles}
        footer={null} // Use custom footer for form submission
      >
        <div className={classNames.body}>
          <Form
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            style={{ width: "100%" }}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}>
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}>
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={handleCancel} style={{ width: "100%" }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default LoginPage;
