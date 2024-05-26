import { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Carousel,
  List,
  Typography,
  Divider,
  Spin,
  Image,
} from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { LoadingContext, UserContext } from "../hooks/Context";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { AmountFormat } from "../utils/CommonFormat";

export default function PropertyView() {
  const { propertyId } = useParams();
  const { authState } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await Axios.get(`/api/properties/${propertyId}`);
        setProperty(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch property details", error);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, setLoading]);

  if (loading) {
    return (
      <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
    );
  }

  if (!property) {
    return (
      <Typography.Text type="danger">
        Failed to load property details.
      </Typography.Text>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={14}>
            <Carousel style={{ borderRadius: "10px" }}>
              <Image
                src={property?.signedImageUrl}
                alt={`Property Image`}
                style={{ width: "100%" }}
              />
            </Carousel>
          </Col>
          <Col xs={24} lg={10}>
            <Typography.Title level={2}>
              {AmountFormat(property?.amount) || "$0.00"}
            </Typography.Title>
            <Typography.Title level={4}>
              {`${property?.address1}${
                property?.address2 ? ", " + property?.address2 : ""
              }, ${property?.city}, ${property?.state} ${property?.zipcode}, ${
                property?.country
              }`}
            </Typography.Title>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <HomeOutlined /> {property?.bedrooms} Beds
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <HomeOutlined /> {property?.bathrooms} Baths
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <HomeOutlined /> {property?.finishedSquareFeet} Sqft
                </Card>
              </Col>
            </Row>
            <Divider />
            <List
              size="small"
              bordered
              dataSource={[
                `Type: ${property?.homeType}`,
                `Year Built: ${property?.yearBuilt}`,
                `Garage: ${property?.garage}`,
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <Divider />
            <Button type="primary" icon={<EnvironmentOutlined />}>
              Request a Tour
            </Button>
          </Col>
        </Row>
        <Divider />
        <Typography.Title level={3}>What's Special</Typography.Title>
        <Typography.Paragraph>
          {property?.description === ""
            ? "No Description Found for this Property?"
            : property?.description}
        </Typography.Paragraph>
        <Divider />
        <Typography.Title level={4}>Owner Information</Typography.Title>
        {authState.isAuthenticated ? (
          <>
            <Typography.Paragraph>
              {property?.userId.firstName} {property?.userId.lastName}
            </Typography.Paragraph>
            <Typography.Paragraph>
              {property?.userId.email}
            </Typography.Paragraph>
            <Typography.Paragraph>
              {"+91"} {property?.userId.phoneNumber}
            </Typography.Paragraph>
          </>
        ) : (
          <Button type="default" icon={<InfoCircleOutlined />}>
            Please Login to view Owner Information
          </Button>
        )}
        <Divider />
        <Typography.Title level={4}>Location</Typography.Title>
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            `${property?.address1}${
              property?.address2 ? ", " + property?.address2 : ""
            }, ${property?.city}, ${property?.state} ${property?.zipcode}, ${
              property?.country
            }`
          )}&output=embed`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Property Location"></iframe>
      </Card>
    </div>
  );
}
