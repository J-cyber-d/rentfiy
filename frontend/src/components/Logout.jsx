import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Typography, message } from "antd";
import Axios from "axios";
const { confirm } = Modal;

const { Link } = Typography;

const handleLogout = async () => {
  try {
    await Axios.post("/api/authentication/logout");
    message.success("Logout successful");
    window.location.reload("/"); // Reload the page
  } catch (error) {
    console.error("Logout failed:", error);
    message.error("Failed to logout. Please try again.");
  }
};

const showDeleteConfirm = () => {
  confirm({
    title: "Are you sure you want to logout?",
    icon: <ExclamationCircleFilled />,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk: handleLogout,
  });
};

const LogoutModal = () => <Link onClick={showDeleteConfirm}>Logout</Link>;
export default LogoutModal;
