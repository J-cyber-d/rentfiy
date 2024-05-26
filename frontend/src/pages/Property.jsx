import { useState } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  AutoComplete,
  Select,
  InputNumber,
  Row,
  Col,
  Divider,
  Radio,
  message,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Axios from "axios";
import { useContext } from "react";
import { LoadingContext, UserContext } from "../hooks/Context";
import FileUpload from "../components/ImageUpload";

const Property = () => {
  const { authState } = useContext(UserContext);
  const { loading, setLoading, setRefresh } = useContext(LoadingContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileError, setFileError] = useState("");

  const stateOptions = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "NCT of Delhi",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
  ].map((state) => ({ value: state }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (fileList.length === 0) {
        setFileError("Please upload at least one image.");
        return;
      }
      values.address2 = values.address2 || "";
      values.description = values.description || "";
      values.appliances = values.appliances || [];
      const imageUrls = fileList.map((file) => file.response.result);
      await Axios.post("/api/properties", {
        userId: authState.userData.userId,
        files: imageUrls,
        ...values,
      })
        .then(() => {
          message.success("Property details submitted successfully!");
          setIsModalOpen(false);
          setRefresh((s) => s + 1);
          form.resetFields();
        })
        .catch((err) => {
          console.log("Failed to add Properties", err);
          message.error(
            "Failed to submit property details, Please try again later!"
          );
        });
    } catch (error) {
      console.log("Validation Failed:", error);
      message.error("Please check the form for errors and try again.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ backgroundColor: "green", borderColor: "green" }}
        icon={<HomeOutlined />}
        onClick={showModal}>
        Sell Property
      </Button>
      <Modal
        title="Property Details"
        open={isModalOpen}
        onOk={handleOk}
        okText={"Submit"}
        onCancel={handleCancel}
        width={900}>
        <Divider />
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} sm={9}>
              <Form.Item
                label="Address 1"
                name="address1"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={9}>
              <Form.Item
                label="Address 2"
                name="address2"
                rules={[{ message: "Please input a valid address!" }]}>
                <Input placeholder="Optional" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                label="City"
                name="city"
                rules={[
                  { required: true, message: "Please input your city!" },
                ]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="State"
                name="state"
                rules={[
                  { required: true, message: "Please select your state!" },
                ]}>
                <AutoComplete
                  options={stateOptions}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Zipcode"
                name="zipcode"
                rules={[
                  { required: true, message: "Please input your zipcode!" },
                  { len: 6, message: "Zipcode must be 6 digits!" },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Country" name="country" initialValue="India">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={6}>
              <Form.Item
                label="Home Type"
                name="homeType"
                rules={[
                  { required: true, message: "Please select home type!" },
                ]}>
                <Select>
                  <Select.Option value="Single Family">
                    Single Family
                  </Select.Option>
                  <Select.Option value="Townhouse">Townhouse</Select.Option>
                  <Select.Option value="Multi Family">
                    Multi Family
                  </Select.Option>
                  <Select.Option value="Apartment">Apartment</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                label="Year Built"
                name="yearBuilt"
                rules={[
                  {
                    required: true,
                    message: "Please input build year!",
                  },
                ]}>
                <Select>
                  {[...Array(new Date().getFullYear() - 1899).keys()].map(
                    (i) => (
                      <Select.Option key={1900 + i} value={1900 + i}>
                        {1900 + i}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                label="Finished Square Feet"
                name="finishedSquareFeet"
                rules={[
                  {
                    required: true,
                    message: "Please input square feet!",
                    type: "number",
                    min: 1,
                  },
                ]}>
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                label="Amount (INR)"
                name="amount"
                rules={[{ required: true, message: "Please input amount!" }]}>
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\₹\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Bedrooms"
                name="bedrooms"
                rules={[
                  {
                    required: true,
                    message: "Please input number of bedrooms!",
                    type: "number",
                    min: 1,
                  },
                ]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Bathrooms"
                name="bathrooms"
                rules={[
                  {
                    required: true,
                    message: "Please input number of bathrooms!",
                    type: "number",
                    min: 1,
                  },
                ]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Total Rooms"
                name="totalrooms"
                rules={[
                  { required: true, message: "Please select an option!" },
                ]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Are your house has an Garage?"
                name="garage"
                rules={[
                  { required: true, message: "Please select an option!" },
                ]}>
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={16}>
              <Form.Item label="Appliances" name="appliances">
                <Select mode="multiple">
                  <Select.Option value="washing machine">
                    Washing Machine
                  </Select.Option>
                  <Select.Option value="freezer">Freezer</Select.Option>
                  <Select.Option value="dishwasher">Dishwasher</Select.Option>
                  <Select.Option value="dryer">Dryer</Select.Option>
                  <Select.Option value="garbage disposal">
                    Garbage Disposal
                  </Select.Option>
                  <Select.Option value="microwave">Microwave</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24}>
              <Form.Item label="What I love about my home" name="description">
                <Input.TextArea placeholder="Optional" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24}>
              <Form.Item
                label="Upload Images"
                validateStatus={fileError ? "error" : ""}
                help={fileError || ""}
                required>
                <FileUpload
                  fileList={fileList}
                  setFileList={setFileList}
                  error={fileError}
                  setError={setFileError}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Property;
